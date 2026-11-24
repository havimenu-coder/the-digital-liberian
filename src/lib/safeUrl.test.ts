import { describe, it, expect } from 'vitest';
import { safeUrl } from './safeUrl';

describe('safeUrl', () => {
  it.each([
    'https://example.com/a?b=c#d',
    'http://example.com',
    '//cdn.example.com/x',
    'mailto:hello@example.com',
    'tel:+2348000000000',
    '/about',
    '/contact?subject=coaching',
    '#section',
    '?q=1',
    'relative/path',
    'https://chat.whatsapp.com/BeYzmeB5lUP8TXqUwMNWlD',
  ])('allows %s', url => {
    expect(safeUrl(url)).toBe(url);
  });

  it.each([
    'javascript:alert(1)',
    'JavaScript:alert(1)',
    '  javascript:alert(1)',
    'java\tscript:alert(1)',
    'java\nscript:alert(1)',
    '\u0001javascript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'vbscript:msgbox(1)',
    'file:///etc/passwd',
    '/\\evil.example',
    '\\\\evil.example',
  ])('blocks %j', url => {
    expect(safeUrl(url)).toBe('#');
  });

  it('uses the fallback for empty or missing values', () => {
    expect(safeUrl(undefined, '/contact')).toBe('/contact');
    expect(safeUrl(null, '/contact')).toBe('/contact');
    expect(safeUrl('   ', '/contact')).toBe('/contact');
    expect(safeUrl('javascript:alert(1)', '/contact')).toBe('/contact');
  });

  it('trims surrounding whitespace from allowed URLs', () => {
    expect(safeUrl('  /about  ')).toBe('/about');
  });
});
