-- ==============================================================================
-- THE DIGITAL LIBRARIAN (TheDL) - PRODUCTION SUPABASE DATABASE SCHEMA
-- Website: www.thedigital-librarian.com
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT NOT NULL DEFAULT 'The Digital Librarian',
  site_tagline TEXT NOT NULL,
  logo_url TEXT,
  logo_alt_text TEXT,
  favicon_url TEXT,
  primary_color TEXT DEFAULT '#FFFFFF',
  accent_color TEXT DEFAULT '#009DF6',
  dark_color TEXT DEFAULT '#00003F',
  contact_phone TEXT,
  contact_email TEXT,
  whatsapp_number TEXT,
  whatsapp_link TEXT,
  whatsapp_community_link TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  footer_tagline TEXT,
  copyright_text TEXT,
  default_seo_title TEXT,
  default_seo_description TEXT,
  default_og_image TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. HOMEPAGE DATA TABLE
CREATE TABLE IF NOT EXISTS public.homepage_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero JSONB NOT NULL DEFAULT '{}'::jsonb,
  about_teaser JSONB NOT NULL DEFAULT '{}'::jsonb,
  quick_explore JSONB NOT NULL DEFAULT '{}'::jsonb,
  featured_learning JSONB NOT NULL DEFAULT '{}'::jsonb,
  stats JSONB NOT NULL DEFAULT '{}'::jsonb,
  final_cta JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. NAVIGATION ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.navigation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 1,
  open_in_new_tab BOOLEAN DEFAULT false,
  children JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  icon TEXT NOT NULL,
  image_url TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  cta_text TEXT DEFAULT 'Explore Solution →',
  cta_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 1,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. RESOURCES & BOOKS TABLE
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  thumbnail_url TEXT,
  external_url TEXT,
  download_url TEXT,
  price TEXT,
  author TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. AI PRODUCTIVITY TOOLS TABLE
CREATE TABLE IF NOT EXISTS public.ai_tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  description TEXT NOT NULL,
  website_url TEXT NOT NULL,
  is_free BOOLEAN DEFAULT true,
  requires_premium BOOLEAN DEFAULT false,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  category TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  author_name TEXT NOT NULL,
  author_role TEXT,
  author_avatar TEXT,
  published BOOLEAN DEFAULT true,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  reading_time TEXT DEFAULT '5 min read',
  seo_title TEXT,
  seo_description TEXT
);

-- 8. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming',
  date DATE NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  is_virtual BOOLEAN DEFAULT true,
  flyer_url TEXT,
  description TEXT NOT NULL,
  expectations JSONB DEFAULT '[]'::jsonb,
  investment_tiers JSONB DEFAULT '[]'::jsonb,
  bank_details JSONB DEFAULT '{}'::jsonb,
  whatsapp_redirect_url TEXT,
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 9. INITIATIVES TABLE
CREATE TABLE IF NOT EXISTS public.initiatives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  short_description TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  logo_url TEXT,
  published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 10. HONOREES (LSA) TABLE
CREATE TABLE IF NOT EXISTS public.honorees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  month TEXT NOT NULL,
  year INTEGER NOT NULL,
  country TEXT NOT NULL,
  institution TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  photo_url TEXT,
  featured_quote TEXT,
  interview_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 11. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  organization TEXT,
  bio TEXT NOT NULL,
  photo_url TEXT,
  display_order INTEGER DEFAULT 1,
  initiative TEXT DEFAULT 'core',
  is_active BOOLEAN DEFAULT true,
  social_links JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 12. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  quote TEXT NOT NULL,
  photo_url TEXT,
  rating INTEGER DEFAULT 5,
  featured BOOLEAN DEFAULT true,
  location_context TEXT DEFAULT 'home',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 13. PARTNERS TABLE
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 14. CUSTOM PAGES (BLOCK BUILDER) TABLE
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sections JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured_image TEXT,
  seo_title TEXT,
  seo_description TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 15. FORM SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_type TEXT NOT NULL,
  data JSONB NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 16. MEDIA ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.media_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.honorees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;

-- Public Read Policies for Published Content
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public read homepage_data" ON public.homepage_data FOR SELECT USING (true);
CREATE POLICY "Public read navigation_items" ON public.navigation_items FOR SELECT USING (true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (published = true);
CREATE POLICY "Public read resources" ON public.resources FOR SELECT USING (published = true);
CREATE POLICY "Public read ai_tools" ON public.ai_tools FOR SELECT USING (true);
CREATE POLICY "Public read blog_posts" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read events" ON public.events FOR SELECT USING (published = true);
CREATE POLICY "Public read initiatives" ON public.initiatives FOR SELECT USING (published = true);
CREATE POLICY "Public read honorees" ON public.honorees FOR SELECT USING (true);
CREATE POLICY "Public read team_members" ON public.team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public read partners" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Public read published pages" ON public.pages FOR SELECT USING (published = true);
CREATE POLICY "Public insert submissions" ON public.form_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read media" ON public.media_items FOR SELECT USING (true);

-- Authenticated Admin Policies (Full Access)
CREATE POLICY "Admin all site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all homepage_data" ON public.homepage_data FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all navigation_items" ON public.navigation_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all resources" ON public.resources FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all ai_tools" ON public.ai_tools FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all blog_posts" ON public.blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all events" ON public.events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all initiatives" ON public.initiatives FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all honorees" ON public.honorees FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all team_members" ON public.team_members FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all partners" ON public.partners FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all pages" ON public.pages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all form_submissions" ON public.form_submissions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all media_items" ON public.media_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
