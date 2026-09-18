import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Star } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { Testimonial } from '../types';

export const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    const list = await dataStore.getTestimonials();
    setTestimonials(list);
  };

  const handleCreateNew = () => {
    const newT: Testimonial = {
      id: 'test-' + Date.now(),
      name: 'Client / Colleague Name',
      role: 'Director of Academic Planning',
      organization: 'University / Institution',
      quote: 'Sylvester I. Ebhonu and The Digital Librarian deliver exemplary consultation and capacity training.',
      rating: 5,
      featured: true,
      location_context: 'home'
    };
    setEditing(newT);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await dataStore.saveTestimonial(editing);
    await loadTestimonials();
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this testimonial?')) {
      await dataStore.deleteTestimonial(id);
      await loadTestimonials();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Testimonials & Endorsements CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage endorsements featured in the dark navy homepage quote banner and learning sections.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border-2 border-brand-dark shadow-xl space-y-4">
          <h2 className="font-serif text-xl font-bold text-brand-dark border-b border-slate-200 pb-2">
            Edit Testimonial
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Person's Name *</label>
              <input
                type="text"
                required
                value={editing.name}
                onChange={e => setEditing({ ...editing, name: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Position *</label>
              <input
                type="text"
                required
                value={editing.role}
                onChange={e => setEditing({ ...editing, role: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Organization *</label>
              <input
                type="text"
                required
                value={editing.organization}
                onChange={e => setEditing({ ...editing, organization: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location Context</label>
              <select
                value={editing.location_context}
                onChange={e => setEditing({ ...editing, location_context: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              >
                <option value="home">Homepage Quote Banner</option>
                <option value="upskilling">Upskilling Library</option>
                <option value="lsa">Librarian Spotlight Africa</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Quote Statement *</label>
              <textarea
                rows={3}
                required
                value={editing.quote}
                onChange={e => setEditing({ ...editing, quote: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 text-xs font-bold text-slate-600">
              Cancel
            </button>
            <button type="submit" className="bg-brand-blue text-white px-5 py-2 text-xs font-bold rounded shadow-sm">
              Save Testimonial
            </button>
          </div>
        </form>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map(item => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-300 p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="font-serif italic text-xs text-slate-700 line-clamp-4 leading-relaxed mb-3">
                "{item.quote}"
              </p>
              <div className="font-bold text-xs text-brand-dark">{item.name}</div>
              <div className="text-[11px] text-slate-500">{item.role}, {item.organization}</div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex justify-end gap-1">
              <button onClick={() => setEditing(item)} className="p-1.5 text-slate-500 hover:text-brand-blue">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 text-slate-500 hover:text-rose-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
