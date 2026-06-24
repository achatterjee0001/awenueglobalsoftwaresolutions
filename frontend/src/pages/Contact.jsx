import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import api from '../utils/api';
import { getTelemetryPayload } from '../utils/telemetry';
import { useSettings } from '../context/SettingsContext';

export default function Contact() {
  const { settings, loading } = useSettings();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  const [loadingForm, setLoadingForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      setErrorMsg('Please fill in all form fields.');
      return;
    }

    setLoadingForm(true);
    setErrorMsg('');

    try {
      const telemetry = await getTelemetryPayload();
      const payload = {
        visitorName: name,
        contactDetails: { email, phone },
        packageId: null,
        isCustomRequest: true, // Flags custom query
        metadata: {
          ...telemetry,
          customNotes: `Direct Contact Form Message: ${message}`
        }
      };

      const res = await api.post('/queries', payload);
      if (res.data.success) {
        setSuccess(true);
      } else {
        setErrorMsg(res.data.message || 'Failed to submit message.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error submitting form. Please check your connection.');
    } finally {
      setLoadingForm(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSuccess(false);
    setErrorMsg('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      
      {/* Header */}
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold text-brand-textPrimary mb-2 glow-text-primary">
          Contact Our Team
        </h1>
        <p className="text-brand-textSecondary text-sm">
          Have questions about a holiday package or want to customize an itinerary? Reach out directly, and our agents will respond shortly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Info Column (2/5) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-brand-border/40 space-y-6">
            <h3 className="text-lg font-bold text-brand-textPrimary">Contact Details</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <div className="bg-brand-primary/10 border border-brand-primary/20 p-2.5 rounded-xl text-brand-primary h-fit">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-brand-textSecondary block uppercase font-bold">Call Us</span>
                  <span className="text-brand-textPrimary font-semibold">{settings.phoneNumber}</span>
                  {settings.phoneFallbackNumber && (
                    <span className="text-brand-textSecondary block text-xs">{settings.phoneFallbackNumber}</span>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-brand-secondary/10 border border-brand-secondary/20 p-2.5 rounded-xl text-brand-secondary h-fit">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-brand-textSecondary block uppercase font-bold">Email Us</span>
                  <a href={`mailto:${settings.emailAddress}`} className="text-brand-textPrimary font-semibold hover:text-brand-primary transition-colors">
                    {settings.emailAddress}
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-brand-accent/10 border border-brand-accent/20 p-2.5 rounded-xl text-brand-accent h-fit">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-brand-textSecondary block uppercase font-bold">Headquarters</span>
                  <span className="text-brand-textPrimary font-semibold leading-relaxed whitespace-pre-line">
                    {settings.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-brand-border/40 space-y-4">
            <h3 className="text-sm font-bold text-brand-textPrimary">Follow Us</h3>
            <div className="flex flex-wrap gap-3">
              {settings.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-brand-surface border border-brand-border/60 hover:text-white text-xs font-semibold rounded-xl transition-all">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>Instagram</span>
                </a>
              )}
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-brand-surface hover:bg-brand-primary border border-brand-border/60 hover:text-white text-xs font-semibold rounded-xl transition-all">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span>Facebook</span>
                </a>
              )}
              {settings.whatsappUrl && (
                <a href={settings.whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-brand-surface hover:bg-emerald-600 border border-brand-border/60 hover:text-white text-xs font-semibold rounded-xl transition-all">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Message Form (3/5) */}
        <div className="lg:col-span-3">
          <div className="glass-panel p-8 rounded-3xl border border-brand-border/60 shadow-xl">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-bold text-brand-textPrimary mb-2">Send a Quick Message</h3>
                
                {errorMsg && (
                  <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-brand-textSecondary uppercase mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-3 px-4 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-brand-textSecondary uppercase mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-3 px-4 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-brand-textSecondary uppercase mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-3 px-4 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-brand-textSecondary uppercase mb-1.5">Message / Inquiry Details</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Describe your tour customization requests, destinations of interest, travel dates..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-3 px-4 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingForm}
                  className="w-full py-3.5 bg-brand-primary hover:bg-brand-primaryHover disabled:bg-brand-primary/40 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-brand-primary/20 flex items-center justify-center gap-2 text-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>{loadingForm ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8 flex flex-col items-center justify-center min-h-[300px]">
                <CheckCircle className="w-12 h-12 text-brand-secondary mb-4" />
                <h3 className="text-2xl font-bold text-brand-textPrimary mb-2 glow-text-secondary">Message Sent!</h3>
                <p className="text-sm text-brand-textSecondary max-w-sm mb-6">
                  Thank you for contacting Avenue Global T&T. We have logged your request and our travel managers are review it now.
                </p>
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-brand-secondary hover:bg-brand-secondaryHover text-white text-xs font-bold rounded-xl transition-all"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
