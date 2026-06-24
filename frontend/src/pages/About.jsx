import React from 'react';
import { Compass, Award, Shield, UserCheck, Heart, Sparkles } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function About() {
  const { settings, loading } = useSettings();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      
      {/* Hero section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{settings.aboutHeroSubtitle}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-textPrimary tracking-tight mb-6 glow-text-primary">
          {settings.aboutHeroTitle}
        </h1>
        <p className="text-brand-textSecondary text-base md:text-lg leading-relaxed whitespace-pre-line">
          {settings.aboutDescription}
        </p>
      </div>

      {/* Grid: Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        <div className="glass-panel p-6 rounded-2xl border border-brand-border/40 text-center flex flex-col items-center">
          <div className="bg-brand-primary/10 border border-brand-primary/25 p-3.5 rounded-xl text-brand-primary mb-4 shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-brand-textPrimary mb-2">Infinite Destinations</h3>
          <p className="text-xs text-brand-textSecondary leading-relaxed">From the snow heights of Ladakh to exotic international hubs, our catalogs span the globe.</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-brand-border/40 text-center flex flex-col items-center">
          <div className="bg-brand-secondary/10 border border-brand-secondary/25 p-3.5 rounded-xl text-brand-secondary mb-4 shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-brand-textPrimary mb-2">Vetted Network</h3>
          <p className="text-xs text-brand-textSecondary leading-relaxed">We directly vet our hotels network, guides, and vehicles to guarantee security and class.</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-brand-border/40 text-center flex flex-col items-center">
          <div className="bg-brand-accent/10 border border-brand-accent/25 p-3.5 rounded-xl text-brand-accent mb-4 shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-brand-textPrimary mb-2">Secure Bookings</h3>
          <p className="text-xs text-brand-textSecondary leading-relaxed">Encrypted booking data pipelines and safe transactions are part of our guarantee.</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-brand-border/40 text-center flex flex-col items-center">
          <div className="bg-brand-primary/10 border border-brand-primary/25 p-3.5 rounded-xl text-brand-primary mb-4 shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-brand-textPrimary mb-2">Passionate Execution</h3>
          <p className="text-xs text-brand-textSecondary leading-relaxed">Our customer support is responsive 24/7 to solve your travel requirements dynamically.</p>
        </div>
      </div>

      {/* Corporate Info Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-brand-surface border border-brand-border/40 p-8 md:p-12 rounded-3xl">
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-textPrimary">{settings.aboutTrustTitle}</h2>
          <p className="text-sm text-brand-textSecondary leading-relaxed whitespace-pre-line">
            {settings.aboutTrustDescription1}
          </p>
          <p className="text-sm text-brand-textSecondary leading-relaxed whitespace-pre-line">
            {settings.aboutTrustDescription2}
          </p>
        </div>

        {/* Corporate stats */}
        <div className="grid grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl text-center">
            <span className="text-3xl md:text-4xl font-black text-brand-secondary block mb-1">10K+</span>
            <span className="text-xs text-brand-textSecondary font-semibold uppercase tracking-wider">Happy Travelers</span>
          </div>

          <div className="glass-panel p-6 rounded-2xl text-center">
            <span className="text-3xl md:text-4xl font-black text-brand-primary block mb-1">150+</span>
            <span className="text-xs text-brand-textSecondary font-semibold uppercase tracking-wider">Curated Tours</span>
          </div>

          <div className="glass-panel p-6 rounded-2xl text-center">
            <span className="text-3xl md:text-4xl font-black text-brand-accent block mb-1">45+</span>
            <span className="text-xs text-brand-textSecondary font-semibold uppercase tracking-wider">Network Hotels</span>
          </div>

          <div className="glass-panel p-6 rounded-2xl text-center">
            <span className="text-3xl md:text-4xl font-black text-brand-primary block mb-1">99.2%</span>
            <span className="text-xs text-brand-textSecondary font-semibold uppercase tracking-wider">Support Rating</span>
          </div>
        </div>
      </div>

    </div>
  );
}
