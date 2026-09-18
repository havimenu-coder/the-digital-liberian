import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Copy, 
  Eye, 
  ArrowUp, 
  ArrowDown, 
  Check, 
  X, 
  Globe, 
  Save, 
  ExternalLink,
  Layers,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { dataStore } from '../lib/storage';
import { Page, PageSection, SectionType } from '../types';

export const AdminPages: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    loadPages();
    const params = new URLSearchParams(location.search);
    if (params.get('action') === 'new') {
      handleCreateNew();
    }
  }, [location.search]);

  const loadPages = async () => {
    const list = await dataStore.getPages();
    setPages(list);
  };

  const handleCreateNew = () => {
    const newPage: Page = {
      id: 'page-' + Date.now(),
      title: 'New Page',
      slug: 'new-page-' + Math.floor(Math.random() * 1000),
      published: false,
      seo_title: 'New Page | The Digital Librarian',
      seo_description: 'Discover practical solutions and learning resources from The Digital Librarian.',
      sections: [
        {
          id: 'sec-' + Date.now(),
          type: 'hero',
          order: 1,
          data: {
            heading: 'Empowering Your Digital Transformation',
            subheading: 'Specialized Advisory',
            description: 'Custom learning pathways, digital technology blueprints, and capacity building for institutions.',
            buttonText: 'Get in Touch',
            buttonUrl: '/contact'
          }
        },
        {
          id: 'sec-' + (Date.now() + 1),
          type: 'text_block',
          order: 2,
          data: {
            heading: 'Our Dedicated Approach',
            content: 'We combine rigorous research methodologies with practical digital tool deployment. Whether automating library archives or training faculty, we focus on measurable human and institutional impact.'
          }
        },
        {
          id: 'sec-' + (Date.now() + 2),
          type: 'services_grid',
          order: 3,
          data: {}
        },
        {
          id: 'sec-' + (Date.now() + 3),
          type: 'cta_banner',
          order: 4,
          data: {}
        }
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setEditingPage(newPage);
  };

  const handleSavePage = async () => {
    if (!editingPage) return;
    await dataStore.savePage(editingPage);
    await loadPages();
    alert('Page saved successfully!');
    setEditingPage(null);
  };

  const handleDeletePage = async (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      await dataStore.deletePage(id);
      await loadPages();
    }
  };

  const handleDuplicatePage = async (page: Page) => {
    const dup: Page = {
      ...page,
      id: 'page-' + Date.now(),
      title: page.title + ' (Copy)',
      slug: page.slug + '-copy-' + Math.floor(Math.random() * 100),
      published: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    await dataStore.savePage(dup);
    await loadPages();
  };

  // Section Management within Block Builder
  const handleAddSection = (type: SectionType) => {
    if (!editingPage) return;
    const newSection: PageSection = {
      id: 'sec-' + Date.now(),
      type,
      order: editingPage.sections.length + 1,
      data: getDefaultSectionData(type)
    };
    setEditingPage({
      ...editingPage,
      sections: [...editingPage.sections, newSection]
    });
  };

  const handleRemoveSection = (secId: string) => {
    if (!editingPage) return;
    setEditingPage({
      ...editingPage,
      sections: editingPage.sections.filter(s => s.id !== secId)
    });
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    if (!editingPage) return;
    const secs = [...editingPage.sections];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= secs.length) return;

    const temp = secs[index];
    secs[index] = secs[targetIdx];
    secs[targetIdx] = temp;

    // re-assign orders
    secs.forEach((s, i) => { s.order = i + 1; });

    setEditingPage({
      ...editingPage,
      sections: secs
    });
  };

  const handleUpdateSectionData = (secId: string, field: string, value: any) => {
    if (!editingPage) return;
    const updated = editingPage.sections.map(s => {
      if (s.id === secId) {
        return {
          ...s,
          data: {
            ...s.data,
            [field]: value
          }
        };
      }
      return s;
    });
    setEditingPage({
      ...editingPage,
      sections: updated
    });
  };

  function getDefaultSectionData(type: SectionType): Record<string, any> {
    switch (type) {
      case 'hero':
        return { heading: 'Custom Page Heading', subheading: 'Section Subheading', description: 'Brief description of this section.', buttonText: 'Learn More', buttonUrl: '/contact' };
      case 'text_block':
        return { heading: 'About This Initiative', content: 'Detailed paragraph text describing the mission and context.' };
      case 'text_image':
        return { heading: 'Strategic Capabilities', text: 'Overview description.', imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80' };
      case 'cards_grid':
        return { heading: 'Key Highlights', cards: [{ title: 'Pillar One', description: 'Focus on technology.' }, { title: 'Pillar Two', description: 'Focus on capacity.' }, { title: 'Pillar Three', description: 'Focus on ethics.' }] };
      case 'quote':
        return { quoteText: 'Technology without purpose is meaningless. We build for impact.', quoteAuthor: 'Sylvester I. Ebhonu' };
      default:
        return {};
    }
  }

  // If in Visual Block Builder Mode
  if (editingPage) {
    return (
      <div className="space-y-6">
        {/* Editor Top Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-4 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditingPage(null)}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-serif text-xl font-bold text-brand-dark">
                {editingPage.title || 'Untitled Page'}
              </h2>
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <span>Slug: /{editingPage.slug}</span>
                <span>·</span>
                <span className={editingPage.published ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                  {editingPage.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setEditingPage({ ...editingPage, published: !editingPage.published })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                editingPage.published
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              {editingPage.published ? 'Published' : 'Draft'}
            </button>

            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>{previewMode ? 'Edit Mode' : 'Preview'}</span>
            </button>

            <button
              onClick={handleSavePage}
              className="inline-flex items-center gap-1.5 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Page</span>
            </button>
          </div>
        </div>

        {/* Page Meta Details Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-serif text-base font-bold text-brand-dark border-b border-slate-100 pb-2">
            Page Meta & SEO Settings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Page Title *</label>
              <input
                type="text"
                value={editingPage.title}
                onChange={e => setEditingPage({ ...editingPage, title: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">URL Slug (e.g. consulting) *</label>
              <input
                type="text"
                value={editingPage.slug}
                onChange={e => setEditingPage({ ...editingPage, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">SEO Meta Title</label>
              <input
                type="text"
                value={editingPage.seo_title || ''}
                onChange={e => setEditingPage({ ...editingPage, seo_title: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
          </div>
        </div>

        {/* Block Builder Canvas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-blue" />
              <span>Page Sections ({editingPage.sections.length})</span>
            </h3>
            
            {/* Add Section Menu */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-500">Add Block:</span>
              <button
                onClick={() => handleAddSection('hero')}
                className="px-2.5 py-1 bg-white border border-slate-300 hover:border-brand-blue rounded text-xs font-medium"
              >
                + Hero
              </button>
              <button
                onClick={() => handleAddSection('text_block')}
                className="px-2.5 py-1 bg-white border border-slate-300 hover:border-brand-blue rounded text-xs font-medium"
              >
                + Text Block
              </button>
              <button
                onClick={() => handleAddSection('text_image')}
                className="px-2.5 py-1 bg-white border border-slate-300 hover:border-brand-blue rounded text-xs font-medium"
              >
                + Text + Image
              </button>
              <button
                onClick={() => handleAddSection('cards_grid')}
                className="px-2.5 py-1 bg-white border border-slate-300 hover:border-brand-blue rounded text-xs font-medium"
              >
                + Cards Grid
              </button>
              <button
                onClick={() => handleAddSection('services_grid')}
                className="px-2.5 py-1 bg-white border border-slate-300 hover:border-brand-blue rounded text-xs font-medium"
              >
                + Services
              </button>
              <button
                onClick={() => handleAddSection('testimonials')}
                className="px-2.5 py-1 bg-white border border-slate-300 hover:border-brand-blue rounded text-xs font-medium"
              >
                + Testimonials
              </button>
              <button
                onClick={() => handleAddSection('stats')}
                className="px-2.5 py-1 bg-white border border-slate-300 hover:border-brand-blue rounded text-xs font-medium"
              >
                + Stats
              </button>
              <button
                onClick={() => handleAddSection('quote')}
                className="px-2.5 py-1 bg-white border border-slate-300 hover:border-brand-blue rounded text-xs font-medium"
              >
                + Quote
              </button>
              <button
                onClick={() => handleAddSection('cta_banner')}
                className="px-2.5 py-1 bg-white border border-slate-300 hover:border-brand-blue rounded text-xs font-medium"
              >
                + Dark CTA
              </button>
            </div>
          </div>

          {/* Section Blocks List */}
          <div className="space-y-4">
            {editingPage.sections.map((sec, idx) => (
              <div
                key={sec.id}
                className="bg-white rounded-xl border border-slate-300 p-5 shadow-sm space-y-4"
              >
                {/* Block Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                      Block: {sec.type.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMoveSection(idx, 'up')}
                      className="p-1.5 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-30"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      disabled={idx === editingPage.sections.length - 1}
                      onClick={() => handleMoveSection(idx, 'down')}
                      className="p-1.5 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-30"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveSection(sec.id)}
                      className="p-1.5 rounded hover:bg-rose-50 text-rose-500"
                      title="Delete Section"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Section Specific Editable Fields */}
                {sec.type === 'hero' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Heading</label>
                      <input
                        type="text"
                        value={sec.data.heading || ''}
                        onChange={e => handleUpdateSectionData(sec.id, 'heading', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded outline-none focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Subheading</label>
                      <input
                        type="text"
                        value={sec.data.subheading || ''}
                        onChange={e => handleUpdateSectionData(sec.id, 'subheading', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded outline-none focus:border-brand-blue"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={sec.data.description || ''}
                        onChange={e => handleUpdateSectionData(sec.id, 'description', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded outline-none focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={sec.data.buttonText || ''}
                        onChange={e => handleUpdateSectionData(sec.id, 'buttonText', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded outline-none focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Button URL</label>
                      <input
                        type="text"
                        value={sec.data.buttonUrl || ''}
                        onChange={e => handleUpdateSectionData(sec.id, 'buttonUrl', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded outline-none focus:border-brand-blue"
                      />
                    </div>
                  </div>
                )}

                {sec.type === 'text_block' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Section Heading</label>
                      <input
                        type="text"
                        value={sec.data.heading || ''}
                        onChange={e => handleUpdateSectionData(sec.id, 'heading', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Paragraph Content</label>
                      <textarea
                        rows={4}
                        value={sec.data.content || ''}
                        onChange={e => handleUpdateSectionData(sec.id, 'content', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded outline-none"
                      />
                    </div>
                  </div>
                )}

                {sec.type === 'quote' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Quote Text</label>
                      <input
                        type="text"
                        value={sec.data.quoteText || ''}
                        onChange={e => handleUpdateSectionData(sec.id, 'quoteText', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Author / Attribution</label>
                      <input
                        type="text"
                        value={sec.data.quoteAuthor || ''}
                        onChange={e => handleUpdateSectionData(sec.id, 'quoteAuthor', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded outline-none"
                      />
                    </div>
                  </div>
                )}

                {(sec.type === 'services_grid' || sec.type === 'stats' || sec.type === 'testimonials' || sec.type === 'cta_banner') && (
                  <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 italic">
                    This block automatically dynamically displays and renders the live {sec.type.replace('_', ' ')} component synced with your CMS repository.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // Page Listing Table
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Page Management & Page Builder
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, edit, duplicate, publish, and delete custom pages without touching source code.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Page</span>
        </button>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {pages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500 tracking-wider">
                <tr>
                  <th className="p-4">Page Title</th>
                  <th className="p-4">URL Slug</th>
                  <th className="p-4">Sections</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Last Updated</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {pages.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-brand-dark">
                      {p.title}
                    </td>
                    <td className="p-4 font-mono text-slate-500">
                      /{p.slug}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold">
                        {p.sections?.length || 0} Blocks
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.published
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {p.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">
                      {new Date(p.updated_at || p.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <a
                        href={`/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block p-1.5 text-slate-400 hover:text-brand-blue"
                        title="View Live Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDuplicatePage(p)}
                        className="p-1.5 text-slate-400 hover:text-slate-700"
                        title="Duplicate Page"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingPage(p)}
                        className="p-1.5 text-slate-400 hover:text-brand-blue"
                        title="Edit in Page Builder"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePage(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600"
                        title="Delete Page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center space-y-3">
            <Layers className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-brand-dark">No Custom Pages Created Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You can create completely new pages and landing sites with our drag-and-drop block builder without writing any code.
            </p>
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center gap-1.5 bg-brand-blue text-white px-4 py-2 rounded-lg text-xs font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Custom Page</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
