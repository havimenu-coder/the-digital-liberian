import { PageSection, SectionType } from '../types';
import { getYouTubeVideoId } from './youtube';

export interface WordPressImportedItem {
  id?: string | number;
  type: 'page' | 'post';
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML content
  featured_image?: string;
  date?: string;
  author?: string;
  categories?: string[];
  tags?: string[];
  sections: PageSection[];
  rawSource?: string;
}

/**
 * Decode HTML entities like &#8217;, &amp;, &quot;, &lt;, &gt;
 */
export function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  const doc = new DOMParser().parseFromString(text, 'text/html');
  return doc.body.textContent || text;
}

/**
 * Clean up WordPress HTML content
 */
export function sanitizeWordPressHtml(html: string): string {
  if (!html) return '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Remove scripts, styles, forms, iframes (except allowed video embeds), social share plugins
  const removeSelectors = [
    'script',
    'style',
    'noscript',
    '.sharedaddy',
    '.jp-relatedposts',
    '.wp-block-buttons',
    '.post-navigation',
    '.comments-area',
    '#comments',
    '.widget-area',
    '.sidebar',
    '.edit-link',
    '.social-sharing',
    '.wp-share-buttons'
  ];

  removeSelectors.forEach(sel => {
    doc.querySelectorAll(sel).forEach(el => el.remove());
  });

  return doc.body.innerHTML.trim();
}

/**
 * Extract YouTube URL from an HTML snippet or element
 */
export function extractYouTubeUrlFromHtml(html: string): string | null {
  if (!html) return null;

  // Check iframes
  const iframeMatch = html.match(/src=["'](https?:\/\/(?:www\.)?(?:youtube\.com|youtube-nocookie\.com)\/(?:embed\/|watch\?v=)[^"'\s]+)["']/i);
  if (iframeMatch && iframeMatch[1]) {
    return iframeMatch[1];
  }

  // Check raw youtube links
  const linkMatch = html.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/|live\/)|youtu\.be\/)[a-zA-Z0-9_-]{11}/i);
  if (linkMatch && linkMatch[0]) {
    return linkMatch[0].startsWith('http') ? linkMatch[0] : `https://${linkMatch[0]}`;
  }

  return null;
}

/**
 * Convert WordPress HTML content into modular PageSection blocks
 */
