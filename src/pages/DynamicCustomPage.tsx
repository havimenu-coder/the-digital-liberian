import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dataStore } from '../lib/storage';
import { Page, PageSection } from '../types';
import { WhatWeDo } from '../components/public/WhatWeDo';
import { StatsSection } from '../components/public/StatsSection';
import { TestimonialsSection } from '../components/public/TestimonialsSection';
import { FinalCTA } from '../components/public/FinalCTA';
import { ArrowRight } from 'lucide-react';

export const DynamicCustomPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    dataStore.getPageBySlug(slug).then((p: Page | undefined) => {
      setPage(p || null);
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

  if (!page) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-4xl font-bold text-brand-dark mb-4">404 - Page Not Found</h1>
        <p className="text-slate-600 mb-6">The page you are looking for does not exist or has not been published yet.</p>
        <Link to="/" className="bg-brand-blue text-white px-6 py-2.5 rounded font-semibold text-sm">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {page.sections && page.sections.length > 0 ? (
        page.sections
          .sort((a: PageSection, b: PageSection) => a.order - b.order)
          .map((section: PageSection) => renderSection(section))
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-4xl font-bold text-brand-dark">{page.title}</h1>
          <p className="text-slate-500 mt-4">This page has no sections configured yet. Add sections in Admin CMS.</p>
        </div>
      )}
    </div>
  );
};

function renderSection(section: PageSection) {
  const { id, type, data } = section;

  switch (type) {
    case 'hero':
      return (
        <section key={id} className="bg-brand-dark text-white py-16 lg:py-24 border-b border-blue-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left max-w-3xl">
            {data.subheading && (
              <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">
                {data.subheading}
              </span>
            )}
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white mt-2 leading-tight">
              {data.heading || "Page Headline"}
            </h1>
            {data.description && (
              <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
                {data.description}
              </p>
            )}
            {data.buttonText && (
              <div className="pt-6">
                <Link
                  to={data.buttonUrl || "/contact"}
                  className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-7 py-3 rounded-lg text-sm font-semibold transition-all shadow-md"
                >
                  <span>{data.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      );

    case 'text_block':
    case 'rich_text':
      return (
        <section key={id} className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {data.heading && (
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark mb-4">
              {data.heading}
            </h2>
          )}
          <div className="text-slate-700 leading-relaxed text-base space-y-4">
            {data.content ? (
              data.content.split('\n\n').map((p: string, i: number) => <p key={i}>{p}</p>)
            ) : (
              <p>{data.text}</p>
            )}
          </div>
        </section>
      );

    case 'text_image':
      return (
        <section key={id} className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                {data.heading}
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {data.text}
              </p>
            </div>
            {data.imageUrl && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <img src={data.imageUrl} alt={data.heading || 'Section image'} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </section>
      );

    case 'cards_grid':
      return (
        <section key={id} className="py-16 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {data.heading && (
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark text-center mb-10">
                {data.heading}
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(data.cards || []).map((card: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-slate-300 shadow-sm">
                  <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'services_grid':
      return <WhatWeDo key={id} />;

    case 'stats':
      return <StatsSection key={id} />;

    case 'testimonials':
      return <TestimonialsSection key={id} />;

    case 'cta_banner':
      return <FinalCTA key={id} />;

    case 'quote':
      return (
        <section key={id} className="py-14 bg-brand-blue-light/40 border-y border-brand-blue/30 text-center px-4">
          <blockquote className="max-w-3xl mx-auto font-serif italic text-xl sm:text-2xl text-brand-dark leading-relaxed">
            “{data.quoteText}”
          </blockquote>
          {data.quoteAuthor && (
            <div className="text-xs font-bold text-brand-blue uppercase tracking-widest mt-3">
              — {data.quoteAuthor}
            </div>
          )}
        </section>
      );

    default:
      return null;
  }
}
