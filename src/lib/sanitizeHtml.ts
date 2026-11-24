import createDOMPurify from 'dompurify';
import type { DOMPurify as DOMPurifyInstance } from 'dompurify';

/**
 * Central HTML sanitizer for every piece of rich-text content rendered as HTML
 * (blog posts, page-builder sections, WordPress imports, admin previews).
 *
 * SECURITY RULES
 * - Never render CMS/imported HTML with dangerouslySetInnerHTML directly.
 *   Use <SafeHtml> (src/components/common/SafeHtml.tsx), which calls this.
 * - Only extend the iframe allowlist below; do not loosen the config elsewhere.
 */

// Embeds allowed inside rich text. Anything else in an <iframe> is removed.
const ALLOWED_IFRAME_SRC =
  /^(?:https:)?\/\/(?:www\.)?(?:youtube\.com|youtube-nocookie\.com)\/embed\/|^(?:https:)?\/\/player\.vimeo\.com\/video\//i;

const CONFIG = {
  USE_PROFILES: { html: true }, // HTML only: no SVG / MathML (common mXSS vectors)
  ADD_TAGS: ['iframe'],
  ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'target'],
  FORBID_TAGS: [
    'form', 'input', 'button', 'textarea', 'select', 'option',
    'object', 'embed', 'base', 'meta', 'link', 'style'
  ],
  FORBID_ATTR: ['srcdoc', 'formaction']
};

let purifier: DOMPurifyInstance | null = null;

// A dedicated instance so these hooks never affect any other DOMPurify user,
// and hooks are registered exactly once.
function getPurifier(): DOMPurifyInstance {
  if (purifier) return purifier;
  const instance = createDOMPurify(window);

  instance.addHook('uponSanitizeElement', (node, data) => {
    if (data.tagName !== 'iframe') return;
    const src = (node as Element).getAttribute?.('src') || '';
    if (!ALLOWED_IFRAME_SRC.test(src.trim())) {
      node.parentNode?.removeChild(node);
    }
  });

  instance.addHook('afterSanitizeAttributes', node => {
    if (node.nodeName === 'A' && (node as Element).getAttribute('target') === '_blank') {
      (node as Element).setAttribute('rel', 'noopener noreferrer');
    }
  });

  purifier = instance;
  return instance;
}

export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return '';
  return getPurifier().sanitize(html, CONFIG) as string;
}

/** Same heuristic the renderers already use to decide "HTML vs plain text". */
export function looksLikeHtml(value: unknown): value is string {
  return typeof value === 'string' && /<[a-z][\s\S]*>/i.test(value);
}
