import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, GraduationCap, Award, Briefcase, Sparkles, FolderGit2 } from 'lucide-react';

export const BehindTheDL: React.FC = () => {
  const profileAreas = [
    { label: "Professional Profile Summary", hash: "#profile", icon: Briefcase },
    { label: "Career Journey", hash: "#career", icon: GraduationCap },
    { label: "Research & Publications", hash: "#research", icon: BookOpen },
    { label: "Teaching & Facilitation", hash: "#teaching", icon: Sparkles },
    { label: "Projects & Initiatives", hash: "#projects", icon: FolderGit2 },
    { label: "Awards & Recognition", hash: "#awards", icon: Award }
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Framed Sylvester Portrait */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border-2 border-brand-dark shadow-2xl bg-white group">
              <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                <img
                  src="/images/sylvester-portrait.jpg"
                  alt="Sylvester I. Ebhonu"
                  className="w-full h-full object-cover object-top filter brightness-[1.02] group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/sylvester-hero.jpg';
                  }}
                />
              </div>
              <div className="p-5 bg-white border-t border-slate-200">
                <div className="font-serif text-xl font-bold text-brand-dark">
                  Sylvester I. Ebhonu
                </div>
                <div className="text-xs font-semibold text-brand-blue uppercase tracking-wider mt-0.5">
                  Founder & Lead Consultant · TheDL
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Librarian · Researcher · Educator · Speaker
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Copy & Links */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
                BEHIND THE DIGITAL LIBRARIAN
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-dark tracking-tight leading-tight mt-1.5">
                Meet Sylvester Ebhonu
              </h2>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              <p>
                The Digital Librarian is founded and led by Sylvester I. Ebhonu, a librarian, researcher, educator, digital literacy advocate, consultant and speaker working at the intersection of information, technology, learning and professional development.
              </p>
              <p>
                His work spans librarianship, research, AI and digital literacy, teaching, professional development, media and technology, with a growing body of projects, publications, programmes and collaborations.
              </p>
            </div>

            {/* Quick Profile Sections */}
            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Key Professional Areas
              </div>
              <div className="flex flex-wrap gap-2">
                {profileAreas.map((area) => {
                  const Icon = area.icon;
                  return (
                    <Link
                      key={area.label}
                      to={`/about/sylvester-ebhonu${area.hash}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-brand-blue hover:text-brand-blue transition-colors shadow-sm"
                    >
                      <Icon className="w-3.5 h-3.5 text-brand-blue" />
                      <span>{area.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                to="/about/sylvester-ebhonu"
                className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-blue text-white px-7 py-3 rounded-md text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95"
              >
                <span>Explore His Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
