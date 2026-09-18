import React, { useState, useEffect } from 'react';
import { Book, Search, Filter, ExternalLink, Download, Play, Sparkles, BookOpen, AlertCircle } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { Resource, AITool } from '../types';
import { FreeGiftModal } from '../components/public/FreeGiftModal';

export const UpskillingLibraryPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [aiTools, setAiTools] = useState<AITool[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showGiftModal, setShowGiftModal] = useState(false);

  useEffect(() => {
    Promise.all([
      dataStore.getResources(),
      dataStore.getAITools()
    ]).then(([res, tools]) => {
      setResources(res.filter(r => r.published));
      setAiTools(tools);
    });
  }, []);

  const categories = [
    { key: 'all', label: 'All Tools' },
    { key: 'academics', label: 'Academics & Research' },
    { key: 'creative', label: 'Creative Writing' },
    { key: 'data', label: 'Data Manipulation' },
    { key: 'multimedia', label: 'Multimedia' },
    { key: 'health', label: 'Health' },
    { key: 'finance', label: 'Finance' },
    { key: 'legal', label: 'Legal' },
    { key: 'engineering', label: 'Engineering' },
    { key: 'productivity', label: 'Productivity' },
  ];

  const filteredTools = aiTools.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const books = resources.filter(r => r.category === 'books');
  const courses = resources.filter(r => r.category === 'courses');

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-brand-dark text-white py-16 lg:py-20 border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              TheDL Knowledge Hub
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
              Upskilling Library & Resources
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              Learn. Explore. Keep Growing. Practical learning assets, published books by Sylvester Ebhonu, and the definitive directory of vetted AI productivity tools.
            </p>
          </div>
        </div>
      </div>

      {/* Free Gift Download Banner */}
      <div className="bg-brand-blue-light/60 border-b border-brand-blue/30 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-brand-dark">
                Download Sylvester's "Prescription of AI Tools"
              </div>
              <div className="text-xs text-slate-600">
                A curated lead toolkit to work smarter and gain a quantum leap in your productivity.
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowGiftModal(true)}
            className="bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2 flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Free Gift</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Section 1: Published Books by Sylvester Ebhonu */}
        <section>
          <div className="max-w-2xl mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
              Books by Sylvester Israel Ebhonu
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Transformational works exploring purpose-driven communication, personal leadership, and modern relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl border-2 border-brand-dark p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[3/2] bg-slate-100 rounded-xl overflow-hidden mb-4 relative border border-slate-200">
                    <img
                      src={book.thumbnail_url}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-brand-dark text-white text-xs font-bold px-2.5 py-1 rounded-md">
                      {book.price}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-brand-dark">
                    {book.title}
                  </h3>
                  <div className="text-xs text-brand-blue font-semibold mt-0.5">
                    By {book.author}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                    {book.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100">
                  <a
                    href="https://wa.me/message/VV5A32BESJYHC1?text=Hello%20Sylvester,%20I%20would%20like%20to%20order%20your%20book"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-brand-dark hover:bg-brand-blue text-white py-2.5 rounded-lg text-xs font-bold transition-colors"
                  >
                    Order via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Masterclasses & Courses */}
        {courses.length > 0 && (
          <section id="courses">
            <div className="max-w-2xl mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                Courses & Video Masterclasses
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Selected learning experiences from The Digital Librarian to build practical competence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-slate-50 rounded-2xl border border-slate-300 p-6 flex flex-col justify-between hover:border-brand-blue transition-all"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                      Video Masterclass
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-brand-dark mt-1">
                      {course.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">{course.price || 'Free'}</span>
                    {course.external_url && (
                      <a
                        href={course.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-brand-blue text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-brand-blue-hover transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch on YouTube</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Prescribed AI Tools for Productivity Directory (50+ tools) */}
        <section id="ai-tools" className="pt-8 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Directory & Vault
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
              Prescribed AI Tools for Productivity
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Check this directory frequently to explore the latest research, work, and productivity tools prescribed by professionals to meet your specific needs.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="space-y-4 mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search over 50+ AI tools (e.g. ChatPDF, Elicit, Canva)..."
                className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none shadow-sm"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeCategory === cat.key
                      ? 'bg-brand-dark text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Security Notice Note from PDF 2 */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 mb-8 text-xs text-amber-900 leading-relaxed">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Security & Advisory Note:</strong> AI tool users should be conscious of privacy policies, malicious extensions, and data sensitivities. Review terms of service before uploading proprietary research. Some tools require premium upgrades or specific hardware.
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-brand-blue hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-lg font-bold text-brand-dark">
                      {tool.name}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {tool.category_label}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {tool.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tool.tags.map((t, i) => (
                      <span key={i} className="text-[10px] bg-brand-blue-light text-brand-blue px-2 py-0.5 rounded-full font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">
                    {tool.requires_premium ? 'Freemium / Premium' : 'Free / Available'}
                  </span>
                  <a
                    href={tool.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-dark hover:text-brand-blue transition-colors"
                  >
                    <span>Visit Tool</span>
                    <ExternalLink className="w-3.5 h-3.5 text-brand-blue" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              No tools found matching your search. Try adjusting the category or search query.
            </div>
          )}
        </section>

      </div>

      <FreeGiftModal
        isOpen={showGiftModal}
        onClose={() => setShowGiftModal(false)}
      />
    </div>
  );
};
