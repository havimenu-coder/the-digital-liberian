import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Library, BookMarked, Cpu, GraduationCap, MonitorPlay, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { Service } from '../types';

const getServiceIcon = (icon: string) => {
  switch (icon.toLowerCase()) {
    case 'library': return <Library className="w-8 h-8 text-brand-dark" />;
    case 'bookmarked':
    case 'research': return <BookMarked className="w-8 h-8 text-brand-dark" />;
    case 'cpu':
    case 'ai': return <Cpu className="w-8 h-8 text-brand-dark" />;
    case 'graduationcap':
    case 'capacity': return <GraduationCap className="w-8 h-8 text-brand-dark" />;
    case 'monitorplay':
    case 'media': return <MonitorPlay className="w-8 h-8 text-brand-dark" />;
    default: return <Briefcase className="w-8 h-8 text-brand-dark" />;
  }
};

export const SolutionsHubPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    dataStore.getServices().then(res => setServices(res.filter(s => s.published)));
    const handleUpdate = () => dataStore.getServices().then(res => setServices(res.filter(s => s.published)));
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
              Professional Solutions
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              Practical Expertise. Real Solutions.
            </h1>
            <p className="text-base text-slate-300 max-w-2xl">
              Comprehensive institutional and individual services bridging modern libraries, scholarly publishing, artificial intelligence, and digital media.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border-2 border-brand-dark p-7 flex flex-col justify-between hover:shadow-xl transition-all group"
            >
              <div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl inline-block mb-5 group-hover:bg-brand-blue-light transition-colors">
                  {getServiceIcon(service.icon)}
                </div>

                <h3 className="font-serif text-2xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors mb-3">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.short_description}
                </p>

                {/* Features list */}
                {service.features && service.features.length > 0 && (
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  to={`/solutions/${service.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark group-hover:text-brand-blue transition-colors"
                >
                  <span>{service.cta_text || 'Explore Solution'}</span>
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
