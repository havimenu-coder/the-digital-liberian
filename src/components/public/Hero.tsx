import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataStore } from '../../lib/storage';
import { HomepageData } from '../../types';

export const Hero: React.FC = () => {
  const [data, setData] = useState<HomepageData | null>(null);

  useEffect(() => {
    dataStore.getHomepageData().then(setData);
    const handleUpdate = () => dataStore.getHomepageData().then(setData);
    window.addEventListener('thedl_storage_update', handleUpdate);
    return () => window.removeEventListener('thedl_storage_update', handleUpdate);
  }, []);

  return (
    <section className="relative bg-brand-blue bg-gradient-to-br from-[#009DF6] via-[#0090e3] to-[#0080d0] text-white overflow-hidden pt-6 pb-12 lg:py-16 shadow-inner">
      {/* Background Decorative Ambient Glow & Tech Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-12 left-10 w-96 h-96 bg-brand-dark/25 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Sylvester Portrait (original folding-arms photograph) */}
          <div className="lg:col-span-5 relative flex justify-center order-2 lg:order-1">
            <div className="relative z-10 w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px]">

              {/* Soft ambient glow behind the photo – nothing overlaps the portrait itself */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-white/30 via-brand-dark/20 to-transparent rounded-[2rem] blur-3xl pointer-events-none" aria-hidden="true" />

              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-4 border-white/80 bg-brand-dark/10 shadow-[0_20px_40px_-12px_rgba(0,0,63,0.55)]">
                <img
                  src="/images/sylvester-ebhonu-folding-arms.jpg"
                  alt="Sylvester I. Ebhonu - The Digital Librarian"
                  width={960}
                  height={1200}
                  className="w-full h-full object-cover object-top"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Copy & Calls to Action */}
          <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
            
            <div className="space-y-4">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-white leading-[1.14]">
                Learn something.<br />
                Solve a problem.<br />
                <span className="text-brand-dark font-serif italic font-bold">Build something better.</span>
              </h1>

              <p className="text-base sm:text-lg text-white/95 font-normal leading-relaxed max-w-2xl pt-2">
                The Digital Librarian (TheDL) is a professional platform for digital solutions, learning, research, libraries, media, technology and capacity building — helping individuals and organisations access practical solutions, useful knowledge and expert guidance.
              </p>
            </div>

            {/* Action Buttons: Primary button in dark blue code (#00003F) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#quick-explore"
                className="inline-flex items-center justify-center bg-brand-dark hover:bg-brand-darker text-white px-7 py-3.5 rounded-lg text-base font-bold transition-all shadow-lg hover:shadow-xl hover:translate-y-[-1px] active:translate-y-0 active:scale-95"
              >
                Explore TheDL
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white bg-white/20 hover:bg-brand-dark px-7 py-3.5 rounded-lg text-base font-bold transition-all shadow-sm hover:translate-y-[-1px] active:translate-y-0 active:scale-95"
              >
                Work With TheDL
              </Link>
            </div>

            {/* Inline Ticker Tags List */}
            <div className="pt-6 border-t border-white/25">
              <p className="text-xs sm:text-sm text-white/90 font-medium tracking-wide flex flex-wrap items-center gap-2 sm:gap-3">
                {[
                  "Digital Solutions",
                  "Learning",
                  "Research",
                  "Libraries",
                  "AI & Media",
                  "Technology",
                  "Capacity Building"
                ].map((tag, idx, arr) => (
                  <React.Fragment key={tag}>
                    <span className="hover:text-brand-dark transition-colors cursor-default font-semibold">{tag}</span>
                    {idx < arr.length - 1 && (
                      <span className="text-brand-dark select-none font-bold">·</span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
