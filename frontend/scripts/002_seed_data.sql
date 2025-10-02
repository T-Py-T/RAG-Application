-- Seed data for HomeScope

-- Insert sample neighborhoods
INSERT INTO public.neighborhoods (name, city, state, zip_code, latitude, longitude, median_home_price, crime_score, school_rating, walkability_score, property_tax_rate) VALUES
('Downtown', 'Austin', 'TX', '78701', 30.2672, -97.7431, 650000, 75, 8, 95, 0.0181),
('Westlake', 'Austin', 'TX', '78746', 30.2711, -97.8147, 1200000, 95, 10, 60, 0.0181),
('East Austin', 'Austin', 'TX', '78702', 30.2672, -97.7261, 450000, 60, 6, 85, 0.0181),
('South Lamar', 'Austin', 'TX', '78704', 30.2500, -97.7667, 550000, 80, 7, 90, 0.0181),
('Cedar Park', 'Cedar Park', 'TX', '78613', 30.5052, -97.8203, 400000, 90, 9, 45, 0.0181),
('Round Rock', 'Round Rock', 'TX', '78664', 30.5083, -97.6789, 380000, 85, 8, 50, 0.0181),
('Pflugerville', 'Pflugerville', 'TX', '78660', 30.4394, -97.6200, 350000, 88, 8, 55, 0.0181),
('Georgetown', 'Georgetown', 'TX', '78628', 30.6327, -97.6779, 420000, 92, 9, 40, 0.0181);

-- Insert sample properties
INSERT INTO public.properties (neighborhood_id, address, price, bedrooms, bathrooms, square_feet, year_built, property_type) VALUES
((SELECT id FROM public.neighborhoods WHERE name = 'Downtown' LIMIT 1), '123 Congress Ave', 675000, 2, 2.0, 1200, 2018, 'condo'),
((SELECT id FROM public.neighborhoods WHERE name = 'Downtown' LIMIT 1), '456 Rainey St', 725000, 2, 2.5, 1400, 2020, 'condo'),
((SELECT id FROM public.neighborhoods WHERE name = 'Westlake' LIMIT 1), '789 Bee Cave Rd', 1350000, 4, 3.5, 3200, 2015, 'single_family'),
((SELECT id FROM public.neighborhoods WHERE name = 'East Austin' LIMIT 1), '321 E 6th St', 485000, 3, 2.0, 1800, 2010, 'single_family'),
((SELECT id FROM public.neighborhoods WHERE name = 'Cedar Park' LIMIT 1), '654 Cedar Park Dr', 425000, 4, 2.5, 2400, 2012, 'single_family'),
((SELECT id FROM public.neighborhoods WHERE name = 'Round Rock' LIMIT 1), '987 Round Rock Ave', 395000, 3, 2.0, 2000, 2008, 'single_family');

-- Insert sample crime data
INSERT INTO public.crime_data (neighborhood_id, year, violent_crimes, property_crimes, total_crimes, crime_rate_per_1000) VALUES
((SELECT id FROM public.neighborhoods WHERE name = 'Downtown' LIMIT 1), 2023, 45, 180, 225, 12.5),
((SELECT id FROM public.neighborhoods WHERE name = 'Downtown' LIMIT 1), 2022, 52, 195, 247, 13.8),
((SELECT id FROM public.neighborhoods WHERE name = 'Westlake' LIMIT 1), 2023, 8, 25, 33, 2.1),
((SELECT id FROM public.neighborhoods WHERE name = 'Westlake' LIMIT 1), 2022, 6, 22, 28, 1.8),
((SELECT id FROM public.neighborhoods WHERE name = 'East Austin' LIMIT 1), 2023, 78, 245, 323, 18.2),
((SELECT id FROM public.neighborhoods WHERE name = 'East Austin' LIMIT 1), 2022, 85, 268, 353, 19.9),
((SELECT id FROM public.neighborhoods WHERE name = 'Cedar Park' LIMIT 1), 2023, 12, 45, 57, 3.2),
((SELECT id FROM public.neighborhoods WHERE name = 'Cedar Park' LIMIT 1), 2022, 10, 38, 48, 2.7);

-- Insert sample schools
INSERT INTO public.schools (neighborhood_id, name, type, rating, enrollment, student_teacher_ratio) VALUES
((SELECT id FROM public.neighborhoods WHERE name = 'Downtown' LIMIT 1), 'Austin High School', 'high', 8, 1200, 18.5),
((SELECT id FROM public.neighborhoods WHERE name = 'Westlake' LIMIT 1), 'Westlake High School', 'high', 10, 2800, 16.2),
((SELECT id FROM public.neighborhoods WHERE name = 'Westlake' LIMIT 1), 'Eanes Elementary', 'elementary', 10, 450, 14.8),
((SELECT id FROM public.neighborhoods WHERE name = 'East Austin' LIMIT 1), 'Eastside Memorial High', 'high', 6, 800, 22.1),
((SELECT id FROM public.neighborhoods WHERE name = 'Cedar Park' LIMIT 1), 'Cedar Park High School', 'high', 9, 2200, 17.3),
((SELECT id FROM public.neighborhoods WHERE name = 'Round Rock' LIMIT 1), 'Round Rock High School', 'high', 8, 2500, 18.9);
