import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, BookOpen, GraduationCap, Video, Presentation, Library, Sparkles, X } from 'lucide-react';
import { dataStore } from '../../lib/storage';
import { HomepageData } from '../../types';
import { getYouTubeEmbedUrl } from '../../utils/youtube';

export const UpskillingSection: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [homeData, setHomeData] = useState<HomepageData | null>(null);

  useEffect(() => {
    dataStore.getHomepageData().then(setHomeData);
  }, []);

  const featured = homeData?.featured_learning;

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
                src={featured?.thumbnail_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"}
                alt={featured?.title || "The Digital You Masterclass Preview"}
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
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
                {featured?.subtitle || "Featured Course / Masterclass"}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                {featured?.title || "The Digital You: Personal Branding, AI & Digital Presence Masterclass"}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {featured?.description || "A high-impact practical masterclass designed by Sylvester Ebhonu for educators, librarians, researchers and knowledge workers on building a credible digital identity, deploying AI tools for productivity, and positioning for global opportunities."}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to={featured?.cta_url || "/upskilling-library"}
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
                  <span>Watch Trailer</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-brand-dark rounded-2xl overflow-hidden shadow-2xl border border-blue-900">
            <div className="flex items-center justify-between p-4 border-b border-blue-900/60 bg-brand-dark">
              <span className="font-serif font-bold text-white text-base">
                {featured?.title || "The Digital You Masterclass Trailer"}
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
                src={featured?.video_url ? getYouTubeEmbedUrl(featured.video_url, { autoplay: true }) : "https://www.youtube-nocookie.com/embed/CoRkktaf1DI?autoplay=1"}
                title={featured?.title || "The Digital Librarian Masterclass"}
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
