import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, MessageCircle, User } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { BlogPost } from '../types';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataStore.getBlogPosts().then(posts => {
      const found = posts.find(p => p.slug === slug);
      setPost(found || posts[0]);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-brand-blue border-t-transparent" />
      </div>
    );
  }

  if (!post) return null;

  const currentUrl = window.location.href;

  return (
    <article className="bg-white min-h-screen">
      {/* Article Header */}
      <div className="bg-brand-dark text-white py-16 lg:py-24 border-b border-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-brand-blue hover:text-white mb-6 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
              {post.category}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 pt-2">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-brand-blue" />
                <span>{post.author_name}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-blue" />
                <span>{post.published_at}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-blue" />
                <span>{post.reading_time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Article Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Excerpt Lead */}
        <div className="text-lg sm:text-xl font-serif italic text-slate-700 leading-relaxed border-l-4 border-brand-blue pl-4 mb-10">
          {post.excerpt}
        </div>

        {/* Article Body Content */}
        <div className="prose prose-lg max-w-none text-slate-800 space-y-6 text-base leading-relaxed">
          {post.content.split('\n\n').map((para, i) => {
            if (para.startsWith('## ')) {
              return <h2 key={i} className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark pt-4">{para.replace('## ', '')}</h2>;
            }
            if (para.startsWith('### ')) {
              return <h3 key={i} className="font-serif text-xl sm:text-2xl font-bold text-brand-dark pt-2">{para.replace('### ', '')}</h3>;
            }
            return <p key={i}>{para}</p>;
          })}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-10 mt-10 border-t border-slate-200">
          {post.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">
              #{tag}
            </span>
          ))}
        </div>

        {/* Share Buttons */}
        <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-dark uppercase tracking-wider">
            <Share2 className="w-4 h-4 text-brand-blue" />
            <span>Share this article</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white border border-slate-300 hover:text-brand-blue transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white border border-slate-300 hover:text-brand-blue transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white border border-slate-300 hover:text-emerald-600 transition-colors"
              aria-label="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </article>
  );
};
