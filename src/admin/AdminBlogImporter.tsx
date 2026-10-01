import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Search, 
  Filter, 
  Eye, 
  X, 
  RefreshCw, 
  ExternalLink, 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  Layers, 
  Check, 
  Sparkles,
  Info,
  ChevronRight,
  ShieldCheck,
  FileCode
} from 'lucide-react';
import { dataStore } from '../lib/storage';
import { BlogPost } from '../types';
import { 
  parseWordPressWxr, 
  convertWxrPostToBlogPost, 
  WxrParseResult, 
  ParsedWxrPost 
} from '../utils/wordpressXmlParser';

export const AdminBlogImporter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [xmlContent, setXmlContent] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  
  const [existingPosts, setExistingPosts] = useState<BlogPost[]>([]);
  const [parseResult, setParseResult] = useState<WxrParseResult | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  // Selection & Duplicate Controls
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [overwriteDuplicates, setOverwriteDuplicates] = useState(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'duplicate'>('all');

  // Preview Modal
  const [inspectingPost, setInspectingPost] = useState<ParsedWxrPost | null>(null);

  // Import Execution
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState<{ current: number; total: number; currentTitle: string }>({
    current: 0,
    total: 0,
    currentTitle: ''
  });
  const [importSummary, setImportSummary] = useState<{
    completed: boolean;
    added: number;
    updated: number;
    skipped: number;
    failed: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dataStore.getBlogPosts().then(setExistingPosts);
  }, []);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processSelectedFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processSelectedFile(selectedFile);
    }
  };

  const processSelectedFile = (selectedFile: File) => {
    if (!selectedFile.name.endsWith('.xml')) {
      setParseError('Please upload a valid WordPress XML export file (.xml)');
      return;
    }

    setFile(selectedFile);
    setParseError(null);
    setParseResult(null);
    setImportSummary(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setXmlContent(text);
    };
    reader.onerror = () => {
      setParseError('Failed to read the XML file.');
    };
    reader.readAsText(selectedFile);
  };

  // Analyze XML
  const handleAnalyzeXml = () => {
    if (!xmlContent) {
      setParseError('Please select or upload a WordPress WXR XML file first.');
      return;
    }

    setIsParsing(true);
    setParseError(null);
    setImportSummary(null);

    setTimeout(() => {
      try {
        const result = parseWordPressWxr(xmlContent, existingPosts);
        setParseResult(result);

        // Pre-select all non-duplicate posts by default
        const newIds = new Set<string>();
        result.posts.forEach(p => {
          if (!p.is_duplicate) {
            newIds.add(p.wp_id);
          }
        });
        setSelectedIds(newIds);
      } catch (err: any) {
        setParseError(err?.message || 'Failed to parse XML file.');
      } finally {
        setIsParsing(false);
      }
    }, 100);
  };

  // Selection helpers
  const handleToggleSelect = (wpId: string) => {
    const next = new Set(selectedIds);
    if (next.has(wpId)) {
      next.delete(wpId);
    } else {
      next.add(wpId);
    }
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (!parseResult) return;
    const all = new Set<string>(parseResult.posts.map(p => p.wp_id));
    setSelectedIds(all);
  };

  const handleSelectNone = () => {
    setSelectedIds(new Set());
  };

  const handleSelectNewOnly = () => {
    if (!parseResult) return;
    const onlyNew = new Set<string>(parseResult.posts.filter(p => !p.is_duplicate).map(p => p.wp_id));
    setSelectedIds(onlyNew);
  };

  // Filtered posts for preview table
  const displayedPosts = (parseResult?.posts || []).filter(post => {
    // Search
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.categories.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));

    // Category
    const matchesCategory = selectedCategory === 'all' || post.categories.includes(selectedCategory);

    // Status
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'new' && !post.is_duplicate) ||
      (statusFilter === 'duplicate' && post.is_duplicate);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Execute Batch Import
  const handleExecuteImport = async () => {
    if (!parseResult) return;

    const postsToImport = parseResult.posts.filter(p => selectedIds.has(p.wp_id));
    if (postsToImport.length === 0) {
      alert('Please select at least one blog post to import.');
      return;
    }

    setIsImporting(true);
    setImportProgress({ current: 0, total: postsToImport.length, currentTitle: 'Preparing posts...' });

    let addedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;
    let failedCount = 0;

    const convertedPosts: BlogPost[] = [];

    // Process posts in sequence
    for (let i = 0; i < postsToImport.length; i++) {
      const wxrPost = postsToImport[i];
      setImportProgress({
        current: i + 1,
        total: postsToImport.length,
        currentTitle: wxrPost.title
      });

      try {
        const blogPost = convertWxrPostToBlogPost(wxrPost);
        convertedPosts.push(blogPost);
      } catch (err) {
        failedCount++;
      }

      // Small tick for smooth UI rendering
      if (i % 5 === 0) {
        await new Promise(r => setTimeout(r, 10));
      }
    }

    // Save batch into website database
    try {
      const res = await dataStore.saveBlogPostsBatch(convertedPosts, overwriteDuplicates);
      addedCount = res.added;
      updatedCount = res.updated;
      skippedCount = res.skipped;
    } catch (err) {
      console.error('Batch import storage error:', err);
      // Fallback one-by-one save
      for (const p of convertedPosts) {
        try {
          await dataStore.saveBlogPost(p);
          addedCount++;
        } catch {
          failedCount++;
        }
      }
    }

    // Refresh existing posts
    const updatedList = await dataStore.getBlogPosts();
    setExistingPosts(updatedList);

    setIsImporting(false);
    setImportSummary({
      completed: true,
      added: addedCount,
      updated: updatedCount,
      skipped: skippedCount,
      failed: failedCount
    });
  };

  const newPostsCount = parseResult?.posts.filter(p => !p.is_duplicate).length || 0;
  const duplicatePostsCount = parseResult?.posts.filter(p => p.is_duplicate).length || 0;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest bg-brand-blue text-white px-2.5 py-1 rounded-md">
              WordPress Migration Tool
            </span>
            <span className="text-xs text-slate-500 font-semibold">WXR XML 1.2+</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            WordPress XML Blog Importer
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Upload your WordPress XML export file to parse and automatically create individual, standalone blog post records in your database, complete with categories, publication dates, and original content structure.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            to="/admin/blog"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
          >
            <BookOpen className="w-4 h-4 text-brand-blue" />
            <span>View All Articles</span>
          </Link>
        </div>
      </div>

      {/* STEP 1: Upload & Drag-and-Drop Area */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-blue text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Upload WordPress WXR Export File</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Exported from your WordPress dashboard via <strong>Tools → Export → Posts</strong>.
            </p>
          </div>
          {file && (
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              File Loaded
            </span>
          )}
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-brand-blue bg-blue-50/50 scale-[0.99]'
              : 'border-slate-300 hover:border-brand-blue bg-slate-50/50 hover:bg-slate-50'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xml"
            className="hidden"
          />

          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-brand-blue mx-auto mb-4">
            <Upload className="w-8 h-8" />
          </div>

          <h3 className="font-serif text-base font-bold text-brand-dark mb-1">
            {file ? file.name : 'Choose a WordPress XML file or drag and drop here'}
          </h3>

          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            {file 
              ? `${(file.size / 1024 / 1024).toFixed(2)} MB · Last modified: ${new Date(file.lastModified).toLocaleDateString()}` 
              : 'Supports standard WordPress WXR export files (.xml format)'}
          </p>

          <button
            type="button"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <span>{file ? 'Choose Different File' : 'Browse Computer'}</span>
          </button>
        </div>

        {parseError && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-rose-800">XML Error</div>
              <div>{parseError}</div>
            </div>
          </div>
        )}

        {file && !parseResult && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleAnalyzeXml}
              disabled={isParsing}
              className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-7 py-3 rounded-xl text-xs font-bold transition-all shadow-sm disabled:opacity-50 active:scale-95"
            >
              {isParsing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing XML Posts & Attachments...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze XML</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* STEP 2: Preview & Selection Table */}
      {parseResult && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
          
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-blue text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>Review & Select Posts to Import</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Found <strong>{parseResult.postsCount}</strong> blog posts in "{parseResult.siteTitle}" ({parseResult.wxrVersion})
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand-blue bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg">
                {selectedIds.size} of {parseResult.postsCount} Posts Selected
              </span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Posts</span>
              <div className="font-serif text-2xl font-bold text-brand-dark mt-0.5">{parseResult.postsCount}</div>
            </div>

            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Ready / New Posts</span>
              <div className="font-serif text-2xl font-bold text-emerald-800 mt-0.5">{newPostsCount}</div>
            </div>

            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
              <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">Existing Duplicates</span>
              <div className="font-serif text-2xl font-bold text-amber-800 mt-0.5">{duplicatePostsCount}</div>
            </div>

            <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200">
              <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">Media Attachments</span>
              <div className="font-serif text-2xl font-bold text-blue-800 mt-0.5">{parseResult.attachmentsCount}</div>
            </div>
          </div>

          {/* Duplicate Setting Notice */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-blue flex-shrink-0" />
              <div className="text-xs text-slate-700">
                <span className="font-bold">Duplicate Detection Active:</span> Matched by original WordPress ID, URL slug, or link.
              </div>
            </div>

            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={overwriteDuplicates}
                onChange={(e) => setOverwriteDuplicates(e.target.checked)}
                className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue w-4 h-4"
              />
              <span>Overwrite / Update existing posts if duplicate</span>
            </label>
          </div>

          {/* Filtering Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                onClick={handleSelectAll}
                className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                Select All ({parseResult.postsCount})
              </button>
              <button
                onClick={handleSelectNewOnly}
                className="text-xs font-semibold px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg transition-colors"
              >
                Select New Only ({newPostsCount})
              </button>
              <button
                onClick={handleSelectNone}
                className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                Deselect All
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(e: any) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue bg-white"
              >
                <option value="all">All Status ({parseResult.postsCount})</option>
                <option value="new">New Only ({newPostsCount})</option>
                <option value="duplicate">Duplicates ({duplicatePostsCount})</option>
              </select>

              {/* Category filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue bg-white max-w-[160px]"
              >
                <option value="all">All Categories</option>
                {parseResult.categoriesSummary.map(c => (
                  <option key={c.name} value={c.name}>{c.name} ({c.count})</option>
                ))}
              </select>

              {/* Search */}
              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search detected posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
            </div>
          </div>

          {/* Posts Preview Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto max-h-[500px]">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500 tracking-wider sticky top-0 z-10">
                  <tr>
                    <th className="p-3 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === parseResult.postsCount && parseResult.postsCount > 0}
                        onChange={(e) => e.target.checked ? handleSelectAll() : handleSelectNone()}
                        className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
                      />
                    </th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Slug</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Preview</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayedPosts.length > 0 ? (
                    displayedPosts.map((p) => {
                      const isSelected = selectedIds.has(p.wp_id);
                      return (
                        <tr 
                          key={p.wp_id} 
                          className={`hover:bg-slate-50 transition-colors ${isSelected ? 'bg-blue-50/20' : ''}`}
                        >
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleSelect(p.wp_id)}
                              className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
                            />
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-brand-dark max-w-xs truncate" title={p.title}>
                              {p.title}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                              <span>WP #{p.wp_id}</span>
                              {p.original_link && (
                                <a 
                                  href={p.original_link} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-brand-blue hover:underline inline-flex items-center gap-0.5 ml-1"
                                >
                                  <span>link</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="p-3 font-mono text-[11px] text-slate-600 max-w-[140px] truncate">
                            /{p.slug}
                          </td>
                          <td className="p-3 text-slate-500 whitespace-nowrap">
                            {p.date}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[10px]">
                              {p.categories[0] || 'General'}
                            </span>
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            {p.is_duplicate ? (
                              <span 
                                className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800"
                                title={p.duplicate_reason}
                              >
                                Duplicate
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                Ready
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setInspectingPost(p)}
                              className="p-1.5 text-slate-400 hover:text-brand-blue transition-colors rounded-lg hover:bg-slate-100"
                              title="Inspect article content and structure"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500 text-xs">
                        No posts matched your current search or category filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* STEP 3: Execute Import Action Bar */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Selected <strong>{selectedIds.size}</strong> posts to import into The Digital Librarian database.
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-xs font-semibold text-slate-600 hover:text-brand-dark px-3 py-2"
              >
                Reset Selection
              </button>

              <button
                type="button"
                disabled={selectedIds.size === 0 || isImporting}
                onClick={handleExecuteImport}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {isImporting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Importing Posts ({importProgress.current}/{importProgress.total})...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Import {selectedIds.size} Selected Posts</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Progress Bar during import */}
          {isImporting && (
            <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between text-xs text-brand-dark font-bold">
                <span className="truncate max-w-md">Processing: {importProgress.currentTitle}</span>
                <span>
                  {importProgress.total > 0 
                    ? Math.round((importProgress.current / importProgress.total) * 100) 
                    : 0}%
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-brand-blue h-2 rounded-full transition-all duration-200"
                  style={{ 
                    width: `${importProgress.total > 0 ? (importProgress.current / importProgress.total) * 100 : 0}%` 
                  }}
                />
              </div>
              <div className="text-[11px] text-slate-500 text-center">
                Saving individual records to database with full content and media references...
              </div>
            </div>
          )}

          {/* Import Summary */}
          {importSummary && (
            <div className="p-6 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-4 animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-emerald-950">
                    Import Process Completed!
                  </h3>
                  <p className="text-xs text-emerald-800">
                    The requested blog posts have been created as standalone database records.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center">
                  <div className="font-serif text-2xl font-bold text-emerald-700">{importSummary.added}</div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">Newly Added</div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center">
                  <div className="font-serif text-2xl font-bold text-blue-700">{importSummary.updated}</div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">Updated / Overwritten</div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center">
                  <div className="font-serif text-2xl font-bold text-amber-700">{importSummary.skipped}</div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">Skipped Duplicates</div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center">
                  <div className="font-serif text-2xl font-bold text-slate-700">{importSummary.failed}</div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">Failed</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-emerald-200/60">
                <button
                  onClick={() => {
                    setFile(null);
                    setParseResult(null);
                    setImportSummary(null);
                  }}
                  className="text-xs font-semibold text-emerald-900 hover:underline"
                >
                  Import Another XML File
                </button>

                <div className="flex items-center gap-3">
                  <Link
                    to="/blog"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-white hover:bg-emerald-100 border border-emerald-300 px-4 py-2 rounded-xl transition-colors"
                  >
                    <span>Visit Live Blog</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to="/admin/blog"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-brand-dark hover:bg-black px-5 py-2 rounded-xl transition-colors shadow-sm"
                  >
                    <span>Manage in Blog CMS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Post Inspect Modal */}
      {inspectingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-brand-dark text-white p-6 flex items-center justify-between border-b border-blue-900/60">
              <div className="space-y-1 pr-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                  {inspectingPost.categories[0] || 'Article'}
                </span>
                <h3 className="font-serif text-lg font-bold text-white leading-snug">
                  {inspectingPost.title}
                </h3>
              </div>
              <button
                onClick={() => setInspectingPost(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-blue-900/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              {/* Metadata pills */}
              <div className="flex flex-wrap gap-3 text-xs text-slate-500 pb-3 border-b border-slate-100">
                <div><strong>Slug:</strong> /{inspectingPost.slug}</div>
                <div>·</div>
                <div><strong>Date:</strong> {inspectingPost.date}</div>
                <div>·</div>
                <div><strong>Word Count:</strong> {inspectingPost.word_count} words ({inspectingPost.reading_time})</div>
                <div>·</div>
                <div><strong>Status:</strong> {inspectingPost.status}</div>
              </div>

              {/* Featured Image */}
              {inspectingPost.featured_image && (
                <div className="aspect-video max-h-64 rounded-xl overflow-hidden border border-slate-200">
                  <img
                    src={inspectingPost.featured_image}
                    alt={inspectingPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Excerpt */}
              {inspectingPost.excerpt && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs italic text-slate-600">
                  <strong>Excerpt:</strong> {inspectingPost.excerpt}
                </div>
              )}

              {/* Article Content Preview */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Original Content Body:</h4>
                <div 
                  className="prose prose-sm max-w-none text-slate-800 border p-4 rounded-xl border-slate-200 bg-slate-50/30 max-h-80 overflow-y-auto text-xs leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: inspectingPost.content }}
                />
              </div>

              {/* Tags */}
              {inspectingPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {inspectingPost.tags.map(t => (
                    <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {selectedIds.has(inspectingPost.wp_id) ? '✓ Included in import selection' : 'Not currently selected'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleSelect(inspectingPost.wp_id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    selectedIds.has(inspectingPost.wp_id)
                      ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {selectedIds.has(inspectingPost.wp_id) ? 'Deselect from Import' : 'Select for Import'}
                </button>
                <button
                  onClick={() => setInspectingPost(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
