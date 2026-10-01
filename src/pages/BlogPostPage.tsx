import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, MessageCircle, User } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { BlogPost } from '../types';
import { YouTubeEmbed } from '../components/common/YouTubeEmbed';
import { getYouTubeVideoId } from '../utils/youtube';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    dataStore.getBlogPosts().then(posts => {
      const found = posts.find(p => p.slug.toLowerCase() === slug.toLowerCase()) || posts.find(p => p.slug === slug);
      const current = found || posts[0];
      setPost(current);

      if (current) {
        const related = posts
          .filter(p => p.id !== current.id && p.published)
          .filter(p => p.category === current.category || p.tags?.some(t => current.tags?.includes(t)))
          .slice(0, 3);
        
        // If not enough matching category, fill with other latest posts
        if (related.length < 3) {
          const others = posts.filter(p => p.id !== current.id && !related.some(r => r.id === p.id) && p.published);
          related.push(...others.slice(0, 3 - related.length));
        }
        setRelatedPosts(related);
      }

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
  const isHtmlContent = Boolean(post.content && /<[a-z][\s\S]*>/i.test(post.content));

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
        {post.excerpt && (
          <div className="text-lg sm:text-xl font-serif italic text-slate-700 leading-relaxed border-l-4 border-brand-blue pl-4 mb-10">
            {post.excerpt}
          </div>
        )}

        {/* Featured Video Player or Hero Image */}
        {post.video_url ? (
          <div className="mb-12">
            <YouTubeEmbed
              url={post.video_url}
              title={post.title}
              caption={`Featured video for: ${post.title}`}
            />
          </div>
        ) : post.featured_image ? (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        ) : null}

        {/* Article Body Content */}
        {isHtmlContent ? (
          <div
            className="prose prose-lg max-w-none text-slate-800 leading-relaxed text-base space-y-6 [&>p]:mb-5 [&>p]:leading-relaxed [&>h1]:font-serif [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-brand-dark [&>h1]:mt-8 [&>h2]:font-serif [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-brand-dark [&>h2]:mt-8 [&>h2]:mb-3 [&>h3]:font-serif [&>h3]:text-xl sm:[&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-brand-dark [&>h3]:mt-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>blockquote]:border-l-4 [&>blockquote]:border-brand-blue [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-700 [&>blockquote]:my-6 [&>img]:rounded-2xl [&>img]:shadow-md [&>img]:my-8 [&>img]:w-full [&>figure]:my-8 [&>figcaption]:text-center [&>figcaption]:text-xs [&>figcaption]:text-slate-500 [&>figcaption]:mt-2 [&>a]:text-brand-blue [&>a]:underline [&>table]:w-full [&>table]:border-collapse [&>table]:my-6 [&>th]:bg-slate-100 [&>th]:p-3 [&>th]:border [&>th]:border-slate-300 [&>td]:p-3 [&>td]:border [&>td]:border-slate-300 [&>strong]:font-bold [&>strong]:text-brand-dark"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <div className="prose prose-lg max-w-none text-slate-800 space-y-6 text-base leading-relaxed">
            {post.content.split('\n\n').map((para, i) => {
              const trimmed = para.trim();

              // Detect standalone YouTube link in paragraph
              if (getYouTubeVideoId(trimmed)) {
                return (
                  <div key={i} className="my-8">
                    <YouTubeEmbed url={trimmed} />
                  </div>
                );
              }

              if (para.startsWith('## ')) {
                return <h2 key={i} className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark pt-4">{para.replace('## ', '')}</h2>;
              }
              if (para.startsWith('### ')) {
                return <h3 key={i} className="font-serif text-xl sm:text-2xl font-bold text-brand-dark pt-2">{para.replace('### ', '')}</h3>;
              }
              return <p key={i}>{para}</p>;
            })}
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-10 mt-10 border-t border-slate-200">
            {post.tags.map((tag, i) => (
              <span key={i} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}

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

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">More To Read</span>
                <h3 className="font-serif text-2xl font-bold text-brand-dark mt-1">Related Articles</h3>
              </div>
              <Link to="/blog" className="text-xs font-bold text-brand-blue hover:underline">
                View All Articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(rel => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.slug}`}
                  className="group bg-white rounded-xl border border-slate-200 hover:border-brand-blue overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-video bg-slate-100 overflow-hidden relative">
                      <img
                        src={rel.featured_image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                      <span className="absolute top-2 left-2 bg-brand-dark/90 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        {rel.category}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className="font-serif text-sm font-bold text-brand-dark group-hover:text-brand-blue transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 pt-0 text-[11px] text-slate-400 font-medium">
                    {rel.published_at} · {rel.reading_time}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
};
