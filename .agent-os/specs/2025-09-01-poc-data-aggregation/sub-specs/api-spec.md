# API Specification

This is the API specification for the spec detailed in @.agent-os/specs/2025-09-01-poc-data-aggregation/spec.md

## Routes
- GET /api/neighborhoods
- POST /api/queries

## Controllers
- NeighborhoodsController#index - fetch aggregated neighborhood metrics
- QueriesController#create - parse natural language filters via LLM and return neighborhoods

## Purpose
Provide endpoints for retrieving neighborhood insights and handling LLM-based search queries.

## Endpoints

### GET /api/neighborhoods
**Purpose:** Retrieve aggregated metrics for top low-crime neighborhoods in a city.
**Parameters:** city (string, required); limit (integer, optional)
**Response:** JSON array of neighborhoods with valuation, crime, school, and tax metrics.
**Errors:** 400 invalid parameters; 500 external data failure

### POST /api/queries
**Purpose:** Parse user natural language filters via LLM and return matched neighborhoods.
**Parameters:** query (string, required)
**Response:** JSON object with interpreted filters and recommended neighborhoods.
**Errors:** 400 missing query; 502 LLM error
