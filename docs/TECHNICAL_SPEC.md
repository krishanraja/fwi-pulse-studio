# Technical Specification — Fractional Working Index

## 1. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (React SPA)                       │
├─────────────────────────────────────────────────────────────┤
│  Dashboard │ Signals │ Insights │ Settings │ Auth           │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTPS
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   LOVABLE CLOUD (Supabase)                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Auth      │  │  Database   │  │   Edge Functions     │  │
│  │  (Supabase) │  │ (PostgreSQL)│  │   (Deno Runtime)     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Storage    │  │  Realtime   │  │   Scheduled Jobs     │  │
│  │  (Files)    │  │  (WebSocket)│  │   (pg_cron)          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   EXTERNAL DATA SOURCES                      │
├─────────────────────────────────────────────────────────────┤
│  LinkedIn │ Indeed │ NewsAPI │ Google Trends │ Eventbrite   │
└─────────────────────────────────────────────────────────────┘
```

## 2. Database Schema

### Core Tables

```sql
-- Historical FWI scores
CREATE TABLE fwi_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  overall_score DECIMAL(4,1) NOT NULL,
  demand_score DECIMAL(4,1) NOT NULL,
  supply_score DECIMAL(4,1) NOT NULL,
  culture_score DECIMAL(4,1) NOT NULL,
  weights JSONB NOT NULL DEFAULT '{"demand": 0.4, "supply": 0.4, "culture": 0.2}',
  confidence DECIMAL(3,2),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Individual signals feeding the index
CREATE TABLE signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  source VARCHAR(50) NOT NULL,
  signal_type VARCHAR(20) NOT NULL CHECK (signal_type IN ('demand', 'supply', 'culture')),
  category VARCHAR(100) NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  normalized_value DECIMAL(4,1),
  raw_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Top movers / market signals
CREATE TABLE movers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  skill VARCHAR(100) NOT NULL,
  signal_type VARCHAR(20) NOT NULL CHECK (signal_type IN ('demand', 'supply', 'culture')),
  change_pct DECIMAL(5,2) NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User profiles and preferences
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  company VARCHAR(255),
  role VARCHAR(100),
  tier VARCHAR(20) DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'enterprise')),
  preferences JSONB DEFAULT '{}',
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- API usage tracking
CREATE TABLE api_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  endpoint VARCHAR(255) NOT NULL,
  method VARCHAR(10) NOT NULL,
  status_code INTEGER,
  response_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Alert configurations
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  alert_type VARCHAR(50) NOT NULL,
  threshold DECIMAL(4,1),
  conditions JSONB,
  is_active BOOLEAN DEFAULT true,
  last_triggered TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Subscription management
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255) NOT NULL,
  tier VARCHAR(20) NOT NULL CHECK (tier IN ('pro', 'enterprise')),
  status VARCHAR(20) NOT NULL,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_fwi_scores_date ON fwi_scores(date DESC);
CREATE INDEX idx_signals_date_type ON signals(date DESC, signal_type);
CREATE INDEX idx_movers_date ON movers(date DESC);
CREATE INDEX idx_api_usage_user_date ON api_usage(user_id, created_at DESC);
```

### Row Level Security

```sql
-- Users can only see their own profile
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- FWI scores are public read
ALTER TABLE fwi_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON fwi_scores
  FOR SELECT TO authenticated, anon USING (true);

-- Signals require Pro tier
ALTER TABLE signals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pro users can view signals" ON signals
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND tier IN ('pro', 'enterprise')
    )
  );

-- API usage visible to own user
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own usage" ON api_usage
  FOR SELECT USING (auth.uid() = user_id);
