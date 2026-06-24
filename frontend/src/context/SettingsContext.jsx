import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const SettingsContext = createContext(null);

export const DEFAULT_SETTINGS = {
  aboutHeroTitle: 'Our Journey, Your Adventure',
  aboutHeroSubtitle: 'A Legacy of Exploration',
  aboutDescription: 'At Avenue Global T&T, we believe travel is not just about visiting new coordinates—it is about creating customized memories that endure a lifetime. Since our founding, we have curated bespoke expeditions across India and globally.',
  aboutTrustTitle: 'A Brand You Can Trust',
  aboutTrustDescription1: 'Avenue Global T&T was born out of a desire to simplify travel. We recognized that generic travel itineraries fail to satisfy modern travelers. That is why we developed a customizable ecosystem, combining standard holiday templates with our smart recommendation engine to customize tour plans to your exact interest footprint.',
  aboutTrustDescription2: 'Whether you are booking a corporate stay at our Taj hotels partner network, taking a custom bike run through Kashmir, or setting up a family beach holiday in Goa, our team operates with elite precision to guarantee a premium experience.',
  phoneNumber: '+91 98765 43210',
  phoneFallbackNumber: '+91 12345 67890',
  emailAddress: 'info@avenueglobaltravels.com',
  address: 'Block A, Connaught Place, New Delhi, 110001, India',
  instagramUrl: 'https://instagram.com',
  facebookUrl: 'https://facebook.com',
  whatsappUrl: 'https://wa.me/919876543210',
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/settings');
      if (res.data) {
        setSettings(res.data);
      }
    } catch (err) {
      console.error('Error fetching settings from API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const refreshSettings = async () => {
    await fetchSettings();
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
