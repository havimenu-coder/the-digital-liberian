import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, BookOpen, GraduationCap, Video, Presentation, Library, Sparkles, X, Youtube, ExternalLink } from 'lucide-react';
import { dataStore } from '../../lib/storage';
import { safeUrl } from '../../lib/safeUrl';
import { HomepageData } from '../../types';
import { getYouTubeEmbedUrl, getYouTubeVideoId } from '../../utils/youtube';
import {
  FEATURED_VIDEO,
  LATEST_VIDEOS,
  YOUTUBE_CHANNEL,
  findChannelVideo,
  youtubeThumbnailUrl,
  youtubeWatchUrl
} from '../../lib/youtubeChannel';

const formatVideoDate = (isoDate: string) =>
  new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export const UpskillingSection: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [homeData, setHomeData] = useState<HomepageData | null>(null);

  useEffect(() => {
    dataStore.getHomepageData().then(setHomeData);
  }, []);

  const featured = homeData?.featured_learning;

  // Featured video: the CMS video if set, otherwise the confirmed channel video.
  // Title, thumbnail and summary come from the real YouTube video, not template copy.
  const featuredVideoId = getYouTubeVideoId(featured?.video_url) || FEATURED_VIDEO.id;
  const channelVideo = findChannelVideo(featuredVideoId);
  const videoTitle = channelVideo?.title || featured?.title || FEATURED_VIDEO.title;
  const videoSummary = channelVideo?.summary || featured?.description || '';

  const categories = [
    { label: "Blog", href: "/blog", icon: BookOpen },
    { label: "Courses & Masterclasses", href: "/upskilling-library#courses", icon: GraduationCap },
    { label: "Coaching", href: "/contact?subject=coaching", icon: Sparkles },
    { label: "Tutorials & Recordings", href: "/upskilling-library#tutorials", icon: Video },
    { label: "Presentations & Slides", href: "/upskilling-library#slides", icon: Presentation },
    { label: "Books & Collections", href: "/upskilling-library#books", icon: Library }
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              UPSKILLING LIBRARY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-dark tracking-tight leading-tight mt-1.5">
              Learn. Explore. Keep Growing.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Explore masterclasses, courses, coaching sessions, tutorials, recordings, presentations, books, collections and other resources designed to help you learn and apply something useful.
            </p>
          </div>

          <Link
            to="/upskilling-library"
            className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-blue text-white px-7 py-3 rounded-md text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95 flex-shrink-0"
          >
            <span>Explore the Upskilling Library</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick Category Badges Bar */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.label}
                to={cat.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 hover:border-brand-blue hover:text-brand-blue hover:shadow-sm transition-all"
              >
                <Icon className="w-4 h-4 text-brand-blue" />
                <span>{cat.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Featured Masterclass / Video Card */}
        <div className="bg-brand-dark rounded-2xl overflow-hidden border border-blue-900/60 shadow-xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Video Thumbnail with Play Button */}
            <div className="lg:col-span-6 relative aspect-video bg-blue-950 flex items-center justify-center overflow-hidden group cursor-pointer"
                 onClick={() => setIsVideoModalOpen(true)}>
              <img
                src={youtubeThumbnailUrl(featuredVideoId)}
                alt={`YouTube video thumbnail: ${videoTitle}`}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
              
              {/* Pulsing Play Button */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                <span className="bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm font-medium">Click to Watch Preview</span>
                <span className="bg-brand-blue/80 text-white px-2.5 py-1 rounded font-bold">Featured Video</span>
              </div>
            </div>

            {/* Video Description & Info */}
            <div className="lg:col-span-6 p-6 sm:p-10 space-y-4">
              <div className="inline-flex items-center gap-2 bg-brand-blue/20 text-brand-blue border border-brand-blue/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Youtube className="w-3.5 h-3.5" />
                <span>Featured on YouTube</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                {videoTitle}
              </h3>

              {videoSummary && (
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {videoSummary}
                </p>
              )}

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to={safeUrl(featured?.cta_url, "/upskilling-library")}
                  className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-6 py-2.5 rounded-md text-sm font-semibold transition-all shadow-md active:scale-95"
                >
                  <span>{featured?.cta_text || "Start Learning"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm font-semibold transition-colors py-2"
                >
                  <Play className="w-4 h-4 text-brand-blue fill-current" />
                  <span>Watch Video</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Latest videos from the official YouTube channel */}
        <div className="mt-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark tracking-tight">
              Latest from our YouTube channel
            </h3>
            <a
              href={YOUTUBE_CHANNEL.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-dark transition-colors"
            >
              <span>Visit {YOUTUBE_CHANNEL.handle}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LATEST_VIDEOS.map(video => (
              <a
                key={video.id}
                href={youtubeWatchUrl(video.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover hover:border-brand-blue transition-all"
              >
                <div className="relative aspect-video bg-brand-dark overflow-hidden">
                  <img
                    src={youtubeThumbnailUrl(video.id)}
                    alt={`YouTube video thumbnail: ${video.title}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/10 group-hover:bg-brand-dark/25 transition-colors">
                    <span className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-1.5">
                  <p className="text-sm font-bold text-brand-dark leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors">
                    {video.title}
                  </p>
                  <p className="text-xs text-slate-500">{formatVideoDate(video.publishedAt)}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-brand-dark rounded-2xl overflow-hidden shadow-2xl border border-blue-900">
            <div className="flex items-center justify-between p-4 border-b border-blue-900/60 bg-brand-dark">
              <span className="font-serif font-bold text-white text-base">
                {videoTitle}
              </span>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-blue-900/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src={getYouTubeEmbedUrl(featuredVideoId, { autoplay: true }) || undefined}
                title={videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
