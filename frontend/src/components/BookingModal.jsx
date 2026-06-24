import React, { useState } from 'react';
import { X, Calendar, Users, Mail, Phone, User, CheckCircle2 } from 'lucide-react';
import { getTelemetryPayload } from '../utils/telemetry';
import api from '../utils/api';

export default function BookingModal({ pkg, onClose, initialTravelers = 1, totalPrice = 0 }) {
  const [step, setStep] = useState(1);
  const [travelers, setTravelers] = useState(initialTravelers);
  const [travelDate, setTravelDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setErrorMsg('Please fill in all contact fields.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Silently gather client-side telemetry metadata
      const telemetry = await getTelemetryPayload();

      // 2. Prepare payload bundling booking specifications and telemetry
      const payload = {
        visitorName: name,
        contactDetails: { email, phone },
        packageId: pkg._id,
        isCustomRequest: false,
        metadata: {
          ...telemetry,
          // Append explicit booking preferences
          bookingDetails: {
            travelers,
            travelDate,
            totalPrice: totalPrice || pkg.price * travelers
          }
        }
      };

      // 3. Dispatch to API
      const res = await api.post('/queries', payload);

      if (res.data.success) {
        setSuccess(true);
      } else {
        setErrorMsg(res.data.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-lg rounded-3xl overflow-hidden relative shadow-2xl border border-brand-border/60">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 text-brand-textSecondary hover:text-brand-textPrimary hover:bg-brand-card/50 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        {!success ? (
          <div className="p-8">
            <h2 className="text-2xl font-extrabold text-brand-textPrimary mb-2 glow-text-primary">
              Book Your Adventure
            </h2>
            <p className="text-sm text-brand-textSecondary mb-6">
              Selected Package: <span className="text-brand-secondary font-semibold">{pkg.title}</span>
              {totalPrice > 0 && (
                <span className="block mt-1">Total Estimated Price: <span className="text-brand-primary">₹{totalPrice.toLocaleString()}</span></span>
              )}
            </p>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs">
                {errorMsg}
              </div>
            )}

            {/* Steps Visual Tracker */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-brand-primary' : 'bg-brand-border'}`} />
              <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-brand-primary' : 'bg-brand-border'}`} />
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Trip Configurator */}
              {step === 1 && (
                <div className="space-y-4 animate-slideIn">
                  <div>
                    <label className="block text-xs font-semibold text-brand-textSecondary uppercase tracking-wider mb-2">
                      Number of Travelers
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-textSecondary" />
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={travelers}
                          onChange={(e) => setTravelers(e.target.value)}
                          className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-3 pl-11 pr-4 text-sm text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-textSecondary uppercase tracking-wider mb-2">
                      Preferred Travel Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-textSecondary" />
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        required
                        className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-3 pl-11 pr-4 text-sm text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full py-3 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold rounded-xl transition-all shadow-md hover:shadow-brand-primary/20"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Form */}
              {step === 2 && (
                <div className="space-y-4 animate-slideIn">
                  <div>
                    <label className="block text-xs font-semibold text-brand-textSecondary uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-textSecondary" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-3 pl-11 pr-4 text-sm text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-textSecondary uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-textSecondary" />
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-3 pl-11 pr-4 text-sm text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-textSecondary uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-textSecondary" />
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-3 pl-11 pr-4 text-sm text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 bg-brand-card hover:bg-brand-card/85 text-brand-textPrimary font-semibold rounded-xl border border-brand-border/60 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-[2] py-3 bg-brand-secondary hover:bg-brand-secondaryHover disabled:bg-brand-secondary/40 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-brand-secondary/20"
                    >
                      {loading ? 'Submitting...' : 'Confirm Booking'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px] animate-scaleIn">
            <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-500/20 mb-4">
              <CheckCircle2 className="w-12 h-12 text-brand-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-brand-textPrimary mb-2 glow-text-secondary">
              Inquiry Submitted!
            </h3>
            <p className="text-sm text-brand-textSecondary max-w-sm mb-6">
              Thank you for choosing Avenue Global T&T. We have logged your request and a dedicated agent will get in touch with you shortly.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-brand-secondary hover:bg-brand-secondaryHover text-white text-sm font-semibold rounded-xl transition-all"
            >
              Back to Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
