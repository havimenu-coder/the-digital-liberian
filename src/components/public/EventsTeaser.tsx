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

  // Countdown timer calculation
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

  if (!upcomingEvent) return null;

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-brand-dark tracking-tight">
              What's Happening
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Learn With Us. Connect With Us.
            </p>
          </div>

          <Link
            to="/events#past"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-dark hover:text-brand-blue transition-colors group"
          >
            <span>See past events</span>
            <ArrowRight className="w-4 h-4 text-brand-blue group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Upcoming Event Box (Matching Reference Screenshot) */}
        <div className="bg-brand-dark rounded-2xl p-6 sm:p-8 text-white border border-blue-900/60 shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-blue/20 text-brand-blue border border-brand-blue/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Upcoming Event
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {upcomingEvent.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
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
              <div className="bg-blue-950/80 border border-blue-800/80 rounded-lg p-2.5 min-w-[56px]">
                <div className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {timeLeft.days}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Days</div>
              </div>

              <div className="bg-blue-950/80 border border-blue-800/80 rounded-lg p-2.5 min-w-[56px]">
                <div className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {timeLeft.hours}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Hours</div>
              </div>

              <div className="bg-blue-950/80 border border-blue-800/80 rounded-lg p-2.5 min-w-[56px]">
                <div className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {timeLeft.minutes}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Mins</div>
              </div>

              <div className="bg-blue-950/80 border border-blue-800/80 rounded-lg p-2.5 min-w-[56px]">
                <div className="font-serif text-xl sm:text-2xl font-bold text-brand-blue">
                  {timeLeft.seconds}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Secs</div>
              </div>
            </div>

            <Link
              to={`/events/${upcomingEvent.slug}`}
              className="inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-6 py-3 rounded text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 w-full sm:w-auto"
            >
              <span>View Event</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
};
