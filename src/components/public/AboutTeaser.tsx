import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface AboutTeaserProps {
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export const AboutTeaser: React.FC<AboutTeaserProps> = ({
  heading = "More Than a Name. A Place to Learn, Build and Connect.",
  description = "The Digital Librarian brings together knowledge, technology, learning and professional expertise in one place. Whether you are here to learn, find a resource, solve a problem, discover an opportunity or explore something new, there is something here for you.",
  ctaText = "Discover TheDL",
  ctaUrl = "/about"
}) => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Description & Link */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-dark tracking-tight leading-[1.18]">
              {heading}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {description}
            </p>

            <div className="pt-2">
              <Link
                to={ctaUrl}
                className="inline-flex items-center gap-2 text-brand-dark hover:text-brand-blue font-semibold text-base group transition-colors"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-brand-blue" />
              </Link>
            </div>
          </div>

          {/* Right Column: Custom Vector Art (Library Archway + Computer Terminal) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm p-6 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-center">
              
              <svg 
                viewBox="0 0 280 200" 
                className="w-full h-auto text-brand-dark" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Arched Library Bookshelf */}
                <path 
                  d="M20 180 V60 C20 30 50 15 80 15 C110 15 140 30 140 60 V180" 
                  stroke="#00003F" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                />
                <line x1="20" y1="180" x2="140" y2="180" stroke="#00003F" strokeWidth="2.5" />
                
                {/* Shelves inside arch */}
                <line x1="26" y1="65" x2="134" y2="65" stroke="#009DF6" strokeWidth="2" />
                <line x1="26" y1="105" x2="134" y2="105" stroke="#009DF6" strokeWidth="2" />
                <line x1="26" y1="145" x2="134" y2="145" stroke="#009DF6" strokeWidth="2" />

                {/* Books on Shelves */}
                {/* Shelf 1 */}
                <rect x="35" y="38" width="8" height="27" fill="#E2E8F0" stroke="#00003F" strokeWidth="1.5" />
                <rect x="45" y="42" width="7" height="23" fill="#009DF6" fillOpacity="0.2" stroke="#00003F" strokeWidth="1.5" />
                <rect x="54" y="36" width="9" height="29" fill="#E2E8F0" stroke="#00003F" strokeWidth="1.5" />
                <rect x="65" y="44" width="7" height="21" stroke="#00003F" strokeWidth="1.5" />
                <rect x="74" y="40" width="8" height="25" fill="#009DF6" fillOpacity="0.4" stroke="#00003F" strokeWidth="1.5" />
                <rect x="84" y="45" width="6" height="20" stroke="#00003F" strokeWidth="1.5" />
                <rect x="92" y="39" width="9" height="26" stroke="#00003F" strokeWidth="1.5" />
                <rect x="103" y="42" width="8" height="23" stroke="#00003F" strokeWidth="1.5" />
                <rect x="113" y="37" width="10" height="28" fill="#009DF6" fillOpacity="0.2" stroke="#00003F" strokeWidth="1.5" />

                {/* Shelf 2 */}
                <rect x="35" y="78" width="9" height="27" stroke="#00003F" strokeWidth="1.5" />
                <rect x="46" y="82" width="8" height="23" stroke="#00003F" strokeWidth="1.5" />
                <rect x="56" y="76" width="7" height="29" fill="#009DF6" fillOpacity="0.3" stroke="#00003F" strokeWidth="1.5" />
                <rect x="65" y="84" width="8" height="21" stroke="#00003F" strokeWidth="1.5" />
                <rect x="75" y="80" width="7" height="25" stroke="#00003F" strokeWidth="1.5" />
                <rect x="84" y="85" width="8" height="20" stroke="#00003F" strokeWidth="1.5" />
                <rect x="94" y="79" width="8" height="26" fill="#009DF6" fillOpacity="0.5" stroke="#00003F" strokeWidth="1.5" />
                <rect x="104" y="82" width="8" height="23" stroke="#00003F" strokeWidth="1.5" />
                <rect x="114" y="77" width="9" height="28" stroke="#00003F" strokeWidth="1.5" />

                {/* Shelf 3 */}
                <rect x="35" y="118" width="8" height="27" stroke="#00003F" strokeWidth="1.5" />
                <rect x="45" y="122" width="9" height="23" stroke="#00003F" strokeWidth="1.5" />
                <rect x="56" y="116" width="8" height="29" stroke="#00003F" strokeWidth="1.5" />
                <rect x="66" y="124" width="7" height="21" fill="#009DF6" fillOpacity="0.4" stroke="#00003F" strokeWidth="1.5" />
                <rect x="75" y="120" width="8" height="25" stroke="#00003F" strokeWidth="1.5" />
                <rect x="85" y="125" width="8" height="20" stroke="#00003F" strokeWidth="1.5" />
                <rect x="95" y="119" width="7" height="26" stroke="#00003F" strokeWidth="1.5" />
                <rect x="104" y="122" width="8" height="23" stroke="#00003F" strokeWidth="1.5" />
                <rect x="114" y="117" width="9" height="28" stroke="#00003F" strokeWidth="1.5" />

                {/* Connecting Digital Network Nodes */}
                <line x1="140" y1="105" x2="175" y2="105" stroke="#009DF6" strokeWidth="1.5" strokeDasharray="3 3" />
                
                {/* Computer Monitor Workstation */}
                <rect x="175" y="85" width="75" height="50" rx="3" stroke="#00003F" strokeWidth="2.2" fill="#FFFFFF" />
                <rect x="180" y="90" width="65" height="40" rx="2" fill="#F0F9FF" />
                
                {/* Globe / Network Wireframe inside monitor */}
                <circle cx="212" cy="110" r="14" stroke="#009DF6" strokeWidth="1.5" />
                <ellipse cx="212" cy="110" rx="14" ry="6" stroke="#009DF6" strokeWidth="1.2" />
                <line x1="212" y1="96" x2="212" y2="124" stroke="#009DF6" strokeWidth="1.2" />

                {/* Monitor Stand */}
                <rect x="207" y="135" width="10" height="15" fill="#00003F" />
                <rect x="195" y="150" width="34" height="4" rx="2" fill="#00003F" />

                {/* Connected Cloud / Cloud Device Icons Above Monitor */}
                <rect x="185" y="45" width="18" height="13" rx="2" stroke="#00003F" strokeWidth="1.5" fill="#FFFFFF" />
                <rect x="230" y="45" width="18" height="13" rx="2" stroke="#00003F" strokeWidth="1.5" fill="#FFFFFF" />
                <circle cx="212" cy="30" r="6" stroke="#009DF6" strokeWidth="1.5" fill="#FFFFFF" />

                {/* Connecting Lines */}
                <path d="M194 58 L206 85" stroke="#009DF6" strokeWidth="1" strokeDasharray="2 2" />
                <path d="M239 58 L220 85" stroke="#009DF6" strokeWidth="1" strokeDasharray="2 2" />
                <path d="M212 36 L212 85" stroke="#009DF6" strokeWidth="1" strokeDasharray="2 2" />
              </svg>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
