import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, Award, BookOpen, Mic } from 'lucide-react';

export const InitiativesTeaser: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-dark tracking-tight leading-tight">
            Ideas We Turn Into Action.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Some ideas become more than articles or events. They grow into communities, programmes and initiatives that create opportunities for people to learn, connect and contribute.
          </p>
        </div>

        {/* 2-Column Split: Initiatives on Left, Sylvester Portrait on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: 2 Main Initiative Summary Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Initiative 1: Librarian Spotlight Africa */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-brand-blue transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                  Librarian Spotlight Africa
                </h3>
              </div>
              
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                A leading pan-African platform celebrating librarians, information professionals, and the innovators transforming information access and community education across the continent.
              </p>

              <Link
                to="/initiatives/librarian-spotlight-africa"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark group-hover:text-brand-blue transition-colors"
              >
                <span>Explore Librarian Spotlight Africa</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-blue group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Initiative 2: Upskill & Connect Village */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-brand-blue transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                  Upskill & Connect Village
                </h3>
              </div>
              
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                A purpose-driven learning community where practitioners exchange ideas, participate in AI & ICT masterclasses, and discover cross-border career opportunities.
              </p>

              <Link
                to="/initiatives/upskill-connect-village"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark group-hover:text-brand-blue transition-colors"
              >
                <span>Explore the Village</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-blue group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Bottom Links */}
            <div className="pt-2 flex items-center gap-4 text-xs font-bold text-brand-dark">
              <Link to="/about/sylvester-ebhonu" className="hover:text-brand-blue transition-colors flex items-center gap-1">
                <span>Meet Sylvester</span>
                <ArrowRight className="w-3 h-3 text-brand-blue" />
              </Link>
              <span className="text-slate-300">|</span>
              <Link to="/solutions" className="hover:text-brand-blue transition-colors flex items-center gap-1">
                <span>Explore His Work</span>
                <ArrowRight className="w-3 h-3 text-brand-blue" />
              </Link>
            </div>

          </div>

          {/* Right Column: Sylvester Ebhonu Portrait (Framed neatly as in Screenshot) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border-2 border-brand-dark shadow-lg bg-slate-100">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/images/sylvester-portrait.jpg"
                  alt="Sylvester I. Ebhonu"
                  className="w-full h-full object-cover object-top filter brightness-[1.02]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/sylvester-hero.jpg';
                  }}
                />
              </div>
              <div className="p-4 bg-white border-t border-slate-200">
                <div className="font-serif text-lg font-bold text-brand-dark">
                  Sylvester I. Ebhonu
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Founder & Programme Director · TheDL
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Subnav Tags Bar (Matching Reference Screenshot) */}
        <div className="mt-12 py-4 px-6 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs sm:text-sm font-semibold text-slate-700">
          <Link to="/about/sylvester-ebhonu#research" className="hover:text-brand-blue transition-colors">
            Research
          </Link>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <Link to="/about/sylvester-ebhonu#teaching" className="hover:text-brand-blue transition-colors">
            Teaching
          </Link>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <Link to="/about/sylvester-ebhonu#speaking" className="hover:text-brand-blue transition-colors">
            Speaking
          </Link>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <Link to="/initiatives" className="hover:text-brand-blue transition-colors">
            Projects
          </Link>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <Link to="/about/sylvester-ebhonu#publications" className="hover:text-brand-blue transition-colors">
            Publications
          </Link>
        </div>

      </div>
    </section>
  );
};
