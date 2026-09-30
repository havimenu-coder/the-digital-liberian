import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, ExternalLink, Globe } from 'lucide-react';

export const InitiativesTeaser: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              OUR INITIATIVES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-dark tracking-tight leading-tight mt-1.5">
              Ideas We Turn Into Action.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Some ideas become more than articles or events. They grow into communities, programmes and initiatives that create opportunities for people to learn, connect and contribute.
            </p>
          </div>

          <Link
            to="/initiatives"
            className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-blue text-white px-7 py-3 rounded-md text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95 flex-shrink-0"
          >
            <span>Explore Our Initiatives</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2 Main Initiative Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Librarian Spotlight Africa */}
          <div className="bg-white rounded-2xl border-2 border-slate-200/90 p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-brand-blue transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Award className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  <Globe className="w-3 h-3" />
                  Pan-African Platform
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors mb-3">
                Librarian Spotlight Africa
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                A platform celebrating librarians, information professionals and the people shaping the future of librarianship and information work across Africa.
              </p>
            </div>

            <div className="pt-6 mt-8 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/initiatives/librarian-spotlight-africa"
                className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-blue text-white px-6 py-2.5 rounded-md text-sm font-semibold transition-all shadow-sm active:scale-95"
              >
                <span>Explore Librarian Spotlight Africa</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Upskill & Connect Village */}
          <div className="bg-white rounded-2xl border-2 border-slate-200/90 p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Users className="w-7 h-7" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Active Community
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark group-hover:text-emerald-600 transition-colors mb-3">
                Upskill & Connect Village
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                A learning and professional community where people can learn, share knowledge, discover opportunities and connect with others.
              </p>
            </div>

            <div className="pt-6 mt-8 border-t border-slate-100 flex items-center justify-between">
              <a
                href="https://chat.whatsapp.com/BeYzmeB5lUP8TXqUwMNWlD"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-md text-sm font-semibold transition-all shadow-sm active:scale-95"
              >
                <span>Join the Village</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <Link
                to="/initiatives/upskill-connect-village"
                className="text-xs font-bold text-slate-500 hover:text-brand-dark transition-colors"
              >
                Learn More →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
