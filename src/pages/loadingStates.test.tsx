import { describe, it, expect, vi, afterEach } from 'vitest';
import React from 'react';
import { renderAt } from '../test/render';
import { dataStore } from '../lib/storage';
import { initialServices, initialEvents } from '../lib/seedData';
import { SolutionDetailPage } from './SolutionDetailPage';
import { BlogPostPage } from './BlogPostPage';
import { EventDetailPage } from './EventDetailPage';
import { DynamicCustomPage } from './DynamicCustomPage';

let cleanup: (() => void) | undefined;
afterEach(() => { cleanup?.(); cleanup = undefined; });

const spinner = (c: HTMLElement) => c.querySelector('.animate-spin');
const fail = () => Promise.reject(new Error("Could not find the table in the schema cache"));

describe('detail pages never stay on a loading spinner', () => {
  it('solution page: load failure -> "Solution Not Found", no spinner', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(dataStore, 'getServices').mockImplementation(fail);
    const r = await renderAt(<SolutionDetailPage />, { path: '/solutions/:slug', route: '/solutions/ai-digital-literacy' });
    cleanup = r.unmount;
    expect(spinner(r.container)).toBeNull();
    expect(r.container.textContent).toContain('Solution Not Found');
  });

  it('solution page: built-in content renders the AI & Digital Literacy solution', async () => {
    vi.spyOn(dataStore, 'getServices').mockResolvedValue(structuredClone(initialServices));
    const r = await renderAt(<SolutionDetailPage />, { path: '/solutions/:slug', route: '/solutions/ai-digital-literacy' });
    cleanup = r.unmount;
    expect(spinner(r.container)).toBeNull();
    expect(r.container.textContent).toContain('AI & Digital Literacy');
  });

  it('blog post page: load failure -> "Article Not Found", no spinner', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(dataStore, 'getBlogPosts').mockImplementation(fail);
    const r = await renderAt(<BlogPostPage />, { path: '/blog/:slug', route: '/blog/some-post' });
    cleanup = r.unmount;
    expect(spinner(r.container)).toBeNull();
    expect(r.container.textContent).toContain('Article Not Found');
  });

  it('event page: load failure -> "Event not found" (previously a blank page), no spinner', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(dataStore, 'getEvents').mockImplementation(fail);
    const r = await renderAt(<EventDetailPage />, { path: '/events/:slug', route: '/events/ai-masterclass-workshop' });
    cleanup = r.unmount;
    expect(spinner(r.container)).toBeNull();
    expect(r.container.textContent).toContain('Event not found');
  });

  it('event page: built-in content renders the event', async () => {
    vi.spyOn(dataStore, 'getEvents').mockResolvedValue(structuredClone(initialEvents));
    const r = await renderAt(<EventDetailPage />, { path: '/events/:slug', route: '/events/ai-masterclass-workshop' });
    cleanup = r.unmount;
    expect(spinner(r.container)).toBeNull();
    expect(r.container.textContent).toContain(initialEvents[0].title);
  });

  it('page-builder page: load failure -> 404 message, no spinner', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(dataStore, 'getPageBySlug').mockImplementation(fail);
    const r = await renderAt(<DynamicCustomPage />, { path: '/:slug', route: '/my-custom-page' });
    cleanup = r.unmount;
    expect(spinner(r.container)).toBeNull();
    expect(r.container.textContent).toContain('Page Not Found');
  });
});
