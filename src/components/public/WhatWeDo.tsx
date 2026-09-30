import React from 'react';
import { Link } from 'react-router-dom';
import { Library, BookMarked, Cpu, GraduationCap, MonitorPlay, ArrowRight } from 'lucide-react';

interface SolutionItem {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  link: string;
  icon: React.ElementType;
}

export const WhatWeDo: React.FC = () => {
  const solutions: SolutionItem[] = [
    {
      id: "library-solutions",
      title: "Library & Information Solutions",
      description: "Supporting libraries and information organisations with automation, digital services, information access, visibility, e-resources and related solutions.",
      ctaText: "Explore Library Solutions",
      link: "/solutions/library-information",
      icon: Library
    },
    {
      id: "research-support",
      title: "Research & Scholarly Support",
      description: "Supporting researchers with research writing, publication, scholarly communication, research visibility and the effective use of digital research tools.",
      ctaText: "Explore Research Support",
      link: "/solutions/research",
      icon: BookMarked
    },
    {
      id: "ai-digital-literacy",
      title: "AI & Digital Literacy",
      description: "Helping people understand and use digital and artificial intelligence tools effectively, critically and responsibly.",
      ctaText: "Explore AI & Digital Literacy",
      link: "/solutions/ai-digital-literacy",
      icon: Cpu
    },
    {
      id: "capacity-building",
      title: "Capacity Building & Professional Development",
      description: "Creating practical learning experiences through training, masterclasses, workshops, coaching and professional development programmes.",
      ctaText: "Explore Capacity Building",
      link: "/solutions/capacity-building",
      icon: GraduationCap
    },
    {
      id: "ict-media",
      title: "ICT & Media Solutions",
      description: "Supporting individuals and organisations with technology, digital communication and multimedia solutions.",
      ctaText: "Explore ICT & Media",
      link: "/solutions/ict-media",
      icon: MonitorPlay
    }
  ];

  return (
    <section id="what-we-do" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
            WHAT WE DO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-dark tracking-tight leading-tight mt-1.5">
            Practical Expertise. Real Solutions.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            TheDL works across five connected areas where people, knowledge and technology meet.
          </p>
        </div>

        {/* 5 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border-2 border-brand-dark/90 p-5 flex flex-col justify-between hover:shadow-xl hover:border-brand-blue transition-all duration-300 group min-h-[300px]"
              >
                <div>
                  {/* Icon */}
                  <div className="mb-4 p-3 rounded-xl bg-slate-100 text-brand-dark group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300 inline-block shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-bold text-brand-dark leading-snug mb-2 group-hover:text-brand-blue transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-4 mt-6 border-t border-slate-100">
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark group-hover:text-brand-blue transition-colors"
                  >
                    <span>{item.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-brand-blue" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Prompt */}
        <div className="mt-12 pt-6 flex items-center justify-between flex-wrap gap-4 border-t border-slate-100">
          <div className="text-sm font-medium text-slate-700">
            Need customized institutional advisory or specialized consultancy?
          </div>
          <Link
            to="/contact?subject=consultancy"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-blue group transition-colors"
          >
            <span>Talk to TheDL About Consultancy & Advisory</span>
            <ArrowRight className="w-4 h-4 text-brand-blue group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
