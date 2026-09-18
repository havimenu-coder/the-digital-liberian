import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { BlogPost } from '../types';

export const BlogListPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    dataStore.getBlogPosts().then(res => setPosts(res.filter(p => p.published)));
    const handleUpdate = () => dataStore.getBlogPosts().then(res => setPosts(res.filter(p => p.published)));
    window.addEventListener('thedl_storage_update', handleUpdate);
    return () => window.removeEventListener('thedl_storage_update', handleUpdate);
  }, []);

  const categories = ['all', ...Array.from(new Set(posts.map(p => p.category)))];

  const filteredPosts = posts.filter(post => {
    const matchCat = selectedCategory === 'all' || post.category === selectedCategory;
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-brand-dark text-white py-16 lg:py-20 border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              Insights, Ideas & What's Worth Knowing
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              The Digital Librarian Blog
            </h1>
            <p className="text-base text-slate-300">
              Read practical perspectives, professional reflections and updates on AI, digital literacy, research, libraries, education, and technology.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search & Categories */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-colors ${
                  selectedCategory === cat
                    ? 'bg-brand-dark text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-brand-blue hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 bg-slate-100 overflow-hidden relative">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-brand-dark/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.published_at}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.reading_time}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">{post.author_name}</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 text-slate-500 text-sm">
            No articles found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};
