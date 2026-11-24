/**
 * Returns `url` if it is safe to use as a link target, otherwise `fallback`.
 *
 * Allowed: http(s), mailto, tel, protocol-relative (//host), and in-site
 * relative links (/path, #hash, ?query, path). Blocked: javascript:, data:,
 * vbscript: and any other scheme, plus backslash paths ("/\evil.com"), which
 * some browsers and React Router treat as off-site redirects.
 *
 * Use for every href / Link `to` / redirect whose value comes from CMS data.
 */
const SAFE_SCHEMES = new Set(['http', 'https', 'mailto', 'tel']);

export function safeUrl(url: string | null | undefined, fallback = '#'): string {
  if (typeof url !== 'string') return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;

  // Browsers ignore ASCII control characters and whitespace when parsing the
  // scheme, e.g. "java\tscript:" - strip them before checking.
  const normalized = trimmed.replace(/[\u0000- \u007F]+/g, '');

  if (/^[/]?\\/.test(normalized)) return fallback;

  const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(normalized);
  if (scheme && !SAFE_SCHEMES.has(scheme[1].toLowerCase())) return fallback;

  return trimmed;
}
