import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { Service } from '../types';

export const SolutionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    dataStore.getServices().then(services => {
      const found = services.find(s => s.slug === slug);
      setService(found || null);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-brand-blue border-t-transparent" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-brand-dark mb-4">Solution Not Found</h2>
        <p className="text-slate-600 mb-6">The requested service could not be located.</p>
        <Link to="/solutions" className="bg-brand-blue text-white px-6 py-2.5 rounded font-semibold text-sm">
          Return to Solutions
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-brand-dark text-white py-16 lg:py-20 border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-1 text-xs text-brand-blue hover:text-white mb-6 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Solutions</span>
          </Link>
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Specialized Solution
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mt-2 leading-tight">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
              {service.short_description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">
                Service Overview & Scope
              </h2>
              <p className="text-slate-700 leading-relaxed text-base">
                {service.full_description}
              </p>
            </div>

            {/* Deliverables / Capabilities */}
            {service.features && service.features.length > 0 && (
              <div className="pt-6 border-t border-slate-200">
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-4">
                  Key Deliverables & Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-800 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quality Guarantee Callout */}
            <div className="p-6 bg-brand-blue-light/40 rounded-2xl border border-brand-blue/30 flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-brand-blue flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-serif text-lg font-bold text-brand-dark">
                  TheDL Commitment to Excellence
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Every institutional consultation and capacity program is backed by 10+ years of certified library leadership, industry-recognized Google certifications, and tailored ongoing support.
                </p>
              </div>
            </div>

          </div>

          {/* Sidebar CTA Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 rounded-2xl border-2 border-brand-dark p-6 space-y-5 sticky top-28">
              <h3 className="font-serif text-xl font-bold text-brand-dark">
                Engage This Solution
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ready to transform your library, academic workflow, or organizational capacity? Reach out directly to discuss your institutional scope and timeline.
              </p>

              <div className="pt-2 space-y-3">
                <Link
                  to={`/contact?subject=${encodeURIComponent(service.title)}`}
                  className="block w-full text-center bg-brand-blue hover:bg-brand-blue-hover text-white py-3 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95"
                >
                  Request Consultation
                </Link>

                <a
                  href="https://wa.me/message/VV5A32BESJYHC1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white py-2.5 rounded-lg text-xs font-bold transition-all"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500">
                Typical response time: Within 24 hours.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
