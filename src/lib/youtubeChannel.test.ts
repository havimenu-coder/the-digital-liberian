import { describe, it, expect } from 'vitest';
import { FEATURED_VIDEO, LATEST_VIDEOS, YOUTUBE_CHANNEL, findChannelVideo, youtubeThumbnailUrl, youtubeWatchUrl } from './youtubeChannel';

describe('youtubeChannel data', () => {
  const all = [FEATURED_VIDEO, ...LATEST_VIDEOS];

  it('features the confirmed video from the approved content document', () => {
    expect(FEATURED_VIDEO.id).toBe('CoRkktaf1DI');
  });

  it('uses valid, unique YouTube video IDs, titles and dates', () => {
    expect(new Set(all.map(v => v.id)).size).toBe(all.length);
    for (const video of all) {
      expect(video.id).toMatch(/^[A-Za-z0-9_-]{11}$/);
      expect(video.title.trim().length).toBeGreaterThan(0);
      expect(video.title).not.toMatch(/&amp;|&quot;|lorem|placeholder/i);
      expect(video.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('builds official YouTube URLs only', () => {
    expect(youtubeWatchUrl('CoRkktaf1DI')).toBe('https://www.youtube.com/watch?v=CoRkktaf1DI');
    expect(youtubeThumbnailUrl('CoRkktaf1DI')).toBe('https://i.ytimg.com/vi/CoRkktaf1DI/hqdefault.jpg');
    expect(YOUTUBE_CHANNEL.url).toBe('https://www.youtube.com/@thedigitallibr');
  });

  it('finds channel videos by id', () => {
    expect(findChannelVideo('CoRkktaf1DI')?.title).toBe(FEATURED_VIDEO.title);
    expect(findChannelVideo('xxxxxxxxxxx')).toBeUndefined();
    expect(findChannelVideo(null)).toBeUndefined();
  });
});
