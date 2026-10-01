import { 
  SiteSettings, 
  HomepageData, 
  Service, 
  Resource, 
  AITool, 
  BlogPost, 
  Event, 
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

export const dataStore = {
  // 1. Site Settings
  getSiteSettings: async (): Promise<SiteSettings> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('site_settings').select('*').single();
        if (data && !error) return data as SiteSettings;
      } catch (err) {
        console.warn('Supabase fetch failed for site_settings, using local fallback', err);
      }
    }
    return loadLocal<SiteSettings>(STORAGE_KEYS.SETTINGS, initialSiteSettings);
  },

  updateSiteSettings: async (settings: SiteSettings): Promise<void> => {
    saveLocal(STORAGE_KEYS.SETTINGS, settings);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('site_settings').upsert(settings);
      } catch (err) {
        console.error('Failed to sync settings to Supabase', err);
      }
    }
  },

  // 2. Homepage Data
  getHomepageData: async (): Promise<HomepageData> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('homepage_data').select('*').single();
        if (data && !error) return data as HomepageData;
      } catch (err) {
        console.warn('Supabase fetch failed for homepage_data, using local fallback', err);
      }
    }
    const data = loadLocal<HomepageData>(STORAGE_KEYS.HOMEPAGE, initialHomepageData);
    if (data?.hero && (!data.hero.image_url || data.hero.image_url.includes('sylvester-hero.jpg') || data.hero.image_url.includes('sylvester-hero.png'))) {
      data.hero.image_url = '/images/sylvester-transparent.png';
    }
    return data;
  },

  updateHomepageData: async (data: HomepageData): Promise<void> => {
    saveLocal(STORAGE_KEYS.HOMEPAGE, data);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('homepage_data').upsert(data);
      } catch (err) {
        console.error('Failed to sync homepage data to Supabase', err);
      }
    }
  },

  // 3. Navigation
  getNavigation: async (): Promise<NavigationItem[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('navigation_items').select('*').order('display_order', { ascending: true });
        if (data && !error && data.length > 0) return data as NavigationItem[];
      } catch (err) {
        console.warn('Supabase fetch failed for navigation, using local fallback', err);
      }
    }
    return loadLocal<NavigationItem[]>(STORAGE_KEYS.NAVIGATION, initialNavigation);
  },

  updateNavigation: async (items: NavigationItem[]): Promise<void> => {
    saveLocal(STORAGE_KEYS.NAVIGATION, items);
  },

  // 4. Services
  getServices: async (): Promise<Service[]> => {
    return loadLocal<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
  },

  updateServices: async (services: Service[]): Promise<void> => {
    saveLocal(STORAGE_KEYS.SERVICES, services);
  },

  saveService: async (service: Service): Promise<void> => {
    const list = loadLocal<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
    const index = list.findIndex(s => s.id === service.id);
    if (index >= 0) {
      list[index] = service;
    } else {
      list.push(service);
    }
    saveLocal(STORAGE_KEYS.SERVICES, list);
  },

  deleteService: async (id: string): Promise<void> => {
    const list = loadLocal<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
    const filtered = list.filter(s => s.id !== id);
    saveLocal(STORAGE_KEYS.SERVICES, filtered);
  },

  // 5. Resources
  getResources: async (): Promise<Resource[]> => {
    return loadLocal<Resource[]>(STORAGE_KEYS.RESOURCES, initialResources);
  },

  saveResource: async (resource: Resource): Promise<void> => {
    const list = loadLocal<Resource[]>(STORAGE_KEYS.RESOURCES, initialResources);
    const index = list.findIndex(r => r.id === resource.id);
    if (index >= 0) {
      list[index] = resource;
    } else {
      list.push(resource);
    }
    saveLocal(STORAGE_KEYS.RESOURCES, list);
  },

  deleteResource: async (id: string): Promise<void> => {
    const list = loadLocal<Resource[]>(STORAGE_KEYS.RESOURCES, initialResources);
    saveLocal(STORAGE_KEYS.RESOURCES, list.filter(r => r.id !== id));
  },

  // 6. AI Tools Directory
  getAITools: async (): Promise<AITool[]> => {
    return loadLocal<AITool[]>(STORAGE_KEYS.AI_TOOLS, initialAITools);
  },

  saveAITool: async (tool: AITool): Promise<void> => {
    const list = loadLocal<AITool[]>(STORAGE_KEYS.AI_TOOLS, initialAITools);
    const index = list.findIndex(t => t.id === tool.id);
    if (index >= 0) {
      list[index] = tool;
    } else {
      list.push(tool);
    }
    saveLocal(STORAGE_KEYS.AI_TOOLS, list);
  },

  deleteAITool: async (id: string): Promise<void> => {
    const list = loadLocal<AITool[]>(STORAGE_KEYS.AI_TOOLS, initialAITools);
    saveLocal(STORAGE_KEYS.AI_TOOLS, list.filter(t => t.id !== id));
  },

  // 7. Blog Posts
  getBlogPosts: async (): Promise<BlogPost[]> => {
    return loadLocal<BlogPost[]>(STORAGE_KEYS.BLOG, initialBlogPosts);
  },

  saveBlogPost: async (post: BlogPost): Promise<void> => {
    const list = loadLocal<BlogPost[]>(STORAGE_KEYS.BLOG, initialBlogPosts);
    const index = list.findIndex(p => p.id === post.id);
    if (index >= 0) {
      list[index] = post;
    } else {
      list.push(post);
    }
    saveLocal(STORAGE_KEYS.BLOG, list);
  },

  deleteBlogPost: async (id: string): Promise<void> => {
    const list = loadLocal<BlogPost[]>(STORAGE_KEYS.BLOG, initialBlogPosts);
    saveLocal(STORAGE_KEYS.BLOG, list.filter(p => p.id !== id));
  },

  saveBlogPostsBatch: async (
    newPosts: BlogPost[],
    overwriteDuplicates: boolean = false
  ): Promise<{ added: number; updated: number; skipped: number }> => {
    const list = loadLocal<BlogPost[]>(STORAGE_KEYS.BLOG, initialBlogPosts);
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

    saveLocal(STORAGE_KEYS.BLOG, list);
    return { added, updated, skipped };
  },

  // 8. Events
  getEvents: async (): Promise<Event[]> => {
    return loadLocal<Event[]>(STORAGE_KEYS.EVENTS, initialEvents);
  },

  saveEvent: async (event: Event): Promise<void> => {
    const list = loadLocal<Event[]>(STORAGE_KEYS.EVENTS, initialEvents);
    const index = list.findIndex(e => e.id === event.id);
    if (index >= 0) {
      list[index] = event;
    } else {
      list.push(event);
    }
    saveLocal(STORAGE_KEYS.EVENTS, list);
  },

  deleteEvent: async (id: string): Promise<void> => {
    const list = loadLocal<Event[]>(STORAGE_KEYS.EVENTS, initialEvents);
    saveLocal(STORAGE_KEYS.EVENTS, list.filter(e => e.id !== id));
  },

  // 9. Initiatives
  getInitiatives: async (): Promise<Initiative[]> => {
    return loadLocal<Initiative[]>(STORAGE_KEYS.INITIATIVES, initialInitiatives);
  },

  saveInitiative: async (initiative: Initiative): Promise<void> => {
    const list = loadLocal<Initiative[]>(STORAGE_KEYS.INITIATIVES, initialInitiatives);
    const index = list.findIndex(i => i.id === initiative.id);
    if (index >= 0) {
      list[index] = initiative;
    } else {
      list.push(initiative);
    }
    saveLocal(STORAGE_KEYS.INITIATIVES, list);
  },

  deleteInitiative: async (id: string): Promise<void> => {
    const list = loadLocal<Initiative[]>(STORAGE_KEYS.INITIATIVES, initialInitiatives);
    saveLocal(STORAGE_KEYS.INITIATIVES, list.filter(i => i.id !== id));
  },

  // 10. Honorees (LSA)
  getHonorees: async (): Promise<Honoree[]> => {
    return loadLocal<Honoree[]>(STORAGE_KEYS.HONOREES, initialHonorees);
  },

  saveHonoree: async (honoree: Honoree): Promise<void> => {
    const list = loadLocal<Honoree[]>(STORAGE_KEYS.HONOREES, initialHonorees);
    const index = list.findIndex(h => h.id === honoree.id);
    if (index >= 0) {
      list[index] = honoree;
    } else {
      list.push(honoree);
    }
    saveLocal(STORAGE_KEYS.HONOREES, list);
  },

  deleteHonoree: async (id: string): Promise<void> => {
    const list = loadLocal<Honoree[]>(STORAGE_KEYS.HONOREES, initialHonorees);
    saveLocal(STORAGE_KEYS.HONOREES, list.filter(h => h.id !== id));
  },

  // 11. Team Members
  getTeamMembers: async (): Promise<TeamMember[]> => {
    const list = loadLocal<TeamMember[]>(STORAGE_KEYS.TEAM, initialTeamMembers);
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
    const list = loadLocal<TeamMember[]>(STORAGE_KEYS.TEAM, initialTeamMembers);
    const index = list.findIndex(m => m.id === member.id);
    if (index >= 0) {
      list[index] = member;
    } else {
      list.push(member);
    }
    saveLocal(STORAGE_KEYS.TEAM, list);
  },

  deleteTeamMember: async (id: string): Promise<void> => {
    const list = loadLocal<TeamMember[]>(STORAGE_KEYS.TEAM, initialTeamMembers);
    saveLocal(STORAGE_KEYS.TEAM, list.filter(m => m.id !== id));
  },

  // 12. Testimonials
  getTestimonials: async (): Promise<Testimonial[]> => {
    return loadLocal<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
  },

  saveTestimonial: async (testimonial: Testimonial): Promise<void> => {
    const list = loadLocal<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
    const index = list.findIndex(t => t.id === testimonial.id);
    if (index >= 0) {
      list[index] = testimonial;
    } else {
      list.push(testimonial);
    }
    saveLocal(STORAGE_KEYS.TESTIMONIALS, list);
  },

  deleteTestimonial: async (id: string): Promise<void> => {
    const list = loadLocal<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
    saveLocal(STORAGE_KEYS.TESTIMONIALS, list.filter(t => t.id !== id));
  },

  // 13. Partners
  getPartners: async (): Promise<Partner[]> => {
    return loadLocal<Partner[]>(STORAGE_KEYS.PARTNERS, initialPartners);
  },

  savePartner: async (partner: Partner): Promise<void> => {
    const list = loadLocal<Partner[]>(STORAGE_KEYS.PARTNERS, initialPartners);
    const index = list.findIndex(p => p.id === partner.id);
    if (index >= 0) {
      list[index] = partner;
    } else {
      list.push(partner);
    }
    saveLocal(STORAGE_KEYS.PARTNERS, list);
  },

  deletePartner: async (id: string): Promise<void> => {
    const list = loadLocal<Partner[]>(STORAGE_KEYS.PARTNERS, initialPartners);
    saveLocal(STORAGE_KEYS.PARTNERS, list.filter(p => p.id !== id));
  },

  // 14. Custom Pages (Page Builder)
  getPages: async (): Promise<Page[]> => {
    return loadLocal<Page[]>(STORAGE_KEYS.PAGES, []);
  },

  getPageBySlug: async (slug: string): Promise<Page | undefined> => {
    const pages = loadLocal<Page[]>(STORAGE_KEYS.PAGES, []);
    return pages.find(p => p.slug === slug);
  },

  savePage: async (page: Page): Promise<void> => {
    const list = loadLocal<Page[]>(STORAGE_KEYS.PAGES, []);
    const index = list.findIndex(p => p.id === page.id);
    if (index >= 0) {
      list[index] = { ...page, updated_at: new Date().toISOString() };
    } else {
      list.push({ ...page, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
    }
    saveLocal(STORAGE_KEYS.PAGES, list);
  },

  deletePage: async (id: string): Promise<void> => {
    const list = loadLocal<Page[]>(STORAGE_KEYS.PAGES, []);
    saveLocal(STORAGE_KEYS.PAGES, list.filter(p => p.id !== id));
  },

  // 15. Form Submissions
  getSubmissions: async (): Promise<FormSubmission[]> => {
    return loadLocal<FormSubmission[]>(STORAGE_KEYS.SUBMISSIONS, []);
  },

  saveSubmission: async (submission: Omit<FormSubmission, 'id' | 'created_at' | 'status'>): Promise<FormSubmission> => {
    const list = loadLocal<FormSubmission[]>(STORAGE_KEYS.SUBMISSIONS, []);
    const newSubmission: FormSubmission = {
      ...submission,
      id: 'sub-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      created_at: new Date().toISOString(),
      status: 'new'
    };
    list.unshift(newSubmission);
    saveLocal(STORAGE_KEYS.SUBMISSIONS, list);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('form_submissions').insert(newSubmission);
      } catch (err) {
        console.warn('Failed to insert form submission into Supabase', err);
      }
    }

    return newSubmission;
  },

  deleteSubmission: async (id: string): Promise<void> => {
    const list = loadLocal<FormSubmission[]>(STORAGE_KEYS.SUBMISSIONS, []);
    saveLocal(STORAGE_KEYS.SUBMISSIONS, list.filter(s => s.id !== id));
  },

  updateSubmissionStatus: async (id: string, status: 'new' | 'reviewed' | 'archived'): Promise<void> => {
    const list = loadLocal<FormSubmission[]>(STORAGE_KEYS.SUBMISSIONS, []);
    const item = list.find(s => s.id === id);
    if (item) {
      item.status = status;
      saveLocal(STORAGE_KEYS.SUBMISSIONS, list);
    }
  },

  // 16. Media Items
  getMediaItems: async (): Promise<MediaItem[]> => {
    return loadLocal<MediaItem[]>(STORAGE_KEYS.MEDIA, initialMediaItems);
  },

  saveMediaItem: async (item: MediaItem): Promise<void> => {
    const list = loadLocal<MediaItem[]>(STORAGE_KEYS.MEDIA, initialMediaItems);
    list.unshift(item);
    saveLocal(STORAGE_KEYS.MEDIA, list);
  },

  deleteMediaItem: async (id: string): Promise<void> => {
    const list = loadLocal<MediaItem[]>(STORAGE_KEYS.MEDIA, initialMediaItems);
    saveLocal(STORAGE_KEYS.MEDIA, list.filter(m => m.id !== id));
  }
};