```

## 3. Edge Functions

### Data Ingestion Pipeline

```typescript
// supabase/functions/ingest-signals/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface SignalSource {
  name: string;
  type: 'demand' | 'supply' | 'culture';
  fetch: () => Promise<number>;
  normalize: (value: number) => number;
}

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const sources: SignalSource[] = [
    {
      name: 'linkedin_job_postings',
      type: 'demand',
      fetch: async () => { /* LinkedIn API call */ },
      normalize: (v) => Math.min(100, v / 1000 * 100)
    },
    {
      name: 'google_trends',
      type: 'culture',
      fetch: async () => { /* Google Trends API */ },
      normalize: (v) => v // Already 0-100
    },
    // ... more sources
  ];

  const today = new Date().toISOString().split('T')[0];
  const signals = [];

  for (const source of sources) {
    try {
      const rawValue = await source.fetch();
      const normalized = source.normalize(rawValue);
      
      signals.push({
        date: today,
        source: source.name,
        signal_type: source.type,
        category: source.name,
        value: rawValue,
        normalized_value: normalized,
        raw_data: { fetched_at: new Date().toISOString() }
      });
    } catch (error) {
      console.error(`Failed to fetch ${source.name}:`, error);
    }
  }

  const { error } = await supabase.from('signals').insert(signals);

  if (error) throw error;

  return new Response(JSON.stringify({ 
    success: true, 
    signals_ingested: signals.length 
  }));
});
```

### Calculate Daily Index

```typescript
// supabase/functions/calculate-fwi/index.ts
serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const today = new Date().toISOString().split('T')[0];
  
  // Fetch today's signals
  const { data: signals } = await supabase
    .from('signals')
    .select('*')
    .eq('date', today);

  if (!signals?.length) {
    return new Response(JSON.stringify({ error: 'No signals for today' }), { 
      status: 400 
    });
  }

  // Calculate sub-scores
  const demandSignals = signals.filter(s => s.signal_type === 'demand');
  const supplySignals = signals.filter(s => s.signal_type === 'supply');
  const cultureSignals = signals.filter(s => s.signal_type === 'culture');

  const avgScore = (arr: any[]) => 
    arr.reduce((sum, s) => sum + s.normalized_value, 0) / arr.length;

  const demandScore = avgScore(demandSignals);
  const supplyScore = avgScore(supplySignals);
  const cultureScore = avgScore(cultureSignals);

  const weights = { demand: 0.4, supply: 0.4, culture: 0.2 };
  const overallScore = (demandScore * weights.demand) + 
                       (supplyScore * weights.supply) + 
                       (cultureScore * weights.culture);

  // Calculate confidence based on signal coverage
  const expectedSources = 10;
  const confidence = Math.min(1, signals.length / expectedSources);

  // Insert daily score
  const { error } = await supabase.from('fwi_scores').upsert({
    date: today,
    overall_score: Math.round(overallScore * 10) / 10,
    demand_score: Math.round(demandScore * 10) / 10,
    supply_score: Math.round(supplyScore * 10) / 10,
    culture_score: Math.round(cultureScore * 10) / 10,
    weights,
    confidence
  });

  if (error) throw error;

  return new Response(JSON.stringify({ 
    success: true,
    score: overallScore,
    confidence
  }));
});
```

### API Endpoints (Enterprise)

```typescript
// supabase/functions/api-v1/index.ts
serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  // Validate API key and check tier
  const apiKey = req.headers.get('x-api-key');
  const { data: user } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('api_key', apiKey)
    .single();

  if (!user || user.tier !== 'enterprise') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401 
    });
  }

  // Track API usage
  const startTime = Date.now();

  const url = new URL(req.url);
  const path = url.pathname.replace('/api-v1', '');

  let response;

  switch (path) {
    case '/index':
      const { data: score } = await supabase
        .from('fwi_scores')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single();
      response = score;
      break;

    case '/history':
      const days = parseInt(url.searchParams.get('days') || '30');
      const { data: history } = await supabase
        .from('fwi_scores')
        .select('*')
        .order('date', { ascending: false })
        .limit(days);
      response = history;
      break;

    case '/signals':
      const { data: signals } = await supabase
        .from('signals')
        .select('*')
        .order('date', { ascending: false })
        .limit(100);
      response = signals;
      break;

    default:
      return new Response(JSON.stringify({ error: 'Not found' }), { 
        status: 404 
      });
  }

  // Log API usage
  await supabase.from('api_usage').insert({
    user_id: user.id,
    endpoint: path,
    method: req.method,
    status_code: 200,
    response_time_ms: Date.now() - startTime
  });

  return new Response(JSON.stringify(response), {
    headers: { 'Content-Type': 'application/json' }
  });
});
```

## 4. Scheduled Jobs

```sql
-- Run data ingestion every hour
SELECT cron.schedule(
  'ingest-signals',
  '0 * * * *',  -- Every hour
  $$
  SELECT net.http_post(
    url := 'https://<project>.supabase.co/functions/v1/ingest-signals',
    headers := '{"Authorization": "Bearer <service_role_key>"}'::jsonb
  );
  $$
);

-- Calculate daily index at midnight UTC
SELECT cron.schedule(
  'calculate-fwi',
  '5 0 * * *',  -- 00:05 UTC daily
  $$
  SELECT net.http_post(
    url := 'https://<project>.supabase.co/functions/v1/calculate-fwi',
    headers := '{"Authorization": "Bearer <service_role_key>"}'::jsonb
  );
  $$
);

-- Send daily alerts at 9am UTC
SELECT cron.schedule(
  'send-alerts',
  '0 9 * * *',
  $$
  SELECT net.http_post(
    url := 'https://<project>.supabase.co/functions/v1/send-alerts',
    headers := '{"Authorization": "Bearer <service_role_key>"}'::jsonb
  );
  $$
);
```

## 5. Signal Normalization

All signals are normalized to a 0-100 scale for composability:

| Signal Source | Raw Unit | Normalization Formula |
|---------------|----------|----------------------|
| LinkedIn Jobs | Count | `min(100, count / baseline * 100)` |
| Indeed Postings | Count | `min(100, count / baseline * 100)` |
| Google Trends | 0-100 | Pass-through |
| Twitter Mentions | Count | `min(100, log10(count) * 20)` |
| Marketplace Listings | Count | `min(100, count / baseline * 100)` |
| Media Articles | Count | `min(100, sqrt(count) * 10)` |

**Baseline Calibration**:
- Baselines are set from historical median values
- Recalibrated quarterly to prevent drift
- Anomaly detection for outlier handling

## 6. Security Considerations

### Authentication Flow
1. Email/password via Supabase Auth
2. OAuth (Google, LinkedIn) for enterprise
3. API keys for programmatic access
4. JWT tokens with 1-hour expiry

### Rate Limiting
| Tier | Requests/min | Requests/day |
|------|--------------|--------------|
| Free | 10 | 100 |
| Pro | 60 | 5,000 |
| Enterprise | 300 | Unlimited |

### Data Protection
- All data encrypted at rest (AES-256)
- TLS 1.3 for transit
- PII minimization (no full names required)
- GDPR-compliant data deletion

## 7. Monitoring & Observability

### Metrics to Track
- API response times (p50, p95, p99)
- Data ingestion success rate
- Signal freshness (time since last update)
- Error rates by endpoint
- Active user count by tier

### Alerting Thresholds
- Data staleness > 24 hours: Page on-call
- API error rate > 5%: Alert channel
- Index calculation failure: Immediate page
- Unusual score movement > 10 points: Review

---

*Last updated: 2026-01-12*
