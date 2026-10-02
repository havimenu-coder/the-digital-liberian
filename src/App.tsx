import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/public/Header';
import { Footer } from './components/public/Footer';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SylvesterProfilePage } from './pages/SylvesterProfilePage';
import { TeamPage } from './pages/TeamPage';
import { SolutionsHubPage } from './pages/SolutionsHubPage';
import { SolutionDetailPage } from './pages/SolutionDetailPage';
import { UpskillingLibraryPage } from './pages/UpskillingLibraryPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { InitiativesHubPage } from './pages/InitiativesHubPage';
import { LibrarianSpotlightAfricaPage } from './pages/LibrarianSpotlightAfricaPage';
import { UpskillConnectVillagePage } from './pages/UpskillConnectVillagePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { ContactPage } from './pages/ContactPage';
import { DynamicCustomPage } from './pages/DynamicCustomPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin CMS Pages
import { AdminLayout } from './admin/AdminLayout';
import { AdminLoginPage } from './admin/AdminLoginPage';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminPages } from './admin/AdminPages';
import { AdminNavigation } from './admin/AdminNavigation';
import { AdminHomepage } from './admin/AdminHomepage';
import { AdminServices } from './admin/AdminServices';
import { AdminResources } from './admin/AdminResources';
import { AdminBlog } from './admin/AdminBlog';
import { AdminBlogImporter } from './admin/AdminBlogImporter';
import { AdminPageImporter } from './admin/AdminPageImporter';
import { AdminEvents } from './admin/AdminEvents';
import { AdminInitiatives } from './admin/AdminInitiatives';
import { AdminTeam } from './admin/AdminTeam';
import { AdminTestimonials } from './admin/AdminTestimonials';
import { AdminPartners } from './admin/AdminPartners';
import { AdminMediaLibrary } from './admin/AdminMediaLibrary';
import { AdminSubmissions } from './admin/AdminSubmissions';
import { AdminSettings } from './admin/AdminSettings';

// Public Layout Wrapper with Header and Footer
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
);

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Admin CMS Authentication */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Admin CMS Protected Dashboard */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="pages" element={<AdminPages />} />
        <Route path="page-importer" element={<AdminPageImporter />} />
        <Route path="navigation" element={<AdminNavigation />} />
        <Route path="homepage" element={<AdminHomepage />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="resources" element={<AdminResources />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="blog-importer" element={<AdminBlogImporter />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="initiatives" element={<AdminInitiatives />} />
        <Route path="team" element={<AdminTeam />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="partners" element={<AdminPartners />} />
        <Route path="media" element={<AdminMediaLibrary />} />
        <Route path="submissions" element={<AdminSubmissions />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Public Pages */}
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
      <Route path="/about/sylvester-ebhonu" element={<PublicLayout><SylvesterProfilePage /></PublicLayout>} />
      <Route path="/about/team" element={<PublicLayout><TeamPage /></PublicLayout>} />
      
      <Route path="/solutions" element={<PublicLayout><SolutionsHubPage /></PublicLayout>} />
      <Route path="/solutions/:slug" element={<PublicLayout><SolutionDetailPage /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><SolutionsHubPage /></PublicLayout>} />
      <Route path="/services/:slug" element={<PublicLayout><SolutionDetailPage /></PublicLayout>} />
      
      <Route path="/upskilling-library" element={<PublicLayout><UpskillingLibraryPage /></PublicLayout>} />
      <Route path="/blog" element={<PublicLayout><BlogListPage /></PublicLayout>} />
      <Route path="/blog/:slug" element={<PublicLayout><BlogPostPage /></PublicLayout>} />
      
      <Route path="/initiatives" element={<PublicLayout><InitiativesHubPage /></PublicLayout>} />
      <Route path="/initiatives/librarian-spotlight-africa" element={<PublicLayout><LibrarianSpotlightAfricaPage /></PublicLayout>} />
      <Route path="/initiatives/upskill-connect-village" element={<PublicLayout><UpskillConnectVillagePage /></PublicLayout>} />
      
      <Route path="/events" element={<PublicLayout><EventsPage /></PublicLayout>} />
      <Route path="/events/:slug" element={<PublicLayout><EventDetailPage /></PublicLayout>} />
      
      <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
      
      {/* Dynamic Custom Pages created via Admin Page Builder */}
      <Route path="/:slug" element={<PublicLayout><DynamicCustomPage /></PublicLayout>} />
      
      {/* 404 Fallback */}
      <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
    </Routes>
  );
};
