import React, { useEffect, useState } from 'react';
import { Calendar, Edit, ImagePlus, Plus, Save, Trash2, X } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { EventGallery, EventGalleryPhoto } from '../types';
import { ImageUploadField } from './components/ImageUploadField';

const today = () => new Date().toISOString().slice(0, 10);

export const AdminEventGalleries: React.FC = () => {
  const [galleries, setGalleries] = useState<EventGallery[]>([]);
  const [editing, setEditing] = useState<EventGallery | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadGalleries = async () => {
    try {
      setGalleries(await dataStore.getEventGalleries());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load event galleries.');
    }
  };

  useEffect(() => {
    void loadGalleries();
  }, []);

  const createGallery = () => {
    setError(null);
    setEditing({
      id: crypto.randomUUID(),
      title: '',
      description: '',
      event_date: today(),
      published: false,
      created_at: new Date().toISOString(),
      photos: []
    });
  };

  const addPhoto = () => {
    if (!editing) return;
    const photo: EventGalleryPhoto = {
      id: crypto.randomUUID(),
      gallery_id: editing.id,
      image_url: '',
      caption: '',
      display_order: editing.photos.length + 1
    };
    setEditing({ ...editing, photos: [...editing.photos, photo] });
  };

  const updatePhoto = (id: string, changes: Partial<EventGalleryPhoto>) => {
    if (!editing) return;
    setEditing({
      ...editing,
      photos: editing.photos.map(photo => photo.id === id ? { ...photo, ...changes } : photo)
    });
  };

  const saveGallery = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editing) return;
    if (editing.published && !editing.photos.some(photo => photo.image_url)) {
      setError('Add at least one photograph before publishing this gallery.');
      return;
    }

    try {
      setError(null);
      await dataStore.saveEventGallery(editing);
      await loadGalleries();
      setEditing(null);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Failed to save event gallery.');
    }
  };

  const deleteGallery = async (gallery: EventGallery) => {
    if (!confirm(`Delete the "${gallery.title}" gallery and its photos?`)) return;
    try {
      setError(null);
      await dataStore.deleteEventGallery(gallery.id);
      await loadGalleries();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete event gallery.');
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-brand-dark sm:text-3xl">Past Event Galleries</h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">Create event albums and manage their published photographs.</p>
        </div>
        <button onClick={createGallery} className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-blue-hover">
          <Plus className="h-4 w-4" /> New Gallery
        </button>
      </header>

      {error && <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}

      {editing && (
        <form onSubmit={saveGallery} className="space-y-5 rounded-2xl border-2 border-brand-dark bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="font-serif text-xl font-bold text-brand-dark">{editing.title || 'New Event Gallery'}</h2>
            <button type="button" onClick={() => setEditing(null)} aria-label="Close editor" className="text-slate-500 hover:text-slate-800"><X className="h-5 w-5" /></button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-semibold text-slate-700 sm:col-span-2">
              Event title *
              <input required value={editing.title} onChange={event => setEditing({ ...editing, title: event.target.value })} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
            </label>
            <label className="text-xs font-semibold text-slate-700">
              Event date *
              <input required type="date" value={editing.event_date} onChange={event => setEditing({ ...editing, event_date: event.target.value })} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
            </label>
            <label className="flex items-center gap-2 self-end pb-2 text-xs font-semibold text-slate-700">
              <input type="checkbox" checked={editing.published} onChange={event => setEditing({ ...editing, published: event.target.checked })} />
              Published on the public website
            </label>
            <label className="text-xs font-semibold text-slate-700 sm:col-span-2">
              Description
              <textarea rows={3} value={editing.description} onChange={event => setEditing({ ...editing, description: event.target.value })} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
            </label>
          </div>

          <section className="space-y-4 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-brand-dark">Photographs</h3>
                <p className="text-xs text-slate-500">Upload event photos and optionally add captions.</p>
              </div>
              <button type="button" onClick={addPhoto} className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">
                <ImagePlus className="h-4 w-4" /> Add photo
              </button>
            </div>

            {editing.photos.map((photo, index) => (
              <div key={photo.id} className="grid gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-[1fr_auto]">
                <div className="space-y-3">
                  <ImageUploadField
                    label={`Photograph ${index + 1}`}
                    value={photo.image_url}
                    onChange={image_url => updatePhoto(photo.id, { image_url })}
                    placeholder="Upload a photo or paste its URL"
                  />
                  <label className="block text-xs font-semibold text-slate-700">
                    Caption
                    <input value={photo.caption} onChange={event => updatePhoto(photo.id, { caption: event.target.value })} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                  </label>
                </div>
                <button type="button" onClick={() => setEditing({ ...editing, photos: editing.photos.filter(item => item.id !== photo.id) })} aria-label={`Remove photograph ${index + 1}`} className="self-start rounded p-2 text-rose-600 hover:bg-rose-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            {!editing.photos.length && <p className="rounded-lg bg-slate-50 p-4 text-center text-xs text-slate-500">No photos added yet.</p>}
          </section>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button type="button" onClick={() => setEditing(null)} className="rounded px-4 py-2 text-xs font-bold text-slate-600">Cancel</button>
            <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-blue-hover">
              <Save className="h-4 w-4" /> Save Gallery
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {galleries.map(gallery => (
          <article key={gallery.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="truncate font-serif text-lg font-bold text-brand-dark">{gallery.title}</h2>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500"><Calendar className="h-3.5 w-3.5" />{gallery.event_date}</p>
                <p className="mt-2 text-xs text-slate-600">{gallery.photos.length} photos · {gallery.published ? 'Published' : 'Draft'}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button onClick={() => { setError(null); setEditing(gallery); }} aria-label={`Edit ${gallery.title}`} className="rounded p-2 text-slate-500 hover:bg-slate-100 hover:text-brand-blue"><Edit className="h-4 w-4" /></button>
                <button onClick={() => void deleteGallery(gallery)} aria-label={`Delete ${gallery.title}`} className="rounded p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </article>
        ))}
        {!galleries.length && <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500 md:col-span-2">No event galleries yet. Create one to add an album to Past Events.</p>}
      </div>
    </div>
  );
};
