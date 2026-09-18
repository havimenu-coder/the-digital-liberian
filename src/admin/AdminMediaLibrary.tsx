import React, { useState, useEffect, useRef } from 'react';
import { Upload, Copy, Check, Trash2, Search, File, Image as ImageIcon, Video, FileText } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { MediaItem } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const AdminMediaLibrary: React.FC = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    const list = await dataStore.getMediaItems();
    setItems(list);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const file = files[0];

    try {
      let fileUrl = '';

      // If Supabase is configured, upload to Supabase Storage
      if (isSupabaseConfigured && supabase) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('media').upload(fileName, file);

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(fileName);
          fileUrl = publicUrlData.publicUrl;
        }
      }

      // If local or fallback, convert to base64 data URL
      if (!fileUrl) {
        fileUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      }

      const fileType: 'image' | 'pdf' | 'video' | 'document' = file.type.startsWith('image/')
        ? 'image'
        : file.type === 'application/pdf'
          ? 'pdf'
          : file.type.startsWith('video/')
            ? 'video'
            : 'document';

      const newItem: MediaItem = {
        id: 'med-' + Date.now(),
        title: file.name.split('.')[0],
        file_name: file.name,
        file_url: fileUrl,
        file_type: fileType,
        file_size: `${(file.size / 1024).toFixed(1)} KB`,
        created_at: new Date().toISOString().split('T')[0]
      };

      await dataStore.saveMediaItem(newItem);
      await loadMedia();
    } catch (err) {
      console.error('File upload error', err);
      alert('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this media item?')) {
      await dataStore.deleteMediaItem(id);
      await loadMedia();
    }
  };

  const filteredItems = items.filter(i => 
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.file_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Media Library & File Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Upload images, flyers, and documents; copy URLs directly to use in page sections or blog posts.
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,application/pdf,video/*"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'Uploading...' : 'Upload Media File'}</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search media files..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue bg-white"
        />
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-sm flex flex-col justify-between group hover:border-brand-blue transition-all"
          >
            <div className="aspect-video bg-slate-100 relative overflow-hidden flex items-center justify-center">
              {item.file_type === 'image' ? (
                <img
                  src={item.file_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : item.file_type === 'pdf' ? (
                <div className="flex flex-col items-center text-rose-500">
                  <FileText className="w-8 h-8" />
                  <span className="text-[10px] font-bold mt-1">PDF Document</span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-brand-blue">
                  <Video className="w-8 h-8" />
                  <span className="text-[10px] font-bold mt-1">Video</span>
                </div>
              )}
              
              <div className="absolute top-2 right-2 bg-brand-dark/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                {item.file_size}
              </div>
            </div>

            <div className="p-3">
              <div className="font-serif font-bold text-xs text-brand-dark truncate">
                {item.title}
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">
                {item.file_name} · {item.created_at}
              </div>
            </div>

            <div className="p-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => handleCopyUrl(item.file_url, item.id)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-blue hover:text-brand-dark"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-1 text-slate-400 hover:text-rose-600 rounded"
                title="Delete Media"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
