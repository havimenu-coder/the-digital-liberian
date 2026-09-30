import React, { useState, useEffect } from 'react';
import { Users, Globe, Award, Sparkles, Building2 } from 'lucide-react';
import { dataStore } from '../../lib/storage';
import { Partner } from '../../types';

export const OurWorkAndReach: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    dataStore.getPartners().then(setPartners);
    const handleUpdate = () => dataStore.getPartners().then(setPartners);
    window.addEventListener('thedl_storage_update', handleUpdate);
    return () => window.removeEventListener('thedl_storage_update', handleUpdate);
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
            OUR WORK & REACH
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-dark tracking-tight leading-tight mt-1.5">
            Built Through People, Partnerships and Practice.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            TheDL's work has reached individuals, professionals, researchers, libraries, educational institutions and organisations through training, research, professional programmes, digital initiatives, speaking engagements and collaborations.
          </p>
        </div>

        {/* Highlight Reach Banner with 15,000+ stat */}
        <div className="bg-brand-dark rounded-2xl p-8 sm:p-12 text-white border border-blue-900/60 shadow-xl mb-14 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
            
            {/* Primary Stat Card */}
            <div className="md:border-r md:border-blue-900/60 md:pr-8">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-brand-blue" />
                <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">Impact Milestone</span>
              </div>
              <div className="font-serif text-5xl sm:text-6xl font-bold text-white tracking-tight">
                15,000+
              </div>
              <p className="text-sm sm:text-base text-slate-200 mt-2 font-medium">
                People reached through learning and training activities
              </p>
            </div>

            {/* Global Reach */}
            <div className="md:border-r md:border-blue-900/60 md:pr-8">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-6 h-6 text-brand-blue" />
                <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">Territories</span>
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Africa & Beyond
              </div>
              <p className="text-sm text-slate-300 mt-2">
                Connecting professionals, researchers and libraries across Nigeria, Ghana, Kenya, South Africa, and international networks.
              </p>
            </div>

            {/* Practice & Research */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 text-brand-blue" />
                <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">Core Disciplines</span>
              </div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                Research · AI · Practice
              </div>
              <p className="text-sm text-slate-300 mt-2">
                Published academic studies, hands-on automation setups, digital workflows, and active practitioner masterclasses.
              </p>
            </div>

          </div>
        </div>

        {/* Partner / Institution Logos Section */}
        <div>
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
              [PARTNER / INSTITUTION LOGOS]
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark mt-1">
              Engaged by Institutions. Trusted by Professionals.
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-brand-blue hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center h-32 group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-200/80 group-hover:bg-brand-blue/10 flex items-center justify-center text-slate-600 group-hover:text-brand-blue transition-colors mb-2">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="font-serif font-bold text-xs sm:text-sm text-brand-dark group-hover:text-brand-blue transition-colors leading-tight">
                  {partner.name}
                </div>
                {partner.description && (
                  <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                    {partner.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
