import { describe, it, expect } from 'vitest';
import { prepareNavigation, resolveNavigation } from './navigation';
import type { NavigationItem } from '../types';

const DEFAULT_LABELS = ['Home', 'About', 'Solutions', 'Upskilling Library', 'Initiatives', 'Connect'];

describe('resolveNavigation', () => {
  it('falls back to the built-in menu when the CMS returns no items', () => {
    expect(resolveNavigation([]).map(i => i.label)).toEqual(DEFAULT_LABELS);
    expect(resolveNavigation(null).map(i => i.label)).toEqual(DEFAULT_LABELS);
    expect(resolveNavigation(undefined).map(i => i.label)).toEqual(DEFAULT_LABELS);
  });

  it('built-in menu includes the dropdown children', () => {
    const about = resolveNavigation([]).find(i => i.label === 'About')!;
    expect(about.children?.map(c => c.url)).toEqual(['/about', '/about/sylvester-ebhonu', '/about/team']);
  });

  it('uses CMS items when present, sorted by order', () => {
    const cms: NavigationItem[] = [
      { id: 'b', label: 'Second', url: '/b', order: 2, open_in_new_tab: false },
      { id: 'a', label: 'First', url: '/a', order: 1, open_in_new_tab: false }
    ];
    expect(resolveNavigation(cms).map(i => i.label)).toEqual(['First', 'Second']);
  });

  it('falls back when every CMS item is invalid or an admin link', () => {
    const cms = [
      { id: 'x', label: 'Admin', url: '/admin', order: 1, open_in_new_tab: false },
      { id: 'y', label: '', url: '/empty-label', order: 2, open_in_new_tab: false },
      { id: 'z', label: 'No URL', url: undefined as unknown as string, order: 3, open_in_new_tab: false }
    ];
    expect(resolveNavigation(cms).map(i => i.label)).toEqual(DEFAULT_LABELS);
  });
});

describe('prepareNavigation', () => {
  it('removes admin and invalid children and sorts them', () => {
    const [item] = prepareNavigation([{
      id: 'p', label: 'Parent', url: '/p', order: 1, open_in_new_tab: false,
      children: [
        { id: 'c2', label: 'Two', url: '/two', order: 2 },
        { id: 'c0', label: 'Secret', url: '/admin/settings', order: 0 },
        { id: 'c1', label: 'One', url: '/one', order: 1 }
      ]
    }]);
    expect(item.children?.map(c => c.label)).toEqual(['One', 'Two']);
  });
});
