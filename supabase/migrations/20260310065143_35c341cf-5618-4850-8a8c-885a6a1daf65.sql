
-- Company-wise placement data per year
CREATE TABLE public.company_placements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year TEXT NOT NULL,
  company TEXT NOT NULL,
  job_role TEXT,
  salary_pa NUMERIC NOT NULL DEFAULT 0,
  hires INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(year, company, job_role)
);

ALTER TABLE public.company_placements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read company_placements" ON public.company_placements FOR SELECT USING (true);
CREATE POLICY "Admins can insert company_placements" ON public.company_placements FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update company_placements" ON public.company_placements FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete company_placements" ON public.company_placements FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_company_placements_updated_at BEFORE UPDATE ON public.company_placements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
