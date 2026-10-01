import { BlogPost } from '../types';

export interface ParsedWxrPost {
  wp_id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  status: string;
  post_type: string;
  categories: string[];
  tags: string[];
  author: string;
  original_link: string;
  featured_image: string;
  has_featured_image: boolean;
  word_count: number;
  reading_time: string;
  is_duplicate?: boolean;
  duplicate_reason?: string;
  matched_existing_id?: string;
}

export interface WxrParseResult {
  isValidWxr: boolean;
  siteTitle: string;
  siteUrl: string;
  wxrVersion: string;
  totalItems: number;
  postsCount: number;
  pagesCount: number;
  attachmentsCount: number;
  posts: ParsedWxrPost[];
  categoriesSummary: { name: string; count: number }[];
}

/**
 * Robust extraction of text from an XML element, handling namespaces and prefixes
 */
function getXmlNodeValue(parent: Element, tag: string): string {
  const cleanTag = tag.includes(':') ? tag.split(':')[1] : tag;

  // 1. Try standard getElementsByTagName
  const elements = parent.getElementsByTagName(tag);
  if (elements.length > 0 && elements[0].textContent !== null) {
    return elements[0].textContent.trim();
  }

  // 2. Try cleanTag
  const cleanElements = parent.getElementsByTagName(cleanTag);
  if (cleanElements.length > 0 && cleanElements[0].textContent !== null) {
    return cleanElements[0].textContent.trim();
  }

  // 3. Iterate children matching localName or nodeName
  for (let i = 0; i < parent.childNodes.length; i++) {
    const node = parent.childNodes[i] as Element;
    if (node.nodeType === 1) { // ELEMENT_NODE
      if (node.localName === cleanTag || node.nodeName === tag || node.nodeName.endsWith(':' + cleanTag)) {
        return node.textContent?.trim() || '';
      }
    }
  }

  return '';
}

/**
 * Decode common HTML entities
 */
function decodeEntities(str: string): string {
  if (!str) return '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.body.textContent || str;
}

/**
 * Sanitize and clean HTML content while preserving rich text structure
 */
export function sanitizeArticleContent(html: string): string {
  if (!html) return '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Strip dangerous scripts or styles, but preserve iframe (for youtube), images, tables, lists
  const dangerousTags = ['script', 'style', 'noscript', 'meta', 'link'];
  dangerousTags.forEach(tag => {
    doc.querySelectorAll(tag).forEach(el => el.remove());
  });

  // Remove dangerous attributes
  const allElements = doc.querySelectorAll('*');
  allElements.forEach(el => {
    for (let i = el.attributes.length - 1; i >= 0; i--) {
      const attr = el.attributes[i];
      if (attr.name.startsWith('on') || attr.value.trim().toLowerCase().startsWith('javascript:')) {
        el.removeAttribute(attr.name);
      }
    }
  });

  return doc.body.innerHTML.trim();
}

/**
 * Extract content from Elementor JSON if standard content is empty
 */
function recoverElementorContent(elementorJsonStr: string): string {
  if (!elementorJsonStr) return '';
  try {
    const data = JSON.parse(elementorJsonStr);
    if (!Array.isArray(data)) return '';

    let recoveredHtml = '';

    function traverseElements(elements: any[]) {
      if (!Array.isArray(elements)) return;
      for (const el of elements) {
        if (el.widgetType === 'heading' && el.settings?.title) {
          const tag = el.settings.header_size || 'h2';
          recoveredHtml += `<${tag}>${el.settings.title}</${tag}>\n`;
        } else if (el.widgetType === 'text-editor' && el.settings?.editor) {
          recoveredHtml += `${el.settings.editor}\n`;
        } else if (el.widgetType === 'image' && el.settings?.image?.url) {
          recoveredHtml += `<p><img src="${el.settings.image.url}" alt="${el.settings.caption || ''}" /></p>\n`;
        } else if (el.widgetType === 'blockquote' && el.settings?.quote_content) {
          recoveredHtml += `<blockquote><p>${el.settings.quote_content}</p></blockquote>\n`;
        }

        if (el.elements && Array.isArray(el.elements)) {
          traverseElements(el.elements);
        }
      }
    }

    traverseElements(data);
    return recoveredHtml.trim();
  } catch {
    return '';
  }
}

/**
 * Extract the first image found in an HTML snippet
 */
export function extractFirstImageFromHtml(html: string): string | null {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"'>]+)["']/i);
  return match ? match[1] : null;
}

/**
 * Validate that a file or string is a WordPress WXR file
 */
export function validateWxrString(xmlString: string): { isValid: boolean; error?: string } {
  if (!xmlString || xmlString.trim().length === 0) {
    return { isValid: false, error: 'The uploaded file is empty.' };
  }

  if (!xmlString.includes('<rss') && !xmlString.includes('<channel')) {
    return { isValid: false, error: 'This file does not appear to be an RSS / XML file.' };
  }

  if (!xmlString.includes('xmlns:wp=') && !xmlString.includes('<wp:wxr_version>')) {
    return { 
      isValid: false, 
      error: 'This file is an XML document, but not a WordPress WXR export. Please export from WordPress Admin → Tools → Export.' 
    };
  }

  return { isValid: true };
}

