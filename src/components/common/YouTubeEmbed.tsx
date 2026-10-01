import React from 'react';
import { getYouTubeEmbedUrl, getYouTubeVideoId } from '../../utils/youtube';
import { Video, AlertCircle, ExternalLink } from 'lucide-react';

interface YouTubeEmbedProps {
  url: string | undefined | null;
  title?: string;
  caption?: string;
  className?: string;
  autoplay?: boolean;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  url,
  title = 'YouTube video player',
  caption,
  className = '',
  autoplay = false
}) => {
  const embedUrl = getYouTubeEmbedUrl(url, { autoplay, rel: false });
  const videoId = getYouTubeVideoId(url);

  if (!url || !embedUrl) {
    return (
      <div className={`aspect-video w-full rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-6 text-center text-slate-500 ${className}`}>
        <Video className="w-10 h-10 text-slate-400 mb-2" />
        <p className="text-sm font-semibold text-slate-700">No YouTube Video Configured</p>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          Paste a valid YouTube link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...) in the editor.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-2.5 w-full ${className}`}>
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-black group">
        <iframe
          className="absolute inset-0 w-full h-full border-0"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>

      {(caption || videoId) && (
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          {caption && <span className="italic">{caption}</span>}
          <a
            href={url.startsWith('http') ? url : `https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-brand-blue text-[11px] font-medium ml-auto"
          >
            <span>Watch on YouTube</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
};
