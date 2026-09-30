import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, BookOpen, Cpu, ExternalLink } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { Resource, AITool } from '../types';
import { ImageUploadField } from './components/ImageUploadField';

export const AdminResources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resources' | 'ai_tools'>('resources');
  const [resources, setResources] = useState<Resource[]>([]);
  const [aiTools, setAiTools] = useState<AITool[]>([]);
  
  // Resource Editor State
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  
  // AI Tool Editor State
  const [editingTool, setEditingTool] = useState<AITool | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [resList, toolList] = await Promise.all([
      dataStore.getResources(),
      dataStore.getAITools()
    ]);
    setResources(resList);
    setAiTools(toolList);
  };

  const handleCreateResource = () => {
    const newRes: Resource = {
      id: 'res-' + Date.now(),
      title: 'New Book or Course Title',
      slug: 'new-resource-' + Math.floor(Math.random() * 1000),
      category: 'books',
      description: 'Comprehensive description of this resource.',
      price: '₦2,500',
      thumbnail_url: '/images/book-cover.jpg',
      author: 'Sylvester Israel Ebhonu',
      featured: true,
      published: true,
      created_at: new Date().toISOString()
    };
    setEditingResource(newRes);
  };

  const handleSaveResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResource) return;
    await dataStore.saveResource(editingResource);
    await loadData();
    setEditingResource(null);
  };

  const handleDeleteResource = async (id: string) => {
    if (confirm('Delete this resource?')) {
      await dataStore.deleteResource(id);
      await loadData();
    }
  };

  const handleCreateTool = () => {
    const newT: AITool = {
      id: 'tool-' + Date.now(),
      name: 'New AI Tool',
      category: 'academics',
      category_label: 'Academics & Research',
      description: 'Description of how this tool assists researchers or professionals.',
      website_url: 'https://example.com',
      is_free: true,
      requires_premium: false,
      tags: ['Productivity', 'AI']
    };
    setEditingTool(newT);
  };

  const handleSaveTool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTool) return;
    await dataStore.saveAITool(editingTool);
    await loadData();
    setEditingTool(null);
  };

  const handleDeleteTool = async (id: string) => {
    if (confirm('Delete this tool from directory?')) {
      await dataStore.deleteAITool(id);
      await loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Upskilling Library & AI Tools Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage published books, masterclasses, and over 50+ prescribed AI productivity tools.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === 'resources' ? (
            <button
              onClick={handleCreateResource}
              className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Resource / Book</span>
            </button>
          ) : (
            <button
              onClick={handleCreateTool}
              className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-blue text-white px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add AI Tool</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('resources')}
          className={`pb-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'resources' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-600 hover:text-brand-dark'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Books & Courses ({resources.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('ai_tools')}
          className={`pb-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'ai_tools' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-600 hover:text-brand-dark'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Prescribed AI Tools Directory ({aiTools.length})</span>
        </button>
      </div>

      {/* Resource Editor Modal */}
      {editingResource && (
        <form onSubmit={handleSaveResource} className="bg-white p-6 rounded-2xl border-2 border-brand-dark shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="font-serif text-xl font-bold text-brand-dark">Edit Resource / Book</h2>
            <button type="button" onClick={() => setEditingResource(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Title *</label>
              <input
                type="text"
                required
                value={editingResource.title}
                onChange={e => setEditingResource({ ...editingResource, title: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Slug *</label>
              <input
                type="text"
                required
                value={editingResource.slug}
                onChange={e => setEditingResource({ ...editingResource, slug: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={editingResource.category}
                onChange={e => setEditingResource({ ...editingResource, category: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              >
                <option value="books">Books & Collections</option>
                <option value="courses">Courses & Masterclasses</option>
                <option value="coaching">Coaching</option>
                <option value="tutorials">Tutorials & Recordings</option>
                <option value="presentations">Presentations & Slides</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Price (e.g. ₦2,000 or Free)</label>
              <input
                type="text"
                value={editingResource.price || ''}
                onChange={e => setEditingResource({ ...editingResource, price: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description *</label>
              <textarea
                rows={3}
                required
                value={editingResource.description}
                onChange={e => setEditingResource({ ...editingResource, description: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Author</label>
              <input
                type="text"
                value={editingResource.author}
                onChange={e => setEditingResource({ ...editingResource, author: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">External Video / Watch URL</label>
              <input
                type="text"
                value={editingResource.external_url || ''}
                onChange={e => setEditingResource({ ...editingResource, external_url: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
                placeholder="https://youtube.com/..."
              />
            </div>
            <div className="sm:col-span-2">
              <ImageUploadField
                label="Resource Thumbnail / Book Cover"
                value={editingResource.thumbnail_url || ''}
                onChange={url => setEditingResource({ ...editingResource, thumbnail_url: url })}
                placeholder="Upload cover image, browse media library, or paste image URL"
                helperText="Upload a book cover, video preview poster, or resource illustration."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button type="button" onClick={() => setEditingResource(null)} className="px-4 py-2 text-xs font-bold text-slate-600">
              Cancel
            </button>
            <button type="submit" className="bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2 text-xs font-bold rounded shadow-sm">
              Save Resource
            </button>
          </div>
        </form>
      )}

      {/* AI Tool Editor Modal */}
      {editingTool && (
        <form onSubmit={handleSaveTool} className="bg-white p-6 rounded-2xl border-2 border-brand-dark shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="font-serif text-xl font-bold text-brand-dark">Edit AI Tool</h2>
            <button type="button" onClick={() => setEditingTool(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tool Name *</label>
              <input
                type="text"
                required
                value={editingTool.name}
                onChange={e => setEditingTool({ ...editingTool, name: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
              <select
                value={editingTool.category}
                onChange={e => {
                  const val = e.target.value as any;
                  const labels: Record<string, string> = {
                    academics: 'Academics & Research',
                    creative: 'Creative Writing',
                    data: 'Data Manipulation',
                    multimedia: 'Multimedia',
                    health: 'Health',
                    finance: 'Finance',
                    legal: 'Legal',
                    engineering: 'Engineering',
                    productivity: 'Productivity'
                  };
                  setEditingTool({
                    ...editingTool,
                    category: val,
                    category_label: labels[val] || val
                  });
                }}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              >
                <option value="academics">Academics & Research</option>
                <option value="creative">Creative Writing</option>
                <option value="data">Data Manipulation</option>
                <option value="multimedia">Multimedia</option>
                <option value="health">Health</option>
                <option value="finance">Finance</option>
                <option value="legal">Legal</option>
                <option value="engineering">Engineering</option>
                <option value="productivity">Productivity</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description *</label>
              <textarea
                rows={3}
                required
                value={editingTool.description}
                onChange={e => setEditingTool({ ...editingTool, description: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Website URL *</label>
              <input
                type="url"
                required
                value={editingTool.website_url}
                onChange={e => setEditingTool({ ...editingTool, website_url: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tags (Comma-separated)</label>
              <input
                type="text"
                value={editingTool.tags.join(', ')}
                onChange={e => setEditingTool({
                  ...editingTool,
                  tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button type="button" onClick={() => setEditingTool(null)} className="px-4 py-2 text-xs font-bold text-slate-600">
              Cancel
            </button>
            <button type="submit" className="bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2 text-xs font-bold rounded shadow-sm">
              Save Tool
            </button>
          </div>
        </form>
      )}

      {/* TAB CONTENT */}
      {activeTab === 'resources' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map(res => (
            <div key={res.id} className="bg-white rounded-xl border border-slate-300 p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                    {res.category}
                  </span>
                  <span className="text-xs font-bold text-brand-dark bg-slate-100 px-2 py-0.5 rounded">
                    {res.price || 'Free'}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-dark mb-1">{res.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">{res.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">By {res.author}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setEditingResource(res)} className="p-1.5 text-slate-500 hover:text-brand-blue">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteResource(res.id)} className="p-1.5 text-slate-500 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500">
                <tr>
                  <th className="p-3">Tool Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">URL</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {aiTools.map(tool => (
                  <tr key={tool.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-brand-dark">{tool.name}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-[10px]">
                        {tool.category_label}
                      </span>
                    </td>
                    <td className="p-3 max-w-xs truncate text-slate-600">{tool.description}</td>
                    <td className="p-3">
                      <a href={tool.website_url} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline flex items-center gap-1">
                        <span className="truncate max-w-[120px]">{tool.website_url}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button onClick={() => setEditingTool(tool)} className="p-1.5 text-slate-400 hover:text-brand-blue">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteTool(tool.id)} className="p-1.5 text-slate-400 hover:text-rose-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
