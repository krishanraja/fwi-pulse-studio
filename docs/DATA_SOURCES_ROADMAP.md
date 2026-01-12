# Data Sources Roadmap — Fractional Working Index

## Overview

The FWI's credibility and value depend entirely on the quality, breadth, and freshness of its underlying data. This document outlines the data acquisition strategy.

---

## 1. Data Source Categories

### Demand Signals (Weight: 40%)
Measure enterprise appetite for fractional talent

| Source | Signal | Method | Status | Priority |
|--------|--------|--------|--------|----------|
| LinkedIn Jobs | "Fractional" job postings | Talent Insights API | 🔴 Planned | Critical |
| Indeed | Interim/contract postings | API + scraping | 🔴 Planned | Critical |
| Glassdoor | Company reviews mentioning fractional | API | 🟡 Planned | High |
| Google Jobs | Aggregated job postings | Scraping | 🟡 Planned | High |
| Crunchbase | Startup fractional hiring | API | 🟡 Planned | High |
| SEC Filings | Consulting expense disclosures | EDGAR API | 🟢 Planned | Medium |
| RFP Databases | Consulting RFP volume | Partnerships | 🟢 Planned | Medium |

### Supply Signals (Weight: 40%)
Measure fractional talent availability and activity

| Source | Signal | Method | Status | Priority |
|--------|--------|--------|--------|----------|
| LinkedIn Profiles | "Fractional" in title/about | People API | 🔴 Planned | Critical |
| Upwork | Fractional exec listings | API | 🔴 Planned | Critical |
| Toptal | Expert availability | Partnership | 🟡 Planned | High |
| A.Team | Fractional listings | Partnership | 🟡 Planned | High |
| Catalant | Project marketplace | Partnership | 🟡 Planned | High |
| Personal websites | Fractional exec sites | Crawling | 🟢 Planned | Medium |

### Culture Signals (Weight: 20%)
Measure cultural adoption and awareness

| Source | Signal | Method | Status | Priority |
|--------|--------|--------|--------|----------|
| Google Trends | Search interest | API | 🟢 Ready | Medium |
| Twitter/X | Mentions, sentiment | API | 🟢 Ready | Medium |
| NewsAPI | Media coverage | ✅ Configured | ✅ Ready | Medium |
| Eventbrite | Industry events | ✅ Configured | ✅ Ready | Medium |
| Podcasts | Episode mentions | Scraping | 🟢 Planned | Low |
| Reddit | Community discussions | API | 🟢 Planned | Low |
| Substack | Newsletter coverage | Scraping | 🟢 Planned | Low |

---

## 2. Data Quality Requirements

### Freshness
| Tier | Requirement | Method |
|------|-------------|--------|
| Critical | < 24 hours | Hourly ingestion |
| High | < 48 hours | Daily ingestion |
| Medium | < 1 week | Weekly ingestion |

### Coverage
- Minimum 5 sources per signal type
- Geographic: US primary, UK/EU secondary
- Role coverage: C-suite through Director level
- Industry breadth: All major sectors

### Accuracy
- Automated outlier detection
- Human spot-checks (weekly)
- Backtesting against known events
- Cross-source validation

---

## 3. Integration Priorities

### Phase 1 (Weeks 1-4): Foundation

**Goal**: 3+ live data sources per signal type

```
Week 1: NewsAPI + Google Trends
- [x] NewsAPI key configured
- [ ] Build ingestion Edge Function
- [ ] Test search queries
- [ ] Store results in signals table

Week 2: LinkedIn Talent Insights
- [ ] Apply for API access
- [ ] Negotiate partnership terms
- [ ] Design data mapping
- [ ] Build ingestion pipeline

Week 3: Indeed/Glassdoor
- [ ] Evaluate API vs scraping
- [ ] Legal review of ToS
- [ ] Build ingestion pipeline
- [ ] Normalize to signal format

Week 4: Upwork/Toptal
- [ ] Outreach to partnerships team
- [ ] API documentation review
- [ ] Sample data validation
- [ ] Integration build
```

### Phase 2 (Weeks 5-8): Expansion

**Goal**: 8+ live sources, robust pipeline

```
- [ ] Crunchbase integration
- [ ] SEC EDGAR integration
- [ ] Twitter/X API v2
- [ ] A.Team partnership
- [ ] Catalant partnership
- [ ] Reddit API
- [ ] Podcast index crawling
```

### Phase 3 (Weeks 9-12): Refinement

**Goal**: Production-quality data infrastructure

```
- [ ] Automated quality monitoring
- [ ] Alerting for stale data
- [ ] Historical backfill (24 months)
- [ ] Cross-source validation
- [ ] Confidence scoring per signal
```

---

## 4. API Access Strategy

### LinkedIn Talent Insights

**Critical for demand + supply signals**

| Requirement | Status |
|-------------|--------|
| Company page (10K+ followers) | Needed |
| Business justification | Draft ready |
| Annual contract ($25K+) | Budget allocated |
| Technical implementation | 2-week timeline |

**Fallback**: LinkedIn post scraping (limited, risky)

### Indeed Publisher Program

**Important for job posting data**

