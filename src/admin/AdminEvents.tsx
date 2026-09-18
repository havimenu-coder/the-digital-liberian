import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Calendar, Clock, MapPin, Eye } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { Event } from '../types';

export const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const list = await dataStore.getEvents();
    setEvents(list);
  };

  const handleCreateNew = () => {
    const newEv: Event = {
      id: 'event-' + Date.now(),
      title: 'New Masterclass / Workshop Title',
      slug: 'new-event-' + Math.floor(Math.random() * 1000),
      tagline: 'Event subheadline or motto',
      category: 'Masterclass',
      status: 'upcoming',
      date: '2026-11-15',
      time: '10:00 AM - 1:00 PM WAT',
      location: 'Virtual / Zoom & WhatsApp Live Stream',
      is_virtual: true,
      flyer_url: '/images/event-flyer.jpg',
      description: 'Comprehensive overview of event schedule, speakers, and learning objectives.',
      expectations: [
        'To improve work/research performance and productivity',
        'To upgrade products/services delivery by leveraging AI'
      ],
      investment_tiers: [
        { label: 'Standard Ticket', amount: '₦2,000 / $5', description: 'Live session & certificate' },
        { label: 'Executive VIP', amount: '₦5,000 / $11', description: 'All materials & coaching audit' }
      ],
      bank_details: {
        account_name: 'SESITECH VENTURES',
        account_number: '4011277179',
        bank_name: 'FIDELITY BANK',
        contact: 'didigitallibrarian@gmail.com / 07030413987'
      },
      whatsapp_redirect_url: 'https://chat.whatsapp.com/BeYzmeB5lUP8TXqUwMNWlD',
      published: true,
      featured: true
    };
    setEditingEvent(newEv);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    await dataStore.saveEvent(editingEvent);
    await loadEvents();
    setEditingEvent(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this event?')) {
      await dataStore.deleteEvent(id);
      await loadEvents();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Events & Masterclasses CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage upcoming countdown events, past archives, registration fees, and WhatsApp community links.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      {editingEvent && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border-2 border-brand-dark shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="font-serif text-xl font-bold text-brand-dark">Event Details & Ticket Config</h2>
            <button type="button" onClick={() => setEditingEvent(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Event Title *</label>
              <input
                type="text"
                required
                value={editingEvent.title}
                onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })}
                className="w-full px-3 py-2 text-sm font-bold text-brand-dark border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">URL Slug *</label>
              <input
                type="text"
                required
                value={editingEvent.slug}
                onChange={e => setEditingEvent({ ...editingEvent, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
              <select
                value={editingEvent.status}
                onChange={e => setEditingEvent({ ...editingEvent, status: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded font-semibold"
              >
                <option value="upcoming">Upcoming (Active Registration)</option>
                <option value="past">Past (Archived)</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Date (YYYY-MM-DD for Countdown Timer) *</label>
              <input
                type="date"
                required
                value={editingEvent.date}
                onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Time *</label>
              <input
                type="text"
                required
                value={editingEvent.time}
                onChange={e => setEditingEvent({ ...editingEvent, time: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location *</label>
              <input
                type="text"
                required
                value={editingEvent.location}
                onChange={e => setEditingEvent({ ...editingEvent, location: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description *</label>
              <textarea
                rows={3}
                required
                value={editingEvent.description}
                onChange={e => setEditingEvent({ ...editingEvent, description: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Bank Account Number</label>
              <input
                type="text"
                value={editingEvent.bank_details?.account_number || ''}
                onChange={e => setEditingEvent({
                  ...editingEvent,
                  bank_details: { ...editingEvent.bank_details, account_number: e.target.value }
                })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Community Redirect URL</label>
              <input
                type="url"
                value={editingEvent.whatsapp_redirect_url || ''}
                onChange={e => setEditingEvent({ ...editingEvent, whatsapp_redirect_url: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button type="button" onClick={() => setEditingEvent(null)} className="px-4 py-2 text-xs font-bold text-slate-600">
              Cancel
            </button>
            <button type="submit" className="bg-brand-blue hover:bg-brand-blue-hover text-white px-6 py-2 text-xs font-bold rounded shadow-sm">
              Save Event
            </button>
          </div>
        </form>
      )}

      {/* Events Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.map(ev => (
              <tr key={ev.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-brand-dark max-w-xs truncate">{ev.title}</td>
                <td className="p-4 text-slate-600">{ev.date} · {ev.time}</td>
                <td className="p-4 text-slate-500 max-w-xs truncate">{ev.location}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    ev.status === 'upcoming' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {ev.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <a href={`/events/${ev.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-slate-400 hover:text-brand-blue inline-block">
                    <Eye className="w-4 h-4" />
                  </a>
                  <button onClick={() => setEditingEvent(ev)} className="p-1.5 text-slate-400 hover:text-brand-blue">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(ev.id)} className="p-1.5 text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
