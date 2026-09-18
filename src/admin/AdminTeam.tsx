import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Users } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { TeamMember } from '../types';

export const AdminTeam: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    const list = await dataStore.getTeamMembers();
    setTeam(list);
  };

  const handleCreateNew = () => {
    const newM: TeamMember = {
      id: 'team-' + Date.now(),
      name: 'Team Member Name',
      role: 'Coordinator / Role Title',
      organization: 'The Digital Librarian',
      bio: 'Brief background, institutional expertise, and contributions to our mission.',
      photo_url: '/images/sylvester-portrait.jpg',
      display_order: team.length + 1,
      initiative: 'core',
      is_active: true
    };
    setEditingMember(newM);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    await dataStore.saveTeamMember(editingMember);
    await loadTeam();
    setEditingMember(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this team member?')) {
      await dataStore.deleteTeamMember(id);
      await loadTeam();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Team Members CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage Sylvester Ebhonu and executive coordinators across core operations and LSA.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </button>
      </div>

      {editingMember && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border-2 border-brand-dark shadow-xl space-y-4">
          <h2 className="font-serif text-xl font-bold text-brand-dark border-b border-slate-200 pb-2">
            Team Member Profile
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={editingMember.name}
                onChange={e => setEditingMember({ ...editingMember, name: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Role Title *</label>
              <input
                type="text"
                required
                value={editingMember.role}
                onChange={e => setEditingMember({ ...editingMember, role: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Affiliation / Organization</label>
              <input
                type="text"
                value={editingMember.organization || ''}
                onChange={e => setEditingMember({ ...editingMember, organization: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Initiative Scope</label>
              <select
                value={editingMember.initiative}
                onChange={e => setEditingMember({ ...editingMember, initiative: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              >
                <option value="core">Core Leadership (TheDL)</option>
                <option value="lsa">Librarian Spotlight Africa (LSA)</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Biography *</label>
              <textarea
                rows={3}
                required
                value={editingMember.bio}
                onChange={e => setEditingMember({ ...editingMember, bio: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button type="button" onClick={() => setEditingMember(null)} className="px-4 py-2 text-xs font-bold text-slate-600">
              Cancel
            </button>
            <button type="submit" className="bg-brand-blue text-white px-5 py-2 text-xs font-bold rounded shadow-sm">
              Save Member
            </button>
          </div>
        </form>
      )}

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map(member => (
          <div key={member.id} className="bg-white rounded-xl border border-slate-300 p-5 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                {member.initiative === 'lsa' ? 'LSA Leadership' : 'Core TheDL'}
              </span>
              <h3 className="font-serif text-lg font-bold text-brand-dark mt-1">{member.name}</h3>
              <div className="text-xs text-slate-600">{member.role}</div>
              <p className="text-xs text-slate-500 mt-2 line-clamp-3">{member.bio}</p>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex justify-end gap-1">
              <button onClick={() => setEditingMember(member)} className="p-1.5 text-slate-500 hover:text-brand-blue">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(member.id)} className="p-1.5 text-slate-500 hover:text-rose-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
