import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, ArrowRight, Globe } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { Initiative } from '../types';

export const InitiativesHubPage: React.FC = () => {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);

  useEffect(() => {
    dataStore.getInitiatives().then(res => setInitiatives(res.filter(i => i.published)));
    const handleUpdate = () => dataStore.getInitiatives().then(res => setInitiatives(res.filter(i => i.published)));
    window.addEventListener('thedl_storage_update', handleUpdate);
    return () => window.removeEventListener('thedl_storage_update', handleUpdate);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-brand-dark text-white py-16 lg:py-20 border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Impact & Community
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              Ideas We Turn Into Action.
            </h1>
            <p className="text-base text-slate-300">
              Some ideas become more than articles or events. They grow into communities, programmes and movements that create opportunities for people to learn, connect and contribute.
            </p>
          </div>
        </div>
      </div>

      {/* Initiatives Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initiatives.map((init) => (
            <div
              key={init.id}
              className="bg-white rounded-2xl border-2 border-brand-dark p-8 flex flex-col justify-between hover:shadow-xl transition-all group"
            >
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4" />
                  <span>Flagship Movement</span>
                </div>

                <h2 className="font-serif text-3xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                  {init.title}
                </h2>

                <p className="font-serif italic text-base text-slate-600 mt-1">
                  “{init.tagline}”
                </p>

                <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                  {init.short_description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={init.slug === 'librarian-spotlight-africa' 
                    ? '/initiatives/librarian-spotlight-africa' 
                    : init.slug === 'upskill-connect-village' 
                      ? '/initiatives/upskill-connect-village' 
                      : `/initiatives/${init.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark group-hover:text-brand-blue transition-colors"
                >
                  <span>Explore Initiative</span>
                  <ArrowRight className="w-4 h-4 text-brand-blue group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