/**
 * Parse WordPress WXR XML Export file and return all structured blog posts
 */
export function parseWordPressWxr(
  xmlString: string, 
  existingPosts: BlogPost[] = []
): WxrParseResult {
  const validation = validateWxrString(xmlString);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

  const parserError = xmlDoc.querySelector('parsererror');
  if (parserError) {
    throw new Error('XML parsing syntax error: ' + (parserError.textContent?.slice(0, 150) || 'Malformed XML'));
  }

  // Channel details
  const channel = xmlDoc.querySelector('channel');
  const siteTitle = channel ? getXmlNodeValue(channel, 'title') : 'WordPress Site';
  const siteUrl = channel ? getXmlNodeValue(channel, 'link') : '';
  const wxrVersion = channel ? getXmlNodeValue(channel, 'wp:wxr_version') : '1.2';

  // Attachment map (attachment_id -> image_url)
  const attachmentMap: Record<string, string> = {};
  const items = Array.from(xmlDoc.querySelectorAll('item'));

  let pagesCount = 0;
  let attachmentsCount = 0;
  let postsCount = 0;

  // First pass: extract all attachment images
  items.forEach(item => {
    const postType = getXmlNodeValue(item, 'wp:post_type') || getXmlNodeValue(item, 'post_type');
    if (postType === 'attachment') {
      attachmentsCount++;
      const id = getXmlNodeValue(item, 'wp:post_id') || getXmlNodeValue(item, 'post_id');
      const url = getXmlNodeValue(item, 'wp:attachment_url') || getXmlNodeValue(item, 'attachment_url') || getXmlNodeValue(item, 'guid');
      if (id && url) {
        attachmentMap[id] = url;
      }
    } else if (postType === 'page') {
      pagesCount++;
    } else if (postType === 'post') {
      postsCount++;
    }
  });

  // Second pass: extract blog posts
  const posts: ParsedWxrPost[] = [];
  const categoryCounter: Record<string, number> = {};

  items.forEach((item, index) => {
    const postType = getXmlNodeValue(item, 'wp:post_type') || getXmlNodeValue(item, 'post_type');

    // Only process blog posts
    if (postType !== 'post') {
      return;
    }

    const wp_id = getXmlNodeValue(item, 'wp:post_id') || getXmlNodeValue(item, 'post_id') || `post-${index}`;
    const rawTitle = getXmlNodeValue(item, 'title');
    const title = decodeEntities(rawTitle || 'Untitled Blog Post');

    let slug = getXmlNodeValue(item, 'wp:post_name') || getXmlNodeValue(item, 'post_name');
    if (!slug) {
      slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }
    if (!slug) {
      slug = `post-${wp_id}`;
    }

    const rawDate = getXmlNodeValue(item, 'wp:post_date') || getXmlNodeValue(item, 'post_date') || getXmlNodeValue(item, 'pubDate');
    let dateStr = new Date().toISOString().split('T')[0];
    if (rawDate) {
      try {
        const parsedDate = new Date(rawDate);
        if (!isNaN(parsedDate.getTime())) {
          dateStr = parsedDate.toISOString().split('T')[0];
        }
      } catch {
        // Fallback to today
      }
    }

    const status = getXmlNodeValue(item, 'wp:status') || getXmlNodeValue(item, 'status') || 'publish';
    const original_link = getXmlNodeValue(item, 'link') || getXmlNodeValue(item, 'guid');
    const author = getXmlNodeValue(item, 'dc:creator') || getXmlNodeValue(item, 'creator') || 'Sylvester I. Ebhonu';

    // Categories & Tags
    const categories: string[] = [];
    const tags: string[] = [];
    const catNodes = Array.from(item.querySelectorAll('category'));

    catNodes.forEach(cat => {
      const domain = cat.getAttribute('domain');
      const val = decodeEntities(cat.textContent?.trim() || '');
      if (!val) return;

      if (domain === 'category') {
        if (!categories.includes(val)) {
          categories.push(val);
          categoryCounter[val] = (categoryCounter[val] || 0) + 1;
        }
      } else if (domain === 'post_tag') {
        if (!tags.includes(val)) {
          tags.push(val);
        }
      }
    });

    if (categories.length === 0) {
      categories.push('General');
      categoryCounter['General'] = (categoryCounter['General'] || 0) + 1;
    }

    // Postmeta inspection (thumbnails, elementor)
    let thumbnailId: string | null = null;
    let elementorDataStr: string | null = null;

    const postmetas = Array.from(item.querySelectorAll('wp\\:postmeta, postmeta'));
    postmetas.forEach(meta => {
      const key = getXmlNodeValue(meta, 'wp:meta_key') || getXmlNodeValue(meta, 'meta_key');
      const value = getXmlNodeValue(meta, 'wp:meta_value') || getXmlNodeValue(meta, 'meta_value');

      if (key === '_thumbnail_id') {
        thumbnailId = value;
      } else if (key === '_elementor_data') {
        elementorDataStr = value;
      }
    });

    // Content:encoded
    let rawContent = getXmlNodeValue(item, 'content:encoded') || getXmlNodeValue(item, 'encoded') || '';

    // Elementor fallback recovery if content is empty or incomplete
    if ((!rawContent || rawContent.length < 50) && elementorDataStr) {
      const recovered = recoverElementorContent(elementorDataStr);
      if (recovered && recovered.length > rawContent.length) {
        rawContent = recovered;
      }
    }

    const sanitizedContent = sanitizeArticleContent(rawContent);

    // Excerpt:encoded
    let excerpt = decodeEntities(getXmlNodeValue(item, 'excerpt:encoded') || '');
    if (!excerpt && sanitizedContent) {
      const textOnly = sanitizedContent.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
      excerpt = textOnly.length > 200 ? textOnly.slice(0, 200) + '...' : textOnly;
    }

    // Featured Image Resolution
    let featured_image = '';
    let has_featured_image = false;

    if (thumbnailId && attachmentMap[thumbnailId]) {
      featured_image = attachmentMap[thumbnailId];
      has_featured_image = true;
    } else {
      // Fallback: extract first content image
      const firstImg = extractFirstImageFromHtml(sanitizedContent);
      if (firstImg) {
        featured_image = firstImg;
        has_featured_image = true;
      } else {
        // Fallback default placeholder
        featured_image = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80';
      }
    }

    // Word Count & Reading Time
    const words = sanitizedContent.replace(/<[^>]*>?/gm, ' ').trim().split(/\s+/).filter(Boolean).length;
    const readingTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

    // Duplicate Detection against existing blog posts
    let is_duplicate = false;
    let duplicate_reason: string | undefined;
    let matched_existing_id: string | undefined;

    const matchedPost = existingPosts.find(existing => {
      // Match 1: WordPress Post ID
      if (existing.wp_post_id && String(existing.wp_post_id) === String(wp_id)) {
        duplicate_reason = `Matched WordPress Post ID (#${wp_id})`;
        return true;
      }
      // Match 2: Slug
      if (existing.slug && existing.slug.toLowerCase() === slug.toLowerCase()) {
        duplicate_reason = `Matched URL slug (/${slug})`;
        return true;
      }
      // Match 3: Original Link
      if (original_link && existing.original_link && existing.original_link === original_link) {
        duplicate_reason = 'Matched original WordPress post URL';
        return true;
      }
      // Match 4: Exact Title
      if (existing.title && existing.title.trim().toLowerCase() === title.trim().toLowerCase()) {
        duplicate_reason = 'Matched exact post title';
        return true;
      }
      return false;
    });

    if (matchedPost) {
      is_duplicate = true;
      matched_existing_id = matchedPost.id;
    }

    posts.push({
      wp_id,
      title,
      slug,
      content: sanitizedContent,
      excerpt,
      date: dateStr,
      status,
      post_type: postType,
      categories,
      tags,
      author,
      original_link,
      featured_image,
      has_featured_image,
      word_count: words,
      reading_time: readingTime,
      is_duplicate,
      duplicate_reason,
      matched_existing_id
    });
  });

  // Sort categories by frequency
  const categoriesSummary = Object.entries(categoryCounter)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return {
    isValidWxr: true,
    siteTitle,
    siteUrl,
    wxrVersion,
    totalItems: items.length,
    postsCount: posts.length,
    pagesCount,
    attachmentsCount,
    posts,
    categoriesSummary
  };
}

/**
 * Convert a ParsedWxrPost into the website's BlogPost record
 */
export function convertWxrPostToBlogPost(parsed: ParsedWxrPost): BlogPost {
  return {
    id: `wp-${parsed.wp_id}`,
    title: parsed.title,
    slug: parsed.slug,
    excerpt: parsed.excerpt,
    content: parsed.content,
    featured_image: parsed.featured_image,
    video_url: '',
    category: parsed.categories[0] || 'General',
    tags: parsed.tags.length > 0 ? parsed.tags : ['WordPress', parsed.categories[0] || 'Articles'],
    author_name: parsed.author || 'Sylvester I. Ebhonu',
    author_role: 'Founder & Lead Consultant',
    author_avatar: '/images/sylvester-portrait.png',
    published: parsed.status === 'publish',
    published_at: parsed.date,
    reading_time: parsed.reading_time,
    seo_title: `${parsed.title} | The Digital Librarian`,
    seo_description: parsed.excerpt,
    wp_post_id: parsed.wp_id,
    original_link: parsed.original_link
  };
}
