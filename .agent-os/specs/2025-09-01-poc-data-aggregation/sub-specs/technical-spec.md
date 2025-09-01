# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-09-01-poc-data-aggregation/spec.md

## Technical Requirements
- Ruby on Rails service layer with background jobs to fetch data from external APIs.
- React front-end with form to input city and number of neighborhoods; results displayed in a table.
- LLM integration to parse user filters and select top low-crime areas.
- Service objects for Zillow, Realtor.com, FBI crime data, Niche school ratings, and property tax sources.
- Cache API responses in PostgreSQL with daily refresh to minimize external calls.
- Endpoint `/api/neighborhoods` returns aggregated metrics in JSON.
- Basic error handling and timeouts for external API failures.

## External Dependencies
- **httparty** - HTTP client for external API requests.
- **dotenv-rails** - Manage API keys through environment variables.
- **openai** - Connect to the LLM for query interpretation.
