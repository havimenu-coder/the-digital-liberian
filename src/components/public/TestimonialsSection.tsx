import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink, CheckCircle } from 'lucide-react';
import { dataStore } from '../../lib/storage';
import { Testimonial } from '../../types';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dataStore.getTestimonials().then(setTestimonials);
    const handleUpdate = () => dataStore.getTestimonials().then(setTestimonials);
    window.addEventListener('thedl_storage_update', handleUpdate);
    return () => window.removeEventListener('thedl_storage_update', handleUpdate);
  }, []);

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex % (testimonials.length || 1)];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              WHAT PEOPLE SAY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-dark tracking-tight leading-tight mt-1.5">
              Google Reviews & Community Feedback
            </h2>
            <p className="mt-2 text-base text-slate-600 font-normal">
              Real reflections and reviews from our global learning network and institutional partners.
            </p>
          </div>

          {/* Google Reviews Badge Reel Header */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4 flex-shrink-0">
            {/* Google G icon */}
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-800 text-sm">Google Rating</span>
                <span className="font-serif font-bold text-amber-500 text-sm">5.0</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                Verified Community Reviews Reel
              </div>
            </div>

            <a
              href="https://g.page/r/review"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:text-brand-dark transition-colors border-l border-slate-200 pl-4 py-1"
            >
              <span>Add Review</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Google Reviews Add-on Reel Container */}
        {testimonials.length > 0 && current && (
          <div className="relative bg-brand-dark text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-blue-900/60">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-brand-blue/15 rounded-full blur-[120px] pointer-events-none" />

            {/* Giant Watermark Quote */}
            <div className="absolute top-6 left-8 text-brand-blue/20">
              <Quote className="w-16 h-16 rotate-180" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 pt-4">
              
              {/* Star Rating Reel */}
              <div className="flex justify-center text-amber-400 gap-1">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-slate-100 italic leading-relaxed">
                "{current.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="pt-4">
                <div className="font-sans font-bold text-white text-lg">
                  {current.name}
                </div>
                <div className="text-sm text-brand-blue font-medium mt-0.5">
                  {current.role} · {current.organization}
                </div>
                {current.location_context && (
                  <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                    {current.location_context}
                  </div>
                )}
              </div>

              {/* Prev / Next Reel Carousel Controls */}
              <div className="flex items-center justify-center gap-6 pt-8 border-t border-blue-900/50">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-blue-950/80 border border-blue-800 hover:bg-brand-blue hover:text-white flex items-center justify-center text-slate-300 transition-all active:scale-90"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === currentIndex % testimonials.length
                          ? 'w-8 bg-brand-blue'
                          : 'w-2 bg-blue-900'
                      }`}
                      aria-label={`Go to review ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-blue-950/80 border border-blue-800 hover:bg-brand-blue hover:text-white flex items-center justify-center text-slate-300 transition-all active:scale-90"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