export function convertWordPressContentToSections(
  title: string,
  excerpt: string,
  htmlContent: string,
  featuredImage?: string
): PageSection[] {
  const sections: PageSection[] = [];
  const baseTime = Date.now();
  let orderIndex = 1;

  // 1. Hero Section
  sections.push({
    id: `sec-hero-${baseTime}`,
    type: 'hero',
    order: orderIndex++,
    data: {
      heading: title || 'Imported Page',
      subheading: 'Page Overview',
      description: excerpt || 'Explore this curated content and resources.',
      buttonText: 'Get in Touch',
      buttonUrl: '/contact',
      imageUrl: featuredImage || ''
    }
  });

  // Check for YouTube video in the content
  const detectedYouTube = extractYouTubeUrlFromHtml(htmlContent);
  if (detectedYouTube) {
    sections.push({
      id: `sec-yt-${baseTime + 1}`,
      type: 'youtube_video',
      order: orderIndex++,
      data: {
        heading: 'Featured Presentation',
        subheading: 'Watch Video',
        videoUrl: detectedYouTube,
        description: 'Watch the associated presentation or video walkthrough.',
        caption: title
      }
    });
  }

  // 2. Parse main content elements
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  // Look for blockquotes
  const firstBlockquote = doc.querySelector('blockquote');
  let quoteText = '';
  let quoteAuthor = '';
  if (firstBlockquote) {
    quoteText = firstBlockquote.textContent?.trim() || '';
    const cite = firstBlockquote.querySelector('cite');
    if (cite) quoteAuthor = cite.textContent?.trim() || '';
    firstBlockquote.remove(); // remove so it's not duplicated
  }

  // If there are headings (h2), we can split content into distinct sections, or keep as a clean rich_text block
  const headings = Array.from(doc.querySelectorAll('h2'));

  if (headings.length > 1) {
    // Break into structured sections
    headings.forEach((heading, idx) => {
      const headingText = heading.textContent?.trim() || '';
      let sectionHtml = '';
      let sibling = heading.nextElementSibling;

      while (sibling && sibling.tagName.toLowerCase() !== 'h2') {
        sectionHtml += sibling.outerHTML;
        sibling = sibling.nextElementSibling;
      }

      if (sectionHtml.trim()) {
        sections.push({
          id: `sec-rich-${baseTime + 10 + idx}`,
          type: 'rich_text',
          order: orderIndex++,
          data: {
            heading: headingText,
            html: sectionHtml.trim(),
            content: sectionHtml.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim()
          }
        });
      }
    });
  } else {
    // Single comprehensive rich text block
    const cleanedHtml = doc.body.innerHTML.trim();
    if (cleanedHtml) {
      sections.push({
        id: `sec-rich-${baseTime + 10}`,
        type: 'rich_text',
        order: orderIndex++,
        data: {
          heading: '',
          html: cleanedHtml,
          content: doc.body.textContent?.replace(/\s+/g, ' ').trim() || ''
        }
      });
    }
  }

  // 3. Add Quote Section if blockquote was found
  if (quoteText && quoteText.length > 15) {
    sections.push({
      id: `sec-quote-${baseTime + 50}`,
      type: 'quote',
      order: orderIndex++,
      data: {
        quoteText: quoteText.slice(0, 300),
        quoteAuthor: quoteAuthor || 'Sylvester I. Ebhonu'
      }
    });
  }

  // 4. Final CTA Banner
  sections.push({
    id: `sec-cta-${baseTime + 100}`,
    type: 'cta_banner',
    order: orderIndex++,
    data: {}
  });

  return sections;
}

/**
 * Parse an HTML document and extract page title, slug, content, excerpt, and image
 */
