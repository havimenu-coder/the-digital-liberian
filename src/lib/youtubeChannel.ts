/**
 * Real videos from The Digital Librarian's official YouTube channel.
 *
 * Source (verified 2026-11-24):
 * - Channel feed: https://www.youtube.com/feeds/videos.xml?channel_id=UCkAiczDzAG5SHDcQIouN5Ng
 * - Video metadata: YouTube oEmbed / watch pages
 * Titles, IDs, dates and the featured summary are copied verbatim from YouTube.
 *
 * The browser cannot read YouTube's feed directly (no CORS), so this list is
 * static. Update it when different videos should be shown.
 */
export const YOUTUBE_CHANNEL = {
  name: 'The Digital Librarian',
  handle: '@thedigitallibr',
  url: 'https://www.youtube.com/@thedigitallibr',
  channelId: 'UCkAiczDzAG5SHDcQIouN5Ng'
};

export interface ChannelVideo {
  id: string;
  title: string;
  publishedAt: string; // YYYY-MM-DD
  summary?: string;
}

/** Video confirmed in the approved website content document. */
export const FEATURED_VIDEO: ChannelVideo = {
  id: 'CoRkktaf1DI',
  title: 'Librarian to Entrepreneur: The Secret to Turning Your Passion into a Career',
  publishedAt: '2020-08-21',
  summary:
    "Ever wondered how to balance a professional career with your creative passion? In this episode of TTG's Interview, Tosan engages Sylvester Ebhonu— known globally as The Digital Librarian, Creative Director at Sesitech Ventures, and co-founder of the BreakitDown Initiative—to learn how he manages multiple ventures while mentoring the next generation."
};

/** Most recent full-length uploads (Shorts excluded), newest first. */
export const LATEST_VIDEOS: ChannelVideo[] = [
  {
    id: 'adVC-s_k110',
    title: 'Writing, Publishing & Selling (WPS Bootcamp 2026) | From Ideas to Impact',
    publishedAt: '2026-11-17'
  },
  {
    id: '1qCqTb2AMOo',
    title: 'THE DR. VICTORIA OKOJIE LEGACY CONVERSATION',
    publishedAt: '2026-11-01'
  },
  {
    id: 'uu-kHuK7Nc8',
    title: 'Think Before You Share: MIL in the Age of AI (LISSA OOU Global MIL Week 2026)',
    publishedAt: '2026-10-31'
  }
];

export const youtubeWatchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const youtubeThumbnailUrl = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export function findChannelVideo(id: string | null | undefined): ChannelVideo | undefined {
  if (!id) return undefined;
  return [FEATURED_VIDEO, ...LATEST_VIDEOS].find(video => video.id === id);
}
