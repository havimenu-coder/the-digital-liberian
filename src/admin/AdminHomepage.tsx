import React, { useState, useEffect } from 'react';
import { Save, Sparkles, Check, Image as ImageIcon } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { HomepageData } from '../types';
import { ImageUploadField } from './components/ImageUploadField';

export const AdminHomepage: React.FC = () => {
  const [data, setData] = useState<HomepageData | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    dataStore.getHomepageData().then(setData);
  }, []);

  if (!data) {
    return <div className="p-8 text-center">Loading Homepage Data...</div>;
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await dataStore.updateHomepageData(data);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Homepage Content Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Customize the live Hero headline, subtext, portrait image, ticker tags, statistics, and final CTA.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'Saved to Live Site!' : 'Save Changes'}</span>
        </button>
      </div>

      {/* 1. HERO SECTION */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-serif text-xl font-bold text-brand-dark border-b border-slate-100 pb-2">
          Hero Section (Dark Navy #00003F)
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Headline *
            </label>
            <input
              type="text"
              required
              value={data.hero.headline}
              onChange={e => setData({
                ...data,
                hero: { ...data.hero, headline: e.target.value }
              })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue font-serif"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Subheadline / Secondary Quote
            </label>
            <input
              type="text"
              value={data.hero.subheadline}
              onChange={e => setData({
                ...data,
                hero: { ...data.hero, subheadline: e.target.value }
              })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Hero Supporting Description *
            </label>
            <textarea
              rows={3}
              required
              value={data.hero.description}
              onChange={e => setData({
                ...data,
                hero: { ...data.hero, description: e.target.value }
              })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div>
            <ImageUploadField
              label="Hero Illustration / Portrait Banner Image"
              value={data.hero.image_url || ''}
              onChange={url => setData({
                ...data,
                hero: { ...data.hero, image_url: url }
              })}
              placeholder="Upload hero image, pick from media, or paste image URL"
              helperText="Upload the main hero graphic or founder portrait displayed in the homepage hero section."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Button Text
              </label>
              <input
                type="text"
                value={data.hero.primary_btn_text}
                onChange={e => setData({
                  ...data,
                  hero: { ...data.hero, primary_btn_text: e.target.value }
                })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Button URL
              </label>
              <input
                type="text"
                value={data.hero.primary_btn_url}
                onChange={e => setData({
                  ...data,
                  hero: { ...data.hero, primary_btn_url: e.target.value }
                })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Secondary Button Text
              </label>
              <input
                type="text"
                value={data.hero.secondary_btn_text}
                onChange={e => setData({
                  ...data,
                  hero: { ...data.hero, secondary_btn_text: e.target.value }
                })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Secondary Button URL
              </label>
              <input
                type="text"
                value={data.hero.secondary_btn_url}
                onChange={e => setData({
                  ...data,
                  hero: { ...data.hero, secondary_btn_url: e.target.value }
                })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. STATISTICS SECTION (Section 34 Example: 15,000+ -> 20,000+) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-serif text-xl font-bold text-brand-dark border-b border-slate-100 pb-2">
          Homepage Statistics & Impact Counters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat 1 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-[10px] font-bold uppercase text-brand-blue">Counter 1</span>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Value (e.g. 15,000+)</label>
              <input
                type="text"
                value={data.stats.stat1_value}
                onChange={e => setData({
                  ...data,
                  stats: { ...data.stats, stat1_value: e.target.value }
                })}
                className="w-full px-3 py-1.5 text-sm font-bold text-brand-blue border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Label</label>
              <input
                type="text"
                value={data.stats.stat1_label}
                onChange={e => setData({
                  ...data,
                  stats: { ...data.stats, stat1_label: e.target.value }
                })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                rows={2}
                value={data.stats.stat1_sub}
                onChange={e => setData({
                  ...data,
                  stats: { ...data.stats, stat1_sub: e.target.value }
                })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded"
              />
            </div>
          </div>

          {/* Stat 2 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-[10px] font-bold uppercase text-brand-blue">Counter 2</span>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Value (e.g. Africa & Beyond)</label>
              <input
                type="text"
                value={data.stats.stat2_value}
                onChange={e => setData({
                  ...data,
                  stats: { ...data.stats, stat2_value: e.target.value }
                })}
                className="w-full px-3 py-1.5 text-sm font-bold text-brand-dark border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Label</label>
              <input
                type="text"
                value={data.stats.stat2_label}
                onChange={e => setData({
                  ...data,
                  stats: { ...data.stats, stat2_label: e.target.value }
                })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                rows={2}
                value={data.stats.stat2_sub}
                onChange={e => setData({
                  ...data,
                  stats: { ...data.stats, stat2_sub: e.target.value }
                })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded"
              />
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-[10px] font-bold uppercase text-brand-blue">Counter 3</span>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Value (Domain Pillars)</label>
              <input
                type="text"
                value={data.stats.stat3_value}
                onChange={e => setData({
                  ...data,
                  stats: { ...data.stats, stat3_value: e.target.value }
                })}
                className="w-full px-3 py-1.5 text-sm font-bold text-brand-dark border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Label</label>
              <input
                type="text"
                value={data.stats.stat3_label}
                onChange={e => setData({
                  ...data,
                  stats: { ...data.stats, stat3_label: e.target.value }
                })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                rows={2}
                value={data.stats.stat3_sub}
                onChange={e => setData({
                  ...data,
                  stats: { ...data.stats, stat3_sub: e.target.value }
                })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. FINAL CALL TO ACTION */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-serif text-xl font-bold text-brand-dark border-b border-slate-100 pb-2">
          Bottom Call to Action Banner
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">CTA Heading</label>
            <input
              type="text"
              value={data.final_cta.heading}
              onChange={e => setData({
                ...data,
                final_cta: { ...data.final_cta, heading: e.target.value }
              })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">CTA Description</label>
            <textarea
              rows={2}
              value={data.final_cta.description}
              onChange={e => setData({
                ...data,
                final_cta: { ...data.final_cta, description: e.target.value }
              })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded"
            />
          </div>
        </div>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-3 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95"
        >
          {isSaved ? 'All Homepage Changes Saved!' : 'Save All Homepage Settings'}
        </button>
      </div>
    </form>
  );
};
