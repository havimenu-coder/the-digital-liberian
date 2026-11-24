import type { NavigationItem } from '../types';
import { initialNavigation } from './seedData';

const isPublicUrl = (url: unknown): url is string =>
  typeof url === 'string' && url.trim() !== '' && !url.trim().startsWith('/admin');

const byOrder = (a: { order?: number }, b: { order?: number }) => (a.order ?? 0) - (b.order ?? 0);

/** Removes admin/invalid links and sorts items and their children by `order`. */
export function prepareNavigation(items: NavigationItem[] | null | undefined): NavigationItem[] {
  if (!Array.isArray(items)) return [];
  return items
    .filter(item => item && item.label && isPublicUrl(item.url))
    .sort(byOrder)
    .map(item => ({
      ...item,
      children: (item.children ?? [])
        .filter(child => child && child.label && isPublicUrl(child.url))
        .sort(byOrder)
    }));
}

/**
 * The menu shown in the site header.
 *
 * Navigation is managed in the CMS (Supabase `navigation_items`). When that
 * source is empty or could not be loaded, the built-in site menu is used so the
 * header is never blank. As soon as the CMS has navigation items, they win.
 */
export function resolveNavigation(cmsItems: NavigationItem[] | null | undefined): NavigationItem[] {
  const fromCms = prepareNavigation(cmsItems);
  return fromCms.length > 0 ? fromCms : prepareNavigation(initialNavigation);
}
