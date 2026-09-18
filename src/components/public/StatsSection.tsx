import React, { useState, useEffect } from 'react';
import { dataStore } from '../../lib/storage';
import { HomepageData } from '../../types';

export const StatsSection: React.FC = () => {
  const [data, setData] = useState<HomepageData | null>(null);

  useEffect(() => {
    dataStore.getHomepageData().then(setData);
    const handleUpdate = () => dataStore.getHomepageData().then(setData);
    window.addEventListener('thedl_storage_update', handleUpdate);
    return () => window.removeEventListener('thedl_storage_update', handleUpdate);
  }, []);

  const stats = data?.stats;

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-brand-dark tracking-tight">
            Built Through Knowledge. Measured Through People.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal">
            TheDL's work has reached individuals, professionals, researchers, libraries, and organizations through training, research, and community initiatives.
          </p>
        </div>

        {/* 3 Stat Cards (Matching Reference Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Stat 1 */}
          <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-sm flex flex-col justify-between hover:border-brand-blue transition-colors">
            <div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-brand-blue tracking-tight">
                {stats?.stat1_value || "15,000+"}
              </div>
              <div className="text-sm font-bold text-brand-dark mt-1">
                {stats?.stat1_label || "People Reached"}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
              {stats?.stat1_sub || "Through learning and training activities on academic, corporate, faith, and social platforms."}
            </p>
          </div>

          {/* Stat 2 */}
          <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-sm flex flex-col justify-between hover:border-brand-blue transition-colors">
            <div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight">
                {stats?.stat2_value || "Africa & Beyond"}
              </div>
              <div className="text-sm font-bold text-brand-dark mt-1">
                {stats?.stat2_label || "Global Reach"}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
              {stats?.stat2_sub || "Connecting people, ideas and opportunities across professional communities in Africa and internationally."}
            </p>
          </div>

          {/* Stat 3 */}
          <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-sm flex flex-col justify-between hover:border-brand-blue transition-colors">
            <div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-brand-dark tracking-tight leading-snug">
                {stats?.stat3_value || "Research • Training • Practice"}
              </div>
              <div className="text-sm font-bold text-brand-dark mt-1">
                {stats?.stat3_label || "Multi-Disciplinary"}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
              {stats?.stat3_sub || "A growing body of published research, hands-on masterclasses, and dedicated community initiatives."}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
