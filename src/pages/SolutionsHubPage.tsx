import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Library, 
  BookMarked, 
  Cpu, 
  GraduationCap, 
  MonitorPlay, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  Layers,
  PhoneCall,
  Mail
} from 'lucide-react';
import { dataStore } from '../lib/storage';
import { Service } from '../types';

interface ServiceDefinition {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  features: string[];
  icon: React.ElementType;
  badge: string;
}

export const SolutionsHubPage: React.FC = () => {
  // 5 Connected Core Areas directly from the user's specification
  const coreServices: ServiceDefinition[] = [
    {
      id: "service-1",
      slug: "library-information",
      title: "Library & Information Solutions",
      badge: "Libraries & Knowledge Centres",
      short_description: "Supporting libraries and information organisations with automation, digital services, information access, visibility, e-resources and related solutions.",
      features: [
        "Library Automation & Integrated Systems (Koha, SLIMS, Alma)",
        "Digital Repositories & Open Access (DSpace, EPrints)",
        "Electronic Resource Licencing & Database Discovery",
        "Staff Retraining & Modern Digital Cataloguing",
        "Library Geospatial Mapping & Visibility (Locate-My-Library)"
      ],
      icon: Library
    },
    {
      id: "service-2",
      slug: "research",
      title: "Research & Scholarly Support",
      badge: "Scholars & Academia",
      short_description: "Supporting researchers with research writing, publication, scholarly communication, research visibility and the effective use of digital research tools.",
      features: [
        "Scholarly Writing & Manuscript Editorial Polish",
        "Systematic Literature Reviews & Citation Management (Zotero, Mendeley)",
        "Researcher Digital Identity (ORCID, Google Scholar, Scopus)",
        "Journal Selection & Avoiding Predatory Publishers",
        "Research Impact Assessment & Bibliometrics"
      ],
      icon: BookMarked
    },
    {
      id: "service-3",
      slug: "ai-digital-literacy",
      title: "AI & Digital Literacy",
      badge: "Emerging Tech & AI",
      short_description: "Helping people understand and use digital and artificial intelligence tools effectively, critically and responsibly.",
      features: [
        "Responsible AI Understanding, Ethics & Attribution",
        "Practical Generative AI for Academics & Workplace",
        "Prompt Engineering & Automated Workflows",
        "Critical Digital Evaluation & Misinformation Safeguards",
        "Institutional AI Policy & Readiness Frameworks"
      ],
      icon: Cpu
    },
    {
      id: "service-4",
      slug: "capacity-building",
      title: "Capacity Building & Professional Development",
      badge: "Learning & Mentorship",
      short_description: "Creating practical learning experiences through training, masterclasses, workshops, coaching and professional development programmes.",
      features: [
        "Hands-on Masterclasses & Interactive Bootcamps",
        "Executive Leadership & Institutional Team Coaching",
        "Grow with Google Training & Youth Empowerment",
        "Career Mentorship & Visibility for Librarians",
        "Keynote Presentations & Panel Moderation"
      ],
      icon: GraduationCap
    },
    {
      id: "service-5",
      slug: "ict-media",
      title: "ICT & Media Solutions",
      badge: "Media & Digital Infrastructure",
      short_description: "Supporting individuals and organisations with technology, digital communication and multimedia solutions.",
      features: [
        "Web Development & Digital Knowledge Portals",
        "Documentary Videography & Media Production",
        "Brand Identity, Visual Communications & Graphic Design",
        "Digital Printing, Event Materials & Book Covers",
        "Strategic Social Media & Digital Broadcast Campaigns"
      ],
      icon: MonitorPlay
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* ─────────────────────────────────────────────────────────────
          HERO BANNER
      ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-brand-dark via-[#040842] to-brand-dark text-white py-20 lg:py-24 overflow-hidden border-b border-blue-950">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-brand-blue text-xs uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SERVICES · WHAT WE DO</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight">
              What We Do
            </h1>

            <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed pt-1">
              Our work brings together five connected areas:
            </p>

            {/* Quick 5 Areas Pill Navigation */}
            <div className="flex flex-wrap gap-2.5 pt-3">
              {coreServices.map((service, idx) => (
                <a
                  key={idx}
                  href={`#${service.slug}`}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium transition-all"
                >
                  {service.title}
                </a>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5 CONNECTED SERVICES SHOWCASE
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Integrated Capabilities
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mt-2 tracking-tight">
              Five Connected Areas of Impact
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Designed to support individuals, researchers, libraries, and institutions in acquiring practical skills, solving operational challenges, and creating tangible value.
            </p>
          </div>

          <div className="space-y-8">
            {coreServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-brand-blue/50 p-8 sm:p-10 shadow-sm hover:shadow-md transition-all scroll-mt-28"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Info Column */}
                    <div className="lg:col-span-7 space-y-4">
                      
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue">
                            {service.badge}
                          </span>
                          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                        {service.short_description}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-4">
                        <Link
                          to={`/solutions/${service.slug}`}
                          className="inline-flex items-center gap-2 bg-brand-dark hover:bg-black text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
                        >
                          <span>Explore Solution Details</span>
                          <ArrowRight className="w-3.5 h-3.5 text-brand-blue" />
                        </Link>
                        
                        <Link
                          to={`/contact?subject=${encodeURIComponent(service.title)}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline"
                        >
                          <span>Request Consultation</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                    </div>

                    {/* Right Features Column */}
                    <div className="lg:col-span-5 bg-slate-50/80 rounded-xl p-6 border border-slate-200/80 space-y-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block pb-1 border-b border-slate-200">
                        Key Capabilities & Deliverables
                      </span>
                      <ul className="space-y-2.5">
                        {service.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          CONSULTANCY & GENERAL CONTRACTS ADVISORY
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-brand-dark via-[#00003F] to-slate-900 text-white p-8 sm:p-12 border border-blue-950 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Consultancy & Custom Engagements
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Need a Tailored Institutional or Corporate Solution?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We provide end-to-end strategic advisory, staff retraining, automation procurement audits, and customized masterclasses tailored specifically to your organization's goals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <Link
              to="/contact?subject=work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Our Team</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
