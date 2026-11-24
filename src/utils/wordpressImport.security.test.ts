import { describe, it, expect } from 'vitest';
import {
  sanitizeWordPressHtml,
  parseWordPressHtml,
  parseWordPressRestItem,
  parseWordPressXml
} from './wordpressImporter';
import { sanitizeArticleContent, parseWordPressWxr, parseWordPressWxrPages } from './wordpressXmlParser';

const MALICIOUS = [
  '<p>Intro paragraph with enough words to be content.</p>',
  '<img src="x" onerror="alert(1)">',
  '<a href="jav&#x09;ascript:alert(1)">bad link</a>',
  '<iframe src="https://evil.example/"></iframe>',
  '<iframe srcdoc="<script>alert(1)</script>"></iframe>',
  '<svg onload="alert(1)"></svg>',
  '<script>alert(1)</script>',
  '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>',
  '<div class="sharedaddy">share buttons</div>'
].join('');

function expectSafe(html: string) {
  expect(html).not.toMatch(/<script/i);
  expect(html).not.toMatch(/\son\w+\s*=/i);
  expect(html).not.toMatch(/javascript:/i);
  expect(html).not.toMatch(/srcdoc/i);
  expect(html).not.toMatch(/evil\.example/i);
  expect(html).not.toMatch(/<svg/i);
}

/** Every rich-text section produced by an importer must be safe too. */
function expectSectionsSafe(sections: { data: Record<string, any> }[]) {
  for (const s of sections) {
    for (const key of ['html', 'content']) {
      if (typeof s.data?.[key] === 'string') expectSafe(s.data[key]);
    }
  }
}

describe('WordPress importers strip script-capable markup', () => {
  it('sanitizeWordPressHtml keeps content and allowed embeds, removes widgets', () => {
    const out = sanitizeWordPressHtml(MALICIOUS);
    expectSafe(out);
    expect(out).toContain('Intro paragraph');
    expect(out).toContain('https://www.youtube.com/embed/dQw4w9WgXcQ');
    expect(out).not.toContain('sharedaddy');
  });

  it('sanitizeArticleContent (XML importer) is safe', () => {
    const out = sanitizeArticleContent(MALICIOUS);
    expectSafe(out);
    expect(out).toContain('Intro paragraph');
  });

  it('parseWordPressHtml (URL / pasted HTML import)', () => {
    const page = `<html><head><title>Imported</title></head><body><article><h1 class="entry-title">Imported</h1><div class="entry-content">${MALICIOUS}</div></article></body></html>`;
    const item = parseWordPressHtml(page, 'https://example.com/imported/');
    expectSafe(item.content);
    expectSectionsSafe(item.sections);
  });

  it('parseWordPressRestItem (REST API import)', () => {
    const item = parseWordPressRestItem({
      id: 7, type: 'post', slug: 'rest-post', date: '2026-01-01T00:00:00',
      title: { rendered: 'REST post' },
      excerpt: { rendered: '<p>Excerpt</p>' },
      content: { rendered: MALICIOUS }
    }, 'https://example.com');
    expectSafe(item.content);
    expectSectionsSafe(item.sections);
  });

  const wxr = (type: 'post' | 'page') => `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wp="http://wordpress.org/export/1.2/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/">
<channel><title>Site</title><link>https://example.com</link><wp:wxr_version>1.2</wp:wxr_version>
<item>
  <title>Malicious ${type}</title><link>https://example.com/malicious-${type}/</link>
  <dc:creator>admin</dc:creator>
  <content:encoded><![CDATA[${MALICIOUS}]]></content:encoded>
  <excerpt:encoded><![CDATA[]]></excerpt:encoded>
  <wp:post_id>101</wp:post_id><wp:post_date>2026-01-01 00:00:00</wp:post_date>
  <wp:post_name>malicious-${type}</wp:post_name><wp:status>publish</wp:status>
  <wp:post_type>${type}</wp:post_type>
</item>
</channel></rss>`;

  it('parseWordPressXml (legacy XML import)', () => {
    const items = parseWordPressXml(wxr('post'));
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      expectSafe(item.content);
      expectSectionsSafe(item.sections);
    }
  });

  it('parseWordPressWxr (blog importer)', () => {
    const result = parseWordPressWxr(wxr('post'));
    expect(result.posts.length).toBe(1);
    expectSafe(result.posts[0].content);
    expect(result.posts[0].content).toContain('Intro paragraph');
  });

  it('parseWordPressWxrPages (page importer)', () => {
    const result = parseWordPressWxrPages(wxr('page'));
    expect(result.pages.length).toBe(1);
    expectSafe(result.pages[0].content);
    expectSectionsSafe((result.pages[0] as any).sections ?? []);
  });
});