export function parseWordPressHtml(html: string, fallbackUrl?: string): WordPressImportedItem {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // 1. Title
  let title = '';
  const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content');
  const h1 = doc.querySelector('h1.entry-title, h1.wp-block-post-title, h1.post-title, header h1, h1');
  const titleTag = doc.querySelector('title')?.textContent;

  if (ogTitle) {
    title = ogTitle;
  } else if (h1 && h1.textContent?.trim()) {
    title = h1.textContent.trim();
  } else if (titleTag) {
    title = titleTag.split(/[-–—|]/)[0].trim();
  }
  title = decodeHtmlEntities(title);

  // 2. Slug
  let slug = '';
  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href');
  if (canonical) {
    try {
      const parts = new URL(canonical).pathname.split('/').filter(Boolean);
      if (parts.length > 0) slug = parts[parts.length - 1];
    } catch {
      // ignore
    }
  }
  if (!slug && fallbackUrl) {
    try {
      const parts = new URL(fallbackUrl).pathname.split('/').filter(Boolean);
      if (parts.length > 0) slug = parts[parts.length - 1];
    } catch {
      // ignore
    }
  }
  if (!slug && title) {
    slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  if (!slug) slug = `imported-page-${Date.now()}`;

  // 3. Featured Image
  let featured_image: string | undefined;
  const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');
  const twitterImage = doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content');
  const wpPostImage = doc.querySelector('img.wp-post-image, .featured-image img, .post-thumbnail img')?.getAttribute('src');
  const firstContentImg = doc.querySelector('.entry-content img, article img, main img')?.getAttribute('src');

  featured_image = ogImage || twitterImage || wpPostImage || firstContentImg || undefined;

  // 4. Excerpt / Description
  let excerpt = '';
  const ogDesc = doc.querySelector('meta[property="og:description"]')?.getAttribute('content');
  const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content');
  const entrySummary = doc.querySelector('.entry-summary, .post-excerpt')?.textContent?.trim();

  if (ogDesc) excerpt = ogDesc;
  else if (metaDesc) excerpt = metaDesc;
  else if (entrySummary) excerpt = entrySummary;
  excerpt = decodeHtmlEntities(excerpt);

  // 5. Main Content Area
  const contentEl = doc.querySelector(
    '.entry-content, .post-content, .wp-site-blocks, .elementor-widget-theme-post-content, article, main, #content'
  );

  let rawContentHtml = '';
  if (contentEl) {
    rawContentHtml = contentEl.innerHTML;
  } else {
    rawContentHtml = doc.body.innerHTML;
  }

  const sanitizedContent = sanitizeWordPressHtml(rawContentHtml);

  // Fallback excerpt from content text
  if (!excerpt && sanitizedContent) {
    const textDoc = parser.parseFromString(sanitizedContent, 'text/html');
    const firstP = textDoc.querySelector('p')?.textContent?.trim();
    if (firstP) {
      excerpt = firstP.length > 180 ? firstP.slice(0, 180) + '...' : firstP;
    }
  }

  const sections = convertWordPressContentToSections(title, excerpt, sanitizedContent, featured_image);

  return {
    type: 'page',
    title: title || 'Imported WordPress Page',
    slug,
    excerpt,
    content: sanitizedContent,
    featured_image,
    sections,
    rawSource: html
  };
}

/**
 * Fetch a URL via direct fetch or CORS proxy fallback
 */
async function fetchWithCorsFallback(targetUrl: string): Promise<string> {
  // Attempt 1: Direct fetch
  try {
    const directRes = await fetch(targetUrl, {
      headers: {
        'Accept': 'application/json, text/html, */*'
      }
    });
    if (directRes.ok) {
      return await directRes.text();
    }
  } catch (err) {
    // CORS or network error, proceed to fallback proxies
  }

  // Attempt 2: AllOrigins proxy
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
    const res = await fetch(proxyUrl);
    if (res.ok) {
      return await res.text();
    }
  } catch (err) {
    // Try next proxy
  }

  // Attempt 3: CorsProxy.io
  try {
    const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`;
    const res = await fetch(proxyUrl);
    if (res.ok) {
      return await res.text();
    }
  } catch (err) {
    // All proxies failed
  }

  throw new Error(`Unable to fetch ${targetUrl}. The external website may have blocked cross-origin requests. You can paste the page HTML or JSON directly instead.`);
}

/**
 * Import a WordPress page or post given its URL
 */
export async function importWordPressFromUrl(pageUrl: string): Promise<WordPressImportedItem> {
  const trimmed = pageUrl.trim();
  if (!trimmed) throw new Error('Please enter a valid WordPress URL');

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
  } catch {
    throw new Error('Invalid URL format');
  }

  const origin = parsedUrl.origin;
  const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
  const slug = pathParts.length > 0 ? pathParts[pathParts.length - 1] : '';

  // 1. If it's already a direct WP REST API URL (e.g. .../wp-json/wp/v2/pages...)
  if (trimmed.includes('/wp-json/wp/v2/')) {
    const text = await fetchWithCorsFallback(trimmed);
    const json = JSON.parse(text);
    const item = Array.isArray(json) ? json[0] : json;
    if (!item) throw new Error('No items found in the WordPress REST API response');
    return parseWordPressRestItem(item, origin);
  }

  // 2. Try WordPress REST API for pages
  if (slug) {
    try {
      const apiUrl = `${origin}/wp-json/wp/v2/pages?slug=${slug}&_embed`;
      const resText = await fetchWithCorsFallback(apiUrl);
      const json = JSON.parse(resText);
      if (Array.isArray(json) && json.length > 0) {
        return parseWordPressRestItem(json[0], origin);
      }
    } catch {
      // Fallback to posts
    }

    try {
      const postApiUrl = `${origin}/wp-json/wp/v2/posts?slug=${slug}&_embed`;
      const resText = await fetchWithCorsFallback(postApiUrl);
      const json = JSON.parse(resText);
      if (Array.isArray(json) && json.length > 0) {
        return parseWordPressRestItem(json[0], origin);
      }
    } catch {
      // Fallback to HTML scraping
    }
  }

  // 3. Fallback: Fetch raw HTML and parse DOM
  const html = await fetchWithCorsFallback(trimmed);
  return parseWordPressHtml(html, trimmed);
}

/**
 * Parse a single WordPress REST API response item
 */
export function parseWordPressRestItem(item: any, siteOrigin?: string): WordPressImportedItem {
  const title = decodeHtmlEntities(item.title?.rendered || item.title || 'Untitled WordPress Page');
  const slug = item.slug || (title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `wp-${Date.now()}`);
  const contentHtml = sanitizeWordPressHtml(item.content?.rendered || item.content || '');
  const excerpt = decodeHtmlEntities(
    (item.excerpt?.rendered || item.excerpt || '').replace(/<[^>]*>?/gm, '').trim()
  );

  // Extract featured image from embedded media if available
  let featured_image: string | undefined;
  if (item._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    featured_image = item._embedded['wp:featuredmedia'][0].source_url;
  }

  // Author
  const author = item._embedded?.author?.[0]?.name;

  // Date
  const date = item.date;

  const sections = convertWordPressContentToSections(title, excerpt, contentHtml, featured_image);

  return {
    id: item.id,
    type: item.type === 'post' ? 'post' : 'page',
    title,
    slug,
    excerpt,
    content: contentHtml,
    featured_image,
    date,
    author,
    sections,
    rawSource: JSON.stringify(item, null, 2)
  };
}

/**
 * Parse a WordPress WXR XML export file
 */
export function parseWordPressXml(xmlString: string): WordPressImportedItem[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

  const parseError = xmlDoc.querySelector('parsererror');
  if (parseError) {
    throw new Error('Failed to parse XML file: ' + parseError.textContent?.slice(0, 100));
  }

  const items = Array.from(xmlDoc.querySelectorAll('item'));
  const results: WordPressImportedItem[] = [];

  // Map attachments for thumbnail resolution
  const attachmentMap: Record<string, string> = {};
  items.forEach(item => {
    const postType = item.getElementsByTagName('wp:post_type')[0]?.textContent;
    if (postType === 'attachment') {
      const postId = item.getElementsByTagName('wp:post_id')[0]?.textContent;
      const url = item.getElementsByTagName('wp:attachment_url')[0]?.textContent;
      if (postId && url) attachmentMap[postId] = url;
    }
  });

  items.forEach(item => {
    const postType = item.getElementsByTagName('wp:post_type')[0]?.textContent;
    // We only care about pages and posts
    if (postType !== 'page' && postType !== 'post') return;

    const title = decodeHtmlEntities(item.querySelector('title')?.textContent || 'Untitled');
    const slug = item.getElementsByTagName('wp:post_name')[0]?.textContent || '';
    const content = sanitizeWordPressHtml(item.getElementsByTagName('content:encoded')[0]?.textContent || '');
    const excerpt = decodeHtmlEntities(
      (item.getElementsByTagName('excerpt:encoded')[0]?.textContent || '').replace(/<[^>]*>?/gm, '').trim()
    );
    const date = item.getElementsByTagName('wp:post_date')[0]?.textContent || undefined;
    const author = item.querySelector('dc\\:creator, creator')?.textContent || undefined;

    // Find thumbnail id in postmeta
    let featured_image: string | undefined;
    const postmetaList = Array.from(item.getElementsByTagName('wp:postmeta'));
    for (const meta of postmetaList) {
      const key = meta.getElementsByTagName('wp:meta_key')[0]?.textContent;
      if (key === '_thumbnail_id') {
        const thumbId = meta.getElementsByTagName('wp:meta_value')[0]?.textContent;
        if (thumbId && attachmentMap[thumbId]) {
          featured_image = attachmentMap[thumbId];
        }
        break;
      }
    }

    const sections = convertWordPressContentToSections(title, excerpt, content, featured_image);

    results.push({
      type: postType === 'post' ? 'post' : 'page',
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt,
      content,
      featured_image,
      date,
      author,
      sections
    });
  });

  return results;
}
