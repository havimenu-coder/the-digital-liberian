import React, { useState, useEffect } from 'react';
import { Hero } from '../components/public/Hero';
import { AboutTeaser } from '../components/public/AboutTeaser';
import { WhatWeDo } from '../components/public/WhatWeDo';
import { QuickExplore } from '../components/public/QuickExplore';
import { InitiativesTeaser } from '../components/public/InitiativesTeaser';
import { StatsSection } from '../components/public/StatsSection';
import { TestimonialsSection } from '../components/public/TestimonialsSection';
import { EventsTeaser } from '../components/public/EventsTeaser';
import { ExploreMatrix } from '../components/public/ExploreMatrix';
import { PartnersSection } from '../components/public/PartnersSection';
import { FinalCTA } from '../components/public/FinalCTA';
import { FreeGiftModal } from '../components/public/FreeGiftModal';
import { Gift } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [showGiftModal, setShowGiftModal] = useState(false);

  // Trigger modal once on initial visit (after brief 3-second delay)
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('thedl_seen_gift_modal');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setShowGiftModal(true);
        sessionStorage.setItem('thedl_seen_gift_modal', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Teaser ("More Than a Name") */}
      <AboutTeaser />

      {/* 3. What We Do (5 Service Cards) */}
      <WhatWeDo />

      {/* 4. Quick Explore & Featured Masterclass */}
      <QuickExplore />

      {/* 5. Our Initiatives ("Ideas We Turn Into Action") */}
      <InitiativesTeaser />

      {/* 6. Our Work & Reach ("Built Through Knowledge") */}
      <StatsSection />

      {/* 7. Testimonials ("What People Say About TheDL") */}
      <TestimonialsSection />

      {/* 8. Events ("What's Happening") */}
      <EventsTeaser />

      {/* 9. Explore TheDL Matrix (Read, Learn, Discover, Connect) */}
      <ExploreMatrix />

      {/* 10. Featured Partners & Institutions */}
      <PartnersSection />

      {/* 11. Final Call To Action */}
      <FinalCTA />

      {/* Floating Free Gift Badge (Persistent trigger as requested) */}
      <button
        onClick={() => setShowGiftModal(true)}
        className="fixed bottom-6 right-6 z-40 bg-brand-blue hover:bg-brand-blue-hover text-white px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 active:scale-95 border-2 border-white"
        aria-label="Download Free AI Prescription Toolkit"
      >
        <Gift className="w-4 h-4 animate-bounce" />
        <span className="hidden sm:inline">Free AI Prescription Gift</span>
      </button>

      {/* Lead Capture Free Gift Modal */}
      <FreeGiftModal
        isOpen={showGiftModal}
        onClose={() => setShowGiftModal(false)}
      />
    </div>
  );
};
