ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS wp_post_id TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS original_link TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS wp_page_id TEXT;
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS original_link TEXT;

CREATE TABLE IF NOT EXISTS public.event_galleries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  event_date DATE NOT NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.event_gallery_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gallery_id UUID NOT NULL REFERENCES public.event_galleries(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.event_galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_gallery_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read media" ON public.media_items;
DROP POLICY IF EXISTS "Public read published event galleries" ON public.event_galleries;
CREATE POLICY "Public read published event galleries" ON public.event_galleries
  FOR SELECT USING (published = true);
DROP POLICY IF EXISTS "Public read photos in published galleries" ON public.event_gallery_photos;
CREATE POLICY "Public read photos in published galleries" ON public.event_gallery_photos
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.event_galleries g
    WHERE g.id = gallery_id AND g.published = true
  ));

DO $$
DECLARE
  table_name TEXT;
  table_names TEXT[] := ARRAY[
    'site_settings', 'homepage_data', 'navigation_items', 'services', 'resources',
    'ai_tools', 'blog_posts', 'events', 'event_galleries', 'event_gallery_photos',
    'initiatives', 'honorees', 'team_members', 'testimonials', 'partners', 'pages',
    'form_submissions', 'media_items'
  ];
BEGIN
  FOREACH table_name IN ARRAY table_names LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', 'Admin all ' || table_name, table_name);
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR ALL TO authenticated USING ((auth.jwt() -> ''app_metadata'' ->> ''role'') = ''admin'') WITH CHECK ((auth.jwt() -> ''app_metadata'' ->> ''role'') = ''admin'')',
      'Admin all ' || table_name, table_name
    );
  END LOOP;
END
$$;

DROP POLICY IF EXISTS "Admin upload media files" ON storage.objects;
CREATE POLICY "Admin upload media files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
DROP POLICY IF EXISTS "Admin update media files" ON storage.objects;
CREATE POLICY "Admin update media files" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'media' AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (bucket_id = 'media' AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
DROP POLICY IF EXISTS "Admin delete media files" ON storage.objects;
CREATE POLICY "Admin delete media files" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

UPDATE public.site_settings
SET social_links = COALESCE(social_links, '{}'::jsonb) || jsonb_build_object(
  'youtube', CASE WHEN social_links->>'youtube' IS NULL OR social_links->>'youtube' IN ('https://youtube.com/@didigitallibrarian8254', '') THEN 'https://youtube.com/@thedigitallibr' ELSE social_links->>'youtube' END,
  'facebook_page', CASE WHEN social_links->>'facebook_page' IS NULL OR social_links->>'facebook_page' IN ('https://facebook.com/didigitallibrarian', '') THEN 'https://www.facebook.com/thedigitallibr' ELSE social_links->>'facebook_page' END,
  'instagram', CASE WHEN social_links->>'instagram' IS NULL OR social_links->>'instagram' IN ('https://instagram.com/didigital_librarian', '') THEN 'https://www.instagram.com/thedigitallibr' ELSE social_links->>'instagram' END,
  'twitter', CASE WHEN social_links->>'twitter' IS NULL OR social_links->>'twitter' IN ('https://twitter.com/didigital_libr', '') THEN 'https://www.twitter.com/thedigitallibr' ELSE social_links->>'twitter' END,
  'linkedin', CASE WHEN social_links->>'linkedin' IS NULL OR social_links->>'linkedin' IN ('https://linkedin.com/in/sylvester-ebhonu', '') THEN 'https://www.linkedin.com/in/thedigitallibr' ELSE social_links->>'linkedin' END,
  'tiktok', COALESCE(NULLIF(social_links->>'tiktok', ''), 'https://tiktok.com/@thedigitallibr'),
  'threads', COALESCE(NULLIF(social_links->>'threads', ''), 'https://www.threads.net/@thedigitallibr')
);
