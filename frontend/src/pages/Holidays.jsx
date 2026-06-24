import React, { useState, useEffect, useContext } from 'react';
import { Sparkles, Calendar, Heart, Shield } from 'lucide-react';
import api from '../utils/api';
import PackageCard from '../components/PackageCard';
import BookingModal from '../components/BookingModal';
import CustomRequestModal from '../components/CustomRequestModal';
import AuthModal from '../components/AuthModal';
import { AuthContext } from '../context/AuthContext';
import { switchActiveCategory } from '../utils/telemetry';

export default function Holidays() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modals
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useContext(AuthContext);

  const handleOpenCustomModal = () => {
    if (user) {
      setShowCustomModal(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleOpenBookingModal = (pkg) => {
    if (user) {
      setSelectedPkg(pkg);
    } else {
      setShowAuthModal(true);
    }
  };

  useEffect(() => {
    async function fetchHolidays() {
      try {
        setLoading(true);
        setError('');
        
        // Fetch only items tagged as 'Holiday'
        const res = await api.get('/packages', {
          params: { category: 'Holiday' }
        });
        setHolidays(res.data);
        
        // Telemetry hook
        switchActiveCategory('Holidays Catalogue');
      } catch (err) {
        console.error(err);
        setError('Failed to load readymade holidays. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchHolidays();
    return () => switchActiveCategory(null);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary text-xs font-semibold rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready-To-Go Itineraries</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-textPrimary mb-2 glow-text-primary">
            Readymade Holiday Packages
          </h1>
          <p className="text-brand-textSecondary text-sm max-w-xl">
            Save time and travel stress-free. Our readymade holidays include pre-negotiated premium stays, private guides, and full activity transfers.
          </p>
        </div>

        <button
          onClick={handleOpenCustomModal}
          className="px-6 py-3.5 bg-brand-accent hover:bg-amber-600 text-brand-dark font-extrabold rounded-xl transition-all shadow-md hover:shadow-brand-accent/20"
        >
          Customize My Holiday
        </button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 border border-brand-border/40">
          <Calendar className="w-8 h-8 text-brand-primary shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-brand-textPrimary">Flexible Departure Dates</h4>
            <p className="text-xs text-brand-textSecondary">Choose your start dates for any ready package.</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 border border-brand-border/40">
          <Heart className="w-8 h-8 text-brand-secondary shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-brand-textPrimary">Bespoke Hotel Standards</h4>
            <p className="text-xs text-brand-textSecondary">Tailor the hotel class between 3★, 4★, and 5★.</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 border border-brand-border/40">
          <Shield className="w-8 h-8 text-brand-accent shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-brand-textPrimary">Full Travel Coverage</h4>
            <p className="text-xs text-brand-textSecondary">Includes 24/7 dedicated local emergency support.</p>
          </div>
        </div>
      </div>

      {/* Package listings */}
      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="glass-panel p-12 rounded-2xl text-center text-rose-300">
          {error}
        </div>
      ) : holidays.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {holidays.map((pkg) => (
            <PackageCard 
              key={pkg._id} 
              pkg={pkg} 
              onBook={handleOpenBookingModal} 
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-16 rounded-2xl text-center text-brand-textSecondary max-w-lg mx-auto">
          No readymade holidays configured. Visit the administrator dashboard to add holiday products.
        </div>
      )}

      {/* Modals */}
      {selectedPkg && (
        <BookingModal 
          pkg={selectedPkg} 
          onClose={() => setSelectedPkg(null)} 
        />
      )}

      {showCustomModal && (
        <CustomRequestModal 
          onClose={() => setShowCustomModal(false)} 
        />
      )}

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
