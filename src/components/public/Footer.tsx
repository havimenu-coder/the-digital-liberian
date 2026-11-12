import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Facebook, Linkedin, Instagram, Twitter, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { dataStore } from '../../lib/storage';
import { SiteSettings } from '../../types';

export const Footer: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    dataStore.getSiteSettings().then(setSettings);
    const handleUpdate = () => dataStore.getSiteSettings().then(setSettings);
    window.addEventListener('thedl_storage_update', handleUpdate);
    return () => window.removeEventListener('thedl_storage_update', handleUpdate);
  }, []);

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-12 border-t border-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-blue-900/40">
          
          {/* Brand & Slogan Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center group">
              <div className="h-12 sm:h-16 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
                <img 
                  src="/images/digital-librarian-logo.png" 
                  alt="The Digital Librarian Logo" 
                  className="h-12 sm:h-16 w-auto object-contain filter brightness-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/DIGITAL%20LIBRARIAN%20LOGO3x.png';
                  }}
                />
              </div>
            </Link>

            <p className="text-slate-300 text-sm max-w-sm leading-relaxed">
              {settings?.footer_tagline || "Digital Solutions. Learning. Research. Libraries. AI. Media."}
            </p>

            {/* Contact quick links */}
            <div className="pt-2 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-blue" />
                <a href={settings?.whatsapp_link} target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">
                  {settings?.contact_phone || "07030413987"} (WhatsApp Chat)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-blue" />
                <a href={`mailto:${settings?.contact_email}`} className="hover:text-brand-blue transition-colors">
                  {settings?.contact_email || "didigitallibrarian@gmail.com"}
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-3">
              <h2 className="text-sm font-bold text-white mb-3">
                Follow Me and I&apos;ll Follow Back Immediately 👍🏽
              </h2>
              <a
                href={settings?.social_links.youtube || 'https://youtube.com/@thedigitallibr'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-red-700"
              >
                <Youtube className="h-4 w-4" />
                Subscribe on YouTube
              </a>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                <a href={settings?.social_links.facebook_page || 'https://www.facebook.com/thedigitallibr'} target="_blank" rel="noopener noreferrer" aria-label="Follow on Facebook" className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white">
                  <Facebook className="h-4 w-4" /> Facebook
                </a>
                <a href={settings?.social_links.instagram || 'https://www.instagram.com/thedigitallibr'} target="_blank" rel="noopener noreferrer" aria-label="Follow on Instagram" className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white">
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
                <a href={settings?.social_links.tiktok || 'https://tiktok.com/@thedigitallibr'} target="_blank" rel="noopener noreferrer" aria-label="Follow on TikTok" className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white">
                  <span className="flex h-4 w-4 items-center justify-center font-bold">♪</span> TikTok
                </a>
                <a href={settings?.social_links.twitter || 'https://www.twitter.com/thedigitallibr'} target="_blank" rel="noopener noreferrer" aria-label="Follow on Twitter / X" className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white">
                  <Twitter className="h-4 w-4" /> Twitter / X
                </a>
                <a href={settings?.social_links.linkedin || 'https://www.linkedin.com/in/thedigitallibr'} target="_blank" rel="noopener noreferrer" aria-label="Follow on LinkedIn" className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a href={settings?.social_links.threads || 'https://www.threads.net/@thedigitallibr'} target="_blank" rel="noopener noreferrer" aria-label="Follow on Threads" className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white">
                  <span className="flex h-4 w-4 items-center justify-center font-bold">@</span> Threads
                </a>
              </div>
            </div>
          </div>

          {/* Column: About */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">
              About
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/about" className="hover:text-brand-blue transition-colors">
                  The Digital Librarian
                </Link>
              </li>
              <li>
                <Link to="/about/sylvester-ebhonu" className="hover:text-brand-blue transition-colors">
                  Sylvester Ebhonu
                </Link>
              </li>
              <li>
                <Link to="/about/team" className="hover:text-brand-blue transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/about#values" className="hover:text-brand-blue transition-colors">
                  What We Believe / Approach
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Explore */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/solutions" className="hover:text-brand-blue transition-colors">
                  Solutions & Services
                </Link>
              </li>
              <li>
                <Link to="/upskilling-library" className="hover:text-brand-blue transition-colors">
                  Upskilling Library
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand-blue transition-colors">
                  TheDL Blog & Articles
                </Link>
              </li>
              <li>
                <Link to="/initiatives" className="hover:text-brand-blue transition-colors">
                  Our Initiatives
                </Link>
              </li>
              <li>
                <Link to="/initiatives/librarian-spotlight-africa" className="hover:text-brand-blue transition-colors flex items-center gap-1">
                  Librarian Spotlight Africa
                  <ArrowUpRight className="w-3 h-3 text-brand-blue" />
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-brand-blue transition-colors">
                  Events & Masterclasses
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Connect */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/contact" className="hover:text-brand-blue transition-colors">
                  Work With TheDL
                </Link>
              </li>
              <li>
                <Link to="/contact?subject=partnership" className="hover:text-brand-blue transition-colors">
                  Partnerships
                </Link>
              </li>
              <li>
                <Link to="/initiatives/upskill-connect-village" className="hover:text-brand-blue transition-colors">
                  Join the Community
                </Link>
              </li>
              <li>
                <a 
                  href={settings?.whatsapp_community_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-brand-blue transition-colors flex items-center gap-1"
                >
                  WhatsApp Community
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-blue transition-colors">
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            {settings?.copyright_text || "© 2026 The Digital Librarian. All rights reserved."}
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-slate-200 transition-colors">
              Terms of Use
            </Link>
            <span>·</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
