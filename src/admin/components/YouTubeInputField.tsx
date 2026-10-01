import React, { useState } from 'react';
import { Video, Check, AlertCircle, X, ExternalLink, Play } from 'lucide-react';
import { getYouTubeVideoId, getYouTubeEmbedUrl } from '../../utils/youtube';

interface YouTubeInputFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  showPreview?: boolean;
}

export const YouTubeInputField: React.FC<YouTubeInputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = 'https://www.youtube.com/watch?v=... or https://youtu.be/...',
  helperText,
  required = false,
  showPreview = true
}) => {
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const videoId = getYouTubeVideoId(value);
  const isValid = Boolean(videoId);
  const embedUrl = isValid ? getYouTubeEmbedUrl(value) : null;

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChange(text.trim());
      }
    } catch (err) {
      console.error('Clipboard read failed', err);
    }
  };

  return (
    <div className="space-y-2">
      {/* Label & Status Badge */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-red-600 text-white flex items-center justify-center text-[9px] font-black">
            ▶
          </div>
          <span>{label}</span>
          {required && <span className="text-rose-500">*</span>}
        </label>

        {value && (
          <div className="flex items-center gap-1.5">
            {isValid ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                <Check className="w-3 h-3" />
                <span>Ready to embed</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                <AlertCircle className="w-3 h-3" />
                <span>Invalid YouTube URL</span>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Input Group */}
      <div className="relative flex items-center">
        <div className="absolute left-3 text-red-500 pointer-events-none flex items-center">
          <Video className="w-4 h-4" />
        </div>

        <input
          type="url"
          required={required}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-9 pr-20 py-2 text-xs border rounded-lg outline-none transition-all ${
            value && !isValid
              ? 'border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 bg-amber-50/20'
              : 'border-slate-300 focus:border-brand-blue focus:ring-2 focus:ring-blue-100'
          }`}
        />

        <div className="absolute right-2 flex items-center gap-1">
          {value ? (
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              title="Clear link"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePasteFromClipboard}
              className="px-2 py-1 text-[10px] font-bold text-slate-600 hover:text-brand-blue bg-slate-100 hover:bg-slate-200 rounded transition-colors"
              title="Paste from clipboard"
            >
              Paste
            </button>
          )}
        </div>
      </div>

      {/* Helper text or format hints */}
      {helperText ? (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      ) : (
        <p className="text-[10px] text-slate-400">
          Supports full watch URLs, youtu.be short links, shorts, or live stream links.
        </p>
      )}

      {/* Live Video Preview Box */}
      {showPreview && isValid && embedUrl && (
        <div className="mt-3 p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold flex items-center gap-1.5 text-white text-[11px]">
              <Play className="w-3 h-3 text-red-500 fill-current" />
              <span>Live Embedded Preview</span>
            </span>
            <a
              href={value.startsWith('http') ? value : `https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
            >
              <span>Open in YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black shadow-inner">
            <iframe
              className="absolute inset-0 w-full h-full border-0"
              src={embedUrl}
              title="YouTube preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};
