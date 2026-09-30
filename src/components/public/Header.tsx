import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { dataStore } from '../../lib/storage';
import { NavigationItem, SiteSettings } from '../../types';

export const Header: React.FC = () => {
  const [navItems, setNavItems] = useState<NavigationItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const loadData = async () => {
    const [nav, s] = await Promise.all([
      dataStore.getNavigation(),
      dataStore.getSiteSettings()
    ]);
    setNavItems(nav);
    setSettings(s);
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('thedl_storage_update', handleUpdate);
    return () => window.removeEventListener('thedl_storage_update', handleUpdate);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center group">
            <div className="h-12 sm:h-16 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
              <img 
                src="/images/digital-librarian-logo4.jpg" 
                alt="The Digital Librarian Logo" 
                className="h-12 sm:h-16 w-auto object-contain rounded-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/logo.png';
                }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navItems.map((item, idx) => {
              const hasChildren = item.children && item.children.length > 0;
              const isItemActive = location.pathname === item.url || 
                (hasChildren && item.children?.some(c => location.pathname === c.url));

              return (
                <div 
                  key={item.id} 
                  className="relative flex items-center group"
                  onMouseEnter={() => hasChildren && setActiveDropdown(item.id)}
                  onMouseLeave={() => hasChildren && setActiveDropdown(null)}
                >
                  {/* Pipe divider before item (except first) */}
                  {idx > 0 && (
                    <span className="text-slate-300 mx-1 lg:mx-2 select-none" aria-hidden="true">|</span>
                  )}

                  <div className="relative">
                    <Link
                      to={item.url}
                      className={`text-sm lg:text-[15px] font-medium transition-colors py-2 px-1 flex items-center gap-1 ${
                        isItemActive
                          ? 'text-brand-blue font-semibold'
                          : 'text-slate-700 hover:text-brand-blue'
                      }`}
                      target={item.open_in_new_tab ? '_blank' : undefined}
                      rel={item.open_in_new_tab ? 'noopener noreferrer' : undefined}
                    >
                      {item.label}
                      {hasChildren && (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-blue transition-transform duration-200 group-hover:rotate-180" />
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    {hasChildren && activeDropdown === item.id && (
                      <div className="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn">
                        {item.children?.map(subItem => (
                          <Link
                            key={subItem.id}
                            to={subItem.url}
                            className={`block px-4 py-2.5 text-sm transition-colors ${
                              location.pathname === subItem.url
                                ? 'bg-brand-blue-light text-brand-blue font-semibold'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-brand-blue'
                            }`}
                          >
                            <div className="font-medium">{subItem.label}</div>
                            {subItem.description && (
                              <div className="text-xs text-slate-500 mt-0.5">{subItem.description}</div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Desktop Right Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/contact"
              className="bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow active:scale-95"
            >
              Work With TheDL
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              to="/contact"
              className="bg-brand-blue text-white px-3 py-1.5 rounded text-xs font-semibold"
            >
              Contact
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-brand-blue hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.id} className="border-b border-slate-100 pb-2">
              <Link
                to={item.url}
                className="block py-2 text-base font-semibold text-slate-800 hover:text-brand-blue"
              >
                {item.label}
              </Link>
              {item.children && item.children.length > 0 && (
                <div className="pl-4 space-y-1.5 pt-1">
                  {item.children.map(subItem => (
                    <Link
                      key={subItem.id}
                      to={subItem.url}
                      className="block py-1 text-sm text-slate-600 hover:text-brand-blue"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3">
            <Link
              to="/contact"
              className="block w-full text-center bg-brand-blue text-white py-3 rounded font-medium shadow"
            >
              Work With TheDL
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
