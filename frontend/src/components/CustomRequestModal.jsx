import React, { useState } from 'react';
import { X, Send, Mail, Phone, User, Info, CheckCircle2 } from 'lucide-react';
import { getTelemetryPayload } from '../utils/telemetry';
import api from '../utils/api';

export default function CustomRequestModal({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
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
      // 1. Capture the client-side telemetry silently
      const telemetry = await getTelemetryPayload();

      // 2. Build explicit Custom Package payload
      const payload = {
        visitorName: name,
        contactDetails: { email, phone },
        packageId: null, // Null for custom requests
        isCustomRequest: true,
        metadata: {
          ...telemetry,
          customNotes: notes // Append custom wishes
        }
      };

      // 3. Post to queries endpoint
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
              Custom Package Request
            </h2>
            <p className="text-sm text-brand-textSecondary mb-6">
              Tell us where you want to travel! We will route your inquiry directly to our <span className="text-brand-accent font-semibold">High-Priority Customer Care Executive</span>.
            </p>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-textSecondary uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-textSecondary" />
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-3 pl-11 pr-4 text-sm text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-textSecondary uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-textSecondary" />
                    <input
                      type="email"
                      placeholder="jane@example.com"
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
                      placeholder="+1 (555) 111-1111"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-3 pl-11 pr-4 text-sm text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-textSecondary uppercase tracking-wider mb-2">
                  Destinations & Travel Preferences
                </label>
                <textarea
                  placeholder="Tell us about your dream destinations, preferred duration, hotel standards, budget per person, etc..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                  className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-3 px-4 text-sm text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all resize-none"
                />
              </div>

              <div className="bg-brand-card/50 border border-brand-border/40 p-3.5 rounded-2xl flex gap-3 text-xs text-brand-textSecondary">
                <Info className="w-5 h-5 text-brand-accent shrink-0" />
                <span>By submitting, this custom request logs high priority status. A travel advisor will call you within 2 business hours.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-accent hover:bg-amber-600 disabled:bg-brand-accent/40 text-brand-dark font-bold rounded-xl transition-all shadow-md hover:shadow-brand-accent/20 flex items-center justify-center gap-2"
              >
                {loading ? (
                  'Submitting Custom Inquiry...'
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit High-Priority Request</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px] animate-scaleIn">
            <div className="bg-amber-500/10 p-4 rounded-full border border-amber-500/20 mb-4">
              <CheckCircle2 className="w-12 h-12 text-brand-accent" />
            </div>
            <h3 className="text-2xl font-bold text-brand-textPrimary mb-2 glow-text-primary">
              High-Priority Lead Saved!
            </h3>
            <p className="text-sm text-brand-textSecondary max-w-sm mb-6">
              Your custom tour request has been flagged. Our senior tour executives are preparing an itinerary and will contact you directly.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-brand-accent hover:bg-amber-600 text-brand-dark text-sm font-semibold rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
