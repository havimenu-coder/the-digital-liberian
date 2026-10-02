import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Menu as MenuIcon,
  Home,
  Briefcase,
  BookOpen,
  Newspaper,
  Calendar,
  Award,
  Users,
  MessageSquareQuote,
  Building,
  Image,
  Inbox,
  Search,
  Settings,
  Shield,
  LogOut,
  X,
  ExternalLink,
  ChevronRight,
  Globe,
  FileUp
} from 'lucide-react';
import { WordPressImportModal } from './components/WordPressImportModal';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<string | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('thedl_admin_session');
    if (!session) {
      navigate('/admin/login');
    } else {
      setAdminUser(JSON.parse(session).email);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('thedl_admin_session');
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Pages & Builder', path: '/admin/pages', icon: FileText },
    { label: 'Page Importer', path: '/admin/page-importer', icon: FileUp },
    { label: 'Navigation', path: '/admin/navigation', icon: MenuIcon },
    { label: 'Homepage Content', path: '/admin/homepage', icon: Home },
    { label: 'Services / Solutions', path: '/admin/services', icon: Briefcase },
    { label: 'Resources & AI Tools', path: '/admin/resources', icon: BookOpen },
    { label: 'Blog Posts', path: '/admin/blog', icon: Newspaper },
    { label: 'Blog Importer', path: '/admin/blog-importer', icon: FileUp },
    { label: 'Events & Tickets', path: '/admin/events', icon: Calendar },
    { label: 'Initiatives & LSA', path: '/admin/initiatives', icon: Award },
    { label: 'Team Members', path: '/admin/team', icon: Users },
    { label: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
    { label: 'Partners & Logos', path: '/admin/partners', icon: Building },
    { label: 'Media Library', path: '/admin/media', icon: Image },
    { label: 'Forms & Submissions', path: '/admin/submissions', icon: Inbox },
    { label: 'Site Settings & SEO', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row font-sans">
      
      {/* Mobile Top Navbar */}
      <div className="lg:hidden bg-brand-dark text-white p-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="font-serif font-bold text-lg text-white flex items-center gap-2">
          <span>TheDL CMS</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-blue-900 focus:outline-none"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-dark text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-screen flex flex-col justify-between ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo & Brand */}
          <div className="p-6 border-b border-blue-900/60 flex items-center justify-between">
            <Link to="/admin" className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-tight text-white leading-tight">
                THE DIGITAL LIBRARIAN
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-blue mt-0.5">
                Admin Dashboard & CMS
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-190px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-slate-300 hover:bg-blue-950 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Status & Bottom Actions */}
        <div className="p-4 border-t border-blue-900/60 bg-blue-950/40 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <div className="truncate max-w-[140px]">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Logged In</div>
              <div className="font-semibold text-white truncate">{adminUser || 'Administrator'}</div>
            </div>
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md hover:bg-blue-900 text-slate-300 hover:text-white transition-colors"
              title="View Live Public Website"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-blue-900/50 hover:bg-rose-600/80 text-white py-2 rounded-lg text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-slate-50">
        {/* Top Action Header across all admin views */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Current View:</span>
            <span className="text-xs font-bold text-brand-dark px-2.5 py-1 bg-slate-100 rounded-md">
              {navItems.find(item => item.path === location.pathname)?.label || 'Control Center'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-brand-blue hover:from-blue-800 hover:to-brand-blue-hover text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs hover:shadow active:scale-95"
              title="Import pages, articles, or full XML exports from WordPress"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Import from WordPress</span>
            </button>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-brand-blue border border-slate-200 hover:border-brand-blue px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        <div className="p-6 lg:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Global WordPress Import Modal accessible from any admin page */}
      <WordPressImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

    </div>
  );
};
