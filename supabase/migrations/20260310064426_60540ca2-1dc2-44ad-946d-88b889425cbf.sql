
-- Create roles enum and user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: users can read their own roles
CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Admins can read all roles
CREATE POLICY "Admins can read all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create placement data tables
CREATE TABLE public.year_wise_placement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year TEXT NOT NULL UNIQUE,
  placed INTEGER NOT NULL,
  unplaced INTEGER NOT NULL,
  percentage INTEGER NOT NULL,
  companies_visited INTEGER NOT NULL DEFAULT 0,
  highest_salary NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.salary_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year TEXT NOT NULL UNIQUE,
  min_salary NUMERIC NOT NULL,
  avg_salary NUMERIC NOT NULL,
  max_salary NUMERIC NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.top_recruiters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL UNIQUE,
  hires INTEGER NOT NULL,
  avg_package NUMERIC NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.prediction_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year TEXT NOT NULL UNIQUE,
  predicted INTEGER NOT NULL,
  confidence INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all data tables
ALTER TABLE public.year_wise_placement ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.top_recruiters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prediction_data ENABLE ROW LEVEL SECURITY;

-- Everyone can read placement data
CREATE POLICY "Anyone can read year_wise_placement" ON public.year_wise_placement FOR SELECT USING (true);
CREATE POLICY "Anyone can read salary_data" ON public.salary_data FOR SELECT USING (true);
CREATE POLICY "Anyone can read top_recruiters" ON public.top_recruiters FOR SELECT USING (true);
CREATE POLICY "Anyone can read prediction_data" ON public.prediction_data FOR SELECT USING (true);

-- Only admins can modify placement data
CREATE POLICY "Admins can insert year_wise_placement" ON public.year_wise_placement FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update year_wise_placement" ON public.year_wise_placement FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete year_wise_placement" ON public.year_wise_placement FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert salary_data" ON public.salary_data FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update salary_data" ON public.salary_data FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete salary_data" ON public.salary_data FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert top_recruiters" ON public.top_recruiters FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update top_recruiters" ON public.top_recruiters FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete top_recruiters" ON public.top_recruiters FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert prediction_data" ON public.prediction_data FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update prediction_data" ON public.prediction_data FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete prediction_data" ON public.prediction_data FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_year_wise_placement_updated_at BEFORE UPDATE ON public.year_wise_placement FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_salary_data_updated_at BEFORE UPDATE ON public.salary_data FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_top_recruiters_updated_at BEFORE UPDATE ON public.top_recruiters FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_prediction_data_updated_at BEFORE UPDATE ON public.prediction_data FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
