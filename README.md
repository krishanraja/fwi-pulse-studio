# Fractionl — Fractional Working Index (FWI)

> **Market intelligence platform tracking the rise of fractional work**

The Fractional Working Index (FWI) is a proprietary composite score measuring the health and momentum of the fractional/interim executive market. It aggregates demand signals, supply dynamics, and cultural adoption into a single actionable metric.

---

## 🎯 Product Overview

### What It Does
- **Real-time Index Score**: Composite score (0-100) measuring fractional work market momentum
- **Three Sub-Indices**: Demand, Supply, and Culture signals weighted for accuracy
- **Market Signals**: Top movers showing which roles are heating up
- **AI Insights**: ML-powered predictions and opportunity alerts
- **Readiness Assessment**: Self-evaluation tool for prospective fractional executives

### Target Users
1. **Enterprise HR/Talent Leaders** — workforce planning, cost optimization
2. **Fractional Executives** — market timing, role selection
3. **VC/PE Investors** — alternative talent thesis validation
4. **Staffing/Matching Platforms** — competitive intelligence
5. **Policy/Research Institutions** — future of work analysis

---

## 🏗️ Technical Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Animation | Framer Motion |
| Charts | Recharts |
| State | React Query, Context API |
| Backend | Lovable Cloud (Supabase) |
| Auth | Supabase Auth |
| APIs | Edge Functions (Deno) |

---

## 📊 Current Data Sources (Mock)

The application currently uses mock data. See **Data Roadmap** below for production sources.

---

## 🚀 Commercialization Roadmap

### Phase 1: Data Foundation (Weeks 1-4)
**Goal**: Replace mock data with real, defensible signals

| Data Source | Signal Type | Integration Method | Priority |
|-------------|-------------|-------------------|----------|
| LinkedIn Talent Insights | Supply/Demand | API Partnership | 🔴 Critical |
| Indeed/Glassdoor | Job postings | Web scraping/API | 🔴 Critical |
| Upwork/Toptal/A.Team | Marketplace supply | API/Partnerships | 🟡 High |
| Google Trends | Cultural interest | API | 🟢 Medium |
| Twitter/X API | Sentiment/mentions | API | 🟢 Medium |
| SEC Filings | Enterprise adoption | Scraping/API | 🟡 High |
| Crunchbase | Startup hiring signals | API | 🟡 High |
| Bureau of Labor Statistics | Macro employment | API | 🟢 Medium |
| NewsAPI | Media coverage | ✅ Configured | 🟢 Medium |
| Eventbrite | Industry events | ✅ Configured | 🟢 Medium |

**Deliverables**:
- [ ] Data ingestion pipeline (scheduled Edge Functions)
- [ ] Signal normalization algorithms
- [ ] Historical data backfill (12-24 months minimum)
- [ ] Data quality monitoring dashboard

### Phase 2: Index Methodology (Weeks 5-8)
**Goal**: Create defensible, publishable methodology

**Requirements**:
- [ ] Academic advisor/partnership (labor economics)
- [ ] Peer review of weighting methodology
- [ ] Backtesting against known market events
- [ ] Confidence intervals and margin of error
- [ ] Published methodology whitepaper (PDF download)
- [ ] Third-party audit trail

**Weighting Model**:
```
FWI = (Demand × 0.40) + (Supply × 0.40) + (Culture × 0.20)

Where:
- Demand = f(job_postings, RFPs, search_volume, enterprise_mentions)
- Supply = f(marketplace_listings, profile_updates, availability_signals)
- Culture = f(media_mentions, google_trends, sentiment_score)
```

### Phase 3: Product Tiers (Weeks 9-12)
**Goal**: Launch monetizable product tiers

#### Tier Structure

| Feature | Free | Pro ($99/mo) | Enterprise (Custom) |
|---------|------|--------------|---------------------|
| Overall FWI Score | ✅ | ✅ | ✅ |
| 30-day trend | ✅ | ✅ | ✅ |
| Sub-index breakdown | ❌ | ✅ | ✅ |
| 12-month history | ❌ | ✅ | ✅ |
| Top 5 movers | ✅ | ✅ | ✅ |
| Full signals table | ❌ | ✅ | ✅ |
| AI insights | ❌ | ✅ | ✅ |
| Custom alerts | ❌ | ✅ | ✅ |
| API access | ❌ | ❌ | ✅ |
| White-label embed | ❌ | ❌ | ✅ |
| Custom weighting | ❌ | ❌ | ✅ |
| Raw data export | ❌ | ❌ | ✅ |
| Dedicated support | ❌ | ❌ | ✅ |
| SLA guarantee | ❌ | ❌ | ✅ |

#### Billing Implementation
- [ ] Stripe integration for subscriptions
- [ ] Usage-based billing for API calls
- [ ] Annual discount option (2 months free)
- [ ] Team/seat licensing for Enterprise

