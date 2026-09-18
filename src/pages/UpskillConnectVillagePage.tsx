import React from 'react';
import { Users, Sparkles, MessageCircle, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const UpskillConnectVillagePage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-brand-dark text-white py-16 lg:py-24 border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Global Professional Community
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              Upskill & Connect Village
            </h1>
            <p className="font-serif italic text-xl text-brand-blue">
              “Don't Just Learn. Connect.”
            </p>
            <p className="text-base text-slate-300 leading-relaxed">
              A growing professional learning community for people who want to keep learning, exchange ideas, discover opportunities, and connect with peers across Africa and the world.
            </p>
            <div className="pt-4">
              <a
                href="https://chat.whatsapp.com/BeYzmeB5lUP8TXqUwMNWlD"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3 rounded-lg text-sm font-bold shadow-lg transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Join WhatsApp Village Community</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Community Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">
              Weekly AI & Tech Drops
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Curated breakdowns of the latest academic AI tools, prompt templates, and digital literacy tips before they go mainstream.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">
              Peer Research Alliances
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Form co-authorships, collaborate on cross-institutional surveys, and share grant proposal insights with colleagues worldwide.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">
              Mentorship & Masterclasses
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Exclusive Q&A sessions with Sylvester Ebhonu, guest international facilitators, and certified Grow with Google trainers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
