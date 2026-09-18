import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { dataStore } from '../../lib/storage';
import { HomepageData } from '../../types';

export const FinalCTA: React.FC = () => {
  const [data, setData] = useState<HomepageData | null>(null);

  useEffect(() => {
    dataStore.getHomepageData().then(setData);
    const handleUpdate = () => dataStore.getHomepageData().then(setData);
    window.addEventListener('thedl_storage_update', handleUpdate);
    return () => window.removeEventListener('thedl_storage_update', handleUpdate);
  }, []);

  const cta = data?.final_cta;

  return (
    <section className="bg-brand-dark text-white py-16 sm:py-20 relative overflow-hidden border-t border-blue-900/60">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue rounded-full blur-[140px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
          {cta?.heading || "Have a Problem Worth Solving?"}
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          {cta?.description || "Whether you need training, professional support, a digital or library solution, research-related guidance, a speaker or facilitator, ICT/media support, or simply want to explore an idea, TheDL is open to meaningful conversations and collaborations."}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to={cta?.primary_btn_url || "/contact"}
            className="inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-3.5 rounded-md text-base font-semibold transition-all shadow-lg active:scale-95"
          >
            <span>{cta?.primary_btn_text || "Talk to TheDL"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to={cta?.secondary_btn_url || "/solutions"}
            className="inline-flex items-center justify-center border border-white/80 hover:bg-white hover:text-brand-dark text-white px-8 py-3.5 rounded-md text-base font-semibold transition-all shadow-sm active:scale-95"
          >
            <span>{cta?.secondary_btn_text || "Explore Solutions"}</span>
          </Link>
        </div>

      </div>
    </section>
  );
};
