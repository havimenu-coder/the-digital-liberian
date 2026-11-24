import { describe, it, expect, beforeEach } from 'vitest';
import { dataStore } from './index';
import type { BlogPost, Page } from '../../types';

// No VITE_SUPABASE_* env vars in tests, so dataStore uses localStorage.

const basePost: BlogPost = {
  id: 'post-test', title: 'T', slug: 'xss-test', excerpt: 'e', content: '',
  featured_image: '', category: 'c', tags: [], author_name: 'a', author_role: 'r',
  author_avatar: '', published: true, published_at: '2026-01-01', reading_time: '1 min'
};

const basePage: Page = {
  id: 'page-test', title: 'P', slug: 'xss-page', sections: [], published: true,
  created_at: '', updated_at: ''
};

describe('dataStore sanitizes HTML on save', () => {
  beforeEach(() => localStorage.clear());

  it('sanitizes HTML blog content', async () => {
    await dataStore.saveBlogPost({ ...basePost, content: '<p>ok</p><img src=x onerror=alert(1)>' });
    const saved = (await dataStore.getBlogPosts()).find(p => p.slug === 'xss-test')!;
    expect(saved.content).toContain('<p>ok</p>');
    expect(saved.content).not.toMatch(/onerror/i);
  });

  it('leaves plain-text / markdown blog content untouched', async () => {
    const text = '## Heading\n\nR&D teams < 5 people & "quotes"';
    await dataStore.saveBlogPost({ ...basePost, content: text });
    const saved = (await dataStore.getBlogPosts()).find(p => p.slug === 'xss-test')!;
    expect(saved.content).toBe(text);
  });

  it('sanitizes rich_text/text_block sections but not other section types', async () => {
    await dataStore.savePage({
      ...basePage,
      sections: [
        { id: 's1', type: 'rich_text', order: 1, data: { html: '<p>x</p><script>alert(1)</script>' } },
        { id: 's2', type: 'text_block', order: 2, data: { content: '<a href="javascript:alert(1)">x</a>' } },
        { id: 's3', type: 'hero', order: 3, data: { heading: 'Tom & Jerry <3' } }
      ]
    });
    const saved = await dataStore.getPageBySlug('xss-page');
    const [s1, s2, s3] = saved!.sections;
    expect(s1.data.html).toBe('<p>x</p>');
    expect(s2.data.content).not.toMatch(/javascript:/i);
    expect(s3.data.heading).toBe('Tom & Jerry <3');
  });

  it('sanitizes posts and pages saved through the batch importers', async () => {
    await dataStore.saveBlogPostsBatch([{ ...basePost, id: 'post-b', slug: 'batch-post', content: '<p>b</p><svg onload=alert(1)>' }]);
    const post = (await dataStore.getBlogPosts()).find(p => p.slug === 'batch-post')!;
    expect(post.content).toBe('<p>b</p>');

    await dataStore.savePagesBatch([{ ...basePage, id: 'page-b', slug: 'batch-page', title: 'Batch',
      sections: [{ id: 's', type: 'rich_text', order: 1, data: { html: '<p>c</p><iframe src="https://evil.example"></iframe>' } }] }]);
    const page = await dataStore.getPageBySlug('batch-page');
    expect(page!.sections[0].data.html).toBe('<p>c</p>');
  });
});
