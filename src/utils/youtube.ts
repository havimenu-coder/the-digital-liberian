/**
 * Utility functions for extracting YouTube video IDs and generating responsive embed URLs.
 */

export function getYouTubeVideoId(url: string | undefined | null): string | null {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  // Direct 11-char ID check
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    // Regular expressions covering standard watch, shorts, live, embed, and youtu.be shortlinks
    const patterns = [
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i,
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/)?([a-zA-Z0-9_-]{11})/i
    ];

    for (const pattern of patterns) {
      const match = trimmed.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    // Try parsing as standard URL object
    let parsed: URL;
    try {
      parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    } catch {
      return null;
    }

    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace(/^\//, '').split(/[\/?#]/)[0];
      if (id && id.length === 11) return id;
    }

    if (parsed.hostname.includes('youtube.com')) {
      const v = parsed.searchParams.get('v');
      if (v && v.length === 11) return v;

      const pathParts = parsed.pathname.split('/').filter(Boolean);
      const lastPart = pathParts[pathParts.length - 1];
      if (['embed', 'v', 'shorts', 'live'].includes(pathParts[0]) && lastPart && lastPart.length === 11) {
        return lastPart;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function getYouTubeEmbedUrl(
  url: string | undefined | null,
  options: { autoplay?: boolean; rel?: boolean } = {}
): string | null {
  const id = getYouTubeVideoId(url);
  if (!id) return null;

  const params = new URLSearchParams();
  if (options.autoplay) params.set('autoplay', '1');
  if (options.rel === false) params.set('rel', '0');

  const queryString = params.toString();
  return `https://www.youtube-nocookie.com/embed/${id}${queryString ? `?${queryString}` : ''}`;
}

export function getYouTubeThumbnail(url: string | undefined | null, quality: 'default' | 'hq' | 'maxres' = 'hq'): string | null {
  const id = getYouTubeVideoId(url);
  if (!id) return null;

  switch (quality) {
    case 'maxres':
      return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    case 'default':
      return `https://img.youtube.com/vi/${id}/default.jpg`;
    case 'hq':
    default:
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
}
