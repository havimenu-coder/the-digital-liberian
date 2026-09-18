import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
      <div className="max-w-md text-center space-y-5">
        <span className="text-brand-blue font-bold text-sm uppercase tracking-widest">
          404 Error
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-dark">
          Page Not Found
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          The page you are looking for may have been moved, renamed, or is temporarily unavailable.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
