import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, GraduationCap, Compass, Share2 } from 'lucide-react';

export const ExploreMatrix: React.FC = () => {
  const items = [
    {
      title: "Read",
      description: "Read the latest about knowledge, technology, research and libraries.",
      link: "/blog",
      icon: BookOpen
    },
    {
      title: "Learn",
      description: "Learn how to leverage AI tools and masterclasses for quantum leap productivity.",
      link: "/upskilling-library",
      icon: GraduationCap
    },
    {
      title: "Discover",
      description: "Discover practical digital solutions, institutional setups and advisory.",
      link: "/solutions",
      icon: Compass
    },
    {
      title: "Connect",
      description: "Connect with our community, explore partnerships, or invite Sylvester to speak.",
      link: "/contact",
      icon: Share2
    }
  ];

  return (
    <section className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-brand-dark tracking-tight mb-8">
          Explore TheDL
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.link}
                className="bg-brand-dark text-white rounded-xl p-5 flex flex-col justify-between hover:bg-blue-950 transition-all group border border-blue-900 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-serif text-xl font-bold text-white group-hover:text-brand-blue transition-colors">
                      {item.title}
                    </span>
                    <Icon className="w-4 h-4 text-brand-blue" />
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-blue-900/60 flex items-center justify-between text-xs font-bold text-brand-blue group-hover:text-white transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
