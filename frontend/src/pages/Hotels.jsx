import React, { useState, useEffect } from 'react';
import { MapPin, Star, Building, Wifi, Coffee, Compass, CheckCircle } from 'lucide-react';
import api from '../utils/api';
import { getTelemetryPayload } from '../utils/telemetry';

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Stay inquiry modal states
  const [inquireHotel, setInquireHotel] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nights, setNights] = useState(1);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    async function fetchHotels() {
      try {
        setLoading(true);
        setError('');
        const res = await api.get('/hotels');
        setHotels(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to retrieve our hotel networks. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchHotels();
  }, []);

  const handleInquireSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setSubmitError('Contact fields are required.');
      return;
    }

    setLoadingSubmit(true);
    setSubmitError('');

    try {
      const telemetry = await getTelemetryPayload();
      const payload = {
        visitorName: name,
        contactDetails: { email, phone },
        packageId: null, // Null since it's a hotel inquiry
        isCustomRequest: false,
        metadata: {
          ...telemetry,
          hotelInquiry: {
            hotelId: inquireHotel._id,
            hotelName: inquireHotel.name,
            nights
          }
        }
      };

      const res = await api.post('/queries', payload);
      if (res.data.success) {
        setSuccessSubmit(true);
      } else {
        setSubmitError(res.data.message || 'Failed to submit inquiry.');
      }
    } catch (err) {
      console.error(err);
      setSubmitError('Failed to dispatch inquiry. Please check your connection.');
    } finally {
      setLoadingSubmit(false);
    }
  };

  const closeInquiry = () => {
    setInquireHotel(null);
    setName('');
    setEmail('');
    setPhone('');
    setNights(1);
    setSuccessSubmit(false);
    setSubmitError('');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-brand-textPrimary mb-2 glow-text-primary">
          Our Verified Hotels Network
        </h1>
        <p className="text-brand-textSecondary text-sm max-w-xl">
          We partner with elite properties across prime Indian and international destinations, offering pre-negotiated club privileges and vetted safety standards.
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="glass-panel p-12 rounded-2xl text-center text-rose-300">
          {error}
        </div>
      ) : hotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <div key={hotel._id} className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col h-full border border-brand-border/40">
              {/* Hotel Photo */}
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={hotel.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-brand-surface/90 backdrop-blur-xs border border-brand-border/40 px-2 py-1 rounded-lg flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-brand-accent fill-brand-accent animate-pulse" />
                  <span className="text-xs font-bold text-brand-textPrimary">{hotel.rating}.0</span>
                </div>
              </div>

              {/* Hotel Specs */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-brand-textSecondary mb-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                  <span>{hotel.location}</span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-brand-textPrimary mb-2 leading-snug">{hotel.name}</h3>

                {/* Description */}
                <p className="text-sm text-brand-textSecondary mb-6 line-clamp-3 flex-grow">{hotel.description}</p>

                {/* Amenities pills */}
                {hotel.amenities && hotel.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                      <span key={idx} className="text-[10px] bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-semibold px-2 py-0.5 rounded-full uppercase">
                        {amenity}
                      </span>
                    ))}
                  </div>
                )}

                {/* Pricing & CTA */}
                <div className="flex justify-between items-center pt-4 border-t border-brand-border/40 mt-auto">
                  <div>
                    <span className="text-[10px] text-brand-textSecondary block uppercase">Club Rate</span>
                    <span className="text-lg font-extrabold text-brand-secondary">
                      ₹{hotel.pricePerNight.toLocaleString()} <span className="text-xs font-medium text-brand-textSecondary">/ night</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setInquireHotel(hotel)}
                    className="px-4 py-2 bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-semibold rounded-lg transition-all"
                  >
                    Inquire Stay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel p-16 rounded-2xl text-center text-brand-textSecondary max-w-lg mx-auto">
          No network hotels registered. Open the admin console to add verified properties.
        </div>
      )}

      {/* STAY INQUIRY MODAL */}
      {inquireHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md rounded-2xl overflow-hidden relative shadow-2xl border border-brand-border">
            {!successSubmit ? (
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-textPrimary mb-1">Hotel Booking Inquiry</h3>
                <p className="text-xs text-brand-textSecondary mb-4">
                  Request exclusive club rates for: <span className="text-brand-secondary font-semibold">{inquireHotel.name}</span>
                </p>

                {submitError && (
                  <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-xs">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleInquireSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-brand-textSecondary uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-brand-textSecondary uppercase mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-brand-textSecondary uppercase mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-brand-textSecondary uppercase mb-1">Number of Nights</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      required
                      value={nights}
                      onChange={(e) => setNights(e.target.value)}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={loadingSubmit}
                      className="flex-1 py-2.5 bg-brand-secondary hover:bg-brand-secondaryHover disabled:bg-brand-secondary/40 text-white text-xs font-bold rounded-xl transition-all"
                    >
                      {loadingSubmit ? 'Sending...' : 'Send Inquiry'}
                    </button>
                    <button
                      type="button"
                      onClick={closeInquiry}
                      className="px-4 py-2.5 bg-brand-card hover:bg-brand-card/85 text-brand-textPrimary border border-brand-border text-xs rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-6 text-center flex flex-col items-center justify-center min-h-[250px]">
                <CheckCircle className="w-12 h-12 text-brand-secondary mb-3" />
                <h3 className="text-lg font-bold text-brand-textPrimary mb-1">Inquiry Dispatched!</h3>
                <p className="text-xs text-brand-textSecondary max-w-xs mb-6">
                  Your corporate privilege stay request has been submitted. A reservation assistant will contact you within 2 hours.
                </p>
                <button
                  onClick={closeInquiry}
                  className="px-6 py-2 bg-brand-secondary hover:bg-brand-secondaryHover text-white text-xs font-bold rounded-lg transition-all"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
