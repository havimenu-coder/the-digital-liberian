import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Newspaper, 
  Calendar, 
  Users, 
  MessageSquareQuote, 
  Inbox, 
  BookOpen, 
  Image, 
  PlusCircle, 
  ExternalLink,
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { dataStore } from '../lib/storage';
import { FormSubmission } from '../types';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalPages: 0,
    publishedPages: 0,
    draftPages: 0,
    blogPosts: 0,
    events: 0,
    teamMembers: 0,
    testimonials: 0,
    submissions: 0,
    resources: 0,
    mediaFiles: 0,
  });

  const [recentSubmissions, setRecentSubmissions] = useState<FormSubmission[]>([]);

  useEffect(() => {
    Promise.all([
      dataStore.getPages(),
      dataStore.getBlogPosts(),
      dataStore.getEvents(),
      dataStore.getTeamMembers(),
      dataStore.getTestimonials(),
      dataStore.getSubmissions(),
      dataStore.getResources(),
      dataStore.getMediaItems(),
    ]).then(([pages, blogs, events, team, testimonials, submissions, resources, media]) => {
      setStats({
        totalPages: pages.length,
        publishedPages: pages.filter(p => p.published).length,
        draftPages: pages.filter(p => !p.published).length,
        blogPosts: blogs.length,
        events: events.length,
        teamMembers: team.length,
        testimonials: testimonials.length,
        submissions: submissions.length,
        resources: resources.length,
        mediaFiles: media.length,
      });
      setRecentSubmissions(submissions.slice(0, 5));
    });
  }, []);

  const statCards = [
    { label: 'Total Custom Pages', value: stats.totalPages, sub: `${stats.publishedPages} Published · ${stats.draftPages} Drafts`, icon: FileText, link: '/admin/pages' },
    { label: 'Blog Posts', value: stats.blogPosts, sub: 'Articles & Insights', icon: Newspaper, link: '/admin/blog' },
    { label: 'Events & Masterclasses', value: stats.events, sub: 'Upcoming & Past', icon: Calendar, link: '/admin/events' },
    { label: 'Form Submissions', value: stats.submissions, sub: 'Inquiries, Signups & Reviews', icon: Inbox, link: '/admin/submissions', highlight: true },
    { label: 'Learning Resources', value: stats.resources, sub: 'Books, Courses & Tools', icon: BookOpen, link: '/admin/resources' },
    { label: 'Team Members', value: stats.teamMembers, sub: 'Core Leadership & LSA', icon: Users, link: '/admin/team' },
    { label: 'Testimonials', value: stats.testimonials, sub: 'Colleague & Client Reviews', icon: MessageSquareQuote, link: '/admin/testimonials' },
    { label: 'Media Library Assets', value: stats.mediaFiles, sub: 'Images, PDFs & Flyers', icon: Image, link: '/admin/media' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            The Digital Librarian CMS Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage public website content, pages, navigation, and inquiries dynamically without touching code.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/pages?action=new"
            className="inline-flex items-center gap-1.5 bg-brand-blue hover:bg-brand-blue-hover text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Page</span>
          </Link>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Statistic Cards (Section 7) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link
              key={i}
              to={stat.link}
              className={`p-5 rounded-xl border transition-all flex flex-col justify-between hover:shadow-md ${
                stat.highlight
                  ? 'bg-brand-blue-light/50 border-brand-blue/40'
                  : 'bg-white border-slate-200 hover:border-brand-blue'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-600">{stat.label}</span>
                <div className="p-2 rounded-lg bg-slate-100 text-brand-dark">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="font-serif text-3xl font-bold text-brand-dark">
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {stat.sub}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity & Recent Form Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Form Submissions */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-serif text-xl font-bold text-brand-dark">
                Recent Form Submissions
              </h2>
              <p className="text-xs text-slate-500">Contact inquiries, event signups, and lead downloads.</p>
            </div>
            <Link
              to="/admin/submissions"
              className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentSubmissions.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {recentSubmissions.map((sub) => (
                <div key={sub.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-800">
                      {sub.data.firstName} {sub.data.lastName || sub.data.nomineeName || 'User'}
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      {sub.data.email || sub.data.phone || 'No email provided'} · <span className="uppercase text-brand-blue font-semibold">{sub.form_type.replace('_', ' ')}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-500">
              No submissions recorded yet. Try submitting the contact form on the public site.
            </div>
          )}
        </div>

        {/* Quick Management Shortcuts */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="font-serif text-xl font-bold text-brand-dark border-b border-slate-100 pb-3">
            Quick Actions
          </h2>
          <div className="space-y-2 text-xs">
            <Link
              to="/admin/homepage"
              className="block p-3 rounded-lg border border-slate-200 hover:border-brand-blue hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
            >
              ✏️ Edit Homepage Hero & Stats
            </Link>
            <Link
              to="/admin/navigation"
              className="block p-3 rounded-lg border border-slate-200 hover:border-brand-blue hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
            >
              🧭 Update Header Navigation Menus
            </Link>
            <Link
              to="/admin/resources"
              className="block p-3 rounded-lg border border-slate-200 hover:border-brand-blue hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
            >
              🚀 Manage 50+ AI Tools Directory
            </Link>
            <Link
              to="/admin/blog"
              className="block p-3 rounded-lg border border-slate-200 hover:border-brand-blue hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
            >
              ✍️ Write & Publish New Blog Article
            </Link>
            <Link
              to="/admin/events"
              className="block p-3 rounded-lg border border-slate-200 hover:border-brand-blue hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
            >
              🎟️ Create Event & Manage Ticket Tiers
            </Link>
            <Link
              to="/admin/settings"
              className="block p-3 rounded-lg border border-slate-200 hover:border-brand-blue hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
            >
              ⚙️ Modify Brand Colors & WhatsApp Link
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
