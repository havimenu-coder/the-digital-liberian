import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Library, BookMarked, Cpu, GraduationCap, MonitorPlay, Briefcase, ArrowRight } from 'lucide-react';
import { dataStore } from '../../lib/storage';
import { Service } from '../../types';

// Icon resolver helper
const renderIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'library':
      return <Library className="w-8 h-8 text-brand-dark" />;
    case 'bookmarked':
    case 'research':
      return <BookMarked className="w-8 h-8 text-brand-dark" />;
    case 'cpu':
    case 'ai':
      return <Cpu className="w-8 h-8 text-brand-dark" />;
    case 'graduationcap':
    case 'capacity':
      return <GraduationCap className="w-8 h-8 text-brand-dark" />;
    case 'monitorplay':
    case 'media':
      return <MonitorPlay className="w-8 h-8 text-brand-dark" />;
    default:
      return <Briefcase className="w-8 h-8 text-brand-dark" />;
  }
};

export const WhatWeDo: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    dataStore.getServices().then(res => setServices(res.filter(s => s.published)));
    const handleUpdate = () => dataStore.getServices().then(res => setServices(res.filter(s => s.published)));
    window.addEventListener('thedl_storage_update', handleUpdate);
    return () => window.removeEventListener('thedl_storage_update', handleUpdate);
  }, []);

  return (
    <section id="what-we-do" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-dark tracking-tight leading-tight">
            What We Do
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            The Digital Librarian works across several connected areas where people, knowledge and technology meet. Practical expertise that solves real organizational challenges.
          </p>
        </div>

        {/* 5 Service Cards Row (Matching Reference Screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {services.slice(0, 5).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border-2 border-brand-dark p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-200 group relative min-h-[280px]"
            >
              <div>
                {/* Icon */}
                <div className="mb-4 p-2.5 rounded-lg bg-slate-50 inline-block border border-slate-200 group-hover:bg-brand-blue-light transition-colors">
                  {renderIcon(service.icon)}
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg font-bold text-brand-dark leading-snug mb-2 group-hover:text-brand-blue transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4">
                  {service.short_description}
                </p>
              </div>

              {/* Bottom Arrow Action Link */}
              <div className="pt-4 mt-auto border-t border-slate-100">
                <Link
                  to={`/solutions/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark group-hover:text-brand-blue transition-colors"
                >
                  <span>Explore Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-brand-blue" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Prompt (Matching Reference Screenshot) */}
        <div className="mt-10 pt-4 flex items-center justify-between flex-wrap gap-4 border-t border-slate-100">
          <div className="text-sm font-medium text-slate-700">
            Need something specific or custom advisory?
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-blue group transition-colors"
          >
            <span>Need something specific? Talk to TheDL</span>
            <ArrowRight className="w-4 h-4 text-brand-blue group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
