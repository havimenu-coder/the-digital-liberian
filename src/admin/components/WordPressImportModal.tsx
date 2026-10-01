import React, { useState } from 'react';
import { 
  X, 
  Globe, 
  Code, 
  FileCode, 
  Upload, 
  Check, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  FileText, 
  Eye, 
  RefreshCw,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { 
  importWordPressFromUrl, 
  parseWordPressHtml, 
  parseWordPressXml, 
  WordPressImportedItem 
} from '../../utils/wordpressImporter';
import { dataStore } from '../../lib/storage';
import { Page, BlogPost } from '../../types';

interface WordPressImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  // If provided, allows applying directly to an actively edited page
  onApplyToPage?: (imported: WordPressImportedItem) => void;
  // If provided, allows applying directly to an actively edited blog post
  onApplyToBlog?: (imported: WordPressImportedItem) => void;
  // Preferred default destination
  defaultDestination?: 'page' | 'blog';
}

export const WordPressImportModal: React.FC<WordPressImportModalProps> = ({
  isOpen,
  onClose,
  onApplyToPage,
  onApplyToBlog,
  defaultDestination = 'page'
}) => {
  const [activeTab, setActiveTab] = useState<'url' | 'html' | 'xml'>('url');
  const [urlInput, setUrlInput] = useState('');
  const [htmlInput, setHtmlInput] = useState('');
  const [xmlItems, setXmlItems] = useState<WordPressImportedItem[]>([]);
  const [selectedXmlIndex, setSelectedXmlIndex] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [parsedItem, setParsedItem] = useState<WordPressImportedItem | null>(null);
  const [destination, setDestination] = useState<'page' | 'blog'>(defaultDestination);

  if (!isOpen) return null;

  const handleFetchFromUrl = async () => {
    if (!urlInput.trim()) {
      setError('Please enter a WordPress page or post URL.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setParsedItem(null);

    try {
      const result = await importWordPressFromUrl(urlInput.trim());
      setParsedItem(result);
      if (result.type === 'post' && defaultDestination === 'page') {
        // Can import as page or blog
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to import WordPress page. Make sure the site is publicly accessible, or use the "Paste HTML" tab.');
    } finally {
      setLoading(false);
    }
  };

  const handleParseHtml = () => {
    if (!htmlInput.trim()) {
      setError('Please paste the WordPress HTML or page content.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setParsedItem(null);

    try {
      const result = parseWordPressHtml(htmlInput);
      setParsedItem(result);
    } catch (err: any) {
      setError('Failed to parse HTML: ' + (err?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setParsedItem(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const items = parseWordPressXml(text);
        if (items.length === 0) {
          setError('No published pages or posts found in the uploaded XML file.');
          setLoading(false);
          return;
        }
        setXmlItems(items);
        setSelectedXmlIndex(0);
        setParsedItem(items[0]);
      } catch (err: any) {
        setError('Failed to process XML file: ' + (err?.message || 'Invalid format'));
      } finally {
        setLoading(false);
      }
    };
    reader.onerror = () => {
      setError('Could not read the uploaded file.');
      setLoading(false);
    };
    reader.readAsText(file);
  };

  const handleSaveToSite = async () => {
    if (!parsedItem) return;

    setLoading(true);
    setError(null);

    try {
      if (destination === 'page') {
        // If caller provided callback to update currently open editor
        if (onApplyToPage) {
          onApplyToPage(parsedItem);
          setSuccessMessage(`Successfully applied "${parsedItem.title}" to your page editor!`);
          setTimeout(() => {
            onClose();
          }, 800);
          return;
        }

        // Save as a brand new custom page in storage
        const newPage: Page = {
          id: 'page-' + Date.now(),
          title: parsedItem.title,
          slug: parsedItem.slug || `page-${Date.now()}`,
          sections: parsedItem.sections,
          featured_image: parsedItem.featured_image,
          seo_title: `${parsedItem.title} | The Digital Librarian`,
          seo_description: parsedItem.excerpt || 'Resource and information page from The Digital Librarian.',
          published: true,
          created_at: parsedItem.date || new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        await dataStore.savePage(newPage);
        setSuccessMessage(`Page "${newPage.title}" imported and saved successfully!`);
        setTimeout(() => {
          onClose();
          window.location.href = `/admin/pages`;
        }, 1200);

      } else {
        // Save as Blog Post
        if (onApplyToBlog) {
          onApplyToBlog(parsedItem);
          setSuccessMessage(`Successfully applied "${parsedItem.title}" to your blog editor!`);
          setTimeout(() => {
            onClose();
          }, 800);
          return;
        }

        const newPost: BlogPost = {
          id: 'post-' + Date.now(),
          title: parsedItem.title,
          slug: parsedItem.slug || `article-${Date.now()}`,
          excerpt: parsedItem.excerpt || 'Imported article from WordPress.',
          content: parsedItem.content,
          featured_image: parsedItem.featured_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
          category: parsedItem.categories?.[0] || 'General',
          tags: parsedItem.tags || ['WordPress', 'Imported'],
          author_name: parsedItem.author || 'Sylvester I. Ebhonu',
          author_role: 'Founder & Lead Consultant',
          author_avatar: '/images/sylvester-portrait.png',
          published: true,
          published_at: parsedItem.date ? parsedItem.date.split('T')[0] : new Date().toISOString().split('T')[0],
          reading_time: '4 min read'
        };

        await dataStore.saveBlogPost(newPost);
        setSuccessMessage(`Article "${newPost.title}" imported and published to your blog!`);
        setTimeout(() => {
          onClose();
          window.location.href = `/admin/blog`;
        }, 1200);
      }
    } catch (err: any) {
      setError('Failed to save imported content: ' + (err?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-brand-dark text-white px-6 py-5 flex items-center justify-between border-b border-blue-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/60 border border-blue-700/50 flex items-center justify-center text-brand-blue">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Import from WordPress</span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-brand-blue px-2 py-0.5 rounded text-white">
                  Automated
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Instantly import any live WordPress page, article, or export into The Digital Librarian site.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-blue-900/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Import Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            onClick={() => { setActiveTab('url'); setError(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-lg border-b-2 transition-all ${
              activeTab === 'url'
                ? 'bg-white border-brand-blue text-brand-blue shadow-sm'
                : 'border-transparent text-slate-600 hover:text-brand-dark'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Live WordPress URL</span>
          </button>

          <button
            onClick={() => { setActiveTab('html'); setError(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-lg border-b-2 transition-all ${
              activeTab === 'html'
                ? 'bg-white border-brand-blue text-brand-blue shadow-sm'
                : 'border-transparent text-slate-600 hover:text-brand-dark'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Paste HTML / Content</span>
          </button>

          <button
            onClick={() => { setActiveTab('xml'); setError(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-lg border-b-2 transition-all ${
              activeTab === 'xml'
                ? 'bg-white border-brand-blue text-brand-blue shadow-sm'
                : 'border-transparent text-slate-600 hover:text-brand-dark'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Upload WP Export (.xml)</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 font-semibold">{successMessage}</div>
            </div>
          )}

          {/* TAB 1: Live URL */}
          {activeTab === 'url' && (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700">
                WordPress Page or Post URL *
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/about-us or https://myblog.wordpress.com/page/"
                  className="flex-1 px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-blue font-mono"
                  onKeyDown={(e) => e.key === 'Enter' && handleFetchFromUrl()}
                />
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleFetchFromUrl}
                  className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50 shadow-sm"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Fetching...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Fetch & Convert</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Works with self-hosted WordPress, WordPress.com, and WP REST API endpoints. Automatic CORS fallbacks are built in.
              </p>
            </div>
          )}

          {/* TAB 2: Paste HTML */}
          {activeTab === 'html' && (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700">
                Paste Page HTML / Gutenberg Code *
              </label>
              <textarea
                rows={7}
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
                placeholder="Paste the HTML source code or Gutenberg block text of your WordPress page here..."
                className="w-full p-3 text-xs font-mono border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-blue resize-y"
              />
              <button
                type="button"
                disabled={loading}
                onClick={handleParseHtml}
                className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Parse HTML to Sections</span>
              </button>
            </div>
          )}

          {/* TAB 3: Upload XML */}
          {activeTab === 'xml' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-brand-blue transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">
                  Select your WordPress export file (.xml)
                </p>
                <p className="text-[11px] text-slate-500 mt-1 mb-3">
                  Exported from WordPress Admin → Tools → Export
                </p>
                <input
                  type="file"
                  accept=".xml"
                  onChange={handleFileUpload}
                  className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-blue file:text-white hover:file:bg-brand-blue-hover cursor-pointer"
                />
              </div>

              {xmlItems.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Select Page from Export ({xmlItems.length} found):
                  </label>
                  <select
                    value={selectedXmlIndex}
                    onChange={(e) => {
                      const idx = Number(e.target.value);
                      setSelectedXmlIndex(idx);
                      setParsedItem(xmlItems[idx]);
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                  >
                    {xmlItems.map((item, i) => (
                      <option key={i} value={i}>
                        [{item.type.toUpperCase()}] {item.title} (/{item.slug})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Parsed Result Preview */}
          {parsedItem && (
            <div className="border border-blue-200 bg-blue-50/50 rounded-2xl p-5 space-y-4 mt-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-blue-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800">
                    WordPress Page Successfully Parsed & Structured
                  </span>
                </div>
                <span className="text-[11px] font-bold text-brand-blue bg-white px-2.5 py-0.5 rounded-full border border-blue-200">
                  {parsedItem.sections.length} Site Sections Generated
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Page Title</label>
                    <input
                      type="text"
                      value={parsedItem.title}
                      onChange={(e) => setParsedItem({ ...parsedItem, title: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs font-bold text-brand-dark bg-white border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">URL Slug</label>
                    <input
                      type="text"
                      value={parsedItem.slug}
                      onChange={(e) => setParsedItem({ ...parsedItem, slug: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs font-mono text-slate-700 bg-white border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Excerpt / Summary</label>
                    <textarea
                      rows={2}
                      value={parsedItem.excerpt}
                      onChange={(e) => setParsedItem({ ...parsedItem, excerpt: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-300 rounded-lg resize-none"
                    />
                  </div>
                </div>

                {/* Thumbnail / Meta info */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Featured Image</label>
                    {parsedItem.featured_image ? (
                      <div className="aspect-video rounded-lg overflow-hidden border border-slate-300 bg-slate-100">
                        <img
                          src={parsedItem.featured_image}
                          alt={parsedItem.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-[10px] text-slate-400">
                        No image detected
                      </div>
                    )}
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-[11px] space-y-1 text-slate-600">
                    <div><strong>Converted Blocks:</strong></div>
                    <ul className="list-disc pl-4 space-y-0.5 text-[10px]">
                      {parsedItem.sections.map((s, idx) => (
                        <li key={idx}>
                          {s.type.replace('_', ' ').toUpperCase()} {s.data.heading ? `("${s.data.heading.slice(0, 20)}...")` : ''}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Destination Selector */}
              <div className="pt-2 border-t border-blue-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-700">Target Destination:</span>
                  <label className="inline-flex items-center gap-1.5 text-xs cursor-pointer font-medium">
                    <input
                      type="radio"
                      name="destination"
                      value="page"
                      checked={destination === 'page'}
                      onChange={() => setDestination('page')}
                      className="text-brand-blue"
                    />
                    <span>Custom Page (Page Builder)</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 text-xs cursor-pointer font-medium">
                    <input
                      type="radio"
                      name="destination"
                      value="blog"
                      checked={destination === 'blog'}
                      onChange={() => setDestination('blog')}
                      className="text-brand-blue"
                    />
                    <span>Blog Post</span>
                  </label>
                </div>

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSaveToSite}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {destination === 'page'
                      ? onApplyToPage ? 'Apply to Current Page' : 'Save as Custom Page'
                      : onApplyToBlog ? 'Apply to Current Article' : 'Publish as Blog Post'
                    }
                  </span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Need help? You can also paste directly from your WordPress Gutenberg editor.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg hover:bg-slate-200 font-bold text-slate-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
