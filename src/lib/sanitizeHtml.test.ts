import { describe, it, expect } from 'vitest';
import { sanitizeHtml, looksLikeHtml } from './sanitizeHtml';

/** Parse the sanitized output and assert nothing script-capable survived. */
function assertInert(output: string) {
  const doc = new DOMParser().parseFromString(`<body>${output}</body>`, 'text/html');
  expect(doc.querySelectorAll('script, object, embed, base, meta, link, form, style, svg, math').length).toBe(0);
  for (const el of Array.from(doc.body.querySelectorAll('*'))) {
    for (const attr of Array.from(el.attributes)) {
      expect(attr.name.startsWith('on'), `event handler ${attr.name} on <${el.tagName}>`).toBe(false);
      expect(attr.name).not.toBe('srcdoc');
      const value = attr.value.replace(/[\u0000- ]/g, '').toLowerCase();
      expect(value.startsWith('javascript:'), `${attr.name}=${attr.value}`).toBe(false);
      expect(value.startsWith('vbscript:')).toBe(false);
      expect(value.startsWith('data:text/html')).toBe(false);
    }
  }
  for (const iframe of Array.from(doc.querySelectorAll('iframe'))) {
    expect(iframe.getAttribute('src') || '').toMatch(/^(https:)?\/\/(www\.)?(youtube\.com|youtube-nocookie\.com|player\.vimeo\.com)\//);
  }
}

const PAYLOADS: Record<string, string> = {
  'script tag': '<p>hi</p><script>alert(1)</script>',
  'img onerror': '<img src="x" onerror="alert(1)">',
  'svg onload': '<svg onload="alert(1)"><circle /></svg>',
  'body onload': '<body onload="alert(1)">x</body>',
  'javascript: link': '<a href="javascript:alert(1)">click</a>',
  'mixed-case javascript: link': '<a href="JaVaScRiPt:alert(1)">click</a>',
  'entity-encoded javascript: link': '<a href="jav&#x09;ascript:alert(1)">click</a>',
  'leading-space javascript: link': '<a href="  javascript:alert(1)">click</a>',
  'vbscript link': '<a href="vbscript:msgbox(1)">x</a>',
  'data:text/html link': '<a href="data:text/html,<script>alert(1)</script>">x</a>',
  'iframe to other site': '<iframe src="https://evil.example/"></iframe>',
  'iframe javascript src': '<iframe src="javascript:alert(1)"></iframe>',
  'iframe srcdoc': '<iframe srcdoc="<script>alert(1)</script>"></iframe>',
  'form with action': '<form action="https://evil.example"><input name="password"><button>Go</button></form>',
  'button formaction': '<button formaction="javascript:alert(1)">x</button>',
  'base href hijack': '<base href="https://evil.example/">',
  'meta refresh': '<meta http-equiv="refresh" content="0;url=https://evil.example">',
  'object data': '<object data="https://evil.example/x.swf"></object>',
  'embed src': '<embed src="https://evil.example/x.swf">',
  'style tag': '<style>body{display:none}</style>',
  'mathml mXSS': '<math><mtext><table><mglyph><style><img src=x onerror=alert(1)>',
  'noscript mXSS': '<noscript><p title="</noscript><img src=x onerror=alert(1)>">',
  'details ontoggle': '<details open ontoggle="alert(1)">x</details>',
  'video onerror': '<video><source onerror="alert(1)"></video>',
  'anchor in svg': '<svg><a xlink:href="javascript:alert(1)"><text>x</text></a></svg>',
};

describe('sanitizeHtml – removes script-capable markup', () => {
  for (const [name, payload] of Object.entries(PAYLOADS)) {
    it(`neutralises: ${name}`, () => {
      assertInert(sanitizeHtml(payload));
    });
  }

  it('returns an empty string for empty input', () => {
    expect(sanitizeHtml('')).toBe('');
    expect(sanitizeHtml(null)).toBe('');
    expect(sanitizeHtml(undefined)).toBe('');
  });
});

describe('sanitizeHtml – preserves legitimate content', () => {
  it('keeps headings, paragraphs, emphasis and lists', () => {
    const html = '<h2>Title</h2><p>Some <strong>bold</strong> and <em>italic</em> text.</p><ul><li>One</li><li>Two</li></ul><ol><li>A</li></ol>';
    expect(sanitizeHtml(html)).toBe(html);
  });

  it('keeps tables, blockquotes, figures and captions', () => {
    const html = '<table><thead><tr><th>H</th></tr></thead><tbody><tr><td>D</td></tr></tbody></table><blockquote>Quote</blockquote><figure><img src="https://example.com/a.jpg" alt="A"><figcaption>Cap</figcaption></figure>';
    expect(sanitizeHtml(html)).toBe(html);
  });

  it('keeps safe links and image data URIs', () => {
    const out = sanitizeHtml('<a href="https://example.com/page">x</a><a href="/about">y</a><a href="mailto:a@b.co">m</a><img src="data:image/png;base64,iVBORw0KGgo=" alt="">');
    expect(out).toContain('href="https://example.com/page"');
    expect(out).toContain('href="/about"');
    expect(out).toContain('href="mailto:a@b.co"');
    expect(out).toContain('src="data:image/png;base64,iVBORw0KGgo="');
  });

  it('keeps WordPress classes and inline styles used for layout', () => {
    const out = sanitizeHtml('<p class="has-text-align-center" style="text-align:center">Centered</p>');
    expect(out).toContain('class="has-text-align-center"');
    expect(out).toContain('style="text-align:center"');
  });

  it('keeps YouTube, youtube-nocookie and Vimeo embeds with their attributes', () => {
    const yt = '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?feature=oembed" allow="autoplay; encrypted-media" allowfullscreen="" frameborder="0"></iframe>';
    const out = sanitizeHtml(yt);
    expect(out).toContain('src="https://www.youtube.com/embed/dQw4w9WgXcQ?feature=oembed"');
    expect(out).toContain('allowfullscreen');
    expect(out).toContain('allow="autoplay; encrypted-media"');
    expect(sanitizeHtml('<iframe src="https://www.youtube-nocookie.com/embed/abc"></iframe>')).toContain('<iframe');
    expect(sanitizeHtml('<iframe src="//www.youtube.com/embed/abc"></iframe>')).toContain('<iframe');
    expect(sanitizeHtml('<iframe src="https://player.vimeo.com/video/123"></iframe>')).toContain('<iframe');
  });

  it('removes lookalike embed hosts', () => {
    expect(sanitizeHtml('<iframe src="https://youtube.com.evil.example/embed/x"></iframe>')).not.toContain('<iframe');
    expect(sanitizeHtml('<iframe src="http://www.youtube.com/embed/x"></iframe>')).not.toContain('<iframe');
  });

  it('adds rel="noopener noreferrer" to links opening a new tab', () => {
    const out = sanitizeHtml('<a href="https://example.com" target="_blank">x</a>');
    expect(out).toContain('target="_blank"');
    expect(out).toContain('rel="noopener noreferrer"');
  });

  it('is stable when run repeatedly (hooks registered once)', () => {
    const html = '<p>a</p><a href="https://e.com" target="_blank">x</a><iframe src="https://www.youtube.com/embed/x"></iframe>';
    const once = sanitizeHtml(html);
    expect(sanitizeHtml(once)).toBe(once);
    expect(sanitizeHtml(html)).toBe(once);
  });
});

describe('looksLikeHtml', () => {
  it('detects HTML vs plain text', () => {
    expect(looksLikeHtml('<p>x</p>')).toBe(true);
    expect(looksLikeHtml('## Heading\n\nR&D is < 5 people')).toBe(false);
    expect(looksLikeHtml(undefined)).toBe(false);
    expect(looksLikeHtml(42)).toBe(false);
  });
});
