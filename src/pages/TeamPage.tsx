import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Twitter, Users, ArrowRight, UserPlus } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { TeamMember } from '../types';

export const TeamPage: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    dataStore.getTeamMembers().then(setTeam);
    const handleUpdate = () => dataStore.getTeamMembers().then(setTeam);
    window.addEventListener('thedl_storage_update', handleUpdate);
    return () => window.removeEventListener('thedl_storage_update', handleUpdate);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-brand-dark text-white py-16 lg:py-20 border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Leadership & Coordination
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
              Behind The Digital Librarian & Initiatives
            </h1>
            <p className="text-base text-slate-300">
              The passionate professionals, researchers, and regional coordinators advancing our mission across Africa and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-sm hover:border-brand-blue hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-brand-dark/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {member.initiative === 'lsa' ? 'LSA Leadership' : 'Core Leadership'}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-brand-dark">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold text-brand-blue mt-1">
                    {member.role}
                  </div>
                  {member.organization && (
                    <div className="text-xs text-slate-500 mt-0.5">
                      {member.organization}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed line-clamp-4">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Active Coordinator</span>
                <div className="flex items-center space-x-2">
                  {member.social_links?.linkedin && (
                    <a href={member.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-blue">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.social_links?.twitter && (
                    <a href={member.social_links.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-blue">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Call for Volunteers Card (From PDF 1) */}
          <div className="bg-brand-blue-light/40 rounded-2xl border-2 border-dashed border-brand-blue p-8 flex flex-col justify-between text-center items-center">
            <div className="my-auto space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center mx-auto">
                <UserPlus className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-dark">
                Join Our Team
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto leading-relaxed">
                We are actively seeking African and international volunteers: Technical Operations Coordinators, Content Editors, and Regional Liaisons.
              </p>
            </div>

            <Link
              to="/contact?subject=volunteer"
              className="mt-6 inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
            >
              <span>Apply to Volunteer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
