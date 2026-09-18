import React, { useState, useEffect } from 'react';
import { dataStore } from '../../lib/storage';
import { Partner } from '../../types';

export const PartnersSection: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    dataStore.getPartners().then(setPartners);
    const handleUpdate = () => dataStore.getPartners().then(setPartners);
    window.addEventListener('thedl_storage_update', handleUpdate);
    return () => window.removeEventListener('thedl_storage_update', handleUpdate);
  }, []);

  return (
    <section className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-brand-dark tracking-tight">
            Featured Partners & Institutions
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Trusted by Professionals. Engaged by Institutions.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col items-center justify-center text-center h-28 hover:border-brand-blue hover:bg-white transition-all group"
            >
              <div className="font-serif font-bold text-xs sm:text-sm text-slate-700 group-hover:text-brand-dark leading-snug">
                {partner.name}
              </div>
              {partner.description && (
                <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                  {partner.description}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
