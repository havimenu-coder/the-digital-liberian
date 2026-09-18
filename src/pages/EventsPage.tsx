import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { Event } from '../types';

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    dataStore.getEvents().then(res => setEvents(res.filter(e => e.published)));
    const handleUpdate = () => dataStore.getEvents().then(res => setEvents(res.filter(e => e.published)));
    window.addEventListener('thedl_storage_update', handleUpdate);
    return () => window.removeEventListener('thedl_storage_update', handleUpdate);
  }, []);

  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  const pastEvents = events.filter(e => e.status === 'past');

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-brand-dark text-white py-16 lg:py-20 border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Programmes & Masterclasses
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              Learn With Us. Connect With Us.
            </h1>
            <p className="text-base text-slate-300">
              Explore upcoming webinars, hands-on masterclasses, and past session archives led by Sylvester Ebhonu and industry experts.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Upcoming Events */}
        <section>
          <div className="max-w-2xl mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
              Upcoming Events & Workshops
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Secure your registration and receive live links, tool prescriptions, and certification.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-brand-dark rounded-2xl p-7 text-white border border-blue-900 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-brand-blue/20 text-brand-blue border border-brand-blue/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {event.category}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white">
                    {event.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {event.tagline || event.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-300 pt-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-blue" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-blue" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-blue" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-blue-900/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    Virtual & WhatsApp Stream
                  </span>
                  <Link
                    to={`/events/${event.slug}`}
                    className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                  >
                    <span>Register Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past Events Archive */}
        <section id="past" className="pt-8 border-t border-slate-200">
          <div className="max-w-2xl mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
              Past Events & Archives
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Previous summits, university symposiums, and community sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="bg-slate-50 rounded-xl border border-slate-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Archived · {event.date}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-brand-dark mt-1">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 text-xs font-medium text-slate-500">
                  Completed in {event.location}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
