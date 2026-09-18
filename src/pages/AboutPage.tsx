import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Sparkles, BookOpen, Users, ArrowRight, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Header */}
      <section className="bg-brand-dark text-white py-16 lg:py-24 border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              About The Digital Librarian
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight leading-tight">
              More Than a Website. A Platform for Learning, Solutions and Ideas.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed pt-2">
              The Digital Librarian brings together knowledge, technology, learning and professional expertise in one place. Helping individuals and organisations access practical solutions, useful knowledge and expert guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Story & Philosophy */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-slate-700 text-base leading-relaxed">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight">
              Our Story & Mission
            </h2>
            <p>
              In an era defined by overwhelming volumes of information and lightning-fast technological breakthroughs, access alone is no longer enough. Individuals, researchers, and institutions need clarity, practical competence, and purpose-driven application.
            </p>
            <p>
              Founded by <strong>Sylvester I. Ebhonu</strong>, <strong>The Digital Librarian (TheDL)</strong> was established to bridge the gap between traditional library values—accuracy, ethics, deep organization, and intellectual preservation—and emerging technologies like Generative AI, cloud repositories, and multimedia workflows.
            </p>
            <p>
              We believe that knowledge should not remain trapped in theoretical silos. It must be activated to solve societal problems, build sustainable careers, and transform communities.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/about/sylvester-ebhonu"
                className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm"
              >
                <span>Meet Sylvester Ebhonu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about/team"
                className="inline-flex items-center gap-2 border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
              >
                <span>View Our Team</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-slate-50 border-2 border-brand-dark rounded-2xl p-8 space-y-6 shadow-md">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-wider">
                  <Target className="w-4 h-4" />
                  <span>Our Vision</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To become Africa’s foremost catalyst for digital literacy, modern librarianship, and ethical AI adoption, turning information into opportunity.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-sm uppercase tracking-wider">
                  <Eye className="w-4 h-4" />
                  <span>Our Approach</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong>Strategic, Exquisite, Seamless and Incomparable (SESI).</strong> We emphasize practical know-how, tailored institutional mentorship, and sustainable technological adoption.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* What We Believe (Core Values) */}
      <section id="values" className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl font-bold text-brand-dark">
              What We Believe
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              The foundational principles guiding every consultation, masterclass, and community initiative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">
                Excellence & Creativity
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We reject mediocrity and generic templates. Every solution is strategically crafted to reflect the highest standard of modern craftsmanship.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">
                Integrity & Authority
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Decades of certified professional leadership underpin our methods. We promote ethical technology and responsible data stewardship.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">
                People First
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                People are gifts from God. Technology exists to elevate human dignity, empower educators, and unlock individual potential.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
