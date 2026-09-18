import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, BookOpen, Newspaper, Sparkles } from 'lucide-react';
import { dataStore } from '../../lib/storage';
import { HomepageData } from '../../types';

export const QuickExplore: React.FC = () => {
  const [data, setData] = useState<HomepageData | null>(null);

  useEffect(() => {
    dataStore.getHomepageData().then(setData);
    const handleUpdate = () => dataStore.getHomepageData().then(setData);
    window.addEventListener('thedl_storage_update', handleUpdate);
    return () => window.removeEventListener('thedl_storage_update', handleUpdate);
  }, []);

  const featured = data?.featured_learning;

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-dark tracking-tight leading-tight">
            There Is Something to Learn Here.
          </h2>
          <p className="mt-2 text-base sm:text-lg text-slate-600 font-normal">
            Explore curated masterclasses, practical toolkits, and weekly reflections designed to help you build capacity and work smarter.
          </p>
        </div>

        {/* 3 Main Highlight Cards (Matching Reference Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: The Blog */}
          <div className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
            <div className="relative h-44 bg-slate-800 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80"
                alt="TheDL Blog Desk"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-blue bg-brand-dark/90 px-2 py-0.5 rounded">
                  Insights & Essays
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">
                  THE BLOG
                </h3>
              </div>
            </div>
            
            <div className="p-5 flex flex-col justify-between flex-1">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Read practical perspectives, professional reflections, and updates on AI, digital literacy, and libraries.
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-dark group-hover:text-brand-blue transition-colors pt-2 border-t border-slate-100"
              >
                <span>Read the Blog</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-blue group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 2: Upskilling Library */}
          <div className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
            <div className="relative h-44 bg-slate-800 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
                alt="Upskilling Library Resources"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-blue bg-brand-dark/90 px-2 py-0.5 rounded">
                  Learning Vault
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">
                  UPSKILLING LIBRARY
                </h3>
              </div>
            </div>
            
            <div className="p-5 flex flex-col justify-between flex-1">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Masterclasses, books by Sylvester Ebhonu, tutorials, slides, and over 50+ prescribed AI productivity tools.
              </p>
              <Link
                to="/upskilling-library"
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-dark group-hover:text-brand-blue transition-colors pt-2 border-t border-slate-100"
              >
                <span>Explore the Upskilling Library</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-blue group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 3: TheDL Weekly */}
          <div className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
            <div className="relative h-44 bg-slate-800 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&w=800&q=80"
                alt="TheDL Weekly Newsletter"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-blue bg-brand-dark/90 px-2 py-0.5 rounded">
                  Curated Dispatch
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">
                  THEDL WEEKLY
                </h3>
              </div>
            </div>
            
            <div className="p-5 flex flex-col justify-between flex-1">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Periodic updates from The Digital Librarian on important developments, useful discoveries, and emerging trends.
              </p>
              <Link
                to="/blog?filter=weekly"
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-dark group-hover:text-brand-blue transition-colors pt-2 border-t border-slate-100"
              >
                <span>Read TheDL Weekly</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-blue group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* Featured Learning Callout Banner (Matching Reference Screenshot) */}
        <div className="mt-8 bg-brand-dark rounded-xl p-5 sm:p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-900/60 shadow-md">
          
          <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto">
            {/* Video Play Thumbnail */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-blue-950 overflow-hidden flex-shrink-0 border border-blue-800 flex items-center justify-center group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80"
                alt="Masterclass thumbnail"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform"
              />
              <div className="absolute w-10 h-10 rounded-full bg-brand-blue/90 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
            </div>

            {/* Content info */}
            <div>
              <span className="text-[11px] uppercase tracking-wider text-brand-blue font-bold">
                {featured?.title || "Featured on The Upskilling Library"}
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
                {featured?.subtitle || "The Digital You Masterclass"}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl line-clamp-2 mt-1">
                {featured?.description || "Digital presence, professional identity and building a stronger online footprint."}
              </p>
            </div>
          </div>

          {/* Action Link */}
          <div className="flex-shrink-0 w-full md:w-auto">
            <a
              href={featured?.video_url || "https://www.youtube.com/watch?v=CoRkktaf1DI"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded text-sm font-semibold transition-all shadow-sm"
            >
              <span>{featured?.cta_text || "Watch / Explore →"}</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
