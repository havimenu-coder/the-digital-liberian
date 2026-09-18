import React, { useState, useEffect } from 'react';
import { Download, Trash2, Search, Filter, Inbox, CheckCircle, Eye, X } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { FormSubmission } from '../types';

export const AdminSubmissions: React.FC = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [viewingSub, setViewingSub] = useState<FormSubmission | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    const list = await dataStore.getSubmissions();
    setSubmissions(list);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this submission?')) {
      await dataStore.deleteSubmission(id);
      await loadSubmissions();
    }
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) {
      alert('No submissions to export.');
      return;
    }

    const filtered = submissions.filter(s => filterType === 'all' || s.form_type === filterType);
    if (filtered.length === 0) {
      alert('No submissions in this filter category to export.');
      return;
    }

    // Extract all unique headers
    const headers = ['ID', 'Form Type', 'Created At', 'Status'];
    const dataKeys = new Set<string>();
    filtered.forEach(s => {
      Object.keys(s.data).forEach(k => dataKeys.add(k));
    });
    const keyArray = Array.from(dataKeys);
    const fullHeaders = [...headers, ...keyArray];

    const csvRows = [
      fullHeaders.join(','),
      ...filtered.map(s => {
        const row = [
          `"${s.id}"`,
          `"${s.form_type}"`,
          `"${s.created_at}"`,
          `"${s.status}"`,
          ...keyArray.map(k => {
            const val = s.data[k];
            if (val === undefined || val === null) return '""';
            if (Array.isArray(val)) return `"${val.join('; ').replace(/"/g, '""')}"`;
            return `"${String(val).replace(/"/g, '""')}"`;
          })
        ];
        return row.join(',');
      })
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRows.join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `thedl_submissions_${filterType}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSubmissions = submissions.filter(s => {
    const matchesType = filterType === 'all' || s.form_type === filterType;
    const matchesSearch = JSON.stringify(s.data).toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Forms & Submissions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            View inquiries, AI masterclass event registrations, lead magnet downloads, and survey responses.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {[
            { key: 'all', label: 'All Submissions' },
            { key: 'contact', label: 'Contact Inquiries' },
            { key: 'event_registration', label: 'Event Signups' },
            { key: 'gift_download', label: 'Free Gift Leads' },
            { key: 'lsa_nomination', label: 'LSA Nominations' },
            { key: 'lsa_impact', label: 'Impact Surveys' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilterType(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filterType === f.key
                  ? 'bg-brand-dark text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search responses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {filteredSubmissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500">
                <tr>
                  <th className="p-4">Submission Type</th>
                  <th className="p-4">Primary Contact</th>
                  <th className="p-4">Details Summary</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSubmissions.map(sub => (
                  <tr key={sub.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-blue-light text-brand-blue">
                        {sub.form_type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-brand-dark">
                      {sub.data.firstName} {sub.data.lastName || sub.data.nomineeName || sub.data.name || 'Anonymous'}
                      <div className="text-[11px] font-normal text-slate-500">{sub.data.email || sub.data.phone}</div>
                    </td>
                    <td className="p-4 max-w-xs truncate text-slate-600">
                      {sub.data.subject || sub.data.reason || sub.data.message || sub.data.requested_gift || 'Details enclosed'}
                    </td>
                    <td className="p-4 text-slate-400 text-[11px]">
                      {new Date(sub.created_at).toLocaleString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setViewingSub(sub)}
                        className="p-1.5 text-slate-400 hover:text-brand-blue"
                        title="View Submission Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center space-y-2">
            <Inbox className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-serif text-base font-bold text-brand-dark">No Submissions Found</h3>
            <p className="text-xs text-slate-500">Submissions from the public forms will show up here automatically.</p>
          </div>
        )}
      </div>

      {/* View Detail Modal */}
      {viewingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-brand-blue">
                  {viewingSub.form_type.replace('_', ' ')}
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-dark">
                  Submission Details
                </h3>
              </div>
              <button onClick={() => setViewingSub(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2 text-xs">
              {Object.entries(viewingSub.data).map(([k, v]) => (
                <div key={k} className="border-b border-slate-50 pb-2">
                  <div className="font-bold text-slate-500 uppercase text-[10px]">{k.replace(/([A-Z])/g, ' $1')}</div>
                  <div className="text-slate-800 font-medium mt-0.5">
                    {Array.isArray(v) ? v.join(', ') : String(v)}
                  </div>
                </div>
              ))}
              <div className="text-[10px] text-slate-400 pt-2">
                Received at: {new Date(viewingSub.created_at).toLocaleString()}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setViewingSub(null)}
                className="bg-brand-dark text-white px-4 py-2 rounded-lg text-xs font-bold"
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
