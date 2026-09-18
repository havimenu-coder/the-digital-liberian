import React from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, GraduationCap, Users, Play, ArrowRight, ExternalLink, Heart } from 'lucide-react';

export const SylvesterProfilePage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-brand-dark text-white py-16 lg:py-20 border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Founder & Programme Director
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mt-2 leading-tight">
              Sylvester Israel Ebhonu
            </h1>
            <p className="font-serif italic text-lg sm:text-xl text-slate-200 mt-4 leading-relaxed border-l-2 border-brand-blue pl-4">
              “A Global Capacity Builder, Digital Leader, and a Media and Information Professional helping to raise Purpose-Driven Teams and providing cutting-edge Information and Media Solutions.”
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Portrait & Highlights Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border-2 border-brand-dark shadow-xl bg-slate-100">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/images/sylvester-portrait.jpg"
                  alt="Sylvester Israel Ebhonu"
                  className="w-full h-full object-cover object-top"
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
                  The Digital Librarian
                </div>
                <div className="text-xs text-slate-600 mt-2">
                  Head of E-Services, Admiralty University of Nigeria
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-semibold text-brand-dark">Experience:</span>
                <span>10+ Years</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-semibold text-brand-dark">Trained Participants:</span>
                <span>15,000+ Globally</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-semibold text-brand-dark">Google Programme:</span>
                <span>Haptics Certified Trainer</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-brand-dark">Community Convener:</span>
                <span>Branded Librarians</span>
              </div>
            </div>

            {/* Direct Connect */}
            <div className="p-5 bg-brand-blue-light/50 rounded-xl border border-brand-blue/30 text-center space-y-3">
              <div className="text-xs font-bold text-brand-dark uppercase tracking-wider">
                Invite Sylvester to Speak
              </div>
              <p className="text-xs text-slate-600">
                Available for keynotes, workshops, institutional consulting, and corporate training.
              </p>
              <Link
                to="/contact?subject=speaking"
                className="inline-block w-full bg-brand-blue hover:bg-brand-blue-hover text-white py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                Book Speaking Session
              </Link>
            </div>
          </div>

          {/* Right Column: In-depth Biography & 3 Ventures */}
          <div className="lg:col-span-7 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
            
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                About Sylvester
              </h2>
              <p>
                <strong>Sylvester Ebhonu</strong> is a Purpose-Driven Youthrepreneur who believes in taking responsibility for positive change and teamwork, with a deep understanding that people are gifts from God.
              </p>
            </div>

            {/* A Librarian */}
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-xl font-bold text-brand-dark flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-blue" />
                <span>A Librarian</span>
              </h3>
              <p>
                He is a Certified Librarian in Nigeria with over 10 years of experience in library consultations, setup, and administration. He currently serves as the <strong>Head of E-Services at the Admiralty University of Nigeria</strong>, driving electronic resource management, discovery platforms, digital repository infrastructure, and modern cataloguing systems.
              </p>
            </div>

            {/* A Capacity Builder */}
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-xl font-bold text-brand-dark flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brand-blue" />
                <span>A Capacity Builder</span>
              </h3>
              <p>
                He is a Brand Strategist and a competent Haptics Trainer for the <strong>‘Grow with Google’ Programme</strong>. Sylvester Ebhonu is an author and has published numerous articles in peer-reviewed journals, books, and edited book chapters.
              </p>
              <p>
                He has facilitated seminars, campaigns, and hands-on workshops for over <strong>15,000 participants</strong> across academic, faith, corporate, and social platforms on Leadership, Team-Building, Organizational Management, Information & Digital Literacy, Purpose, Youth Empowerment, and Career Advancement.
              </p>
              <p className="italic text-slate-600 bg-slate-50 p-4 rounded-lg border-l-4 border-brand-blue">
                “The Digital Librarian” as he is affectionately called, is deeply passionate about everything media and dedicated to helping organizations build high-impact personnel capacity.
              </p>
            </div>

            {/* Youthrepreneur Section: 3 Ventures */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-serif text-xl font-bold text-brand-dark flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-blue" />
                <span>Youthrepreneur: 3 Ventures</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                
                {/* Venture 1 */}
                <div className="p-4 rounded-xl border-2 border-brand-dark bg-white flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">Creative Director & CEO</span>
                    <h4 className="font-serif text-base font-bold text-brand-dark mt-1">
                      Sesitech Ventures
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      A multimedia and technology company delivering web development, digital printing, photography, and brand identity.
                    </p>
                  </div>
                  <a
                    href="https://www.youtube.com/watch?v=CoRkktaf1DI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:underline mt-4"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Watch Interview</span>
                  </a>
                </div>

                {/* Venture 2 */}
                <div className="p-4 rounded-xl border-2 border-brand-dark bg-white flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">Founder</span>
                    <h4 className="font-serif text-base font-bold text-brand-dark mt-1">
                      Breakitdown Initiative
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Helping young people become purpose-driven, self-motivated, and capable of solving societal challenges.
                    </p>
                  </div>
                  <a
                    href="http://breakitdowninitiativeplatform.blogspot.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:underline mt-4"
                  >
                    <span>Visit Platform</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Venture 3 */}
                <div className="p-4 rounded-xl border-2 border-brand-dark bg-white flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">Convener</span>
                    <h4 className="font-serif text-base font-bold text-brand-dark mt-1">
                      Branded Librarians
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Online global community of purpose-driven librarians and professionals upskilling for modern impact.
                    </p>
                  </div>
                  <a
                    href="https://www.facebook.com/groups/brandedlibrarians/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:underline mt-4"
                  >
                    <span>Join Community</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            </div>

            {/* Personal Life Note */}
            <div className="pt-4 border-t border-slate-200 flex items-start gap-3 bg-slate-50 p-4 rounded-xl">
              <Heart className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-600 italic">
                Mr. Sylvester Israel Eronmwonsele Ebhonu is happily married and blessed with two Purpose-Driven Children. When he is not busy empowering others, he is either singing and dancing with his children, watching movies, or passionately talking about Nigeria Bole and Fish.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