| Requirement | Status |
|-------------|--------|
| Publisher application | Submitted |
| Use case approval | Pending |
| API key issuance | Pending |
| Rate limits | TBD |

**Fallback**: JSearch API (aggregator)

### Google Trends

**Public API, no approval needed**

```typescript
// Example implementation
const fetchGoogleTrends = async (keyword: string) => {
  const response = await fetch(
    `https://trends.google.com/trends/api/dailytrends?geo=US&q=${encodeURIComponent(keyword)}`
  );
  // Parse and normalize
};
```

---

## 5. Data Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SOURCES                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 INGESTION LAYER                              │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ LinkedIn │  │  Indeed  │  │  News    │  │  Social  │    │
│  │ Fetcher  │  │ Fetcher  │  │ Fetcher  │  │ Fetcher  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 PROCESSING LAYER                             │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Signal Normalizer                        │   │
│  │  • Schema validation                                  │   │
│  │  • Value normalization (0-100)                       │   │
│  │  • Deduplication                                     │   │
│  │  • Outlier detection                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 STORAGE LAYER                                │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   signals    │  │  fwi_scores  │  │    movers    │      │
│  │   (raw)      │  │  (computed)  │  │  (analysis)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 COMPUTATION LAYER                            │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Index Calculator                         │   │
│  │  • Weight application                                │   │
│  │  • Composite scoring                                 │   │
│  │  • Delta calculation                                 │   │
│  │  • Confidence scoring                                │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Normalization Formulas

### Job Posting Count → Score

```typescript
const normalizeJobPostings = (count: number, baseline: number = 1000) => {
  // Logarithmic scaling to handle variance
  const ratio = count / baseline;
  const score = 50 + (Math.log10(ratio) * 30);
  return Math.max(0, Math.min(100, score));
};
```

### Search Interest → Score

```typescript
const normalizeSearchInterest = (googleTrendsValue: number) => {
  // Google Trends is already 0-100, but relative
  // Apply smoothing and trend adjustment
  return googleTrendsValue;
};
```

### Social Mentions → Score

```typescript
const normalizeSocialMentions = (count: number, sentiment: number) => {
  // sentiment: -1 to 1
  // weight volume by sentiment
  const volumeScore = Math.min(100, Math.sqrt(count) * 5);
  const sentimentMultiplier = 0.5 + (sentiment + 1) * 0.25; // 0.5 to 1.0
  return volumeScore * sentimentMultiplier;
};
```

---

## 7. Quality Monitoring

### Automated Checks

```sql
-- Alert if no signals in 24 hours
CREATE OR REPLACE FUNCTION check_signal_freshness()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT MAX(created_at) 
    FROM signals
  ) < NOW() - INTERVAL '24 hours' THEN
    -- Trigger alert
    PERFORM pg_notify('data_alert', 'Stale signals detected');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Dashboard Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Signals/day | 100+ | < 50 |
| Source coverage | 10+ | < 5 |
| Freshness (avg) | < 12 hrs | > 24 hrs |
| Null rate | < 5% | > 10% |
| Duplicate rate | < 1% | > 5% |

---

## 8. Cost Estimates

### API Costs (Monthly)

| Source | Plan | Cost/month |
|--------|------|------------|
| LinkedIn Talent Insights | Enterprise | $2,000 |
| Indeed Publisher | Free tier | $0 |
| Crunchbase | Pro | $300 |
| NewsAPI | Business | $450 |
| Twitter API | Basic | $100 |
| Google Cloud (Trends) | Pay-as-go | ~$50 |
| **Total** | | **~$2,900/mo** |

### Infrastructure Costs

| Service | Cost/month |
|---------|------------|
| Supabase (Pro) | $25 |
| Edge Function invocations | ~$20 |
| Storage | ~$10 |
| **Total** | **~$55/mo** |

---

## 9. Legal Considerations

### Terms of Service Compliance

| Source | Scraping Allowed | API Available | Notes |
|--------|------------------|---------------|-------|
| LinkedIn | ❌ No | ✅ Yes (paid) | Requires partnership |
| Indeed | ⚠️ Limited | ✅ Yes | Publisher program |
| Twitter | ❌ No | ✅ Yes (paid) | API v2 required |
| Google Trends | ⚠️ Gray area | ⚠️ Unofficial | Use pytrends carefully |
| News sites | ✅ Usually | Varies | Respect robots.txt |

### Data Usage Rights

- All derived indices are our IP
- Raw data cannot be redistributed
- Attribution required in methodology
- User data kept separate from signals

---

## 10. Contingency Plans

### Source Disruption

| Scenario | Impact | Mitigation |
|----------|--------|------------|
| LinkedIn API revoked | Critical | Pre-negotiate backup suppliers |
| Indeed rate limited | High | Queue management, caching |
| Social API cost spike | Medium | Alternative providers |
| Scraping blocked | Low | API-first strategy |

### Data Quality Issues

| Scenario | Detection | Response |
|----------|-----------|----------|
| Anomalous spike | Z-score > 3 | Human review, possible exclusion |
| Source offline | No data in window | Alert, use last known |
| Schema change | Validation failure | Immediate engineering response |

---

*Last updated: 2026-01-12*
