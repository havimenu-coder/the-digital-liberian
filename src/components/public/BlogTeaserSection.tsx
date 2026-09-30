import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { dataStore } from '../../lib/storage';
import { BlogPost } from '../../types';

export const BlogTeaserSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    dataStore.getBlogPosts().then((res) => {
      setPosts(res.filter(p => p.published).slice(0, 3));
    });
    const handleUpdate = () => {
      dataStore.getBlogPosts().then((res) => {
        setPosts(res.filter(p => p.published).slice(0, 3));
      });
    };
    window.addEventListener('thedl_storage_update', handleUpdate);
    return () => window.removeEventListener('thedl_storage_update', handleUpdate);
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              FROM THE BLOG
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-dark tracking-tight leading-tight mt-1.5">
              Ideas, Insights & What's Worth Knowing
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Read practical perspectives, professional reflections and updates on AI, digital literacy, research, libraries, education, technology and other issues shaping the way we learn and work.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-blue text-white px-7 py-3 rounded-md text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95 flex-shrink-0"
          >
            <span>Read the Blog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Featured Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-blue transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Article Image */}
                <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={post.featured_image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-brand-dark/85 text-brand-blue text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded backdrop-blur-sm">
                    {post.category || "Insight"}
                  </div>
                </Link>

                {/* Article Content */}
                <div className="p-6">
                  {/* Meta: Date & Read Time */}
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                      {post.published_at || "Recent"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-blue" />
                      {post.reading_time || "4 min read"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors leading-snug line-clamp-2">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom Action Link */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-100">
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark group-hover:text-brand-blue transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-brand-blue" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
