import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import React, { act } from 'react';
import { renderAt, submitForm, flush } from '../test/render';
import { dataStore } from '../lib/storage';
import { initialEvents, initialHonorees, initialTeamMembers } from '../lib/seedData';
import { FORM_SUBMIT_ERROR_MESSAGE } from './common/FormSubmitError';
import { ContactPage } from '../pages/ContactPage';
import { EventDetailPage } from '../pages/EventDetailPage';
import { LibrarianSpotlightAfricaPage } from '../pages/LibrarianSpotlightAfricaPage';
import { FreeGiftModal } from './public/FreeGiftModal';

let cleanup: (() => void) | undefined;
afterEach(() => { cleanup?.(); cleanup = undefined; });
beforeEach(() => { vi.spyOn(console, 'error').mockImplementation(() => {}); });

const failSave = () => vi.spyOn(dataStore, 'saveSubmission').mockRejectedValue(new Error('Failed to submit form: table missing'));
const alertText = (c: HTMLElement) => c.querySelector('[role="alert"]')?.textContent ?? null;

describe('forms show a clear error and never claim success when saving fails', () => {
  it('contact form', async () => {
    failSave();
    const r = await renderAt(<ContactPage />, { path: '/contact', route: '/contact' });
    cleanup = r.unmount;
    await submitForm(r.container.querySelector('form')!);
    expect(alertText(r.container)).toBe(FORM_SUBMIT_ERROR_MESSAGE);
    expect(r.container.textContent).not.toContain('Message Sent Successfully');
    expect((r.container.querySelector('button[type="submit"]') as HTMLButtonElement).disabled).toBe(false);
  });

  it('contact form: success path still works and shows no error', async () => {
    vi.spyOn(dataStore, 'saveSubmission').mockResolvedValue({} as any);
    const r = await renderAt(<ContactPage />, { path: '/contact', route: '/contact' });
    cleanup = r.unmount;
    await submitForm(r.container.querySelector('form')!);
    expect(r.container.textContent).toContain('Message Sent Successfully');
    expect(alertText(r.container)).toBeNull();
  });

  it('free gift form', async () => {
    failSave();
    const r = await renderAt(<FreeGiftModal isOpen onClose={() => {}} />);
    cleanup = r.unmount;
    await submitForm(r.container.querySelector('form')!);
    expect(alertText(r.container)).toBe(FORM_SUBMIT_ERROR_MESSAGE);
    expect(r.container.textContent).not.toContain('Request Received');
  });

  it('event registration form (and no WhatsApp redirect)', async () => {
    failSave();
    vi.spyOn(dataStore, 'getEvents').mockResolvedValue(structuredClone(initialEvents));
    const timeoutSpy = vi.spyOn(window, 'setTimeout');
    const r = await renderAt(<EventDetailPage />, { path: '/events/:slug', route: '/events/ai-masterclass-workshop' });
    cleanup = r.unmount;
    timeoutSpy.mockClear();
    await submitForm(r.container.querySelector('form')!);
    expect(alertText(r.container)).toBe(FORM_SUBMIT_ERROR_MESSAGE);
    expect(r.container.textContent).not.toContain('Registration Confirmed');
    expect(timeoutSpy.mock.calls.some(([, ms]) => ms === 2000)).toBe(false);
  });

  it('LSA nomination and impact survey forms', async () => {
    failSave();
    vi.spyOn(dataStore, 'getHonorees').mockResolvedValue(structuredClone(initialHonorees));
    vi.spyOn(dataStore, 'getTeamMembers').mockResolvedValue(structuredClone(initialTeamMembers));
    const r = await renderAt(<LibrarianSpotlightAfricaPage />);
    cleanup = r.unmount;
    const clickTab = async (label: string) => {
      const tab = Array.from(r.container.querySelectorAll('button')).find(b => b.textContent?.trim() === label)!;
      await act(async () => { tab.click(); });
      await flush();
    };

    await clickTab('Nominate Honoree');
    await submitForm(r.container.querySelector('form')!);
    expect(alertText(r.container)).toBe(FORM_SUBMIT_ERROR_MESSAGE);
    expect(r.container.textContent).not.toContain('Nomination Submitted');

    await clickTab('Impact & Review Survey');
    await submitForm(r.container.querySelector('form')!);
    expect(alertText(r.container)).toBe(FORM_SUBMIT_ERROR_MESSAGE);
    expect(r.container.textContent).not.toContain('Thank You For Your Insights');
  });
});
