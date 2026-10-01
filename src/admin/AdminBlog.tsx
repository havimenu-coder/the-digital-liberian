import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Save, X, Calendar, Clock, Eye, Globe, FileUp } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { BlogPost } from '../types';
import { ImageUploadField } from './components/ImageUploadField';
import { YouTubeInputField } from './components/YouTubeInputField';
import { WordPressImportModal } from './components/WordPressImportModal';
import { WordPressImportedItem } from '../utils/wordpressImporter';

export const AdminBlog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const handleApplyImportedBlog = (imported: WordPressImportedItem) => {
    if (!editingPost) {
      const newPost: BlogPost = {
        id: 'post-' + Date.now(),
        title: imported.title,
        slug: imported.slug,
        excerpt: imported.excerpt || 'Imported article from WordPress.',
        content: imported.content,
        featured_image: imported.featured_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
        video_url: '',
        category: imported.categories?.[0] || 'General',
        tags: imported.tags || ['WordPress', 'Imported'],
        author_name: imported.author || 'Sylvester I. Ebhonu',
        author_role: 'Founder & Lead Consultant',
        author_avatar: '/images/sylvester-portrait.png',
        published: true,
        published_at: imported.date ? imported.date.split('T')[0] : new Date().toISOString().split('T')[0],
        reading_time: '4 min read'
      };
      setEditingPost(newPost);
    } else {
      setEditingPost({
        ...editingPost,
        title: imported.title || editingPost.title,
        slug: imported.slug || editingPost.slug,
        excerpt: imported.excerpt || editingPost.excerpt,
        content: imported.content || editingPost.content,
        featured_image: imported.featured_image || editingPost.featured_image,
        category: imported.categories?.[0] || editingPost.category,
        author_name: imported.author || editingPost.author_name
      });
    }
  };

  const loadPosts = async () => {
    const list = await dataStore.getBlogPosts();
    setPosts(list);
  };

  const handleCreateNew = () => {
    const newPost: BlogPost = {
      id: 'post-' + Date.now(),
      title: 'New Article Title',
      slug: 'new-article-' + Math.floor(Math.random() * 1000),
      excerpt: 'Short summary of the article for blog feeds and preview cards.',
      content: '## Main Section\n\nWrite your article content here. Support headings and paragraphs.',
      featured_image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
      video_url: '',
      category: 'Digital Literacy',
      tags: ['AI', 'Research', 'Education'],
      author_name: 'Sylvester I. Ebhonu',
      author_role: 'Head of E-Services & Founder',
      author_avatar: '/images/sylvester-portrait.png',
      published: true,
      published_at: new Date().toISOString().split('T')[0],
      reading_time: '5 min read'
    };
    setEditingPost(newPost);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    await dataStore.saveBlogPost(editingPost);
    await loadPosts();
    setEditingPost(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this article?')) {
      await dataStore.deleteBlogPost(id);
      await loadPosts();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            TheDL Blog & Articles CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Publish articles, ideas, and reflections on AI, research, libraries, and technology.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/blog-importer"
            className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-brand-blue border border-brand-blue/30 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs"
          >
            <FileUp className="w-4 h-4" />
            <span>WXR / XML Blog Importer</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs"
          >
            <Globe className="w-4 h-4 text-brand-blue" />
            <span>Import URL</span>
          </button>

          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Post</span>
          </button>
        </div>
      </div>

      {editingPost && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border-2 border-brand-dark shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-xl font-bold text-brand-dark">Article Editor</h2>
              <button
                type="button"
                onClick={() => setIsImportModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-brand-blue border border-brand-blue/30 rounded-lg text-xs font-bold transition-colors shadow-xs"
                title="Import article content from WordPress"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Import WP</span>
              </button>
            </div>
            <button type="button" onClick={() => setEditingPost(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Article Title *</label>
              <input
                type="text"
                required
                value={editingPost.title}
                onChange={e => setEditingPost({ ...editingPost, title: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded font-serif font-bold text-brand-dark"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">URL Slug *</label>
              <input
                type="text"
                required
                value={editingPost.slug}
                onChange={e => setEditingPost({ ...editingPost, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <input
                type="text"
                value={editingPost.category}
                onChange={e => setEditingPost({ ...editingPost, category: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
                placeholder="Digital Literacy, Research, etc."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Excerpt / Summary *</label>
              <textarea
                rows={2}
                required
                value={editingPost.excerpt}
                onChange={e => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Article Content (Markdown supported) *</label>
              <textarea
                rows={8}
                required
                value={editingPost.content}
                onChange={e => setEditingPost({ ...editingPost, content: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded"
              />
            </div>

            <div className="sm:col-span-2">
              <ImageUploadField
                label="Featured Article Cover Image"
                value={editingPost.featured_image || ''}
                onChange={url => setEditingPost({ ...editingPost, featured_image: url })}
                placeholder="Upload an image, browse media, or paste URL"
                helperText="Upload from your computer or pick from the media library to use as the hero banner."
              />
            </div>

            <div className="sm:col-span-2">
              <YouTubeInputField
                label="Featured YouTube Video (Optional)"
                value={editingPost.video_url || ''}
                onChange={url => setEditingPost({ ...editingPost, video_url: url })}
                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                helperText="Paste a YouTube video URL to embed a responsive, playable video player directly into this article."
              />
            </div>

            <div className="sm:col-span-2">
              <ImageUploadField
                label="Author Avatar / Portrait"
                value={editingPost.author_avatar || ''}
                onChange={url => setEditingPost({ ...editingPost, author_avatar: url })}
                placeholder="Upload author portrait or paste URL"
                helperText="Optional small circular photo displayed next to author name."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Author Name</label>
              <input
                type="text"
                value={editingPost.author_name}
                onChange={e => setEditingPost({ ...editingPost, author_name: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tags (Comma-separated)</label>
              <input
                type="text"
                value={editingPost.tags.join(', ')}
                onChange={e => setEditingPost({
                  ...editingPost,
                  tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="postPublished"
                checked={editingPost.published}
                onChange={e => setEditingPost({ ...editingPost, published: e.target.checked })}
                className="accent-brand-blue"
              />
              <label htmlFor="postPublished" className="text-xs font-semibold text-slate-700 cursor-pointer">
                Publish this post to live website immediately
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button type="button" onClick={() => setEditingPost(null)} className="px-4 py-2 text-xs font-bold text-slate-600">
              Cancel
            </button>
            <button type="submit" className="bg-brand-blue hover:bg-brand-blue-hover text-white px-6 py-2 text-xs font-bold rounded shadow-sm">
              Save Post
            </button>
          </div>
        </form>
      )}

      {/* Posts List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Author</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-brand-dark max-w-xs truncate">{post.title}</td>
                <td className="p-4"><span className="px-2 py-0.5 rounded bg-slate-100">{post.category}</span></td>
                <td className="p-4 text-slate-600">{post.author_name}</td>
                <td className="p-4 text-slate-500">{post.published_at}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    post.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-slate-400 hover:text-brand-blue inline-block">
                    <Eye className="w-4 h-4" />
                  </a>
                  <button onClick={() => setEditingPost(post)} className="p-1.5 text-slate-400 hover:text-brand-blue">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="p-1.5 text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* WordPress Import Modal */}
      <WordPressImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onApplyToBlog={handleApplyImportedBlog}
        defaultDestination="blog"
      />
    </div>
  );
};
