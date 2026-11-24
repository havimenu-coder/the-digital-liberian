import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';
import { dataStore } from '../../lib/storage';
import { initialSiteSettings } from '../../lib/seedData';

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

const MENU = ['Home', 'About', 'Solutions', 'Upskilling Library', 'Initiatives', 'Connect'];

let container: HTMLDivElement;
let root: Root;

async function renderHeader() {
  await act(async () => {
    root.render(<MemoryRouter><Header /></MemoryRouter>);
  });
  // let the async loadData settle
  await act(async () => { await new Promise(r => setTimeout(r, 0)); });
}

const desktopNav = () => container.querySelector('nav') as HTMLElement;
const desktopLabels = () => Array.from(desktopNav().querySelectorAll(':scope > div > div > a')).map(a => a.textContent?.trim());

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  vi.spyOn(dataStore, 'getSiteSettings').mockResolvedValue(initialSiteSettings);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('<Header> navigation', () => {
  it('shows the full menu when the CMS navigation table is empty (production cause)', async () => {
    vi.spyOn(dataStore, 'getNavigation').mockResolvedValue([]);
    await renderHeader();
    expect(desktopLabels()).toEqual(MENU);
  });

  it('shows the full menu when loading navigation fails', async () => {
    vi.spyOn(dataStore, 'getNavigation').mockRejectedValue(new Error('network down'));
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    await renderHeader();
    expect(desktopLabels()).toEqual(MENU);
  });

  it('still shows the menu when site settings fail to load', async () => {
    vi.spyOn(dataStore, 'getNavigation').mockResolvedValue([]);
    vi.spyOn(dataStore, 'getSiteSettings').mockRejectedValue(new Error('settings down'));
    await renderHeader();
    expect(desktopLabels()).toEqual(MENU);
  });

  it('uses CMS navigation when the CMS provides items', async () => {
    vi.spyOn(dataStore, 'getNavigation').mockResolvedValue([
      { id: 'n1', label: 'Custom', url: '/custom', order: 1, open_in_new_tab: false }
    ]);
    await renderHeader();
    expect(desktopLabels()).toEqual(['Custom']);
  });

  it('opens a dropdown on hover and on keyboard focus, and closes on Escape', async () => {
    vi.spyOn(dataStore, 'getNavigation').mockResolvedValue([]);
    await renderHeader();
    const aboutWrapper = Array.from(desktopNav().children).find(el => el.textContent?.includes('About')) as HTMLElement;
    const aboutLink = aboutWrapper.querySelector('a') as HTMLAnchorElement;

    await act(async () => { aboutWrapper.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, relatedTarget: document.body })); });
    expect(aboutWrapper.textContent).toContain('Our Team');
    expect(aboutLink.getAttribute('aria-expanded')).toBe('true');

    await act(async () => { aboutWrapper.dispatchEvent(new MouseEvent('mouseout', { bubbles: true, relatedTarget: document.body })); });
    expect(aboutWrapper.textContent).not.toContain('Our Team');

    await act(async () => { aboutLink.focus(); });
    expect(aboutWrapper.textContent).toContain('Our Team');
    await act(async () => { aboutLink.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); });
    expect(aboutWrapper.textContent).not.toContain('Our Team');
  });

  it('keeps the Work With TheDL button and a working mobile hamburger menu', async () => {
    vi.spyOn(dataStore, 'getNavigation').mockResolvedValue([]);
    await renderHeader();
    expect(container.textContent).toContain('Work With TheDL');

    const burger = container.querySelector('button[aria-label="Toggle Navigation Menu"]') as HTMLButtonElement;
    expect(burger.getAttribute('aria-expanded')).toBe('false');
    await act(async () => { burger.click(); });
    expect(burger.getAttribute('aria-expanded')).toBe('true');

    const drawer = container.querySelector('header > div.md\\:hidden') as HTMLElement;
    const drawerText = drawer.textContent ?? '';
    for (const label of MENU) expect(drawerText).toContain(label);
    expect(drawerText).toContain('Librarian Spotlight Africa');
    expect(drawerText).toContain('Work With TheDL');
  });
});
