import React, { useState, useEffect, useContext } from 'react';
import { Search, SlidersHorizontal, RefreshCw, Sparkles } from 'lucide-react';
import api from '../utils/api';
import PackageCard from '../components/PackageCard';
import BookingModal from '../components/BookingModal';
import PackageDetailModal from '../components/PackageDetailModal';
import CustomRequestModal from '../components/CustomRequestModal';
import AuthModal from '../components/AuthModal';
import { AuthContext } from '../context/AuthContext';
import { switchActiveCategory } from '../utils/telemetry';

export default function Catalog() {
  const { user } = useContext(AuthContext);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtering states
  const [destFilter, setDestFilter] = useState('');
  const [maxPrice, setMaxPrice] = useState(250000);
  const [durationFilter, setDurationFilter] = useState('');
  
  // Modals
  const [detailPkg, setDetailPkg] = useState(null);
  const [bookingPkg, setBookingPkg] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({ travelers: 1, totalPrice: 0 });
  const [showCustomModal, setShowCustomModal] = useState(false);

  const handleProceedBook = (members, totalPrice) => {
    setBookingDetails({ travelers: members, totalPrice });
    setBookingPkg(detailPkg);
    setDetailPkg(null);
  };

  const handleOpenDetailModal = (pkg) => {
    if (user) {
      setDetailPkg(pkg);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleOpenCustomModal = () => {
    if (user) {
      setShowCustomModal(true);
    } else {
      setShowAuthModal(true);
    }
  };

  // Fetch packages on filter changes
  useEffect(() => {
    async function fetchPackages() {
      try {
        setLoading(true);
        setError('');
        
        // Build query string
        const params = {};
        if (destFilter) {
          params.destination = destFilter;
          // Telemetry hook: Log user's active search interest
          switchActiveCategory(destFilter);
        }
        if (maxPrice) params.maxPrice = maxPrice;
        if (durationFilter) params.duration = durationFilter;

        const res = await api.get('/packages', { params });
        setPackages(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load packages. Please check your connection.');
      } finally {
        setLoading(false);
      }
    }

    // Debounce search/filter calls slightly
    const delayDebounce = setTimeout(() => {
      fetchPackages();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [destFilter, maxPrice, durationFilter]);

  const handleResetFilters = () => {
    setDestFilter('');
    setMaxPrice(250000);
    setDurationFilter('');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-textPrimary mb-2 glow-text-primary">
            Explore Tour Catalog
          </h1>
          <p className="text-brand-textSecondary text-sm max-w-lg">
            Browse through our customizable adventure blueprints. Can't find the exact fit? Simply request a bespoke itinerary.
          </p>
        </div>

        <button
          onClick={handleOpenCustomModal}
          className="px-6 py-3.5 bg-brand-accent hover:bg-amber-600 text-brand-dark font-extrabold rounded-xl transition-all shadow-md hover:shadow-brand-accent/20 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Request Custom Package</span>
        </button>
      </div>

      {/* Filter and Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border/40">
              <span className="flex items-center gap-2 font-bold text-brand-textPrimary">
                <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
                <span>Filters</span>
              </span>
              <button 
                onClick={handleResetFilters}
                className="text-xs text-brand-secondary hover:text-brand-secondaryHover flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Destination Search */}
            <div>
              <label className="block text-xs font-semibold text-brand-textSecondary uppercase tracking-wider mb-2">
                Destination
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-textSecondary" />
                <input
                  type="text"
                  placeholder="e.g. Bali, Japan"
                  value={destFilter}
                  onChange={(e) => setDestFilter(e.target.value)}
                  className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 pl-10 pr-4 text-sm text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            {/* Max Budget Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-brand-textSecondary uppercase tracking-wider">
                  Max Budget
                </label>
                <span className="text-sm font-bold text-brand-secondary">₹{maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="300000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-secondary"
              />
            </div>

            {/* Duration Select */}
            <div>
              <label className="block text-xs font-semibold text-brand-textSecondary uppercase tracking-wider mb-2">
                Duration
              </label>
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-4 text-sm text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
              >
                <option value="">Any Duration</option>
                <option value="4 Days">4 Days / 3 Nights</option>
                <option value="5 Days">5 Days / 4 Nights</option>
                <option value="6 Days">6 Days / 5 Nights</option>
                <option value="7 Days">7 Days / 6 Nights</option>
                <option value="8 Days">8 Days / 7 Nights</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="glass-panel p-12 rounded-2xl text-center text-rose-300">
              {error}
            </div>
          ) : packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {packages.map((pkg) => (
                <PackageCard 
                  key={pkg._id} 
                  pkg={pkg} 
                  onBook={handleOpenDetailModal} 
                />
              ))}
            </div>
          ) : (
            <div className="glass-panel p-16 rounded-2xl text-center text-brand-textSecondary max-w-lg mx-auto">
              No tour packages found matching your current filter settings. Try relaxing your filters or requesting a custom booking.
            </div>
          )}
        </div>
      </div>

      {/* Book Modals */}
      {detailPkg && (
        <PackageDetailModal
          pkg={detailPkg}
          onClose={() => setDetailPkg(null)}
          onProceedBook={handleProceedBook}
        />
      )}

      {bookingPkg && (
        <BookingModal 
          pkg={bookingPkg}
          initialTravelers={bookingDetails.travelers}
          totalPrice={bookingDetails.totalPrice}
          onClose={() => setBookingPkg(null)} 
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
