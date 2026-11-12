import { 
  SiteSettings, 
  HomepageData, 
  Service, 
  Resource, 
  AITool, 
  BlogPost, 
  Event, 
  EventGallery,
  EventGalleryPhoto,
  Initiative, 
  Honoree, 
  TeamMember, 
  Testimonial, 
  Partner, 
  NavigationItem, 
  Page, 
  FormSubmission, 
  MediaItem 
} from '../../types';

import {
  initialSiteSettings,
  initialHomepageData,
  initialServices,
  initialAITools,
  initialResources,
  initialBlogPosts,
  initialEvents,
  initialInitiatives,
  initialHonorees,
  initialTeamMembers,
  initialTestimonials,
  initialPartners,
  initialNavigation,
  initialMediaItems
} from '../seedData';

import { supabase, isSupabaseConfigured } from '../supabase';

const STORAGE_KEYS = {
  SETTINGS: 'thedl_site_settings',
  HOMEPAGE: 'thedl_homepage_data',
  NAVIGATION: 'thedl_navigation',
  SERVICES: 'thedl_services',
  RESOURCES: 'thedl_resources',
  AI_TOOLS: 'thedl_ai_tools',
  BLOG: 'thedl_blog_posts',
  EVENTS: 'thedl_events',
  GALLERIES: 'thedl_event_galleries',
  INITIATIVES: 'thedl_initiatives',
  HONOREES: 'thedl_honorees',
  TEAM: 'thedl_team_members',
  TESTIMONIALS: 'thedl_testimonials',
  PARTNERS: 'thedl_partners',
  PAGES: 'thedl_custom_pages',
  SUBMISSIONS: 'thedl_form_submissions',
  MEDIA: 'thedl_media_items'
};

// Safe localStorage loader helper
function loadLocal<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

function saveLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('thedl_storage_update', { detail: { key } }));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function getRows<T>(table: string, key: string, fallback: T[]): Promise<T[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from(table).select('*');
    if (error) throw new Error(`Failed to load ${table}: ${error.message}`);
    return (data ?? []) as T[];
  }
  return loadLocal<T[]>(key, fallback);
}

async function saveRow<T extends { id?: string }>(
  table: string,
  key: string,
  fallback: T[],
  row: T,
  conflictColumn = 'id'
): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const record = { ...row } as Record<string, unknown>;
    if (typeof record.id === 'string' && !UUID_PATTERN.test(record.id)) delete record.id;
    const { error } = await supabase.from(table).upsert(record, { onConflict: conflictColumn });
    if (error) throw new Error(`Failed to save ${table}: ${error.message}`);
    window.dispatchEvent(new CustomEvent('thedl_storage_update', { detail: { key } }));
    return;
  }

  const list = loadLocal<T[]>(key, fallback);
  const index = list.findIndex(item => item.id === row.id);
  if (index >= 0) list[index] = row;
  else list.push(row);
  saveLocal(key, list);
}

async function deleteRow<T extends { id?: string }>(
  table: string,
  key: string,
  fallback: T[],
  id: string
): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    if (!UUID_PATTERN.test(id)) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw new Error(`Failed to delete ${table} record: ${error.message}`);
    window.dispatchEvent(new CustomEvent('thedl_storage_update', { detail: { key } }));
    return;
  }
  saveLocal(key, loadLocal<T[]>(key, fallback).filter(item => item.id !== id));
}

