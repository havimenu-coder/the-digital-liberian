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
  Calendar,
  Building,
  Compass,
  Briefcase,
  Mail,
  Linkedin,
  Youtube,
  BookMarked,
  MapPin,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* ─────────────────────────────────────────────────────────────
          PART ONE: THE DIGITAL LIBRARIAN
          Hero Header & Core Philosophy
      ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-brand-dark via-[#040842] to-brand-dark text-white py-20 lg:py-28 overflow-hidden border-b border-blue-950">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-brand-blue text-xs uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Us · The Digital Librarian</span>
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
          The 6 Foundational Convictions
      ───────────────────────────────────────────────────────────── */}
      <section id="beliefs" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Our Core Convictions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mt-2 tracking-tight">
              What We Believe
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Every masterclass, digital solution, research initiative, and consultation is grounded in these foundational principles.
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
                  We Believe in Practical Learning
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Learning should move beyond information. We focus on knowledge people can understand, practise and apply in their work and everyday lives.
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
                  We Believe Technology Should Serve People
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Technology is most useful when it helps people solve real problems, work more effectively, communicate better and create opportunities.
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
                  We Believe Digital Literacy Is for Everyone
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Digital skills are no longer limited to technology professionals. Researchers, librarians, educators, administrators, entrepreneurs, students and organisations all need the ability to navigate digital environments with confidence and good judgement.
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
                  We Believe AI Requires Understanding, Not Just Access
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Artificial intelligence is changing how people work, learn, create and make decisions. The goal is not simply to use more AI tools, but to understand their possibilities, limitations, risks and responsible applications.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-blue">
                <span>Responsible AI understanding</span>
              </div>
            </div>

            {/* Belief 5 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-brand-blue/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-3">
                  We Believe People Are a Source of Possibility
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Knowledge grows when people share it. Communities become stronger when people connect, collaborate and create opportunities for one another. This is why TheDL does not exist only to provide services — it also creates spaces for learning, conversation, recognition and professional connection.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-blue">
                <span>Community & shared growth</span>
              </div>
            </div>

            {/* Belief 6 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-brand-blue/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-3">
                  We Believe in Building What Is Useful
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Ideas matter, but useful ideas should eventually become something people can experience — a resource, a programme, a solution, a community, a publication, a training experience or an initiative. That is the spirit behind TheDL.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-blue">
                <span>Tangible, practical impact</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PART TWO: SYLVESTER EBHONU
          Meet the Person Behind The Digital Librarian
      ───────────────────────────────────────────────────────────── */}
      <section id="sylvester-ebhonu" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-dark text-white text-[11px] font-bold tracking-widest uppercase mb-3">
            PART TWO — SYLVESTER EBHONU
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight leading-tight">
            Meet the Person Behind The Digital Librarian
          </h2>
          <div className="text-brand-blue font-semibold text-base sm:text-lg mt-2">
            Sylvester I. Ebhonu
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide mt-1">
            Digital Transformation Leader · Librarian · Researcher · Educator · Facilitator · Consultant
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
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue">Founder & Convener</span>
                  <p className="font-serif text-lg font-bold">Sylvester Israel Ebhonu, CLN, amPAIDeF</p>
                  <p className="text-xs text-slate-300">National PRO, Nigerian Library Association (NLA)</p>
                </div>
              </div>
              <div className="p-5 bg-white space-y-2 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-dark">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                  <span>Head, Digital Services Division, Admiralty University of Nigeria (ADUN) Library</span>
                </div>
                <p className="text-xs text-slate-600 pl-6">
                  B.Sc. (Hons) & M.Sc. in Library and Information Science (Delta State University, Abraka) · PhD Candidate.
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
                  to="/contact?subject=work"
                  className="inline-flex items-center justify-center gap-1.5 bg-brand-blue hover:bg-brand-blue-hover text-white px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-center"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Work With TheDL</span>
                </Link>
                <Link
                  to="/contact?subject=speaking"
                  className="inline-flex items-center justify-center gap-1.5 border border-slate-300 hover:border-brand-blue hover:text-brand-blue text-slate-700 bg-white px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-center"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Connect With Sylvester</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Scope */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 text-base leading-relaxed">
            
            <div className="space-y-4">
              <p>
                <strong>Sylvester Israel Ebhonu</strong> is a Digital Transformation Leader, Certified Librarian of Nigeria and professional development facilitator. He currently serves as <strong>Head, Digital Services Division, Admiralty University of Nigeria (ADUN) Library</strong>.
              </p>
              <p>
                He brings over <strong>12 years of experience</strong> spanning library administration, digital transformation, research support, professional development and institutional capacity building.
              </p>
              <p>
                Sylvester holds a B.Sc. (Hons) and M.Sc. in Library and Information Science from Delta State University, Abraka, and is currently a <strong>PhD Candidate</strong>.
              </p>
              <p>
                His work focuses on responsible artificial intelligence, digital and information literacy, library automation, information access, research support, career development, professional visibility and digital transformation.
              </p>
              <p>
                Through training, digital initiatives and professional engagements, his work has reached <strong>more than 15,000 individuals</strong> and involved organisations and institutions across different professional and educational settings.
              </p>
              <p>
                He has served as a keynote speaker, facilitator and resource person at academic, professional and institutional events in Nigeria and internationally, with engagements involving or supported by organisations including <strong>Google</strong>, the <strong>National Information Technology Development Agency (NITDA)</strong> and <strong>Wikimedia</strong>.
              </p>
            </div>

            {/* BEYOND THE JOB TITLE */}
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <h3 className="font-serif text-2xl font-bold text-brand-dark">
                Beyond the Job Title
              </h3>
              <p>
                Sylvester's work extends beyond his formal professional responsibilities.
              </p>
              <p>
                He is the founder of <strong>Upskill & Connect Village</strong>, a learning and professional community, and <strong>Librarian Spotlight Africa</strong>, a pan-African platform that celebrates librarians, tells their stories and promotes professional collaboration and visibility.
              </p>
              <p>
                He also leads the <strong>Locate-My-Library Project</strong>, a national campaign focused on improving the digital visibility and accessibility of libraries across Nigeria, and co-founded the <strong>BreakItDown Initiative</strong>, which supports young people to become purpose-driven, innovative and solution-oriented leaders.
              </p>
              <p>
                His work also extends into artificial intelligence and technology governance. He is an Associate Member of the <strong>Practical Artificial Intelligence Development Foundation (PAIDeF)</strong>, a Fellow of the <strong>Library Internet Governance Ambassadorship Programme (2025 Cohort)</strong>, and a Fellow of the <strong>Lawyers Hub Africa Artificial Intelligence Policy Fellowship</strong>. Through the latter, he contributed as a researcher to the <strong>Africa AI Governance Index (AAIGI) 2026</strong>.
              </p>
              <p className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-medium text-slate-800">
                He currently serves as the <strong>National Public Relations Officer (PRO) of the Nigerian Library Association (NLA)</strong>.
              </p>
            </div>

          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            PROFESSIONAL JOURNEY
            12+ Years of Experience & Roles
        ───────────────────────────────────────────────────────────── */}
        <div className="mt-16 pt-16 border-t border-slate-200">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Career Trajectory
            </span>
            <h3 className="font-serif text-3xl font-bold text-brand-dark mt-1">
              Professional Journey (12+ Years of Experience)
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Sylvester's professional journey spans librarianship, digital services, research support, teaching, professional development and technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <div className="p-5 rounded-xl border border-slate-200 bg-white hover:border-brand-blue transition-all">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">Current Role</span>
              <h4 className="font-serif text-lg font-bold text-brand-dark mt-1">
                Head, Digital Services Division
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Admiralty University of Nigeria Library
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Leading digital systems, electronic resources, institutional repositories and automation.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white hover:border-brand-blue transition-all">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">Academic Appointment</span>
              <h4 className="font-serif text-lg font-bold text-brand-dark mt-1">
                Associate Lecturer
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Faculty of Law, Admiralty University of Nigeria
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Teaching legal research methodologies, information literacy, and digital resources.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white hover:border-brand-blue transition-all">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">Institutional Leadership</span>
              <h4 className="font-serif text-lg font-bold text-brand-dark mt-1">
                College Librarian
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Nigerian Naval Engineering College, Sapele
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Administered academic and technical library collections and maritime training resources.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white hover:border-brand-blue transition-all">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">Senior University Roles</span>
              <h4 className="font-serif text-lg font-bold text-brand-dark mt-1">
                Senior Library Roles
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Southern Delta University, Ozoro
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Contributed to modern cataloguing, staff training, and university library services.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white hover:border-brand-blue transition-all">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">Foundational Milestones</span>
              <h4 className="font-serif text-lg font-bold text-brand-dark mt-1">
                Pioneer Librarian
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Admiralty University of Nigeria
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Contributed to the establishment, architectural setup, and pioneering development of the University Library.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-brand-blue/30 bg-blue-50/40 hover:border-brand-blue transition-all">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">National Leadership</span>
              <h4 className="font-serif text-lg font-bold text-brand-dark mt-1">
                National PRO
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Nigerian Library Association (NLA)
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Managing national communications, public relations, professional advocacy, and media visibility.
              </p>
            </div>

          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RESEARCH & PUBLICATIONS
        ───────────────────────────────────────────────────────────── */}
        <div id="publications" className="mt-16 pt-16 border-t border-slate-200">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Scholarly Contributions
            </span>
            <h3 className="font-serif text-3xl font-bold text-brand-dark mt-1">
              Research & Publications
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Sylvester's scholarly work reflects his interest in the intersection of information, technology, librarianship, artificial intelligence and professional practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">Peer-Reviewed Research</span>
                <h4 className="font-serif text-base font-bold text-brand-dark mt-2 leading-snug">
                  Artificial Intelligence and Emerging Technologies in Modern African Libraries
                </h4>
                <p className="text-xs text-slate-500 mt-2">
                  Journal of Information & Library Science Studies · 2025
                </p>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Investigating AI integration barriers, institutional readiness, and ethical deployment in Nigerian tertiary libraries.
                </p>
              </div>
              <a
                href="https://scholar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline mt-4"
              >
                <span>View Publication</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">Policy & AI Governance</span>
                <h4 className="font-serif text-base font-bold text-brand-dark mt-2 leading-snug">
                  Africa AI Governance Index (AAIGI 2026)
                </h4>
                <p className="text-xs text-slate-500 mt-2">
                  Lawyers Hub Africa & Policy Fellowship · 2026
                </p>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Contributing researcher evaluating AI readiness, regulatory maturity, and data sovereignty frameworks across Africa.
                </p>
              </div>
              <a
                href="https://lawyershub.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline mt-4"
              >
                <span>View Report</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">Published Book</span>
                <h4 className="font-serif text-base font-bold text-brand-dark mt-2 leading-snug">
                  Let’s Communicate: Principles for Effective Personal & Workplace Communication
                </h4>
                <p className="text-xs text-slate-500 mt-2">
                  Authored by Sylvester I. Ebhonu
                </p>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  A foundational guide to interpersonal dynamics, organizational communication, clarity, and leadership influence.
                </p>
              </div>
              <Link
                to="/upskilling-library"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline mt-4"
              >
                <span>Find in Library</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Academic Profiles Badges */}
          <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold">
            <span className="text-slate-500">Academic & Citation Profiles:</span>
            <a 
              href="https://scholar.google.com/citations?user=SylvesterEbhonu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-brand-blue hover:border-brand-blue flex items-center gap-1"
            >
              <span>Google Scholar</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://orcid.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-brand-blue hover:border-brand-blue flex items-center gap-1"
            >
              <span>ORCID</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://scopus.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-brand-blue hover:border-brand-blue flex items-center gap-1"
            >
              <span>Scopus</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://www.researchgate.net" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-brand-blue hover:border-brand-blue flex items-center gap-1"
            >
              <span>ResearchGate</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            TEACHING, TRAINING & FACILITATION
        ───────────────────────────────────────────────────────────── */}
        <div id="teaching" className="mt-16 pt-16 border-t border-slate-200">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Capacity Building
            </span>
            <h3 className="font-serif text-3xl font-bold text-brand-dark mt-1">
              Teaching, Training & Facilitation
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Sylvester has designed and facilitated workshops, seminars, masterclasses and professional development programmes for universities, libraries, government institutions, professional associations and other organisations.
            </p>
          </div>

          {/* Training Focus Areas List */}
          <div className="mb-10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark mb-4">
              His training and facilitation work covers areas including:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                "Artificial intelligence and responsible AI",
                "Digital and information literacy",
                "Library automation and digital library services",
                "Research writing and scholarly communication",
                "Research visibility and digital identity",
                "Professional development and career growth",
                "Digital productivity and workplace technology",
                "Leadership and organisational development"
              ].map((area, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Engagements Table */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark">
              Selected Engagements
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-brand-dark uppercase tracking-wider text-[11px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Organiser / Institution</th>
                    <th className="py-3 px-4">Topic / Programme</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Format</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-brand-dark">2026</td>
                    <td className="py-3 px-4">Lawyers Hub Africa</td>
                    <td className="py-3 px-4">African AI Governance Index & Ethics</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 bg-blue-50 text-brand-blue rounded font-semibold">Fellow / Researcher</span></td>
                    <td className="py-3 px-4 text-slate-500">Hybrid (Nairobi / Online)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-brand-dark">2025</td>
                    <td className="py-3 px-4">Google / Haptics</td>
                    <td className="py-3 px-4">Grow with Google Digital Skills for African Youth</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 bg-green-50 text-green-700 rounded font-semibold">Certified Trainer</span></td>
                    <td className="py-3 px-4 text-slate-500">Physical & Virtual</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-brand-dark">2025</td>
                    <td className="py-3 px-4">Nigerian Library Association</td>
                    <td className="py-3 px-4">Digital Library Transformation & Scholarly Repositories</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded font-semibold">Keynote Speaker</span></td>
                    <td className="py-3 px-4 text-slate-500">Physical</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-brand-dark">2024</td>
                    <td className="py-3 px-4">NITDA / Tech Development</td>
                    <td className="py-3 px-4">Digital Literacy & Community Empowerment</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 bg-blue-50 text-brand-blue rounded font-semibold">Facilitator</span></td>
                    <td className="py-3 px-4 text-slate-500">Physical</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-brand-dark">2024</td>
                    <td className="py-3 px-4">Wikimedia User Group Nigeria</td>
                    <td className="py-3 px-4">Open Knowledge & Digital Archiving for Librarians</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded font-semibold">Resource Person</span></td>
                    <td className="py-3 px-4 text-slate-500">Hybrid</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="pt-2 flex justify-end">
              <Link to="/events" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline">
                <span>View all selected engagements & calendar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            PROJECTS & INITIATIVES
        ───────────────────────────────────────────────────────────── */}
        <div id="initiatives" className="mt-16 pt-16 border-t border-slate-200">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Impact Platforms
            </span>
            <h3 className="font-serif text-3xl font-bold text-brand-dark mt-1">
              Projects & Initiatives
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Some of Sylvester's work has developed into initiatives designed to continue beyond individual engagements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-blue transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold">
                  LSA
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-brand-dark">Librarian Spotlight Africa (LSA)</h4>
                  <span className="text-[11px] text-brand-blue font-semibold">Pan-African Platform</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Celebrating librarians, sharing their stories and strengthening professional visibility and collaboration across Africa.
              </p>
              <Link to="/initiatives/librarian-spotlight-africa" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline mt-4">
                <span>Explore LSA Platform</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-blue transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold">
                  UCV
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-brand-dark">Upskill & Connect Village</h4>
                  <span className="text-[11px] text-brand-blue font-semibold">Learning Community</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A learning and professional community created around knowledge sharing, development and connection.
              </p>
              <Link to="/initiatives/upskill-connect-village" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline mt-4">
                <span>Join The Village</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-blue transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold">
                  LML
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-brand-dark">Locate-My-Library Project</h4>
                  <span className="text-[11px] text-brand-blue font-semibold">National Campaign</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A national initiative focused on improving the digital visibility, geospatial mapping, and accessibility of libraries across Nigeria.
              </p>
              <Link to="/initiatives" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline mt-4">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-blue transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold">
                  BDI
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-brand-dark">BreakItDown Initiative</h4>
                  <span className="text-[11px] text-brand-blue font-semibold">Youth Empowerment</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A youth-focused initiative supporting purpose, innovation, career guidance, and solution-oriented thinking.
              </p>
              <a href="http://breakitdowninitiativeplatform.blogspot.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline mt-4">
                <span>Visit Blogspot</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          <div className="mt-6 text-center">
            <Link to="/initiatives" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-brand-dark px-5 py-2.5 rounded-xl text-xs font-bold transition-all">
              <span>Explore All TheDL Initiatives</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-blue" />
            </Link>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            AWARDS & RECOGNITION
        ───────────────────────────────────────────────────────────── */}
        <div id="awards" className="mt-16 pt-16 border-t border-slate-200">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Honours & Accolades
            </span>
            <h3 className="font-serif text-3xl font-bold text-brand-dark mt-1">
              Awards & Recognition
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Sylvester's work has received recognition across professional, academic and development spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-blue transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-brand-dark leading-snug">
                Dr. Victoria Okojie Award for Advocacy and Promotion of Library and Information Service
              </h4>
              <p className="text-xs text-slate-500 mt-2">
                Conferred in recognition of outstanding national advocacy for library visibility and modernization.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-blue transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-brand-dark leading-snug">
                Outstanding Career Mentorship Award
              </h4>
              <p className="text-xs text-slate-500 mt-2">
                Federal University of Petroleum Resources, Effurun (FUPRE) — honoring exemplary guidance for emerging professionals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-blue transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-brand-dark leading-snug">
                Africa AI Policy Fellowship — 2026
              </h4>
              <p className="text-xs text-slate-500 mt-2">
                Lawyers Hub Africa Artificial Intelligence Policy Fellowship — policy leadership and research in AI governance.
              </p>
            </div>

          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            PROFESSIONAL PROFILES & DIGITAL PRESENCE
        ───────────────────────────────────────────────────────────── */}
        <div id="profiles" className="mt-16 pt-16 border-t border-slate-200">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Connect Directly
            </span>
            <h3 className="font-serif text-3xl font-bold text-brand-dark mt-1">
              Professional Profiles & Digital Presence
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Connect with Sylvester across his professional, scholarly and broadcast platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <a href="https://scholar.google.com/citations?user=SylvesterEbhonu" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-slate-200 hover:border-brand-blue bg-white flex items-center justify-between group transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-brand-dark group-hover:text-brand-blue">Google Scholar</h5>
                  <span className="text-xs text-slate-500">Research & scholarly citations</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-blue" />
            </a>

            <a href="https://linkedin.com/in/sylvester-ebhonu" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-slate-200 hover:border-brand-blue bg-white flex items-center justify-between group transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-brand-dark group-hover:text-brand-blue">LinkedIn</h5>
                  <span className="text-xs text-slate-500">Career updates & network</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-blue" />
            </a>

            <a href="https://youtube.com/@didigitallibrarian8254" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-slate-200 hover:border-brand-blue bg-white flex items-center justify-between group transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                  <Youtube className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-brand-dark group-hover:text-red-600">YouTube</h5>
                  <span className="text-xs text-slate-500">Masterclasses & webinars</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-blue" />
            </a>

            <a href="https://www.researchgate.net" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-slate-200 hover:border-brand-blue bg-white flex items-center justify-between group transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <BookMarked className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-brand-dark group-hover:text-brand-blue">ResearchGate</h5>
                  <span className="text-xs text-slate-500">Papers & scholarly network</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-blue" />
            </a>

            <a href="https://orcid.org" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-slate-200 hover:border-brand-blue bg-white flex items-center justify-between group transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-brand-dark group-hover:text-brand-blue">ORCID</h5>
                  <span className="text-xs text-slate-500">Verified researcher identity</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-blue" />
            </a>

            <a href="https://scopus.com" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-slate-200 hover:border-brand-blue bg-white flex items-center justify-between group transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-brand-dark group-hover:text-brand-blue">Scopus</h5>
                  <span className="text-xs text-slate-500">Indexed author publications</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-blue" />
            </a>

          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            A LIFE BEYOND WORK & CONNECT WITH SYLVESTER
        ───────────────────────────────────────────────────────────── */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 space-y-4">
            <h4 className="font-serif text-xl font-bold text-brand-dark">
              A Life Beyond Work
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Away from professional responsibilities, Sylvester enjoys private coaching, family outings and watching movies.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed italic border-l-4 border-brand-blue pl-4">
              “At the centre of his work, however, remains a simple commitment: to learn, to serve, to share what he knows and to help others find useful ways forward.”
            </p>
          </div>

          {/* Connect CTA Banner */}
          <div className="mt-8 p-8 rounded-2xl bg-brand-dark text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">CONNECT WITH SYLVESTER</span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold">
                Interested in his work, research, speaking engagements or collaboration?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Explore tailored institutional consultations, corporate workshops, or academic partnerships.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
              <Link
                to="/contact?subject=work"
                className="bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-md"
              >
                Work With TheDL
              </Link>
              <Link
                to="/contact?subject=speaking"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-xl text-xs font-semibold transition-all"
              >
                Connect With Sylvester
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          PART THREE: OUR TEAM
          The People Behind the Work
      ───────────────────────────────────────────────────────────── */}
      <section id="our-team" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-blue text-white text-[11px] font-bold tracking-widest uppercase mb-3">
              PART THREE — OUR TEAM
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark tracking-tight leading-tight">
              The People Behind the Work
            </h2>
            <p className="text-base sm:text-lg text-slate-700 mt-4 leading-relaxed font-medium">
              The Digital Librarian is not built by one person alone.
            </p>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Across Upskill & Connect Village, Librarian Spotlight Africa and other projects, a growing team of passionate people contribute their skills, ideas, time and energy to make the work happen.
            </p>
          </div>

          {/* Featured Team Members Grid */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
              <h3 className="font-serif text-2xl font-bold text-brand-dark">
                Meet the Team
              </h3>
              <Link to="/about/team" className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1">
                <span>View Full Team Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Team Member 1 */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-brand-blue hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                    <img
                      src="/images/team-folashade.jpg"
                      alt="Mrs. Folashade Adepoju"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-brand-dark/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      LSA Committee
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-serif text-lg font-bold text-brand-dark">
                      Mrs. Folashade Adepoju
                    </h4>
                    <div className="text-xs font-semibold text-brand-blue mt-1">
                      Coordinator, Global Outreach and Evaluation Committee
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                      Librarian Spotlight Africa
                    </div>
                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      Leading international outreach and independent committee assessment for pan-African librarian recognitions and global professional networks.
                    </p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
                    Outreach & Evaluation
                  </div>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-brand-blue hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                    <img
                      src="/images/team-ramatu.jpg"
                      alt="Hajiya Ramatu A. Haliru"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-brand-dark/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      Research Lead
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-serif text-lg font-bold text-brand-dark">
                      Hajiya Ramatu A. Haliru
                    </h4>
                    <div className="text-xs font-semibold text-brand-blue mt-1">
                      Coordinator, Research and Evaluation
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                      Librarian Spotlight Africa
                    </div>
                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      Directs longitudinal impact assessment, scholarly feedback evaluation, and research alignment across pan-African library initiatives.
                    </p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
                    Scholarly Assessment
                  </div>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-brand-blue hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                    <img
                      src="/images/team-victoria.jpg"
                      alt="Victoria C. Chukwuedozie"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-brand-dark/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      Editorial & Media
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-serif text-lg font-bold text-brand-dark">
                      Victoria C. Chukwuedozie
                    </h4>
                    <div className="text-xs font-semibold text-brand-blue mt-1">
                      Manager, Content and Communications
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                      TheDL & LSA Initiatives
                    </div>
                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      Oversees editorial storytelling, digital media releases, spotlight interviews, and community broadcasts across our platforms.
                    </p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
                    Content & Storytelling
                  </div>
                </div>
              </div>

              {/* Team Member 4 */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-brand-blue hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                    <img
                      src="/images/team-mulugeta.jpg"
                      alt="Mulugeta Woldetsadik"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/team-mulugeta.png';
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-brand-dark/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      Partnerships
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-serif text-lg font-bold text-brand-dark">
                      Mulugeta Woldetsadik
                    </h4>
                    <div className="text-xs font-semibold text-brand-blue mt-1">
                      Coordinator, Partnership and Community Engagement
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                      Librarian Spotlight Africa
                    </div>
                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      Spearheads pan-African institutional alliances, international cross-border collaborations, and student engagement chapters.
                    </p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
                    Community & Engagement
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Building Together Callout Banner */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2 text-brand-blue font-bold text-xs uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Building Together</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                Different people bring different strengths.
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Our team reflects that idea — combining knowledge, creativity, technology, communication and community to build initiatives that can make a difference.
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">
                Want to be part of what we are building?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <Link
                to="/contact?subject=collaborate"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all shadow-md"
              >
                <UserCheck className="w-4 h-4" />
                <span>Connect With TheDL</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about/team"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-brand-dark text-slate-700 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all"
              >
                <span>View Full Team</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
