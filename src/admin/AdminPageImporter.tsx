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
  Layers, 
  Check, 
  Sparkles,
  ShieldCheck,
  Globe,
  Plus
} from 'lucide-react';
import { dataStore } from '../lib/storage';
import { Page } from '../types';
import { 
  parseWordPressWxrPages, 
  convertWxrPageToSitePage, 
  WxrPageParseResult, 
  ParsedWxrPage 
} from '../utils/wordpressXmlParser';
import { importWordPressFromUrl, WordPressImportedItem } from '../utils/wordpressImporter';

export const AdminPageImporter: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'xml' | 'url'>('xml');
  const [file, setFile] = useState<File | null>(null);
  const [xmlContent, setXmlContent] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  
  const [existingPages, setExistingPages] = useState<Page[]>([]);
  const [parseResult, setParseResult] = useState<WxrPageParseResult | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  // Selection & Duplicate Controls
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [overwriteDuplicates, setOverwriteDuplicates] = useState(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'duplicate'>('all');

  // Preview Modal
  const [inspectingPage, setInspectingPage] = useState<ParsedWxrPage | null>(null);

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
    dataStore.getPages().then(setExistingPages);
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

  // Analyze XML Pages
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
        const result = parseWordPressWxrPages(xmlContent, existingPages);
        if (result.pagesCount === 0) {
          setParseError('No published pages (wp:post_type="page") were found in this XML file. If you are importing blog articles, please use the Blog Importer.');
          setIsParsing(false);
          return;
        }

        setParseResult(result);

        // Pre-select all non-duplicate pages by default
        const newIds = new Set<string>();
        result.pages.forEach(p => {
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

  // Live URL Single Page Importer
  const handleFetchSingleUrl = async () => {
    if (!urlInput.trim()) {
      setParseError('Please enter a WordPress page URL.');
      return;
    }

    setIsParsing(true);
    setParseError(null);

    try {
      const item: WordPressImportedItem = await importWordPressFromUrl(urlInput.trim());
      const sitePage: Page = {
        id: `wp-page-${item.id || Date.now()}`,
        title: item.title,
        slug: item.slug,
        sections: item.sections,
        featured_image: item.featured_image,
        seo_title: `${item.title} | The Digital Librarian`,
        seo_description: item.excerpt,
        published: true,
        created_at: item.date || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await dataStore.savePage(sitePage);
      const updated = await dataStore.getPages();
      setExistingPages(updated);

      setImportSummary({
        completed: true,
        added: 1,
        updated: 0,
        skipped: 0,
        failed: 0
      });
      setUrlInput('');
    } catch (err: any) {
      setParseError(err?.message || 'Failed to import page from URL.');
    } finally {
      setIsParsing(false);
    }
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
    const all = new Set<string>(parseResult.pages.map(p => p.wp_id));
    setSelectedIds(all);
  };

  const handleSelectNone = () => {
    setSelectedIds(new Set());
  };

  const handleSelectNewOnly = () => {
    if (!parseResult) return;
    const onlyNew = new Set<string>(parseResult.pages.filter(p => !p.is_duplicate).map(p => p.wp_id));
    setSelectedIds(onlyNew);
  };

  // Filtered pages for preview table
  const displayedPages = (parseResult?.pages || []).filter(page => {
    const matchesSearch = 
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'new' && !page.is_duplicate) ||
      (statusFilter === 'duplicate' && page.is_duplicate);

    return matchesSearch && matchesStatus;
  });

  // Execute Batch Page Import
  const handleExecuteImport = async () => {
    if (!parseResult) return;

    const pagesToImport = parseResult.pages.filter(p => selectedIds.has(p.wp_id));
    if (pagesToImport.length === 0) {
      alert('Please select at least one page to import.');
      return;
    }

    setIsImporting(true);
    setImportProgress({ current: 0, total: pagesToImport.length, currentTitle: 'Preparing pages...' });

    let addedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;
    let failedCount = 0;

    const convertedPages: Page[] = [];

    for (let i = 0; i < pagesToImport.length; i++) {
      const wxrPage = pagesToImport[i];
      setImportProgress({
        current: i + 1,
        total: pagesToImport.length,
        currentTitle: wxrPage.title
      });

      try {
        const sitePage = convertWxrPageToSitePage(wxrPage);
        convertedPages.push(sitePage);
      } catch (err) {
        failedCount++;
      }

      if (i % 3 === 0) {
        await new Promise(r => setTimeout(r, 15));
      }
    }

    // Save batch into website database
    try {
      const res = await dataStore.savePagesBatch(convertedPages, overwriteDuplicates);
      addedCount = res.added;
      updatedCount = res.updated;
      skippedCount = res.skipped;
    } catch (err) {
      console.error('Batch save error:', err);
      for (const p of convertedPages) {
        try {
          await dataStore.savePage(p);
          addedCount++;
        } catch {
          failedCount++;
        }
      }
    }

    const updatedList = await dataStore.getPages();
    setExistingPages(updatedList);

    setIsImporting(false);
    setImportSummary({
      completed: true,
      added: addedCount,
      updated: updatedCount,
      skipped: skippedCount,
      failed: failedCount
    });
  };

  const newPagesCount = parseResult?.pages.filter(p => !p.is_duplicate).length || 0;
  const duplicatePagesCount = parseResult?.pages.filter(p => p.is_duplicate).length || 0;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest bg-brand-blue text-white px-2.5 py-1 rounded-md">
              Page Builder Importer
            </span>
            <span className="text-xs text-slate-500 font-semibold">WordPress WXR & Live URL</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            WordPress Page Importer
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Import existing WordPress pages into the drag-and-drop Page Builder. Automatically generates responsive Hero banners, structured content sections, video players, and calls-to-action without touching code.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            to="/admin/pages"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
          >
            <Layers className="w-4 h-4 text-brand-blue" />
            <span>Manage in Page Builder</span>
          </Link>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-2xl px-6 pt-4 gap-4 shadow-xs">
        <button
          onClick={() => { setActiveMode('xml'); setParseError(null); }}
          className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold border-b-2 transition-all ${
            activeMode === 'xml'
              ? 'border-brand-blue text-brand-blue'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>WordPress XML (WXR) File Upload</span>
        </button>

        <button
          onClick={() => { setActiveMode('url'); setParseError(null); }}
          className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold border-b-2 transition-all ${
            activeMode === 'url'
              ? 'border-brand-blue text-brand-blue'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Direct WordPress Page URL</span>
        </button>
      </div>

      {/* STEP 1A: XML Upload Area */}
      {activeMode === 'xml' ? (
        <div className="bg-white rounded-b-2xl border border-t-0 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-blue text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Upload WordPress WXR Export File</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Exported from WordPress dashboard via <strong>Tools → Export → Pages (or All content)</strong>.
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
                : 'Supports WordPress XML (.xml) files containing pages and embedded content'}
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
                <div className="font-bold text-rose-800">Error</div>
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
                    <span>Analyzing WordPress Pages & Structure...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze XML Pages</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* STEP 1B: Direct Live URL Fetch */
        <div className="bg-white rounded-b-2xl border border-t-0 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-blue text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Import Single Page by WordPress URL</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter the full link to any live WordPress page to fetch and convert it instantly into a site page.
            </p>
          </div>

          <div className="space-y-4 max-w-2xl">
            <label className="block text-xs font-semibold text-slate-700">
              Live WordPress Page URL *
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/about-us or https://mywpsite.wordpress.com/consulting/"
                className="flex-1 px-4 py-2.5 text-xs border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-blue font-mono"
                onKeyDown={(e) => e.key === 'Enter' && handleFetchSingleUrl()}
              />
              <button
                type="button"
                disabled={isParsing || !urlInput.trim()}
                onClick={handleFetchSingleUrl}
                className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50 shadow-sm"
              >
                {isParsing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Importing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Import Page</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Works with WordPress REST API and live HTML DOM scraping with automatic CORS fallbacks.
            </p>
          </div>

          {parseError && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>{parseError}</div>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: Preview & Selection Table for Pages */}
      {parseResult && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
          
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-blue text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>Review & Select Pages to Import</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Found <strong>{parseResult.pagesCount}</strong> standalone pages in "{parseResult.siteTitle}" ({parseResult.wxrVersion})
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand-blue bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg">
                {selectedIds.size} of {parseResult.pagesCount} Pages Selected
              </span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Pages</span>
              <div className="font-serif text-2xl font-bold text-brand-dark mt-0.5">{parseResult.pagesCount}</div>
            </div>

            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Ready / New Pages</span>
              <div className="font-serif text-2xl font-bold text-emerald-800 mt-0.5">{newPagesCount}</div>
            </div>

            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
              <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">Existing Duplicates</span>
              <div className="font-serif text-2xl font-bold text-amber-800 mt-0.5">{duplicatePagesCount}</div>
            </div>

            <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200">
              <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">Site Media Resolved</span>
              <div className="font-serif text-2xl font-bold text-blue-800 mt-0.5">{parseResult.attachmentsCount}</div>
            </div>
          </div>

          {/* Duplicate Setting Notice */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-blue flex-shrink-0" />
              <div className="text-xs text-slate-700">
                <span className="font-bold">Duplicate Detection Active:</span> Matched by WordPress Page ID, URL slug, or page title.
              </div>
            </div>

            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={overwriteDuplicates}
                onChange={(e) => setOverwriteDuplicates(e.target.checked)}
                className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue w-4 h-4"
              />
              <span>Overwrite / Update existing pages if duplicate</span>
            </label>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                onClick={handleSelectAll}
                className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                Select All ({parseResult.pagesCount})
              </button>
              <button
                onClick={handleSelectNewOnly}
                className="text-xs font-semibold px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg transition-colors"
              >
                Select New Only ({newPagesCount})
              </button>
              <button
                onClick={handleSelectNone}
                className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                Deselect All
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e: any) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue bg-white"
              >
                <option value="all">All Pages ({parseResult.pagesCount})</option>
                <option value="new">New Only ({newPagesCount})</option>
                <option value="duplicate">Duplicates ({duplicatePagesCount})</option>
              </select>

              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
            </div>
          </div>

          {/* Pages Preview Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto max-h-[500px]">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500 tracking-wider sticky top-0 z-10">
                  <tr>
                    <th className="p-3 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === parseResult.pagesCount && parseResult.pagesCount > 0}
                        onChange={(e) => e.target.checked ? handleSelectAll() : handleSelectNone()}
                        className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
                      />
                    </th>
                    <th className="p-3">Page Title</th>
                    <th className="p-3">URL Slug</th>
                    <th className="p-3">Generated Blocks</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayedPages.length > 0 ? (
                    displayedPages.map((p) => {
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
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-brand-blue border border-blue-200 font-semibold text-[10px]">
                              {p.sections.length} Page Blocks
                            </span>
                          </td>
                          <td className="p-3 text-slate-500 whitespace-nowrap">
                            {p.date}
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
                              onClick={() => setInspectingPage(p)}
                              className="p-1.5 text-slate-400 hover:text-brand-blue transition-colors rounded-lg hover:bg-slate-100"
                              title="Inspect converted blocks and sections"
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
                        No pages matched your current filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Selected <strong>{selectedIds.size}</strong> pages to import into the Page Builder.
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
                    <span>Importing Pages ({importProgress.current}/{importProgress.total})...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Import {selectedIds.size} Selected Pages</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Progress Bar during import */}
          {isImporting && (
            <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between text-xs text-brand-dark font-bold">
                <span className="truncate max-w-md">Converting & Saving: {importProgress.currentTitle}</span>
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
                Generating modular block sections and registering URL slugs...
              </div>
            </div>
          )}

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
                Pages Successfully Imported!
              </h3>
              <p className="text-xs text-emerald-800">
                Your custom pages are now ready and available in the Page Builder.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center">
              <div className="font-serif text-2xl font-bold text-emerald-700">{importSummary.added}</div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">Newly Created</div>
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
              Import More Pages
            </button>

            <div className="flex items-center gap-3">
              <Link
                to="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-white hover:bg-emerald-100 border border-emerald-300 px-4 py-2 rounded-xl transition-colors"
              >
                <span>View Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/admin/pages"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-brand-dark hover:bg-black px-5 py-2 rounded-xl transition-colors shadow-sm"
              >
                <span>Open in Page Builder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Page Inspect Modal */}
      {inspectingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-brand-dark text-white p-6 flex items-center justify-between border-b border-blue-900/60">
              <div className="space-y-1 pr-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                  /{inspectingPage.slug}
                </span>
                <h3 className="font-serif text-lg font-bold text-white leading-snug">
                  {inspectingPage.title}
                </h3>
              </div>
              <button
                onClick={() => setInspectingPage(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-blue-900/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              {/* Metadata */}
              <div className="flex flex-wrap gap-3 text-xs text-slate-500 pb-3 border-b border-slate-100">
                <div><strong>Slug:</strong> /{inspectingPage.slug}</div>
                <div>·</div>
                <div><strong>Blocks:</strong> {inspectingPage.sections.length} Sections Generated</div>
                <div>·</div>
                <div><strong>Word Count:</strong> {inspectingPage.word_count} words</div>
                <div>·</div>
                <div><strong>Status:</strong> {inspectingPage.status}</div>
              </div>

              {/* Sections Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Generated Site Block Sections:
                </h4>
                <div className="space-y-2">
                  {inspectingPage.sections.map((sec, i) => (
                    <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded">
                            {sec.type.replace('_', ' ')}
                          </span>
                          {sec.data.heading && (
                            <span className="text-xs font-bold text-brand-dark">
                              {sec.data.heading}
                            </span>
                          )}
                        </div>
                        {sec.data.description && (
                          <p className="text-xs text-slate-500 line-clamp-2">
                            {sec.data.description}
                          </p>
                        )}
                        {sec.data.content && !sec.data.description && (
                          <p className="text-xs text-slate-500 line-clamp-2">
                            {sec.data.content}
                          </p>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 font-semibold flex-shrink-0">
                        Block #{i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Raw Content Body */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Original Content Body:</h4>
                <div 
                  className="prose prose-sm max-w-none text-slate-800 border p-4 rounded-xl border-slate-200 bg-slate-50/30 max-h-60 overflow-y-auto text-xs leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: inspectingPage.content }}
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {selectedIds.has(inspectingPage.wp_id) ? '✓ Included in import selection' : 'Not currently selected'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleSelect(inspectingPage.wp_id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    selectedIds.has(inspectingPage.wp_id)
                      ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {selectedIds.has(inspectingPage.wp_id) ? 'Deselect from Import' : 'Select for Import'}
                </button>
                <button
                  onClick={() => setInspectingPage(null)}
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
