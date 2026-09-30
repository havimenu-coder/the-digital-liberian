import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Award, Star, Globe } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { Initiative, Honoree } from '../types';
import { ImageUploadField } from './components/ImageUploadField';

export const AdminInitiatives: React.FC = () => {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [honorees, setHonorees] = useState<Honoree[]>([]);
  const [editingHonoree, setEditingHonoree] = useState<Honoree | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [initList, hList] = await Promise.all([
      dataStore.getInitiatives(),
      dataStore.getHonorees()
    ]);
    setInitiatives(initList);
    setHonorees(hList);
  };

  const handleCreateHonoree = () => {
    const newH: Honoree = {
      id: 'hon-' + Date.now(),
      name: 'Dr. New Honoree',
      month: 'October',
      year: 2026,
      country: 'Nigeria',
      institution: 'University Library',
      role: 'Head Librarian',
      bio: 'Transformational contributions to digital repositories and rural literacy in Africa.',
      photo_url: '/images/honoree-placeholder.jpg',
      featured_quote: 'Knowledge transforms communities when librarians act as innovation bridges.'
    };
    setEditingHonoree(newH);
  };

  const handleSaveHonoree = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHonoree) return;
    await dataStore.saveHonoree(editingHonoree);
    await loadData();
    setEditingHonoree(null);
  };

  const handleDeleteHonoree = async (id: string) => {
    if (confirm('Delete this honoree?')) {
      await dataStore.deleteHonoree(id);
      await loadData();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Initiatives & Librarian Spotlight Africa (LSA)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage flagship pan-African initiatives and the African Librarian of the Month honorees.
          </p>
        </div>

        <button
          onClick={handleCreateHonoree}
          className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add LSA Honoree</span>
        </button>
      </div>

      {/* Honoree Edit Form Modal */}
      {editingHonoree && (
        <form onSubmit={handleSaveHonoree} className="bg-white p-6 rounded-2xl border-2 border-brand-dark shadow-xl space-y-4">
          <h2 className="font-serif text-xl font-bold text-brand-dark border-b border-slate-200 pb-2">
            LSA Honoree Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Honoree Full Name *</label>
              <input
                type="text"
                required
                value={editingHonoree.name}
                onChange={e => setEditingHonoree({ ...editingHonoree, name: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Country in Africa *</label>
              <input
                type="text"
                required
                value={editingHonoree.country}
                onChange={e => setEditingHonoree({ ...editingHonoree, country: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Institution</label>
              <input
                type="text"
                value={editingHonoree.institution}
                onChange={e => setEditingHonoree({ ...editingHonoree, institution: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Title</label>
              <input
                type="text"
                value={editingHonoree.role}
                onChange={e => setEditingHonoree({ ...editingHonoree, role: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Biography / Contributions *</label>
              <textarea
                rows={3}
                required
                value={editingHonoree.bio}
                onChange={e => setEditingHonoree({ ...editingHonoree, bio: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Featured Quote</label>
              <input
                type="text"
                value={editingHonoree.featured_quote}
                onChange={e => setEditingHonoree({ ...editingHonoree, featured_quote: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div className="sm:col-span-2">
              <ImageUploadField
                label="Honoree Portrait / Photograph *"
                value={editingHonoree.photo_url || ''}
                onChange={url => setEditingHonoree({ ...editingHonoree, photo_url: url })}
                placeholder="Upload portrait, browse media library, or paste image URL"
                helperText="Upload the official photograph or portrait of the African Librarian of the Month."
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button type="button" onClick={() => setEditingHonoree(null)} className="px-4 py-2 text-xs font-bold text-slate-600">
              Cancel
            </button>
            <button type="submit" className="bg-brand-blue text-white px-5 py-2 text-xs font-bold rounded shadow-sm">
              Save Honoree
            </button>
          </div>
        </form>
      )}

      {/* Honorees Grid */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-brand-dark">
          LSA Honorees & Spotlights ({honorees.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {honorees.map(hon => (
            <div key={hon.id} className="bg-white rounded-xl border border-slate-300 p-5 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                  {hon.month} {hon.year} · {hon.country}
                </span>
                <h3 className="font-serif text-lg font-bold text-brand-dark mt-1">{hon.name}</h3>
                <div className="text-xs text-slate-600">{hon.role}, {hon.institution}</div>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3">{hon.bio}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex justify-end gap-1">
                <button onClick={() => setEditingHonoree(hon)} className="p-1.5 text-slate-500 hover:text-brand-blue">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDeleteHonoree(hon.id)} className="p-1.5 text-slate-500 hover:text-rose-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
