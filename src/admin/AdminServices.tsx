import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Check, ArrowRight } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { Service } from '../types';

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const list = await dataStore.getServices();
    setServices(list);
  };

  const handleCreateNew = () => {
    const newSvc: Service = {
      id: 'service-' + Date.now(),
      title: 'New Service Title',
      slug: 'new-service-' + Math.floor(Math.random() * 1000),
      short_description: 'Brief overview of this professional service.',
      full_description: 'Full comprehensive breakdown of deliverables, institutional scope, and methodology.',
      icon: 'Library',
      features: ['Deliverable 1', 'Deliverable 2', 'Deliverable 3'],
      cta_text: 'Explore Solution →',
      cta_url: '/contact',
      display_order: services.length + 1,
      published: true
    };
    setEditingService(newSvc);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    await dataStore.saveService(editingService);
    await loadServices();
    setEditingService(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this service?')) {
      await dataStore.deleteService(id);
      await loadServices();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Solutions & Services CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage the core 6 services, feature deliverables, icons, and call-to-action buttons.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Edit Form Modal/Drawer */}
      {editingService && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border-2 border-brand-dark shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="font-serif text-xl font-bold text-brand-dark">
              {editingService.id.startsWith('service-') ? 'Edit Service' : 'New Service'}
            </h2>
            <button type="button" onClick={() => setEditingService(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Service Title *</label>
              <input
                type="text"
                required
                value={editingService.title}
                onChange={e => setEditingService({ ...editingService, title: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">URL Slug *</label>
              <input
                type="text"
                required
                value={editingService.slug}
                onChange={e => setEditingService({ ...editingService, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded outline-none focus:border-brand-blue"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description (for Homepage Card) *</label>
              <textarea
                rows={2}
                required
                value={editingService.short_description}
                onChange={e => setEditingService({ ...editingService, short_description: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Description (for Service Detail Page) *</label>
              <textarea
                rows={4}
                required
                value={editingService.full_description}
                onChange={e => setEditingService({ ...editingService, full_description: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Icon Representation</label>
              <select
                value={editingService.icon}
                onChange={e => setEditingService({ ...editingService, icon: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              >
                <option value="Library">Library (Bookshelf)</option>
                <option value="Research">Research (Bookmark / Pen)</option>
                <option value="AI">AI (Cpu / Microchip)</option>
                <option value="Capacity">Capacity (Graduation Cap)</option>
                <option value="Media">Media (Monitor / Camera)</option>
                <option value="Briefcase">Consultancy (Briefcase)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">CTA Action Text</label>
              <input
                type="text"
                value={editingService.cta_text}
                onChange={e => setEditingService({ ...editingService, cta_text: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Deliverables & Features (Comma separated)
              </label>
              <input
                type="text"
                value={editingService.features?.join(', ') || ''}
                onChange={e => setEditingService({
                  ...editingService,
                  features: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
                placeholder="Institutional Repositories, Staff Training, Koha Automation"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setEditingService(null)}
              className="px-4 py-2 rounded text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2 rounded text-xs font-bold shadow-sm"
            >
              Save Service
            </button>
          </div>
        </form>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div
            key={service.id}
            className="bg-white rounded-xl border border-slate-300 p-5 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                  Order #{service.display_order} · {service.icon}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  service.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {service.published ? 'Live' : 'Draft'}
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-brand-dark mb-1">
                {service.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                {service.short_description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">/{service.slug}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditingService(service)}
                  className="p-1.5 text-slate-500 hover:text-brand-blue rounded"
                  title="Edit Service"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-600 rounded"
                  title="Delete Service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
