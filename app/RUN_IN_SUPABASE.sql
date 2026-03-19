-- =============================================================================
-- Solari Argentina — Supabase Migration
-- Run this entire file in the Supabase SQL Editor
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 0. Helper: updated_at trigger function
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------------------------
-- 1. proposals
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.proposals (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID,
  customer_name         TEXT,
  customer_email        TEXT,
  customer_phone        TEXT,
  province_id           TEXT NOT NULL,
  city                  TEXT,
  monthly_bill_ars      NUMERIC,
  monthly_kwh           NUMERIC,
  system_type           TEXT,
  roof_type             TEXT,
  roof_orientation      TEXT,
  budget_tier           TEXT,
  financing_preference  TEXT,
  system_size_kwp       NUMERIC,
  panel_count           INT,
  inverter_count        INT,
  annual_production_kwh NUMERIC,
  coverage_percentage   NUMERIC,
  total_investment_usd  NUMERIC,
  total_investment_ars  NUMERIC,
  annual_savings_usd    NUMERIC,
  annual_savings_ars    NUMERIC,
  payback_years         NUMERIC,
  roi_25_years          NUMERIC,
  irr                   NUMERIC,
  annual_co2_avoided_kg NUMERIC,
  exchange_rate         NUMERIC,
  valid_until           TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_proposals_province ON public.proposals (province_id);
CREATE INDEX IF NOT EXISTS idx_proposals_created  ON public.proposals (created_at DESC);

DROP TRIGGER IF EXISTS trg_proposals_updated_at ON public.proposals;
CREATE TRIGGER trg_proposals_updated_at
  BEFORE UPDATE ON public.proposals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ---------------------------------------------------------------------------
-- 2. smart_proposals
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.smart_proposals (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id             UUID NOT NULL REFERENCES public.proposals (id) ON DELETE CASCADE,
  extracted_utility        TEXT,
  extracted_address        TEXT,
  extraction_confidence   NUMERIC,
  ai_narrative            TEXT,
  latitude                NUMERIC,
  longitude               NUMERIC,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_smart_proposals_proposal ON public.smart_proposals (proposal_id);

-- ---------------------------------------------------------------------------
-- 3. planner_projects
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.planner_projects (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID,
  customer_name   TEXT NOT NULL,
  province_id     TEXT NOT NULL,
  system_size_kwp NUMERIC,
  budget_tier     TEXT,
  status          TEXT CHECK (status IN ('planning', 'proposed', 'approved', 'installing', 'completed')),
  planned_costs   JSONB NOT NULL DEFAULT '{}',
  actual_costs    JSONB NOT NULL DEFAULT '{}',
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_planner_projects_status ON public.planner_projects (status);

DROP TRIGGER IF EXISTS trg_planner_projects_updated_at ON public.planner_projects;
CREATE TRIGGER trg_planner_projects_updated_at
  BEFORE UPDATE ON public.planner_projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ---------------------------------------------------------------------------
-- 4. installer_contacts
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.installer_contacts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID,
  name            TEXT NOT NULL,
  phone           TEXT NOT NULL,
  email           TEXT,
  location        TEXT NOT NULL,
  rating          NUMERIC,
  experience      TEXT,
  price_per_kwp   NUMERIC,
  notes           TEXT,
  qualified       BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_installer_contacts_location ON public.installer_contacts (location);

DROP TRIGGER IF EXISTS trg_installer_contacts_updated_at ON public.installer_contacts;
CREATE TRIGGER trg_installer_contacts_updated_at
  BEFORE UPDATE ON public.installer_contacts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ---------------------------------------------------------------------------
-- 5. academy_progress
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.academy_progress (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID,
  topic_id     TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Unique constraint that correctly handles nullable user_id:
-- Two rows with user_id=NULL and the same topic_id are considered distinct
-- by a normal UNIQUE constraint (NULL != NULL). We use a partial unique index
-- for the non-null case and a separate one for the null case.
CREATE UNIQUE INDEX IF NOT EXISTS idx_academy_progress_user_topic
  ON public.academy_progress (user_id, topic_id)
  WHERE user_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_academy_progress_anon_topic
  ON public.academy_progress (topic_id)
  WHERE user_id IS NULL;

-- ---------------------------------------------------------------------------
-- 6. exchange_rates
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.exchange_rates (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rate_usd_to_ars NUMERIC NOT NULL,
  source          TEXT,
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 7. Row-Level Security — permissive (no auth yet)
-- ---------------------------------------------------------------------------

-- Enable RLS on all tables (Supabase requires it, but we make it wide open)
ALTER TABLE public.proposals          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.smart_proposals    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planner_projects   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.installer_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academy_progress   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exchange_rates     ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid "already exists" errors on re-run
DO $$
DECLARE
  tbl TEXT;
  pol TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'proposals', 'smart_proposals', 'planner_projects',
    'installer_contacts', 'academy_progress', 'exchange_rates'
  ])
  LOOP
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = tbl AND schemaname = 'public'
    LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol, tbl);
    END LOOP;
  END LOOP;
END $$;

-- Create permissive policies for anon + authenticated
CREATE POLICY "anon_select" ON public.proposals          FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert" ON public.proposals          FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update" ON public.proposals          FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "anon_select" ON public.smart_proposals    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert" ON public.smart_proposals    FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update" ON public.smart_proposals    FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "anon_select" ON public.planner_projects   FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert" ON public.planner_projects   FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update" ON public.planner_projects   FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "anon_select" ON public.installer_contacts FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert" ON public.installer_contacts FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update" ON public.installer_contacts FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "anon_select" ON public.academy_progress   FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert" ON public.academy_progress   FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update" ON public.academy_progress   FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "anon_select" ON public.exchange_rates     FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert" ON public.exchange_rates     FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update" ON public.exchange_rates     FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- ---------------------------------------------------------------------------
-- 8. Verification
-- ---------------------------------------------------------------------------
SELECT
  t.table_name,
  (SELECT count(*) FROM information_schema.columns c WHERE c.table_name = t.table_name AND c.table_schema = 'public') AS column_count,
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_policies p WHERE p.tablename = t.table_name AND p.schemaname = 'public'
  ) THEN 'RLS policies active' ELSE 'NO policies' END AS rls_status
FROM information_schema.tables t
WHERE t.table_schema = 'public'
  AND t.table_name IN (
    'proposals', 'smart_proposals', 'planner_projects',
    'installer_contacts', 'academy_progress', 'exchange_rates'
  )
ORDER BY t.table_name;

-- Expected output:
-- academy_progress   | 4  | RLS policies active
-- exchange_rates     | 4  | RLS policies active
-- installer_contacts | 12 | RLS policies active
-- planner_projects   | 11 | RLS policies active
-- proposals          | 29 | RLS policies active
-- smart_proposals    | 8  | RLS policies active
