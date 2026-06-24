import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Holidays from './pages/Holidays';
import Hotels from './pages/Hotels';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { switchActiveCategory } from './utils/telemetry';
import { Phone, Mail, Compass, MapPin } from 'lucide-react';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy_client_id';

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <SettingsProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </SettingsProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

function AppContent() {
  const { settings } = useSettings();

  return (
    <div className="flex flex-col min-h-screen bg-brand-dark transition-colors duration-300">
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-grow">
        <Routes>
          {/* Visitor Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<RouteTracker page="catalog"><Catalog /></RouteTracker>} />
          <Route path="/holidays" element={<RouteTracker page="holidays"><Holidays /></RouteTracker>} />
          <Route path="/hotels" element={<RouteTracker page="hotels"><Hotels /></RouteTracker>} />
          <Route path="/about" element={<RouteTracker page="about"><About /></RouteTracker>} />
          <Route path="/contact" element={<RouteTracker page="contact"><Contact /></RouteTracker>} />
          
          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      
      {/* Expanded Premium Footer */}
      <footer className="bg-brand-surface border-t border-brand-border/40 py-12 px-6 md:px-12 text-sm text-brand-textSecondary mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          {/* Logo/Info Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="w-6 h-6 text-brand-secondary" />
              <span className="text-lg font-extrabold tracking-wider text-brand-textPrimary font-sans">
                Avenue Global <span className="text-brand-secondary">Tour & Travels</span>
              </span>
            </div>
            <p className="text-xs max-w-sm leading-relaxed">
              Your premier travel partner orchestrating custom holiday packages, luxury hotel bookings, and bespoke tours across India and globally. Fully customizable solutions.
            </p>
          </div>

          {/* Quick Links Col */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-textPrimary">Our Offerings</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/catalog" className="hover:text-brand-primary transition-colors">Tour Blueprints</a></li>
              <li><a href="/holidays" className="hover:text-brand-primary transition-colors">Holiday Packages</a></li>
              <li><a href="/hotels" className="hover:text-brand-primary transition-colors">Hotels Network</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-textPrimary">Contact Avenue</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-secondary shrink-0" />
                <span>{settings.phoneNumber}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                <a href={`mailto:${settings.emailAddress}`} className="hover:text-brand-primary transition-colors break-all">
                  {settings.emailAddress}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0" />
                <span>{settings.address}</span>
              </li>
            </ul>
            <div className="flex gap-3 pt-2">
              {settings.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="p-2 bg-brand-dark/80 hover:bg-brand-primary hover:text-white rounded-lg border border-brand-border/60 transition-all flex items-center justify-center" aria-label="Instagram">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              )}
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="p-2 bg-brand-dark/80 hover:bg-brand-primary hover:text-white rounded-lg border border-brand-border/60 transition-all flex items-center justify-center" aria-label="Facebook">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              )}
              {settings.whatsappUrl && (
                <a href={settings.whatsappUrl} target="_blank" rel="noreferrer" className="p-2 bg-brand-dark/80 hover:bg-emerald-600 hover:text-white rounded-lg border border-brand-border/60 transition-all flex items-center justify-center" aria-label="WhatsApp">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-brand-border/30 text-center text-xs">
          &copy; {new Date().getFullYear()} Avenue Global T&T. All rights reserved. Customize anything.
        </div>
      </footer>
    </div>
  );
}

// Helper component to handle silent telemetry tracking on router views
function RouteTracker({ page, children }) {
  React.useEffect(() => {
    switchActiveCategory(page === 'catalog' ? 'Catalog Browsing' : page);
    return () => {
      switchActiveCategory(null);
    };
  }, [page]);

  return children;
}

export default App;
