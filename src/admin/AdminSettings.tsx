import React, { useState, useEffect } from 'react';
import { Save, Check, Settings, Shield, Globe } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { SiteSettings } from '../types';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    dataStore.getSiteSettings().then(setSettings);
  }, []);

  if (!settings) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await dataStore.updateSiteSettings(settings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Site Settings & SEO
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure branding colors, WhatsApp numbers, social profiles, and default meta tags.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'Settings Saved!' : 'Save All Settings'}</span>
        </button>
      </div>

      {/* Brand Identity & Contact Channels */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-serif text-xl font-bold text-brand-dark border-b border-slate-100 pb-2">
          General Brand Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Site Brand Name *</label>
            <input
              type="text"
              required
              value={settings.site_name}
              onChange={e => setSettings({ ...settings, site_name: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
            <input
              type="text"
              required
              value={settings.contact_phone}
              onChange={e => setSettings({ ...settings, contact_phone: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Email *</label>
            <input
              type="email"
              required
              value={settings.contact_email}
              onChange={e => setSettings({ ...settings, contact_email: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Direct WhatsApp Link</label>
            <input
              type="url"
              value={settings.whatsapp_link}
              onChange={e => setSettings({ ...settings, whatsapp_link: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Community Link</label>
            <input
              type="url"
              value={settings.whatsapp_community_link}
              onChange={e => setSettings({ ...settings, whatsapp_community_link: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Footer Copyright Text</label>
            <input
              type="text"
              value={settings.copyright_text}
              onChange={e => setSettings({ ...settings, copyright_text: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Social Media Profiles */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-serif text-xl font-bold text-brand-dark border-b border-slate-100 pb-2">
          Social Media Platforms
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">YouTube Channel URL</label>
            <input
              type="url"
              value={settings.social_links.youtube}
              onChange={e => setSettings({
                ...settings,
                social_links: { ...settings.social_links, youtube: e.target.value }
              })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile URL</label>
            <input
              type="url"
              value={settings.social_links.linkedin}
              onChange={e => setSettings({
                ...settings,
                social_links: { ...settings.social_links, linkedin: e.target.value }
              })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Facebook Official Page</label>
            <input
              type="url"
              value={settings.social_links.facebook_page}
              onChange={e => setSettings({
                ...settings,
                social_links: { ...settings.social_links, facebook_page: e.target.value }
              })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Instagram Profile</label>
            <input
              type="url"
              value={settings.social_links.instagram}
              onChange={e => setSettings({
                ...settings,
                social_links: { ...settings.social_links, instagram: e.target.value }
              })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Twitter / X Handle</label>
            <input
              type="url"
              value={settings.social_links.twitter}
              onChange={e => setSettings({
                ...settings,
                social_links: { ...settings.social_links, twitter: e.target.value }
              })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Facebook Community Group</label>
            <input
              type="url"
              value={settings.social_links.facebook_group}
              onChange={e => setSettings({
                ...settings,
                social_links: { ...settings.social_links, facebook_group: e.target.value }
              })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Brand Design Tokens (Hex) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-serif text-xl font-bold text-brand-dark border-b border-slate-100 pb-2">
          Theme Color Palette
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Dark Blue (#00003F)</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settings.dark_color}
                onChange={e => setSettings({ ...settings, dark_color: e.target.value })}
                className="w-9 h-9 rounded cursor-pointer border border-slate-300"
              />
              <input
                type="text"
                value={settings.dark_color}
                onChange={e => setSettings({ ...settings, dark_color: e.target.value })}
                className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Sky Blue Accent (#009DF6)</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settings.accent_color}
                onChange={e => setSettings({ ...settings, accent_color: e.target.value })}
                className="w-9 h-9 rounded cursor-pointer border border-slate-300"
              />
              <input
                type="text"
                value={settings.accent_color}
                onChange={e => setSettings({ ...settings, accent_color: e.target.value })}
                className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Surface (#FFFFFF)</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settings.primary_color}
                onChange={e => setSettings({ ...settings, primary_color: e.target.value })}
                className="w-9 h-9 rounded cursor-pointer border border-slate-300"
              />
              <input
                type="text"
                value={settings.primary_color}
                onChange={e => setSettings({ ...settings, primary_color: e.target.value })}
                className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-3 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95"
        >
          {isSaved ? 'All Settings Saved!' : 'Save All Settings'}
        </button>
      </div>
    </form>
  );
};
