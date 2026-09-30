import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Lightbulb, 
  Cpu, 
  Globe, 
  Sparkles, 
  HeartHandshake, 
  GraduationCap, 
  Award, 
  Users, 
  Mic, 
  FileText, 
  Layers, 
  Share2, 
  ExternalLink,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* ─────────────────────────────────────────────────────────────
          PART ONE: THE DIGITAL LIBRARIAN
          Hero Header & Core Philosophy
      ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-brand-dark via-[#040842] to-brand-dark text-white py-20 lg:py-28 overflow-hidden border-b border-blue-950">
        {/* Subtle background decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-brand-blue text-xs uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Page · The Digital Librarian</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight">
              A Platform Built Around <span className="text-brand-blue font-serif italic">Knowledge</span>, <span className="text-brand-blue font-serif italic">Technology</span> and <span className="text-brand-blue font-serif italic">People</span>.
            </h1>

            <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed pt-2">
              The Digital Librarian (TheDL) is a professional platform making knowledge, technology and opportunity accessible and practical for individuals, professionals, libraries, institutions and organisations. We bring together digital solutions, learning, research, libraries, AI, technology, media and capacity building — creating a space to learn, solve problems, discover possibilities and connect.
            </p>

            <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-sm sm:text-base text-slate-300 font-medium italic border-l-4 border-brand-blue pl-4">
                “Because knowledge should not simply be acquired — it should be understood, applied and used to create better outcomes.”
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link
                to="/upskilling-library"
                className="inline-flex items-center gap-2.5 bg-brand-blue hover:bg-brand-blue-hover text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/25 hover:translate-y-[-2px] active:translate-y-0"
              >
                <BookOpen className="w-4 h-4" />
                <span>Visit the Upskilling Library</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/solutions"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all backdrop-blur-sm hover:translate-y-[-2px] active:translate-y-0"
              >
                <span>Here’s What We Do</span>
                <ArrowRight className="w-4 h-4 text-brand-blue" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          WHAT WE BELIEVE
          5 Core Beliefs
      ───────────────────────────────────────────────────────────── */}
      <section id="beliefs" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Our Guiding Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mt-2 tracking-tight">
              What We Believe
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Every masterclass, digital solution, research initiative, and consultation is grounded in these five convictions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Belief 1 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-brand-blue/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-3">
                  Knowledge should be useful.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Learning should lead to understanding, action and better outcomes.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-blue">
                <span>Action-oriented learning</span>
              </div>
            </div>

            {/* Belief 2 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-brand-blue/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-3">
                  Technology should serve people.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We use technology to simplify work, improve access and create meaningful possibilities.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-blue">
                <span>Human-centered technology</span>
              </div>
            </div>

            {/* Belief 3 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-brand-blue/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-3">
                  Digital literacy is for everyone.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  People should have the confidence and skills to navigate an increasingly digital world.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-blue">
                <span>Inclusive empowerment</span>
              </div>
            </div>

            {/* Belief 4 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-brand-blue/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-3">
                  AI requires understanding, not just access.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We promote responsible, practical and informed use of emerging technologies.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-blue">
                <span>Responsible AI adoption</span>
              </div>
            </div>

            {/* Belief 5 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-brand-blue/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group md:col-span-2 lg:col-span-2">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-3">
                  People are a gift.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The best ideas, opportunities and solutions often emerge when people learn, connect and build together.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-blue">
                <span>Collaborative ecosystem</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PART TWO — SYLVESTER EBHONU
          Meet the Person Behind The Digital Librarian
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-dark text-white text-[11px] font-bold tracking-widest uppercase mb-3">
            PART TWO — SYLVESTER EBHONU
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight leading-tight">
            Meet the Person Behind The Digital Librarian
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Sylvester I. Ebhonu, CLN, amPAIDeF is a librarian, digital transformation practitioner, professional development facilitator, speaker and entrepreneur known as <strong>The Digital Librarian (TheDL)</strong>.
          </p>
        </div>

        {/* Bio & Profile Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Portrait Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border-2 border-brand-dark shadow-xl bg-slate-100">
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src="/images/sylvester-portrait.jpg"
                  alt="Sylvester I. Ebhonu, CLN"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/sylvester-hero.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue">Founder & Convener</span>
                  <p className="font-serif text-lg font-bold">Sylvester I. Ebhonu, CLN, amPAIDeF</p>
                </div>
              </div>
              <div className="p-5 bg-white space-y-2 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-dark">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                  <span>Head of Digital Services Division, Admiralty University of Nigeria Library</span>
                </div>
                <p className="text-xs text-slate-600 pl-6">
                  Over 12 years of professional leadership spanning library administration, institutional capacity building, digital systems, and AI advocacy.
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-3">
              <Link
                to="/about/sylvester-ebhonu"
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-dark hover:bg-black text-white px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-sm"
              >
                <span>View Full Professional Profile</span>
                <ArrowRight className="w-4 h-4 text-brand-blue" />
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/about/sylvester-ebhonu"
                  className="inline-flex items-center justify-center gap-1.5 border border-slate-300 hover:border-brand-blue hover:text-brand-blue text-slate-700 bg-white px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-center"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Research & Papers</span>
                </Link>
                <Link
                  to="/events"
                  className="inline-flex items-center justify-center gap-1.5 border border-slate-300 hover:border-brand-blue hover:text-brand-blue text-slate-700 bg-white px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-center"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Speaking Engagements</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Scope */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 text-base leading-relaxed">
            
            <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-3">
              <h3 className="font-serif text-xl font-bold text-brand-dark">
                At the Intersection of Technology & People
              </h3>
              <p className="text-sm sm:text-base text-slate-700">
                He currently serves as <strong>Head of Digital Services Division at Admiralty University of Nigeria Library</strong> and brings over 12 years of experience across library administration, digital transformation, research support, training and institutional capacity building.
              </p>
              <p className="text-sm sm:text-base text-slate-700">
                His work sits at the intersection of libraries, technology, artificial intelligence, research, digital literacy and people development.
              </p>
            </div>

            {/* A SNAPSHOT */}
            <div className="space-y-4 pt-2">
              <h3 className="font-serif text-2xl font-bold text-brand-dark">
                A Snapshot
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-brand-blue transition-all">
                  <div className="text-2xl font-serif font-bold text-brand-blue">12+ years</div>
                  <div className="text-xs font-semibold text-brand-dark mt-1">Professional experience</div>
                  <div className="text-xs text-slate-500 mt-0.5">Libraries, digital workflows & leadership</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-brand-blue transition-all">
                  <div className="text-2xl font-serif font-bold text-brand-blue">15,000+</div>
                  <div className="text-xs font-semibold text-brand-dark mt-1">Individuals reached</div>
                  <div className="text-xs text-slate-500 mt-0.5">Through training, masterclasses and digital initiatives</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-brand-blue transition-all">
                  <div className="text-2xl font-serif font-bold text-brand-blue">PhD</div>
                  <div className="text-xs font-semibold text-brand-dark mt-1">Library & Information Science</div>
                  <div className="text-xs text-slate-500 mt-0.5">In progress research & scholarship</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-brand-blue transition-all">
                  <div className="text-2xl font-serif font-bold text-brand-blue">Certified Librarian</div>
                  <div className="text-xs font-semibold text-brand-dark mt-1">Library & information professional</div>
                  <div className="text-xs text-slate-500 mt-0.5">CLN, amPAIDeF certified</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-brand-blue transition-all">
                  <div className="text-2xl font-serif font-bold text-brand-blue">Speaker & Facilitator</div>
                  <div className="text-xs font-semibold text-brand-dark mt-1">Academic & institutional engagements</div>
                  <div className="text-xs text-slate-500 mt-0.5">Keynotes, corporate sessions & webinars</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-brand-blue transition-all">
                  <div className="text-2xl font-serif font-bold text-brand-blue">Founder / Builder</div>
                  <div className="text-xs font-semibold text-brand-dark mt-1">Ecosystems & communities</div>
                  <div className="text-xs text-slate-500 mt-0.5">Upskill & Connect Village, LSA & other initiatives</div>
                </div>

              </div>
            </div>

            {/* BEYOND THE JOB TITLE */}
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <h3 className="font-serif text-2xl font-bold text-brand-dark">
                Beyond the Job Title
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Sylvester's professional work extends beyond his institutional role. Through The Digital Librarian and related initiatives, he creates learning opportunities, supports professionals, develops digital solutions, promotes library visibility, facilitates conversations and experiments with ways technology can solve real problems.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                His work has included engagements and collaborations involving organisations such as <strong>Google</strong>, <strong>NITDA</strong> and <strong>Wikimedia</strong>, alongside academic, professional and community platforms.
              </p>

              {/* Partner/Engagement badges */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
                  Google (‘Grow with Google’ Trainer)
                </span>
                <span className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
                  NITDA
                </span>
                <span className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
                  Wikimedia
                </span>
                <span className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
                  Admiralty University of Nigeria
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            SELECTED AREAS OF WORK
            Research, Teaching, Speaking, Projects, Awards, Profiles
        ───────────────────────────────────────────────────────────── */}
        <div className="mt-20 pt-16 border-t border-slate-200">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Core Endeavours & Expertise
            </span>
            <h3 className="font-serif text-3xl font-bold text-brand-dark mt-2">
              Selected Areas of Work
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Explore Sylvester’s major portfolios across research, speaking, community building and professional development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Research & Publications */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-blue/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-brand-dark">
                  Research & Publications
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Research interests, scholarly publications and contributions to conversations around AI, libraries, information and digital transformation.
                </p>
              </div>
              <Link 
                to="/about/sylvester-ebhonu" 
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-blue-hover"
              >
                <span>Read publications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 2. Teaching & Facilitation */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-blue/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-brand-dark">
                  Teaching & Facilitation
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Training programmes, workshops, seminars, masterclasses and professional development engagements.
                </p>
              </div>
              <Link 
                to="/upskilling-library" 
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-blue-hover"
              >
                <span>Explore masterclasses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 3. Speaking & Engagements */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-blue/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <Mic className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-brand-dark">
                  Speaking & Engagements
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Keynotes, conference presentations, panel sessions and invited professional engagements.
                </p>
              </div>
              <Link 
                to="/events" 
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-blue-hover"
              >
                <span>View speaking calendar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 4. Projects & Initiatives */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-blue/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-brand-dark">
                  Projects & Initiatives
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  A growing portfolio of initiatives designed to create learning, visibility, connection and practical impact.
                </p>
              </div>
              <Link 
                to="/initiatives" 
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-blue-hover"
              >
                <span>View initiatives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 5. Awards & Recognition */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-blue/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-brand-dark">
                  Awards & Recognition
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Selected professional recognitions and awards celebrating impactful leadership and contribution to librarianship.
                </p>
              </div>
              <Link 
                to="/about/sylvester-ebhonu" 
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-blue-hover"
              >
                <span>View recognitions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 6. Professional Profiles */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-blue/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <Share2 className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-brand-dark">
                  Professional Profiles
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Connect with Sylvester across his professional and scholarly platforms including LinkedIn, ResearchGate, and Google Scholar.
                </p>
              </div>
              <a 
                href="https://linkedin.com/in/sylvester-ebhonu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-blue-hover"
              >
                <span>Connect on LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Bottom Primary Actions */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-brand-dark to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="font-serif text-xl sm:text-2xl font-bold">
                Ready to learn, collaborate or invite Sylvester?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Discover the full profile, research papers, or book a consultation and speaking session.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
              <Link
                to="/about/sylvester-ebhonu"
                className="bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
              >
                View Full Professional Profile
              </Link>
              <Link
                to="/about/sylvester-ebhonu"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
              >
                View Research & Publications
              </Link>
              <Link
                to="/events"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
              >
                Explore Speaking & Engagements
              </Link>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};
