import { describe, it, expect, afterEach, vi } from 'vitest';
import { dataStore } from './index';

// No VITE_SUPABASE_* variables in tests, so Supabase is "not configured".

afterEach(() => {
  vi.unstubAllEnvs();
  localStorage.clear();
});

describe('saveSubmission without a configured database', () => {
  it('in a production build: refuses instead of silently keeping it in the browser', async () => {
    vi.stubEnv('PROD', true);
    await expect(dataStore.saveSubmission({ form_type: 'contact', data: { name: 'A' } }))
      .rejects.toThrow(/database is not configured/);
    expect(localStorage.getItem('thedl_form_submissions')).toBeNull();
  });

  it('in local development: keeps the localStorage behaviour for testing', async () => {
    vi.stubEnv('PROD', false);
    const saved = await dataStore.saveSubmission({ form_type: 'contact', data: { name: 'A' } });
    expect(saved.status).toBe('new');
    expect(JSON.parse(localStorage.getItem('thedl_form_submissions')!)).toHaveLength(1);
  });
});
