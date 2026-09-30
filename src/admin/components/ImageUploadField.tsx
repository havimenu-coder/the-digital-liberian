import React, { useState, useEffect, useRef } from 'react';
import { Upload, Image as ImageIcon, FolderOpen, X, Check, Loader2, Search } from 'lucide-react';
import { dataStore } from '../../lib/storage';
import { MediaItem } from '../../types';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = 'https://... or /images/...',
  helperText,
  required = false
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [mediaSearch, setMediaSearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing media items when opening picker modal
  const openMediaPicker = async () => {
    try {
      const items = await dataStore.getMediaItems();
      // Filter for images
      const imagesOnly = items.filter(item => 
        item.file_type === 'image' || 
        /\.(jpg|jpeg|png|webp|svg|gif|avif)$/i.test(item.file_url) ||
        item.file_url.startsWith('data:image')
      );
      setMediaItems(imagesOnly);
      setShowMediaModal(true);
    } catch (err) {
      console.error('Failed to load media items', err);
    }
  };

  // Handle local file import / upload
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, SVG, WebP, etc.)');
      return;
    }

    setIsUploading(true);
    try {
      let finalUrl = '';

      // 1. If Supabase is configured, upload to Supabase 'media' bucket
      if (isSupabaseConfigured && supabase) {
        const fileExt = file.name.split('.').pop();
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${Date.now()}-${safeName}`;
        
        const { error: uploadError } = await supabase.storage.from('media').upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(fileName);
          finalUrl = publicUrlData.publicUrl;
        } else {
          console.warn('Supabase upload failed, falling back to local data URL', uploadError);
        }
      }

      // 2. Fallback to Base64 data URL for instant zero-config preview and persistence
      if (!finalUrl) {
        finalUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      // 3. Register in Media Library so it's accessible anywhere
      const newMedia: MediaItem = {
        id: 'med-' + Date.now(),
        title: file.name.replace(/\.[^/.]+$/, ""),
        file_name: file.name,
        file_url: finalUrl,
        file_type: 'image',
        file_size: `${(file.size / 1024).toFixed(1)} KB`,
        created_at: new Date().toISOString().split('T')[0]
      };
      await dataStore.saveMediaItem(newMedia);

      // 4. Update the input value
      onChange(finalUrl);
    } catch (err) {
      console.error('Error importing image', err);
      alert('Failed to process image. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const filteredMedia = mediaItems.filter(item => 
    item.title.toLowerCase().includes(mediaSearch.toLowerCase()) ||
    item.file_name.toLowerCase().includes(mediaSearch.toLowerCase())
  );

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[11px] text-rose-500 hover:text-rose-700 flex items-center gap-1 font-medium"
          >
            <X className="w-3 h-3" />
            <span>Remove Image</span>
          </button>
        )}
      </div>

      {/* Main Controls: Preview + URL Input + Import Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 items-start">
        
        {/* Thumbnail Preview Box */}
        <div className="relative w-20 h-20 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden flex-shrink-0 group">
          {value ? (
            <>
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1 rounded bg-white text-brand-dark text-[10px] font-bold shadow"
                >
                  Change
                </button>
              </div>
            </>
          ) : (
            <div className="text-center p-1 text-slate-400">
              <ImageIcon className="w-6 h-6 mx-auto mb-0.5 opacity-60" />
              <span className="text-[9px] block font-medium">No Image</span>
            </div>
          )}
        </div>

        {/* Input & Action Buttons */}
        <div className="flex-1 w-full space-y-2">
          
          {/* Action Buttons: Import from Device & Select from Media Library */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />

            {/* Import / Upload Button */}
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold rounded-lg transition-all shadow-sm disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Importing...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import Image from Device</span>
                </>
              )}
            </button>

            {/* Pick from Media Library Button */}
            <button
              type="button"
              onClick={openMediaPicker}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg transition-all"
            >
              <FolderOpen className="w-3.5 h-3.5 text-brand-blue" />
              <span>Media Library</span>
            </button>
          </div>

          {/* Or manual URL input */}
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:border-brand-blue font-mono text-slate-800"
            />
          </div>

          {helperText && (
            <p className="text-[11px] text-slate-500">{helperText}</p>
          )}

        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          MEDIA LIBRARY SELECTION MODAL
      ───────────────────────────────────────────────────────────── */}
      {showMediaModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-dark">
                  Select from Media Library
                </h3>
                <p className="text-xs text-slate-500">
                  Click on an image to insert it directly into your item
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMediaModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar & Upload inside modal */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={mediaSearch}
                  onChange={e => setMediaSearch(e.target.value)}
                  placeholder="Search existing images..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:border-brand-blue"
                />
              </div>
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-brand-blue text-white text-xs font-bold rounded-lg flex items-center gap-1.5 flex-shrink-0"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New</span>
              </button>
            </div>

            {/* Media Grid */}
            <div className="p-4 overflow-y-auto flex-1 max-h-[50vh]">
              {filteredMedia.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {filteredMedia.map((media) => {
                    const isSelected = value === media.file_url;
                    return (
                      <button
                        key={media.id}
                        type="button"
                        onClick={() => {
                          onChange(media.file_url);
                          setShowMediaModal(false);
                        }}
                        className={`group relative aspect-square rounded-xl overflow-hidden border-2 text-left transition-all ${
                          isSelected ? 'border-brand-blue ring-2 ring-brand-blue/30' : 'border-slate-200 hover:border-brand-blue/60'
                        }`}
                      >
                        <img
                          src={media.file_url}
                          alt={media.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                          <p className="text-[10px] text-white font-medium truncate">
                            {media.title || media.file_name}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-brand-blue text-white flex items-center justify-center shadow">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-medium">No images found in library.</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Upload an image from your device to get started.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowMediaModal(false)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
