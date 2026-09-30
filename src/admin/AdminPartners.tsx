import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Building, ExternalLink } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { Partner } from '../types';
import { ImageUploadField } from './components/ImageUploadField';

export const AdminPartners: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [editing, setEditing] = useState<Partner | null>(null);

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    const list = await dataStore.getPartners();
    setPartners(list);
  };

  const handleCreateNew = () => {
    const newP: Partner = {
      id: 'part-' + Date.now(),
      name: 'Institution / Partner Name',
      logo_url: '/images/partner-logo.png',
      website_url: 'https://example.com',
      description: 'Educational partner or professional body',
      display_order: partners.length + 1
    };
    setEditing(newP);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await dataStore.savePartner(editing);
    await loadPartners();
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this partner?')) {
      await dataStore.deletePartner(id);
      await loadPartners();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Partners & Institutions CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage partner logos, university affiliations, and corporate collaborators.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Partner</span>
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border-2 border-brand-dark shadow-xl space-y-4">
          <h2 className="font-serif text-xl font-bold text-brand-dark border-b border-slate-200 pb-2">
            Edit Partner
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Partner / Institution Name *</label>
              <input
                type="text"
                required
                value={editing.name}
                onChange={e => setEditing({ ...editing, name: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Website URL</label>
              <input
                type="url"
                value={editing.website_url || ''}
                onChange={e => setEditing({ ...editing, website_url: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Brief Description</label>
              <input
                type="text"
                value={editing.description || ''}
                onChange={e => setEditing({ ...editing, description: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div className="sm:col-span-2">
              <ImageUploadField
                label="Partner / Institution Logo *"
                value={editing.logo_url || ''}
                onChange={url => setEditing({ ...editing, logo_url: url })}
                placeholder="Upload logo, browse media library, or paste image URL"
                helperText="Upload transparent PNG, SVG, or high-res brand mark."
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 text-xs font-bold text-slate-600">
              Cancel
            </button>
            <button type="submit" className="bg-brand-blue text-white px-5 py-2 text-xs font-bold rounded shadow-sm">
              Save Partner
            </button>
          </div>
        </form>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map(p => (
          <div key={p.id} className="bg-white rounded-xl border border-slate-300 p-5 shadow-sm flex items-center justify-between">
            <div>
              <div className="font-serif font-bold text-sm text-brand-dark">{p.name}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{p.description}</div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setEditing(p)} className="p-1.5 text-slate-400 hover:text-brand-blue">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(p.id)} className="p-1.5 text-slate-400 hover:text-rose-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