### Phase 4: Enterprise Features (Weeks 13-16)
**Goal**: High-value enterprise capabilities

- [ ] **API Access**: RESTful + GraphQL endpoints
- [ ] **White-Label Widgets**: Embeddable index display
- [ ] **Custom Dashboards**: Role/industry filtering
- [ ] **Data Exports**: CSV, JSON, Excel
- [ ] **Webhook Alerts**: Threshold-based notifications
- [ ] **SSO Integration**: SAML/OIDC support
- [ ] **Custom Indices**: Industry-specific sub-indices

### Phase 5: Licensing & Distribution (Weeks 17-20)
**Goal**: Scale through partnerships

**Licensing Models**:
1. **Data Licensing**: Raw index data for research/media
2. **Widget Licensing**: Embeddable components
3. **White-Label**: Full platform rebrand
4. **API Reselling**: Partner distribution

**Target Partners**:
- Bloomberg/Reuters (financial data feeds)
- SHRM/HR publications (industry authority)
- Staffing platforms (competitive intelligence)
- VC/PE firms (thesis validation)

---

## 🛡️ Security & Compliance Checklist

### Data Protection
- [ ] SOC 2 Type II certification
- [ ] GDPR compliance documentation
- [ ] Data retention policies
- [ ] Encryption at rest and in transit
- [ ] Regular penetration testing

### Legal
- [ ] Terms of Service
- [ ] Privacy Policy
- [ ] Data Processing Agreements
- [ ] Trademark registration (FWI, Fractionl)
- [ ] Patent consideration (methodology)

---

## 📈 Success Metrics

### Product KPIs
| Metric | Target (6mo) | Target (12mo) |
|--------|--------------|---------------|
| Monthly Active Users | 1,000 | 10,000 |
| Pro Subscribers | 100 | 500 |
| Enterprise Clients | 5 | 20 |
| API Calls/Month | 10K | 100K |
| NPS Score | 40+ | 50+ |

### Data Quality KPIs
| Metric | Target |
|--------|--------|
| Data freshness | < 24 hours |
| Signal coverage | 95%+ |
| Prediction accuracy | 70%+ |
| Uptime | 99.9% |

---

## 🔧 Development Setup

```bash
# Clone and install
git clone <YOUR_GIT_URL>
cd fractionl-fwi
npm install

# Start development server
npm run dev
```

### Environment Variables
```bash
# Lovable Cloud (auto-configured)
SUPABASE_URL=<auto>
SUPABASE_ANON_KEY=<auto>

# External APIs (configured in Lovable secrets)
NEWSAPI_API_KEY=<configured>
EVENTBRITE_API_KEY=<configured>

# Future integrations
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
STRIPE_SECRET_KEY=
OPENAI_API_KEY=
```

---

## 📁 Project Structure

```
src/
├── assets/              # Images, logos
├── components/
│   ├── layout/          # AppShell, Navbar, BottomNav
│   ├── ui/              # shadcn components
│   ├── AIInsights.tsx
│   ├── FractionalReadiness.tsx
│   ├── HeroSection.tsx
│   ├── MethodologyDrawer.tsx
│   ├── SettingsSheet.tsx
│   ├── SignalsTable.tsx
│   ├── SparklineChart.tsx
│   ├── SubIndexCards.tsx
│   └── TrendlineChart.tsx
├── hooks/
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   └── useUserPreferences.ts
├── lib/
│   ├── motion.ts        # Animation variants
│   ├── types.ts         # TypeScript interfaces
│   └── utils.ts         # Utility functions
├── pages/
│   ├── Index.tsx        # Main dashboard
│   ├── Login.tsx
│   └── NotFound.tsx
└── main.tsx
```

---

## 📋 Immediate Next Steps

### This Week
1. [ ] Enable Lovable Cloud for auth + database
2. [ ] Create `fwi_scores` table for historical data
3. [ ] Build data ingestion Edge Function (NewsAPI first)
4. [ ] Implement user authentication flow

### This Month
1. [ ] Integrate 3+ real data sources
2. [ ] Build admin dashboard for data monitoring
3. [ ] Create Stripe integration for Pro tier
4. [ ] Launch beta with 10 pilot users

### This Quarter
1. [ ] Complete Phase 1-3 of roadmap
2. [ ] Sign first Enterprise client
3. [ ] Publish methodology whitepaper
4. [ ] Achieve 100 Pro subscribers

---

## 🤝 Contributing

This is a proprietary project. Contact the team for partnership or investment inquiries.

---

## 📄 License

Copyright © 2026 Fractionl. All rights reserved.

**Proprietary and Confidential** — This software and its methodology are protected intellectual property. Unauthorized reproduction, distribution, or use is prohibited.
