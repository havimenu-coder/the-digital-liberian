import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, ChevronLeft, ChevronRight, Images, X } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { Event, EventGallery } from '../types';

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [galleries, setGalleries] = useState<EventGallery[]>([]);
  const [activeGallery, setActiveGallery] = useState<EventGallery | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [eventRows, galleryRows] = await Promise.all([
          dataStore.getEvents(),
          dataStore.getEventGalleries()
        ]);
        setEvents(eventRows.filter(event => event.published));
        setGalleries(galleryRows.filter(gallery => gallery.published));
        setLoadError(null);
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'Unable to load events and photo galleries.');
      }
    };
    void load();
    const handleUpdate = () => void load();
    window.addEventListener('thedl_storage_update', handleUpdate);
    return () => window.removeEventListener('thedl_storage_update', handleUpdate);
  }, []);

  useEffect(() => {
    if (!activeGallery) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveGallery(null);
      if (event.key === 'ArrowRight') setActivePhotoIndex(index => (index + 1) % activeGallery.photos.length);
      if (event.key === 'ArrowLeft') setActivePhotoIndex(index => (index - 1 + activeGallery.photos.length) % activeGallery.photos.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeGallery]);

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

        {loadError && <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{loadError}</p>}

        <section className="space-y-6 border-t border-slate-200 pt-8" aria-labelledby="past-event-gallery-heading">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue">
              <Images className="h-4 w-4" /> Event photo archive
            </span>
            <h2 id="past-event-gallery-heading" className="mt-2 font-serif text-2xl font-bold text-brand-dark sm:text-3xl">
              See Past Events
            </h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">Browse photos from previous events and community sessions.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {galleries.map(gallery => (
              <article key={gallery.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1">
                  {gallery.photos.slice(0, 4).map((photo, index) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => { setActiveGallery(gallery); setActivePhotoIndex(index); }}
                      aria-label={`View ${photo.caption || gallery.title} photo`}
                      className="group relative aspect-[4/3] overflow-hidden bg-slate-200"
                    >
                      <img src={photo.image_url} alt={photo.caption || gallery.title} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                      {index === 3 && gallery.photos.length > 4 && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-lg font-bold text-white">+{gallery.photos.length - 4}</span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-blue">{gallery.event_date}</p>
                  <h3 className="mt-1 font-serif text-lg font-bold text-brand-dark">{gallery.title}</h3>
                  {gallery.description && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{gallery.description}</p>}
                  <button
                    type="button"
                    onClick={() => { setActiveGallery(gallery); setActivePhotoIndex(0); }}
                    disabled={!gallery.photos.length}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-brand-dark disabled:cursor-not-allowed disabled:text-slate-400"
                  >
                    View {gallery.photos.length} photos <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
          {!galleries.length && <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">Event photos will appear here when a gallery is published.</p>}
        </section>
      </div>

      {activeGallery && activeGallery.photos[activePhotoIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeGallery.title} photo gallery`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={event => { if (event.target === event.currentTarget) setActiveGallery(null); }}
        >
          <button type="button" onClick={() => setActiveGallery(null)} aria-label="Close photo viewer" className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"><X className="h-6 w-6" /></button>
          {activeGallery.photos.length > 1 && (
            <>
              <button type="button" onClick={() => setActivePhotoIndex(index => (index - 1 + activeGallery.photos.length) % activeGallery.photos.length)} aria-label="Previous photo" className="absolute left-2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-6"><ChevronLeft className="h-7 w-7" /></button>
              <button type="button" onClick={() => setActivePhotoIndex(index => (index + 1) % activeGallery.photos.length)} aria-label="Next photo" className="absolute right-2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-6"><ChevronRight className="h-7 w-7" /></button>
            </>
          )}
          <figure className="flex max-h-full max-w-6xl flex-col items-center">
            <img src={activeGallery.photos[activePhotoIndex].image_url} alt={activeGallery.photos[activePhotoIndex].caption || activeGallery.title} className="max-h-[78vh] max-w-full object-contain" />
            <figcaption className="mt-4 text-center text-sm text-white">
              <span className="font-semibold">{activeGallery.title}</span>
              {activeGallery.photos[activePhotoIndex].caption && ` · ${activeGallery.photos[activePhotoIndex].caption}`}
              <span className="ml-2 text-white/60">{activePhotoIndex + 1} / {activeGallery.photos.length}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
};
