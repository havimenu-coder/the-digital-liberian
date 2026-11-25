import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  initialServices, initialBlogPosts, initialEvents, initialTeamMembers, initialTestimonials,
  initialPartners, initialResources, initialAITools, initialInitiatives, initialHonorees,
  initialSiteSettings, initialHomepageData, initialNavigation
} from '../seedData';

// A fake Supabase client: every query resolves to `response` (or rejects when `throws`).
const supa = vi.hoisted(() => ({
  response: { data: null as unknown, error: null as null | { message: string; code?: string } },
  throws: false,
  calls: [] as string[]
}));

vi.mock('../supabase', () => {
  const chain: any = new Proxy({}, {
    get(_target, prop) {
      if (prop === 'then') {
        return (resolve: any, reject: any) =>
          (supa.throws ? Promise.reject(new TypeError('Failed to fetch')) : Promise.resolve(supa.response)).then(resolve, reject);
      }
      return (...args: unknown[]) => {
        supa.calls.push(String(prop));
        return chain;
      };
    }
  });
  return { isSupabaseConfigured: true, supabase: { from: () => chain } };
});

import { dataStore } from './index';

const MISSING_TABLE = { code: 'PGRST205', message: "Could not find the table 'public.services' in the schema cache" };

beforeEach(() => {
  supa.response = { data: null, error: MISSING_TABLE };
  supa.throws = false;
  supa.calls = [];
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('public reads fall back to built-in content when Supabase fails (production PGRST205)', () => {
  const cases: [string, () => Promise<unknown>, unknown][] = [
    ['services', () => dataStore.getServices(), initialServices],
    ['blog posts', () => dataStore.getBlogPosts(), initialBlogPosts],
    ['events', () => dataStore.getEvents(), initialEvents],
    ['team members', () => dataStore.getTeamMembers(), initialTeamMembers],
    ['testimonials', () => dataStore.getTestimonials(), initialTestimonials],
    ['partners', () => dataStore.getPartners(), initialPartners],
    ['resources', () => dataStore.getResources(), initialResources],
    ['AI tools', () => dataStore.getAITools(), initialAITools],
    ['initiatives', () => dataStore.getInitiatives(), initialInitiatives],
    ['honorees', () => dataStore.getHonorees(), initialHonorees],
    ['site settings', () => dataStore.getSiteSettings(), initialSiteSettings],
    ['homepage data', () => dataStore.getHomepageData(), initialHomepageData],
    ['navigation', () => dataStore.getNavigation(), initialNavigation]
  ];

  for (const [name, read, expected] of cases) {
    it(`${name}: missing table -> built-in content`, async () => {
      await expect(read()).resolves.toEqual(expected);
    });
  }

  it('also falls back when the request itself throws (network failure)', async () => {
    supa.throws = true;
    await expect(dataStore.getServices()).resolves.toEqual(initialServices);
    await expect(dataStore.getSiteSettings()).resolves.toEqual(initialSiteSettings);
    await expect(dataStore.getNavigation()).resolves.toEqual(initialNavigation);
  });

  it('includes the solution that was stuck on production', async () => {
    const services = await dataStore.getServices();
    expect(services.some(s => s.slug === 'ai-digital-literacy')).toBe(true);
  });

  it('content without built-in equivalents degrades to empty, not an error', async () => {
    await expect(dataStore.getEventGalleries()).resolves.toEqual([]);
    await expect(dataStore.getPages()).resolves.toEqual([]);
    await expect(dataStore.getPageBySlug('anything')).resolves.toBeUndefined();
  });

  it('returns copies, so callers cannot change the built-in content', async () => {
    const first = await dataStore.getServices();
    first[0].title = 'MUTATED';
    first.length = 0;
    const second = await dataStore.getServices();
    expect(second).toEqual(initialServices);
    expect(initialServices[0].title).not.toBe('MUTATED');
  });

  it('logs a warning explaining the fallback', async () => {
    vi.resetModules();
    const fresh = (await import('./index')).dataStore;
    await fresh.getServices();
    await fresh.getServices();
    const messages = (console.warn as any).mock.calls.map((c: unknown[]) => String(c[0])).filter((m: string) => m.includes('"services"'));
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain('Showing built-in content instead');
  });
});

describe('database content still wins when Supabase works', () => {
  it('returns database rows instead of built-in content', async () => {
    const rows = [{ id: '11111111-1111-4111-8111-111111111111', slug: 'from-db', title: 'From DB' }];
    supa.response = { data: rows, error: null };
    await expect(dataStore.getServices()).resolves.toEqual(rows);
  });
});

describe('writes, submissions and admin-only reads never fall back', () => {
  it('form submissions report the failure instead of pretending to succeed', async () => {
    await expect(dataStore.saveSubmission({ form_type: 'contact', data: { name: 'A' } })).rejects.toThrow(/Failed to submit form/);
    supa.throws = true;
    await expect(dataStore.saveSubmission({ form_type: 'contact', data: { name: 'A' } })).rejects.toThrow();
  });

  it('admin-only reads (submissions inbox, media library) surface the error', async () => {
    await expect(dataStore.getSubmissions()).rejects.toThrow(/Failed to load form_submissions/);
    await expect(dataStore.getMediaItems()).rejects.toThrow(/Failed to load media_items/);
  });

  it('bulk importers refuse to run on a failed read (never import built-in content)', async () => {
    await expect(dataStore.saveBlogPostsBatch([])).rejects.toThrow(/Failed to load blog_posts/);
    await expect(dataStore.savePagesBatch([])).rejects.toThrow(/Failed to load pages/);
  });

  it('content saves still report errors', async () => {
    await expect(dataStore.saveService({ ...initialServices[0] })).rejects.toThrow(/Failed to save services/);
  });
});
