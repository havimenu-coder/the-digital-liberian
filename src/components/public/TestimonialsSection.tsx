import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
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

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex % testimonials.length];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="bg-brand-dark text-white py-16 sm:py-20 relative overflow-hidden border-y border-blue-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight">
            What People Say About TheDL
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 uppercase tracking-widest font-medium">
            Experiences from the TheDL Community
          </p>
        </div>

        {/* Testimonial Quote Box (Matching Reference Screenshot) */}
        <div className="relative bg-blue-950/40 rounded-2xl p-8 sm:p-12 border border-blue-900/60 shadow-xl backdrop-blur-sm">
          
          {/* Giant Quote Icon */}
          <div className="absolute top-4 left-6 text-brand-blue opacity-40">
            <Quote className="w-12 h-12 rotate-180 fill-current" />
          </div>

          <div className="relative z-10 text-center space-y-6 pt-4">
            <p className="font-serif text-lg sm:text-2xl text-slate-100 italic leading-relaxed max-w-3xl mx-auto">
              "{current.quote}"
            </p>

            <div className="pt-2">
              <div className="font-sans font-bold text-white text-base tracking-wide">
                {current.name}
              </div>
              <div className="text-xs sm:text-sm text-brand-blue font-medium mt-0.5">
                {current.role} · {current.organization}
              </div>
            </div>
          </div>

          {/* Prev/Next Controls */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8 pt-4 border-t border-blue-900/40">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full bg-blue-900/50 hover:bg-brand-blue hover:text-white flex items-center justify-center text-slate-300 transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentIndex % testimonials.length
                        ? 'w-6 bg-brand-blue'
                        : 'w-2 bg-blue-800'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full bg-blue-900/50 hover:bg-brand-blue hover:text-white flex items-center justify-center text-slate-300 transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
