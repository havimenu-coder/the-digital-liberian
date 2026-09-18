import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Save, ExternalLink, ChevronRight, Check } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { NavigationItem } from '../types';

export const AdminNavigation: React.FC = () => {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    dataStore.getNavigation().then(setItems);
  }, []);

  const handleSave = async () => {
    await dataStore.updateNavigation(items);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAddItem = () => {
    const newItem: NavigationItem = {
      id: 'nav-' + Date.now(),
      label: 'New Link',
      url: '/new-page',
      order: items.length + 1,
      open_in_new_tab: false,
      children: []
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const list = [...items];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= list.length) return;
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;
    list.forEach((item, i) => { item.order = i + 1; });
    setItems(list);
  };

  const handleAddChild = (parentId: string) => {
    const list = items.map(item => {
      if (item.id === parentId) {
        const children = item.children || [];
        return {
          ...item,
          children: [
            ...children,
            {
              id: 'sub-' + Date.now(),
              label: 'Submenu Link',
              url: '/solutions',
              order: children.length + 1,
              description: 'Link description'
            }
          ]
        };
      }
      return item;
    });
    setItems(list);
  };

  const handleDeleteChild = (parentId: string, childId: string) => {
    const list = items.map(item => {
      if (item.id === parentId) {
        return {
          ...item,
          children: (item.children || []).filter(c => c.id !== childId)
        };
      }
      return item;
    });
    setItems(list);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Navigation Menu CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Reorder menu items, configure dropdown links, create nested navigation, and toggle new tab targets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddItem}
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg text-xs font-bold transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Menu Item</span>
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2 rounded-lg text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'Menu Saved!' : 'Save Menu'}</span>
          </button>
        </div>
      </div>

      {/* Menu Tree */}
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-300 p-5 shadow-sm space-y-4"
          >
            {/* Main Menu Item Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Label</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={e => {
                      const list = [...items];
                      list[idx].label = e.target.value;
                      setItems(list);
                    }}
                    className="w-full px-3 py-1.5 text-xs font-bold text-brand-dark border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">URL / Route</label>
                  <input
                    type="text"
                    value={item.url}
                    onChange={e => {
                      const list = [...items];
                      list[idx].url = e.target.value;
                      setItems(list);
                    }}
                    className="w-full px-3 py-1.5 text-xs font-mono text-slate-700 border border-slate-300 rounded"
                  />
                </div>
              </div>

              {/* Order and Action Controls */}
              <div className="flex items-center gap-2">
                <button
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  className="p-1.5 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  disabled={idx === items.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  className="p-1.5 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleAddChild(item.id)}
                  className="px-2.5 py-1 bg-brand-blue-light text-brand-blue rounded text-xs font-bold hover:bg-brand-blue hover:text-white transition-colors"
                >
                  + Dropdown Sub-link
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1.5 rounded hover:bg-rose-50 text-rose-500"
                  title="Delete Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dropdown Children */}
            {item.children && item.children.length > 0 && (
              <div className="pl-6 space-y-2.5 border-l-2 border-brand-blue/40 pt-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Dropdown Items ({item.children.length})
                </div>

                {item.children.map((child) => (
                  <div
                    key={child.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                      <input
                        type="text"
                        value={child.label}
                        onChange={e => {
                          const list = [...items];
                          const c = list[idx].children?.find(x => x.id === child.id);
                          if (c) c.label = e.target.value;
                          setItems(list);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-slate-800 border border-slate-300 rounded"
                        placeholder="Submenu Label"
                      />
                      <input
                        type="text"
                        value={child.url}
                        onChange={e => {
                          const list = [...items];
                          const c = list[idx].children?.find(x => x.id === child.id);
                          if (c) c.url = e.target.value;
                          setItems(list);
                        }}
                        className="px-2.5 py-1 text-xs font-mono text-slate-700 border border-slate-300 rounded"
                        placeholder="/solutions/library-information"
                      />
                    </div>

                    <button
                      onClick={() => handleDeleteChild(item.id, child.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                      title="Remove Sub-link"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};
