import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { dataStore } from '../../lib/storage';
import { Event } from '../../types';

export const EventsTeaser: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    dataStore.getEvents().then(setEvents);
    const handleUpdate = () => dataStore.getEvents().then(setEvents);
    window.addEventListener('thedl_storage_update', handleUpdate);
    return () => window.removeEventListener('thedl_storage_update', handleUpdate);
  }, []);

  const upcomingEvent = events.find(e => e.status === 'upcoming' && e.published) || events[0];

  useEffect(() => {
    if (!upcomingEvent?.date) return;
    const targetDate = new Date(upcomingEvent.date + 'T10:00:00');

    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [upcomingEvent?.date]);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              EVENTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-dark tracking-tight leading-tight mt-1.5">
              Learn With Us. Connect With Us.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Explore upcoming programmes, workshops, masterclasses, webinars and other events from The Digital Librarian.
            </p>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-blue text-white px-7 py-3 rounded-md text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95 flex-shrink-0"
          >
            <span>View Upcoming Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Upcoming Event Box */}
        {upcomingEvent && (
          <div className="bg-brand-dark rounded-2xl p-6 sm:p-10 text-white border border-blue-900/60 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-brand-blue/20 text-brand-blue border border-brand-blue/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Upcoming Programme
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {upcomingEvent.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {upcomingEvent.tagline || upcomingEvent.description}
              </p>

              {/* Event Meta Details */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-blue" />
                  <span>{upcomingEvent.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-blue" />
                  <span>{upcomingEvent.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-blue" />
                  <span>{upcomingEvent.location}</span>
                </div>
              </div>
            </div>

            {/* Countdown & Action Column */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-6 w-full lg:w-auto">
              
              {/* Live Countdown Timer */}
              <div className="flex items-center gap-2 sm:gap-3 text-center">
                <div className="bg-blue-950/80 border border-blue-800/80 rounded-xl p-3 min-w-[62px]">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {timeLeft.days}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Days</div>
                </div>

                <div className="bg-blue-950/80 border border-blue-800/80 rounded-xl p-3 min-w-[62px]">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {timeLeft.hours}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Hours</div>
                </div>

                <div className="bg-blue-950/80 border border-blue-800/80 rounded-xl p-3 min-w-[62px]">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Mins</div>
                </div>

                <div className="bg-blue-950/80 border border-blue-800/80 rounded-xl p-3 min-w-[62px]">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-brand-blue">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Secs</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                <Link
                  to={`/events/${upcomingEvent.slug}`}
                  className="inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-6 py-3 rounded-md text-sm font-semibold tracking-wide transition-all shadow-md active:scale-95 w-full sm:w-auto"
                >
                  <span>Event Details & Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
