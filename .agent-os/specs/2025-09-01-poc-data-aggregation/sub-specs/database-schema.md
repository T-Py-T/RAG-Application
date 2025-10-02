# Database Schema

This is the database schema implementation for the spec detailed in @.agent-os/specs/2025-09-01-poc-data-aggregation/spec.md

## Changes
- Create `neighborhood_insights` table to store aggregated metrics.

## Specifications
```ruby
create_table :neighborhood_insights do |t|
  t.string :city, null: false
  t.string :neighborhood, null: false
  t.decimal :average_home_value
  t.decimal :crime_rate
  t.decimal :school_score
  t.decimal :tax_trend
  t.timestamps
end
add_index :neighborhood_insights, [:city, :neighborhood], unique: true
```

## Rationale
- Provides cache for aggregated results and enables daily refresh.
- Index ensures quick lookup and uniqueness per city/neighborhood.
