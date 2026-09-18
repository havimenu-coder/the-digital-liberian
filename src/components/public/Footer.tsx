import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Facebook, Linkedin, Instagram, Twitter, Mail, Phone, ArrowUpRight, Lock } from 'lucide-react';
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
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="h-10 sm:h-12 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
                <img 
                  src="/images/logo.png" 
                  alt="The Digital Librarian Logo" 
                  className="h-9 sm:h-11 w-auto object-contain filter brightness-110 drop-shadow-[0_2px_10px_rgba(0,157,246,0.35)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
                  THE DIGITAL
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                  LIBRARIAN
                </span>
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
              <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">
                Follow TheDL
              </div>
              <div className="flex items-center space-x-3">
                <a 
                  href={settings?.social_links.youtube || "https://youtube.com/@didigitallibrarian8254"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-blue-950/60 border border-blue-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-blue transition-all"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href={settings?.social_links.linkedin || "https://linkedin.com/in/sylvester-ebhonu"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-blue-950/60 border border-blue-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-blue transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href={settings?.social_links.facebook_page || "https://facebook.com/didigitallibrarian"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-blue-950/60 border border-blue-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-blue transition-all"
                  aria-label="Facebook Page"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href={settings?.social_links.instagram || "https://instagram.com/didigital_librarian"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-blue-950/60 border border-blue-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-blue transition-all"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href={settings?.social_links.twitter || "https://twitter.com/didigital_libr"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-blue-950/60 border border-blue-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-blue transition-all"
                  aria-label="Twitter / X Profile"
                >
                  <Twitter className="w-4 h-4" />
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
            <Link to="/admin" className="text-slate-500 hover:text-brand-blue transition-colors flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Admin CMS
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