export const dataStore = {
  // 1. Site Settings
  getSiteSettings: async (): Promise<SiteSettings> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
      if (error) throw new Error(`Failed to load site settings: ${error.message}`);
      if (data) {
        return {
          ...initialSiteSettings,
          ...data,
          social_links: { ...initialSiteSettings.social_links, ...data.social_links }
        } as SiteSettings;
      }
    }
    return loadLocal<SiteSettings>(STORAGE_KEYS.SETTINGS, initialSiteSettings);
  },

  updateSiteSettings: async (settings: SiteSettings): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      const { data: existing, error: readError } = await supabase
        .from('site_settings').select('id').limit(1).maybeSingle();
      if (readError) throw new Error(`Failed to find site settings: ${readError.message}`);
      const { error } = existing
        ? await supabase.from('site_settings').update(settings).eq('id', existing.id)
        : await supabase.from('site_settings').insert(settings);
      if (error) throw new Error(`Failed to save site settings: ${error.message}`);
      window.dispatchEvent(new CustomEvent('thedl_storage_update', { detail: { key: STORAGE_KEYS.SETTINGS } }));
      return;
    }
    saveLocal(STORAGE_KEYS.SETTINGS, settings);
  },

  // 2. Homepage Data
  getHomepageData: async (): Promise<HomepageData> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('homepage_data').select('*').limit(1).maybeSingle();
      if (error) throw new Error(`Failed to load homepage data: ${error.message}`);
      if (data) return data as HomepageData;
    }
    const data = loadLocal<HomepageData>(STORAGE_KEYS.HOMEPAGE, initialHomepageData);
    if (data?.hero && (!data.hero.image_url || data.hero.image_url.includes('sylvester-hero.jpg') || data.hero.image_url.includes('sylvester-hero.png'))) {
      data.hero.image_url = '/images/sylvester-transparent.png';
    }
    return data;
  },

  updateHomepageData: async (data: HomepageData): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      const { data: existing, error: readError } = await supabase
        .from('homepage_data').select('id').limit(1).maybeSingle();
      if (readError) throw new Error(`Failed to find homepage data: ${readError.message}`);
      const { error } = existing
        ? await supabase.from('homepage_data').update(data).eq('id', existing.id)
        : await supabase.from('homepage_data').insert(data);
      if (error) throw new Error(`Failed to save homepage data: ${error.message}`);
      window.dispatchEvent(new CustomEvent('thedl_storage_update', { detail: { key: STORAGE_KEYS.HOMEPAGE } }));
      return;
    }
    saveLocal(STORAGE_KEYS.HOMEPAGE, data);
  },

  // 3. Navigation
  getNavigation: async (): Promise<NavigationItem[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('navigation_items').select('*').order('display_order', { ascending: true });
      if (error) throw new Error(`Failed to load navigation: ${error.message}`);
      return (data ?? []).map(item => ({ ...item, order: item.display_order })) as NavigationItem[];
    }
    return loadLocal<NavigationItem[]>(STORAGE_KEYS.NAVIGATION, initialNavigation);
  },

  updateNavigation: async (items: NavigationItem[]): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      const { error: deleteError } = await supabase.from('navigation_items').delete().neq('id', '');
      if (deleteError) throw new Error(`Failed to replace navigation: ${deleteError.message}`);
      if (items.length) {
        const rows = items.map((item, index) => {
          const { order, ...rest } = item;
          const row = { ...rest, display_order: order ?? index + 1 } as Record<string, unknown>;
          if (typeof row.id === 'string' && !UUID_PATTERN.test(row.id)) delete row.id;
          return row;
        });
        const { error } = await supabase.from('navigation_items').insert(rows);
        if (error) throw new Error(`Failed to save navigation: ${error.message}`);
      }
      window.dispatchEvent(new CustomEvent('thedl_storage_update', { detail: { key: STORAGE_KEYS.NAVIGATION } }));
      return;
    }
    saveLocal(STORAGE_KEYS.NAVIGATION, items);
  },

  // 4. Services
  getServices: async (): Promise<Service[]> => {
    return getRows<Service>('services', STORAGE_KEYS.SERVICES, initialServices);
  },

  updateServices: async (services: Service[]): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('services').upsert(services.map(service => {
        const row = { ...service } as Record<string, unknown>;
        if (typeof row.id === 'string' && !UUID_PATTERN.test(row.id)) delete row.id;
        return row;
      }), { onConflict: 'slug' });
      if (error) throw new Error(`Failed to update services: ${error.message}`);
      window.dispatchEvent(new CustomEvent('thedl_storage_update', { detail: { key: STORAGE_KEYS.SERVICES } }));
      return;
    }
    saveLocal(STORAGE_KEYS.SERVICES, services);
  },

  saveService: async (service: Service): Promise<void> => {
    await saveRow('services', STORAGE_KEYS.SERVICES, initialServices, service, 'slug');
  },

  deleteService: async (id: string): Promise<void> => {
    await deleteRow('services', STORAGE_KEYS.SERVICES, initialServices, id);
  },

  // 5. Resources
  getResources: async (): Promise<Resource[]> => {
    return getRows<Resource>('resources', STORAGE_KEYS.RESOURCES, initialResources);
  },

  saveResource: async (resource: Resource): Promise<void> => {
    await saveRow('resources', STORAGE_KEYS.RESOURCES, initialResources, resource, 'slug');
  },

  deleteResource: async (id: string): Promise<void> => {
    await deleteRow('resources', STORAGE_KEYS.RESOURCES, initialResources, id);
  },

  // 6. AI Tools Directory
  getAITools: async (): Promise<AITool[]> => {
    return getRows<AITool>('ai_tools', STORAGE_KEYS.AI_TOOLS, initialAITools);
  },

  saveAITool: async (tool: AITool): Promise<void> => {
    await saveRow('ai_tools', STORAGE_KEYS.AI_TOOLS, initialAITools, tool);
  },

  deleteAITool: async (id: string): Promise<void> => {
    await deleteRow('ai_tools', STORAGE_KEYS.AI_TOOLS, initialAITools, id);
  },

  // 7. Blog Posts
  getBlogPosts: async (): Promise<BlogPost[]> => {
    return getRows<BlogPost>('blog_posts', STORAGE_KEYS.BLOG, initialBlogPosts);
  },

  saveBlogPost: async (post: BlogPost): Promise<void> => {
    await saveRow('blog_posts', STORAGE_KEYS.BLOG, initialBlogPosts, post, 'slug');
  },

  deleteBlogPost: async (id: string): Promise<void> => {
    await deleteRow('blog_posts', STORAGE_KEYS.BLOG, initialBlogPosts, id);
  },

  saveBlogPostsBatch: async (
    newPosts: BlogPost[],
    overwriteDuplicates: boolean = false
  ): Promise<{ added: number; updated: number; skipped: number }> => {
    const list = await getRows<BlogPost>('blog_posts', STORAGE_KEYS.BLOG, initialBlogPosts);
    let added = 0;
    let updated = 0;
    let skipped = 0;

    for (const post of newPosts) {
      const existingIndex = list.findIndex(p =>
        (post.wp_post_id && p.wp_post_id && String(p.wp_post_id) === String(post.wp_post_id)) ||
        (post.slug && p.slug.toLowerCase() === post.slug.toLowerCase()) ||
        (post.original_link && p.original_link && p.original_link === post.original_link)
      );

      if (existingIndex >= 0) {
        if (overwriteDuplicates) {
          list[existingIndex] = { ...list[existingIndex], ...post, id: list[existingIndex].id };
          updated++;
        } else {
          skipped++;
        }
      } else {
        list.unshift(post);
        added++;
      }
    }

    if (isSupabaseConfigured && supabase) {
      const rows = list.map(post => {
        const row = { ...post } as Record<string, unknown>;
        if (typeof row.id === 'string' && !UUID_PATTERN.test(row.id)) delete row.id;
        return row;
      });
      const { error } = await supabase.from('blog_posts').upsert(rows, { onConflict: 'slug' });
      if (error) throw new Error(`Failed to import blog posts: ${error.message}`);
      window.dispatchEvent(new CustomEvent('thedl_storage_update', { detail: { key: STORAGE_KEYS.BLOG } }));
    } else {
      saveLocal(STORAGE_KEYS.BLOG, list);
    }
    return { added, updated, skipped };
  },

  // 8. Events
  getEvents: async (): Promise<Event[]> => {
    return getRows<Event>('events', STORAGE_KEYS.EVENTS, initialEvents);
  },

  saveEvent: async (event: Event): Promise<void> => {
    await saveRow('events', STORAGE_KEYS.EVENTS, initialEvents, event, 'slug');
  },

  deleteEvent: async (id: string): Promise<void> => {
    await deleteRow('events', STORAGE_KEYS.EVENTS, initialEvents, id);
  },

  // Event photo galleries
  getEventGalleries: async (): Promise<EventGallery[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data: galleries, error } = await supabase
        .from('event_galleries').select('*').order('event_date', { ascending: false });
      if (error) throw new Error(`Failed to load event galleries: ${error.message}`);
      if (!galleries?.length) return [];

      const galleryIds = galleries.map(gallery => gallery.id);
      const { data: photos, error: photoError } = await supabase
        .from('event_gallery_photos').select('*').in('gallery_id', galleryIds)
        .order('display_order', { ascending: true });
      if (photoError) throw new Error(`Failed to load event gallery photos: ${photoError.message}`);

      return galleries.map(gallery => ({
        ...gallery,
        photos: (photos ?? []).filter(photo => photo.gallery_id === gallery.id)
      })) as EventGallery[];
    }
    return loadLocal<EventGallery[]>(STORAGE_KEYS.GALLERIES, []);
  },

  saveEventGallery: async (gallery: EventGallery): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      const galleryId = UUID_PATTERN.test(gallery.id) ? gallery.id : crypto.randomUUID();
      const { photos, ...galleryRow } = gallery;
      const { error: galleryError } = await supabase
        .from('event_galleries').upsert({ ...galleryRow, id: galleryId });
      if (galleryError) throw new Error(`Failed to save event gallery: ${galleryError.message}`);

      const { error: deleteError } = await supabase
        .from('event_gallery_photos').delete().eq('gallery_id', galleryId);
      if (deleteError) throw new Error(`Failed to replace event gallery photos: ${deleteError.message}`);

      if (photos.length) {
        const rows = photos.map((photo: EventGalleryPhoto, index) => {
          const row = {
            ...photo,
            gallery_id: galleryId,
            display_order: index + 1
          } as Record<string, unknown>;
          if (typeof row.id === 'string' && !UUID_PATTERN.test(row.id)) delete row.id;
          return row;
        });
        const { error: photoError } = await supabase.from('event_gallery_photos').insert(rows);
        if (photoError) throw new Error(`Failed to save event gallery photos: ${photoError.message}`);
      }

      window.dispatchEvent(new CustomEvent('thedl_storage_update', { detail: { key: STORAGE_KEYS.GALLERIES } }));
      return;
    }

    const galleries = loadLocal<EventGallery[]>(STORAGE_KEYS.GALLERIES, []);
    const index = galleries.findIndex(item => item.id === gallery.id);
    if (index >= 0) galleries[index] = gallery;
    else galleries.unshift(gallery);
    saveLocal(STORAGE_KEYS.GALLERIES, galleries);
  },

  deleteEventGallery: async (id: string): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('event_galleries').delete().eq('id', id);
      if (error) throw new Error(`Failed to delete event gallery: ${error.message}`);
      window.dispatchEvent(new CustomEvent('thedl_storage_update', { detail: { key: STORAGE_KEYS.GALLERIES } }));
      return;
    }
    saveLocal(STORAGE_KEYS.GALLERIES,
      loadLocal<EventGallery[]>(STORAGE_KEYS.GALLERIES, []).filter(gallery => gallery.id !== id));
  },

  // 9. Initiatives
  getInitiatives: async (): Promise<Initiative[]> => {
    return getRows<Initiative>('initiatives', STORAGE_KEYS.INITIATIVES, initialInitiatives);
  },

  saveInitiative: async (initiative: Initiative): Promise<void> => {
    await saveRow('initiatives', STORAGE_KEYS.INITIATIVES, initialInitiatives, initiative, 'slug');
  },

  deleteInitiative: async (id: string): Promise<void> => {
    await deleteRow('initiatives', STORAGE_KEYS.INITIATIVES, initialInitiatives, id);
  },

  // 10. Honorees (LSA)
  getHonorees: async (): Promise<Honoree[]> => {
    return getRows<Honoree>('honorees', STORAGE_KEYS.HONOREES, initialHonorees);
  },

  saveHonoree: async (honoree: Honoree): Promise<void> => {
    await saveRow('honorees', STORAGE_KEYS.HONOREES, initialHonorees, honoree);
  },

  deleteHonoree: async (id: string): Promise<void> => {
    await deleteRow('honorees', STORAGE_KEYS.HONOREES, initialHonorees, id);
  },

  // 11. Team Members
  getTeamMembers: async (): Promise<TeamMember[]> => {
    const list = await getRows<TeamMember>('team_members', STORAGE_KEYS.TEAM, initialTeamMembers);
    if (isSupabaseConfigured) return list;
    const synced = list.map(m => {
      const seed = initialTeamMembers.find(s => s.id === m.id);
      if (seed && (!m.photo_url || m.photo_url.includes('unsplash') || m.photo_url.includes('placeholder'))) {
        return { ...m, photo_url: seed.photo_url };
      }
      return m;
    });
    return synced;
  },

  saveTeamMember: async (member: TeamMember): Promise<void> => {
    await saveRow('team_members', STORAGE_KEYS.TEAM, initialTeamMembers, member);
  },

  deleteTeamMember: async (id: string): Promise<void> => {
    await deleteRow('team_members', STORAGE_KEYS.TEAM, initialTeamMembers, id);
  },

  // 12. Testimonials
  getTestimonials: async (): Promise<Testimonial[]> => {
    return getRows<Testimonial>('testimonials', STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
  },

  saveTestimonial: async (testimonial: Testimonial): Promise<void> => {
    await saveRow('testimonials', STORAGE_KEYS.TESTIMONIALS, initialTestimonials, testimonial);
  },

  deleteTestimonial: async (id: string): Promise<void> => {
    await deleteRow('testimonials', STORAGE_KEYS.TESTIMONIALS, initialTestimonials, id);
  },

  // 13. Partners
  getPartners: async (): Promise<Partner[]> => {
    return getRows<Partner>('partners', STORAGE_KEYS.PARTNERS, initialPartners);
  },

  savePartner: async (partner: Partner): Promise<void> => {
    await saveRow('partners', STORAGE_KEYS.PARTNERS, initialPartners, partner);
  },

  deletePartner: async (id: string): Promise<void> => {
    await deleteRow('partners', STORAGE_KEYS.PARTNERS, initialPartners, id);
  },

  // 14. Custom Pages (Page Builder)
  getPages: async (): Promise<Page[]> => {
    return getRows<Page>('pages', STORAGE_KEYS.PAGES, []);
  },

  getPageBySlug: async (slug: string): Promise<Page | undefined> => {
    const pages = await getRows<Page>('pages', STORAGE_KEYS.PAGES, []);
    return pages.find(p => p.slug === slug);
  },

  savePage: async (page: Page): Promise<void> => {
    const now = new Date().toISOString();
    await saveRow('pages', STORAGE_KEYS.PAGES, [], {
      ...page,
      created_at: page.created_at || now,
      updated_at: now
    }, 'slug');
  },

  deletePage: async (id: string): Promise<void> => {
    await deleteRow('pages', STORAGE_KEYS.PAGES, [], id);
  },

  savePagesBatch: async (
    newPages: Page[],
    overwriteDuplicates: boolean = false
  ): Promise<{ added: number; updated: number; skipped: number }> => {
    const list = await getRows<Page>('pages', STORAGE_KEYS.PAGES, []);
    let added = 0;
    let updated = 0;
    let skipped = 0;

    for (const page of newPages) {
      const existingIndex = list.findIndex(p =>
        (page.wp_page_id && p.wp_page_id && String(p.wp_page_id) === String(page.wp_page_id)) ||
        (page.slug && p.slug.toLowerCase() === page.slug.toLowerCase()) ||
        (page.original_link && p.original_link && p.original_link === page.original_link) ||
        (page.title && p.title.trim().toLowerCase() === page.title.trim().toLowerCase())
      );

      if (existingIndex >= 0) {
        if (overwriteDuplicates) {
          list[existingIndex] = { ...list[existingIndex], ...page, id: list[existingIndex].id, updated_at: new Date().toISOString() };
          updated++;
        } else {
          skipped++;
        }
      } else {
        list.unshift({ ...page, created_at: page.created_at || new Date().toISOString(), updated_at: new Date().toISOString() });
        added++;
      }
    }

    if (isSupabaseConfigured && supabase) {
      const rows = list.map(page => {
        const row = { ...page } as Record<string, unknown>;
        if (typeof row.id === 'string' && !UUID_PATTERN.test(row.id)) delete row.id;
        return row;
      });
      const { error } = await supabase.from('pages').upsert(rows, { onConflict: 'slug' });
      if (error) throw new Error(`Failed to import pages: ${error.message}`);
      window.dispatchEvent(new CustomEvent('thedl_storage_update', { detail: { key: STORAGE_KEYS.PAGES } }));
    } else {
      saveLocal(STORAGE_KEYS.PAGES, list);
    }
    return { added, updated, skipped };
  },

  // 15. Form Submissions
  getSubmissions: async (): Promise<FormSubmission[]> => {
    return getRows<FormSubmission>('form_submissions', STORAGE_KEYS.SUBMISSIONS, []);
  },

  saveSubmission: async (submission: Omit<FormSubmission, 'id' | 'created_at' | 'status'>): Promise<FormSubmission> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('form_submissions')
        .insert({ ...submission, status: 'new' })
        .select('*')
        .single();
      if (error) throw new Error(`Failed to submit form: ${error.message}`);
      window.dispatchEvent(new CustomEvent('thedl_storage_update', { detail: { key: STORAGE_KEYS.SUBMISSIONS } }));
      return data as FormSubmission;
    }

    const list = loadLocal<FormSubmission[]>(STORAGE_KEYS.SUBMISSIONS, []);
    const newSubmission: FormSubmission = {
      ...submission,
      id: 'sub-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      created_at: new Date().toISOString(),
      status: 'new'
    };
    list.unshift(newSubmission);
    saveLocal(STORAGE_KEYS.SUBMISSIONS, list);
    return newSubmission;
  },

  deleteSubmission: async (id: string): Promise<void> => {
    await deleteRow('form_submissions', STORAGE_KEYS.SUBMISSIONS, [], id);
  },

  updateSubmissionStatus: async (id: string, status: 'new' | 'reviewed' | 'archived'): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('form_submissions').update({ status }).eq('id', id);
      if (error) throw new Error(`Failed to update form submission: ${error.message}`);
      window.dispatchEvent(new CustomEvent('thedl_storage_update', { detail: { key: STORAGE_KEYS.SUBMISSIONS } }));
      return;
    }
    const list = loadLocal<FormSubmission[]>(STORAGE_KEYS.SUBMISSIONS, []);
    const item = list.find(s => s.id === id);
    if (item) {
      item.status = status;
      saveLocal(STORAGE_KEYS.SUBMISSIONS, list);
    }
  },

  // 16. Media Items
  getMediaItems: async (): Promise<MediaItem[]> => {
    return getRows<MediaItem>('media_items', STORAGE_KEYS.MEDIA, initialMediaItems);
  },

  saveMediaItem: async (item: MediaItem): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      const row = { ...item } as Record<string, unknown>;
      if (typeof row.id === 'string' && !UUID_PATTERN.test(row.id)) delete row.id;
      const { error } = await supabase.from('media_items').insert(row);
      if (error) throw new Error(`Failed to save media item: ${error.message}`);
      window.dispatchEvent(new CustomEvent('thedl_storage_update', { detail: { key: STORAGE_KEYS.MEDIA } }));
      return;
    }
    const list = loadLocal<MediaItem[]>(STORAGE_KEYS.MEDIA, initialMediaItems);
    list.unshift(item);
    saveLocal(STORAGE_KEYS.MEDIA, list);
  },

  deleteMediaItem: async (id: string): Promise<void> => {
    await deleteRow('media_items', STORAGE_KEYS.MEDIA, initialMediaItems, id);
  }
};
