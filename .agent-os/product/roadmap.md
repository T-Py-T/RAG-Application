# Product Roadmap

## Phase 1: MVP Data Aggregation
**Goal:** Deliver core property insights by combining valuations, crime, schools, and tax data.
**Success Criteria:** Users can query a city and see top neighborhoods with valuations, crime rates, school scores, and tax trends.

### Features
- [ ] Ingest property valuations from Zillow and Realtor.com `L`
- [ ] Integrate FBI crime statistics and rank neighborhoods by safety `M`
- [ ] Fetch school district ratings from Niche.com `M`
- [ ] Display property tax history and municipal debt indicators `M`
- [ ] LLM-driven search interface for user-filtered recommendations `M`
- [ ] UI to present X lowest-crime neighborhoods per city `S`

### Dependencies
- Zillow, Realtor.com, FBI, Niche.com APIs
- Local government tax data sources

## Phase 2: User Experience & Accounts
**Goal:** Improve usability and personalization.
**Success Criteria:** Users can save searches and view interactive maps.

### Features
- [ ] User accounts with saved searches `M`
- [ ] Map visualization of crime and school data `M`
- [ ] Notification system for new listings or crime changes `L`

### Dependencies
- Authentication system
- Mapping library (e.g., Leaflet or Mapbox)

## Phase 3: Scaling & Optimization
**Goal:** Ensure reliability and performance for broader usage.
**Success Criteria:** Automated CI/CD and daily data refresh.

### Features
- [ ] Data caching and refresh pipeline `L`
- [ ] CI/CD pipelines with automated tests `M`
- [ ] Analytics dashboard for user behavior `M`

### Dependencies
- Cloud infrastructure setup
- Telemetry/analytics service (e.g., PostHog)
