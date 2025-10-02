# Spec Requirements Document

> Spec: poc-data-aggregation
> Created: 2025-09-01

## Overview
Implement a proof-of-concept that aggregates property valuations, crime statistics, school ratings, and tax trends to list the safest neighborhoods matching user criteria.

## User Stories

### Find Safe Affordable Neighborhoods
As a home buyer, I want to search a city and view the top low-crime neighborhoods so that I can choose a safe and affordable place to live.

The user enters a city and desired number of neighborhoods. The system queries external APIs for valuations, crime, schools, and taxes, aggregates results, and displays the safest neighborhoods with key metrics.

### Compare Neighborhood Investment Potential
As a real estate investor, I want to compare neighborhoods by safety and school quality so that I can select areas with strong long-term value.

The user inputs a city and filters for school ratings. The system returns neighborhoods meeting the filter with crime scores and valuation averages for comparison.

## Spec Scope
1. **Valuation Ingestion** - Fetch property values from Zillow and Realtor.com.
2. **Crime Data Integration** - Retrieve FBI crime statistics and rank neighborhoods by safety.
3. **School Ratings Fetch** - Pull district ratings from Niche.com.
4. **Affordability Metrics** - Calculate property tax trends and municipal debt indicators.
5. **LLM Filtering Interface** - Use an LLM to interpret user queries and return X lowest-crime neighborhoods.

## Out of Scope
- User authentication or accounts
- Map-based visualizations
- Historical trend charts beyond tax increases

## Expected Deliverable
1. Browser interface where a user enters a city and receives a list of neighborhoods with valuations, crime, school, and tax data.
2. Backend services that aggregate external data and expose a JSON API for the UI.
