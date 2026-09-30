import React, { useState, useEffect } from 'react';
import { Hero } from '../components/public/Hero';
import { QuickExplore } from '../components/public/QuickExplore';
import { AboutTeaser } from '../components/public/AboutTeaser';
import { WhatWeDo } from '../components/public/WhatWeDo';
import { UpskillingSection } from '../components/public/UpskillingSection';
import { BlogTeaserSection } from '../components/public/BlogTeaserSection';
import { InitiativesTeaser } from '../components/public/InitiativesTeaser';
import { EventsTeaser } from '../components/public/EventsTeaser';
import { BehindTheDL } from '../components/public/BehindTheDL';
import { OurWorkAndReach } from '../components/public/OurWorkAndReach';
import { TestimonialsSection } from '../components/public/TestimonialsSection';
import { FreeGiftModal } from '../components/public/FreeGiftModal';
import { Gift } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [showGiftModal, setShowGiftModal] = useState(false);

  // Trigger modal once on initial visit (after brief delay)
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('thedl_seen_gift_modal');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setShowGiftModal(true);
        sessionStorage.setItem('thedl_seen_gift_modal', 'true');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO */}
      <Hero />

      {/* 2. QUICK EXPLORE */}
      <QuickExplore />

      {/* 3. ABOUT THE DIGITAL LIBRARIAN */}
      <AboutTeaser />

      {/* 4. WHAT WE DO */}
      <WhatWeDo />

      {/* 5. UPSKILLING LIBRARY */}
      <UpskillingSection />

      {/* 6. FROM THE BLOG */}
      <BlogTeaserSection />

      {/* 7. OUR INITIATIVES */}
      <InitiativesTeaser />

      {/* 8. EVENTS */}
      <EventsTeaser />

      {/* 9. BEHIND THE DIGITAL LIBRARIAN */}
      <BehindTheDL />

      {/* 10. OUR WORK & REACH (15,000+ Reached & Partner Logos) */}
      <OurWorkAndReach />

      {/* 11. WHAT PEOPLE SAY (Google Reviews Add on Reel) */}
      <TestimonialsSection />

      {/* Floating Free Gift Badge */}
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
