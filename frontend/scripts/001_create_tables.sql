-- HomeScope Database Schema
-- Create tables for real estate platform

-- Users profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  user_type TEXT CHECK (user_type IN ('buyer', 'investor')) DEFAULT 'buyer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Neighborhoods table
CREATE TABLE IF NOT EXISTS public.neighborhoods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  median_home_price INTEGER,
  crime_score INTEGER CHECK (crime_score >= 0 AND crime_score <= 100),
  school_rating INTEGER CHECK (school_rating >= 0 AND school_rating <= 10),
  walkability_score INTEGER CHECK (walkability_score >= 0 AND walkability_score <= 100),
  property_tax_rate DECIMAL(5, 4),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Saved neighborhoods (user watchlist)
CREATE TABLE IF NOT EXISTS public.saved_neighborhoods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  neighborhood_id UUID NOT NULL REFERENCES public.neighborhoods(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, neighborhood_id)
);

-- Property data table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  neighborhood_id UUID NOT NULL REFERENCES public.neighborhoods(id) ON DELETE CASCADE,
  address TEXT NOT NULL,
  price INTEGER,
  bedrooms INTEGER,
  bathrooms DECIMAL(3, 1),
  square_feet INTEGER,
  year_built INTEGER,
  property_type TEXT CHECK (property_type IN ('single_family', 'condo', 'townhouse', 'multi_family')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crime data table
CREATE TABLE IF NOT EXISTS public.crime_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  neighborhood_id UUID NOT NULL REFERENCES public.neighborhoods(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  violent_crimes INTEGER DEFAULT 0,
  property_crimes INTEGER DEFAULT 0,
  total_crimes INTEGER DEFAULT 0,
  crime_rate_per_1000 DECIMAL(6, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- School data table
CREATE TABLE IF NOT EXISTS public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  neighborhood_id UUID NOT NULL REFERENCES public.neighborhoods(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('elementary', 'middle', 'high', 'charter', 'private')),
  rating INTEGER CHECK (rating >= 0 AND rating <= 10),
  enrollment INTEGER,
  student_teacher_ratio DECIMAL(4, 1),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crime_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for neighborhoods (public read access)
CREATE POLICY "Anyone can view neighborhoods" ON public.neighborhoods
  FOR SELECT USING (true);

-- RLS Policies for saved neighborhoods
CREATE POLICY "Users can view their own saved neighborhoods" ON public.saved_neighborhoods
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved neighborhoods" ON public.saved_neighborhoods
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved neighborhoods" ON public.saved_neighborhoods
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved neighborhoods" ON public.saved_neighborhoods
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for properties (public read access)
CREATE POLICY "Anyone can view properties" ON public.properties
  FOR SELECT USING (true);

-- RLS Policies for crime data (public read access)
CREATE POLICY "Anyone can view crime data" ON public.crime_data
  FOR SELECT USING (true);

-- RLS Policies for schools (public read access)
CREATE POLICY "Anyone can view schools" ON public.schools
  FOR SELECT USING (true);
