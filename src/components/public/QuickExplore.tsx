import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Cpu, Newspaper, Users, ArrowRight } from 'lucide-react';

export const QuickExplore: React.FC = () => {
  const exploreOptions = [
    {
      id: "learn",
      title: "I want to learn",
      actionHint: "redirect to upskilling library and courses",
      description: "Explore courses, masterclasses, tutorials, recordings, presentations and other learning resources.",
      link: "/upskilling-library",
      isExternal: false,
      buttonText: "Explore Courses & Resources",
      icon: BookOpen,
      accentColor: "from-blue-600 to-cyan-500",
      bgHover: "hover:border-brand-blue"
    },
    {
      id: "solution",
      title: "I need a solution",
      actionHint: "redirect to services page",
      description: "Discover TheDL's professional solutions for libraries (automation and database subscription), research, AI and digital literacy, capacity building, ICT and media.",
      link: "/solutions",
      isExternal: false,
      buttonText: "Discover Solutions",
      icon: Cpu,
      accentColor: "from-indigo-600 to-blue-500",
      bgHover: "hover:border-indigo-500"
    },
    {
      id: "informed",
      title: "I want to stay informed",
      actionHint: "redirect to blog",
      description: "Read TheDL's articles, insights and periodic updates on issues worth knowing.",
      link: "/blog",
      isExternal: false,
      buttonText: "Read The Blog",
      icon: Newspaper,
      accentColor: "from-sky-600 to-blue-400",
      bgHover: "hover:border-sky-500"
    },
    {
      id: "connect",
      title: "I want to connect",
      actionHint: "redirect to WhatsApp group & community",
      description: "Join the Upskill & Connect Village, explore our initiatives or connect with TheDL.",
      link: "https://chat.whatsapp.com/BeYzmeB5lUP8TXqUwMNWlD",
      isExternal: true,
      buttonText: "Join WhatsApp Community",
      icon: Users,
      accentColor: "from-emerald-600 to-teal-500",
      bgHover: "hover:border-emerald-500"
    }
  ];

  return (
    <section id="quick-explore" className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
            QUICK EXPLORE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-dark tracking-tight leading-tight mt-1.5">
            What are you looking for?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Choose what you need most today — whether expanding your skills, solving an institutional challenge, reading our latest insights, or connecting with our community.
          </p>
        </div>

        {/* 4 Navigation Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exploreOptions.map((item) => {
            const Icon = item.icon;
            const CardContent = (
              <div className={`h-full bg-white rounded-2xl border-2 border-slate-200/90 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group ${item.bgHover} hover:-translate-y-1`}>
                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-brand-dark group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider group-hover:text-brand-blue transition-colors">
                      Quick Access
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-serif text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors leading-snug mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                    {item.buttonText}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-brand-blue flex items-center justify-center text-slate-600 group-hover:text-white transition-all group-hover:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );

            return item.isExternal ? (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                {CardContent}
              </a>
            ) : (
              <Link
                key={item.id}
                to={item.link}
                className="block h-full"
              >
                {CardContent}
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
