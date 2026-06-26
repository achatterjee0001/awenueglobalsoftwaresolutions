import React, { useState, useEffect } from 'react';
import { Compass, Users, MapPin, Eye, Trash2, Edit, Plus, FolderHeart, Calendar, Laptop, Star, Clock, AlertTriangle, ShieldCheck, ShieldAlert, Hotel as HotelIcon, Settings as SettingsIcon } from 'lucide-react';
import api from '../utils/api';
import { useSettings } from '../context/SettingsContext';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('queries'); // 'queries' | 'tours' | 'holidays' | 'hotels' | 'settings'
  const [queries, setQueries] = useState([]);
  const [packages, setPackages] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Settings tab form states
  const { settings: globalSettings, refreshSettings } = useSettings();
  const [settingsFormData, setSettingsFormData] = useState({
    aboutHeroTitle: '',
    aboutHeroSubtitle: '',
    aboutDescription: '',
    aboutTrustTitle: '',
    aboutTrustDescription1: '',
    aboutTrustDescription2: '',
    phoneNumber: '',
    phoneFallbackNumber: '',
    emailAddress: '',
    address: '',
    instagramUrl: '',
    facebookUrl: '',
    whatsappUrl: '',
  });

  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState('');
  const [settingsError, setSettingsError] = useState('');

  // Synchronize settings form with context state
  useEffect(() => {
    if (globalSettings) {
      setSettingsFormData({
        aboutHeroTitle: globalSettings.aboutHeroTitle || '',
        aboutHeroSubtitle: globalSettings.aboutHeroSubtitle || '',
        aboutDescription: globalSettings.aboutDescription || '',
        aboutTrustTitle: globalSettings.aboutTrustTitle || '',
        aboutTrustDescription1: globalSettings.aboutTrustDescription1 || '',
        aboutTrustDescription2: globalSettings.aboutTrustDescription2 || '',
        phoneNumber: globalSettings.phoneNumber || '',
        phoneFallbackNumber: globalSettings.phoneFallbackNumber || '',
        emailAddress: globalSettings.emailAddress || '',
        address: globalSettings.address || '',
        instagramUrl: globalSettings.instagramUrl || '',
        facebookUrl: globalSettings.facebookUrl || '',
        whatsappUrl: globalSettings.whatsappUrl || '',
      });
    }
  }, [globalSettings]);

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsSuccess('');
    setSettingsError('');
    try {
      await api.put('/settings', settingsFormData);
      await refreshSettings();
      setSettingsSuccess('Site settings updated successfully!');
      setTimeout(() => setSettingsSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setSettingsError('Failed to update site settings.');
    } finally {
      setSavingSettings(false);
    }
  };

  // CRUD Package states
  const [editingPkg, setEditingPkg] = useState(null);
  const [showPkgForm, setShowPkgForm] = useState(false);
  const [pkgFormData, setPkgFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    destination: '',
    category: 'Tour',
    imageUrl: '',
    itinerary: [],
    highlights: '',
    bookingPolicy: '',
    cancellationPolicy: '',
    durationOptions: []
  });

  // CRUD Hotel states
  const [editingHotel, setEditingHotel] = useState(null);
  const [showHotelForm, setShowHotelForm] = useState(false);
  const [hotelFormData, setHotelFormData] = useState({
    name: '',
    location: '',
    description: '',
    pricePerNight: '',
    rating: '5',
    imageUrl: '',
    amenities: ''
  });

  // Selected telemetry lead detail
  const [selectedLead, setSelectedLead] = useState(null);

  // CRUD Slide states
  const [slides, setSlides] = useState([]);
  const [editingSlide, setEditingSlide] = useState(null);
  const [showSlideForm, setShowSlideForm] = useState(false);
  const [slideFormData, setSlideFormData] = useState({
    title: '',
    subtitle: '',
    image: '',
    destination: '',
    link: '/catalog',
    order: '0'
  });
  // Admin Invite Dual-OTP States
  const [inviteStep, setInviteStep] = useState(1);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [adminOtp, setAdminOtp] = useState('');
  const [inviteeOtp, setInviteeOtp] = useState('');
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteMsg, setInviteMsg] = useState('');
  const [inviteError, setInviteError] = useState('');

  // User Management States
  const [users, setUsers] = useState([]);
  const [usersSummary, setUsersSummary] = useState({ total: 0, admins: 0, users: 0 });
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    isVerified: true
  });

  const handleInviteInitiate = async (e) => {
    e.preventDefault();
    setInviteLoading(true);
    setInviteMsg('');
    setInviteError('');
    try {
      const res = await api.post('/auth/admin/invite', { newAdminEmail });
      if (res.data.success) {
        setInviteStep(2);
        setInviteMsg(res.data.message);
      }
    } catch (err) {
      setInviteError(err.response?.data?.message || 'Failed to initiate admin invite.');
    } finally {
      setInviteLoading(false);
    }
  };

  const handleInviteVerify = async (e) => {
    e.preventDefault();
    setInviteLoading(true);
    setInviteMsg('');
    setInviteError('');
    try {
      const res = await api.post('/auth/admin/verify-invite', { newAdminEmail, adminOtp, inviteeOtp });
      if (res.data.success) {
        setInviteStep(1);
        setNewAdminEmail('');
        setAdminOtp('');
        setInviteeOtp('');
        setInviteMsg(res.data.message);
      }
    } catch (err) {
      setInviteError(err.response?.data?.message || 'Failed to verify admin invite.');
    } finally {
      setInviteLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [activeTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      if (activeTab === 'queries') {
        const res = await api.get('/queries');
        setQueries(res.data);
      } else if (activeTab === 'tours') {
        const res = await api.get('/packages', { params: { category: 'Tour' } });
        setPackages(res.data);
      } else if (activeTab === 'holidays') {
        const res = await api.get('/packages', { params: { category: 'Holiday' } });
        setPackages(res.data);
      } else if (activeTab === 'hotels') {
        const res = await api.get('/hotels');
        setHotels(res.data);
      } else if (activeTab === 'settings') {
        const res = await api.get('/slides');
        setSlides(res.data);
      } else if (activeTab === 'users') {
        const res = await api.get('/auth/users');
        if (res.data.success) {
          setUsers(res.data.users);
          setUsersSummary(res.data.summary);
        }
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch dashboard data. Please verify your administrator session.');
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PACKAGE CRUD HANDLERS
  // ==========================================
  const handleAddItineraryDay = () => {
    setPkgFormData({
      ...pkgFormData,
      itinerary: [...pkgFormData.itinerary, { day: pkgFormData.itinerary.length + 1, title: '', description: '' }]
    });
  };

  const handleUpdateItineraryDay = (index, field, value) => {
    const newItinerary = [...pkgFormData.itinerary];
    newItinerary[index][field] = value;
    setPkgFormData({ ...pkgFormData, itinerary: newItinerary });
  };

  const handleRemoveItineraryDay = (index) => {
    const newItinerary = pkgFormData.itinerary.filter((_, i) => i !== index);
    const renumbered = newItinerary.map((day, i) => ({ ...day, day: i + 1 }));
    setPkgFormData({ ...pkgFormData, itinerary: renumbered });
  };
  const handleOpenPkgCreate = () => {
    setEditingPkg(null);
    setPkgFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      destination: '',
      category: activeTab === 'holidays' ? 'Holiday' : 'Tour',
      imageUrl: '',
      itinerary: [],
      highlights: '',
      bookingPolicy: '',
      cancellationPolicy: '',
      durationOptions: []
    });
    setShowPkgForm(true);
  };

  const handleOpenPkgEdit = (pkg) => {
    setEditingPkg(pkg);
    setPkgFormData({
      title: pkg.title,
      description: pkg.description || '',
      price: pkg.price,
      duration: pkg.duration || '',
      destination: pkg.destination || '',
      category: pkg.category || 'Tour',
      imageUrl: pkg.imageUrl || '',
      itinerary: pkg.itinerary || [],
      highlights: pkg.highlights ? pkg.highlights.join('\n') : '',
      bookingPolicy: pkg.bookingPolicy || '',
      cancellationPolicy: pkg.cancellationPolicy || '',
      durationOptions: pkg.durationOptions || []
    });
    setShowPkgForm(true);
  };

  const handlePkgFormSubmit = async (e) => {
    e.preventDefault();
    if (!pkgFormData.title || (pkgFormData.price === '' && (!pkgFormData.durationOptions || pkgFormData.durationOptions.length === 0))) return;

    try {
      const payload = {
        ...pkgFormData,
        highlights: pkgFormData.highlights.split('\n').map(h => h.trim()).filter(Boolean)
      };

      if (editingPkg) {
        await api.put(`/packages/${editingPkg._id}`, payload);
      } else {
        await api.post('/packages', payload);
      }
      setShowPkgForm(false);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert('Error saving package data.');
    }
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this travel package?')) return;
    try {
      await api.delete(`/packages/${id}`);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert('Failed to delete package.');
    }
  };

  // ==========================================
  // HOTEL CRUD HANDLERS
  // ==========================================
  const handleOpenHotelCreate = () => {
    setEditingHotel(null);
    setHotelFormData({
      name: '',
      location: '',
      description: '',
      pricePerNight: '',
      rating: '5',
      imageUrl: '',
      amenities: ''
    });
    setShowHotelForm(true);
  };

  const handleOpenHotelEdit = (hotel) => {
    setEditingHotel(hotel);
    setHotelFormData({
      name: hotel.name,
      location: hotel.location,
      description: hotel.description || '',
      pricePerNight: hotel.pricePerNight,
      rating: hotel.rating.toString(),
      imageUrl: hotel.imageUrl || '',
      amenities: hotel.amenities ? hotel.amenities.join(', ') : ''
    });
    setShowHotelForm(true);
  };

  const handleHotelFormSubmit = async (e) => {
    e.preventDefault();
    if (!hotelFormData.name || !hotelFormData.location || !hotelFormData.pricePerNight) return;

    try {
      if (editingHotel) {
        await api.put(`/hotels/${editingHotel._id}`, hotelFormData);
      } else {
        await api.post('/hotels', hotelFormData);
      }
      setShowHotelForm(false);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert('Error saving hotel details.');
    }
  };

  const handleDeleteHotel = async (id) => {
    if (!window.confirm('Are you sure you want to remove this hotel listing?')) return;
    try {
      await api.delete(`/hotels/${id}`);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert('Failed to remove hotel listing.');
    }
  };

  // ==========================================
  // SLIDESHOW CRUD HANDLERS
  // ==========================================
  const handleOpenSlideCreate = () => {
    setEditingSlide(null);
    setSlideFormData({
      title: '',
      subtitle: '',
      image: '',
      destination: '',
      link: '/catalog',
      order: '0'
    });
    setShowSlideForm(true);
  };

  const handleOpenSlideEdit = (slide) => {
    setEditingSlide(slide);
    setSlideFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      image: slide.image,
      destination: slide.destination,
      link: slide.link || '/catalog',
      order: slide.order.toString()
    });
    setShowSlideForm(true);
  };

  const handleSlideFormSubmit = async (e) => {
    e.preventDefault();
    if (!slideFormData.title || !slideFormData.subtitle || !slideFormData.image || !slideFormData.destination) return;

    try {
      const payload = {
        ...slideFormData,
        order: Number(slideFormData.order) || 0
      };
      if (editingSlide) {
        await api.put(`/slides/${editingSlide._id}`, payload);
      } else {
        await api.post('/slides', payload);
      }
      setShowSlideForm(false);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert('Error saving slide details.');
    }
  };

  const handleDeleteSlide = async (id) => {
    if (!window.confirm('Are you sure you want to remove this slideshow slide?')) return;
    try {
      await api.delete(`/slides/${id}`);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert('Failed to delete slide.');
    }
  };

  // ==========================================
  // USER CRUD HANDLERS
  // ==========================================
  const handleOpenUserCreate = () => {
    setEditingUser(null);
    setUserFormData({
      name: '',
      email: '',
      password: '',
      role: 'user',
      isVerified: true
    });
    setShowUserForm(true);
  };

  const handleOpenUserEdit = (user) => {
    setEditingUser(user);
    setUserFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      isVerified: user.isVerified
    });
    setShowUserForm(true);
  };

  const handleUserFormSubmit = async (e) => {
    e.preventDefault();
    if (!userFormData.name || !userFormData.email) return;
    if (!editingUser && !userFormData.password) {
      alert('Password is required for new users.');
      return;
    }

    try {
      if (editingUser) {
        await api.put(`/auth/users/${editingUser._id}`, userFormData);
      } else {
        await api.post('/auth/users', userFormData);
      }
      setShowUserForm(false);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error saving user details.');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to remove this user account?')) return;
    try {
      const res = await api.delete(`/auth/users/${id}`);
      if (res.data.success) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete user.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-brand-border/40">
        <h1 className="text-3xl font-extrabold text-brand-textPrimary mb-1 flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-brand-secondary" />
          <span>Admin Control Panel</span>
        </h1>
        <p className="text-brand-textSecondary text-xs">
          Manage packages, catalog directories, hotel partnerships, and monitor incoming visitor telemetry files.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/25 text-rose-300 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Main Grid: Left Navigation Sidebar & Right Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side: Option List Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-5 rounded-2xl border border-brand-border/40 flex flex-col gap-2 shadow-lg">
            <span className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest px-3 mb-2 block">
              Control Centre
            </span>

            <button
              onClick={() => { setActiveTab('queries'); setShowPkgForm(false); setShowHotelForm(false); setShowSlideForm(false); setShowUserForm(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${activeTab === 'queries' ? 'bg-brand-primary text-white shadow-md' : 'text-brand-textSecondary hover:bg-brand-surface/40 hover:text-brand-textPrimary'}`}
            >
              <Laptop className="w-4 h-4 shrink-0" />
              <span>Leads Telemetry</span>
            </button>

            <button
              onClick={() => { setActiveTab('tours'); setShowPkgForm(false); setShowHotelForm(false); setShowSlideForm(false); setShowUserForm(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${activeTab === 'tours' ? 'bg-brand-primary text-white shadow-md' : 'text-brand-textSecondary hover:bg-brand-surface/40 hover:text-brand-textPrimary'}`}
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>Tours CRUD</span>
            </button>

            <button
              onClick={() => { setActiveTab('holidays'); setShowPkgForm(false); setShowHotelForm(false); setShowSlideForm(false); setShowUserForm(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${activeTab === 'holidays' ? 'bg-brand-primary text-white shadow-md' : 'text-brand-textSecondary hover:bg-brand-surface/40 hover:text-brand-textPrimary'}`}
            >
              <FolderHeart className="w-4 h-4 shrink-0" />
              <span>Holidays CRUD</span>
            </button>

            <button
              onClick={() => { setActiveTab('hotels'); setShowPkgForm(false); setShowHotelForm(false); setShowSlideForm(false); setShowUserForm(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${activeTab === 'hotels' ? 'bg-brand-primary text-white shadow-md' : 'text-brand-textSecondary hover:bg-brand-surface/40 hover:text-brand-textPrimary'}`}
            >
              <HotelIcon className="w-4 h-4 shrink-0" />
              <span>Hotels Network CRUD</span>
            </button>

            <button
              onClick={() => { setActiveTab('settings'); setShowPkgForm(false); setShowHotelForm(false); setShowSlideForm(false); setShowUserForm(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${activeTab === 'settings' ? 'bg-brand-primary text-white shadow-md' : 'text-brand-textSecondary hover:bg-brand-surface/40 hover:text-brand-textPrimary'}`}
            >
              <SettingsIcon className="w-4 h-4 shrink-0" />
              <span>Site Settings</span>
            </button>

            <button
              onClick={() => { setActiveTab('users'); setShowPkgForm(false); setShowHotelForm(false); setShowSlideForm(false); setShowUserForm(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${activeTab === 'users' ? 'bg-brand-primary text-white shadow-md' : 'text-brand-textSecondary hover:bg-brand-surface/40 hover:text-brand-textPrimary'}`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>Users Management</span>
            </button>
          </div>
        </div>

        {/* Right Side: Content Panel */}
        <div className="lg:col-span-3">

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : activeTab === 'queries' ? (
        /* ========================================================
           TAB 1: VISITOR LEADS TELEMETRY LISTING
           ======================================================== */
        <div className="space-y-6 animate-fadeIn">
          <div className="glass-panel rounded-2xl overflow-hidden border border-brand-border/60">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-brand-card/75 border-b border-brand-border/60 text-brand-textSecondary text-xs uppercase tracking-wider">
                    <th className="py-4 px-6">Visitor</th>
                    <th className="py-4 px-6">Contact info</th>
                    <th className="py-4 px-6">Target Reference</th>
                    <th className="py-4 px-6">Status / Lead Type</th>
                    <th className="py-4 px-6 text-center">Telemetry</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/40">
                  {queries.map((q) => (
                    <tr key={q._id} className="hover:bg-brand-card/30 transition-all">
                      <td className="py-4 px-6 font-bold text-brand-textPrimary">{q.visitorName}</td>
                      <td className="py-4 px-6 text-xs space-y-0.5">
                        <div className="text-brand-textSecondary">{q.contactDetails?.email}</div>
                        <div className="text-brand-secondary font-semibold">{q.contactDetails?.phone}</div>
                      </td>
                      <td className="py-4 px-6">
                        {q.isCustomRequest ? (
                          <span className="text-brand-accent text-xs font-bold bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/25">
                            Bespoke Custom Plan
                          </span>
                        ) : q.metadata?.hotelInquiry ? (
                          <span className="text-blue-400 text-xs font-bold bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/25 flex items-center gap-1 w-fit">
                            <HotelIcon className="w-3.5 h-3.5" />
                            <span>Hotel: {q.metadata.hotelInquiry.hotelName}</span>
                          </span>
                        ) : (
                          <div className="text-brand-textPrimary max-w-[200px] truncate font-medium">
                            {q.packageId?.title || 'Deleted Package'}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {q.isCustomRequest ? (
                          <span className="flex items-center gap-1 text-xs text-brand-accent font-semibold">
                            <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
                            <span>High Priority Executive routing</span>
                          </span>
                        ) : q.metadata?.hotelInquiry ? (
                          <span className="text-xs text-blue-400 font-semibold">
                            Hotel Network lead
                          </span>
                        ) : (
                          <span className="text-xs text-brand-secondary font-semibold">
                            {q.packageId?.category || 'Tour'} Booking lead
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => setSelectedLead(q)}
                          className="px-4 py-2 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary border border-brand-primary/25 text-xs font-bold rounded-lg transition-all inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Telemetry</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {queries.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-16 text-center text-brand-textSecondary text-xs">
                        No inquiries have been recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : activeTab === 'tours' || activeTab === 'holidays' ? (
        /* ========================================================
           TAB 2 & 3: TOURS & HOLIDAYS PACKAGE CRUD
           ======================================================== */
        <div className="space-y-6 animate-fadeIn">
          {/* Form */}
          {showPkgForm && (
            <div className="glass-panel p-6 rounded-2xl border border-brand-border/60 max-w-2xl">
              <h2 className="text-base font-extrabold text-brand-textPrimary mb-4">
                {editingPkg ? 'Edit Package Blueprint' : `Create New ${activeTab === 'tours' ? 'Tour' : 'Holiday'} Package`}
              </h2>
              <form onSubmit={handlePkgFormSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Package Title</label>
                    <input
                      type="text"
                      required
                      value={pkgFormData.title}
                      onChange={(e) => setPkgFormData({ ...pkgFormData, title: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Destination / Coordinates</label>
                    <input
                      type="text"
                      value={pkgFormData.destination}
                      onChange={(e) => setPkgFormData({ ...pkgFormData, destination: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>


                {/* Duration Options List Builder */}
                <div className="border border-brand-border/60 rounded-xl p-4 bg-brand-surface/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-bold text-brand-textSecondary uppercase">
                      Duration & Pricing Options (Price per 1 Person)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setPkgFormData({
                          ...pkgFormData,
                          durationOptions: [...(pkgFormData.durationOptions || []), { nights: 0, days: 1, price: 0 }]
                        });
                      }}
                      className="text-[10px] px-2.5 py-1 bg-brand-primary/20 text-brand-primary rounded hover:bg-brand-primary/30 transition-all font-bold"
                    >
                      + Add Option
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(pkgFormData.durationOptions || []).map((opt, index) => (
                      <div key={index} className="flex gap-3 items-center bg-brand-dark/30 p-3 rounded-lg border border-brand-border/40 text-xs">
                        <div className="grid grid-cols-3 gap-3 flex-1">
                          <div>
                            <label className="block text-[9px] text-brand-textSecondary uppercase mb-1">Nights</label>
                            <input
                              type="number"
                              required
                              min="0"
                              value={opt.nights}
                              onChange={(e) => {
                                const newOpts = [...pkgFormData.durationOptions];
                                newOpts[index].nights = parseInt(e.target.value) || 0;
                                setPkgFormData({ ...pkgFormData, durationOptions: newOpts });
                              }}
                              className="w-full bg-brand-dark/50 border border-brand-border/60 rounded py-1 px-2 text-xs text-brand-textPrimary focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] text-brand-textSecondary uppercase mb-1">Days</label>
                            <input
                              type="number"
                              required
                              min="1"
                              value={opt.days}
                              onChange={(e) => {
                                const newOpts = [...pkgFormData.durationOptions];
                                newOpts[index].days = parseInt(e.target.value) || 1;
                                setPkgFormData({ ...pkgFormData, durationOptions: newOpts });
                              }}
                              className="w-full bg-brand-dark/50 border border-brand-border/60 rounded py-1 px-2 text-xs text-brand-textPrimary focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] text-brand-textSecondary uppercase mb-1">Price per Person (₹)</label>
                            <input
                              type="number"
                              required
                              min="0"
                              value={opt.price}
                              onChange={(e) => {
                                const newOpts = [...pkgFormData.durationOptions];
                                newOpts[index].price = parseInt(e.target.value) || 0;
                                setPkgFormData({ ...pkgFormData, durationOptions: newOpts });
                              }}
                              className="w-full bg-brand-dark/50 border border-brand-border/60 rounded py-1 px-2 text-xs text-brand-textPrimary focus:outline-none"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newOpts = pkgFormData.durationOptions.filter((_, i) => i !== index);
                            setPkgFormData({ ...pkgFormData, durationOptions: newOpts });
                          }}
                          className="text-rose-400 hover:text-rose-300 p-1 bg-rose-500/10 rounded mt-4"
                          title="Remove Option"
                        >
                          <Trash2 className="w-3.5 h-3.5 animate-pulse" />
                        </button>
                      </div>
                    ))}
                    {(pkgFormData.durationOptions || []).length === 0 && (
                      <div className="text-center text-xs text-brand-textSecondary py-4">
                        No duration options configured. Click "+ Add Option" to add one.
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Product Category</label>
                    <select
                      value={pkgFormData.category}
                      onChange={(e) => setPkgFormData({ ...pkgFormData, category: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    >
                      <option value="Tour">Tour Blueprint</option>
                      <option value="Holiday">Holiday Package</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Image URL</label>
                  <input
                    type="text"
                    value={pkgFormData.imageUrl}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, imageUrl: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Description</label>
                  <textarea
                    rows="3"
                    value={pkgFormData.description}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, description: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Highlights (One per line)</label>
                  <textarea
                    rows="3"
                    placeholder="E.g. Visit the Eiffel Tower&#10;Wine tasting in Bordeaux"
                    value={pkgFormData.highlights}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, highlights: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Booking Policy</label>
                    <textarea
                      rows="3"
                      value={pkgFormData.bookingPolicy}
                      onChange={(e) => setPkgFormData({ ...pkgFormData, bookingPolicy: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Cancellation Policy</label>
                    <textarea
                      rows="3"
                      value={pkgFormData.cancellationPolicy}
                      onChange={(e) => setPkgFormData({ ...pkgFormData, cancellationPolicy: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Itinerary Builder */}
                <div className="border border-brand-border/60 rounded-xl p-4 bg-brand-surface/20">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-[10px] font-bold text-brand-textSecondary uppercase">Day-by-Day Itinerary</label>
                    <button
                      type="button"
                      onClick={handleAddItineraryDay}
                      className="text-[10px] px-2 py-1 bg-brand-primary/20 text-brand-primary rounded hover:bg-brand-primary/30 transition-all font-bold"
                    >
                      + Add Day
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {pkgFormData.itinerary.map((dayItem, index) => (
                      <div key={index} className="flex gap-2 items-start bg-brand-dark/30 p-3 rounded-lg border border-brand-border/40">
                        <div className="bg-brand-primary/20 text-brand-primary font-bold text-xs py-1 px-2 rounded">
                          D{dayItem.day}
                        </div>
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            placeholder="Day Title (e.g. Arrival in Paris)"
                            value={dayItem.title}
                            onChange={(e) => handleUpdateItineraryDay(index, 'title', e.target.value)}
                            className="w-full bg-brand-dark/50 border border-brand-border/60 rounded py-1.5 px-2 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                            required
                          />
                          <textarea
                            rows="2"
                            placeholder="Activities description..."
                            value={dayItem.description}
                            onChange={(e) => handleUpdateItineraryDay(index, 'description', e.target.value)}
                            className="w-full bg-brand-dark/50 border border-brand-border/60 rounded py-1.5 px-2 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all resize-none"
                            required
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItineraryDay(index)}
                          className="text-rose-400 hover:text-rose-300 p-1 bg-rose-500/10 rounded"
                          title="Remove Day"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {pkgFormData.itinerary.length === 0 && (
                      <div className="text-center text-xs text-brand-textSecondary py-4">
                        No days added to itinerary yet.
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-secondary hover:bg-brand-secondaryHover text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Save Package
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPkgForm(false)}
                    className="px-6 py-2.5 bg-brand-card hover:bg-brand-card/85 text-brand-textPrimary border border-brand-border/60 text-xs font-bold rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-brand-textPrimary uppercase tracking-wider">
              {activeTab === 'tours' ? 'Tours Directory' : 'Holidays Directory'} ({packages.length})
            </h2>
            {!showPkgForm && (
              <button
                onClick={handleOpenPkgCreate}
                className="px-4 py-2 bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Create Package</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((pkg) => (
              <div key={pkg._id} className="glass-panel p-5 rounded-2xl flex gap-4 border border-brand-border/40 hover:border-brand-primary/45 transition-colors">
                <img
                  src={pkg.imageUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'}
                  alt={pkg.title}
                  className="w-24 h-24 object-cover rounded-xl border border-brand-border/40 shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-brand-textPrimary truncate">{pkg.title}</h3>
                    <div className="text-[10px] text-brand-textSecondary mt-0.5 flex gap-2">
                      <span>{pkg.destination}</span>
                      <span>&bull;</span>
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="text-xs font-bold text-brand-secondary mt-1">₹{pkg.price.toLocaleString()}</div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleOpenPkgEdit(pkg)}
                      className="p-2 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary rounded-lg transition-all text-xs"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePackage(pkg._id)}
                      className="p-2 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 rounded-lg transition-all text-xs"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'hotels' ? (
        /* ========================================================
           TAB 4: HOTELS NETWORK CRUD
           ======================================================== */
        <div className="space-y-6 animate-fadeIn">
          {/* Form */}
          {showHotelForm && (
            <div className="glass-panel p-6 rounded-2xl border border-brand-border/60 max-w-2xl">
              <h2 className="text-base font-extrabold text-brand-textPrimary mb-4">
                {editingHotel ? 'Edit Hotel Details' : 'Register Network Hotel'}
              </h2>
              <form onSubmit={handleHotelFormSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Hotel Name</label>
                    <input
                      type="text"
                      required
                      value={hotelFormData.name}
                      onChange={(e) => setHotelFormData({ ...hotelFormData, name: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Location Address</label>
                    <input
                      type="text"
                      required
                      value={hotelFormData.location}
                      onChange={(e) => setHotelFormData({ ...hotelFormData, location: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Price Per Night (₹)</label>
                    <input
                      type="number"
                      required
                      value={hotelFormData.pricePerNight}
                      onChange={(e) => setHotelFormData({ ...hotelFormData, pricePerNight: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Rating Star Level</label>
                    <select
                      value={hotelFormData.rating}
                      onChange={(e) => setHotelFormData({ ...hotelFormData, rating: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    >
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Amenities (Comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. WiFi, Pool, Spa"
                      value={hotelFormData.amenities}
                      onChange={(e) => setHotelFormData({ ...hotelFormData, amenities: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Photo Image URL</label>
                  <input
                    type="text"
                    value={hotelFormData.imageUrl}
                    onChange={(e) => setHotelFormData({ ...hotelFormData, imageUrl: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Description Overview</label>
                  <textarea
                    rows="3"
                    value={hotelFormData.description}
                    onChange={(e) => setHotelFormData({ ...hotelFormData, description: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-secondary hover:bg-brand-secondaryHover text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Register Hotel
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowHotelForm(false)}
                    className="px-6 py-2.5 bg-brand-card hover:bg-brand-card/85 text-brand-textPrimary border border-brand-border/60 text-xs font-bold rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-brand-textPrimary uppercase tracking-wider">
              Network Hotel Listings ({hotels.length})
            </h2>
            {!showHotelForm && (
              <button
                onClick={handleOpenHotelCreate}
                className="px-4 py-2 bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Register Hotel</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotels.map((hotel) => (
              <div key={hotel._id} className="glass-panel p-5 rounded-2xl flex gap-4 border border-brand-border/40 hover:border-brand-primary/45 transition-colors">
                <img
                  src={hotel.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'}
                  alt={hotel.name}
                  className="w-24 h-24 object-cover rounded-xl border border-brand-border/40 shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-brand-textPrimary truncate">{hotel.name}</h3>
                    <div className="text-[10px] text-brand-textSecondary mt-0.5 flex gap-1 items-center">
                      <MapPin className="w-3 h-3 text-brand-secondary" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="text-xs font-bold text-brand-secondary mt-1">
                      ₹{hotel.pricePerNight.toLocaleString()} <span className="text-[10px] text-brand-textSecondary font-normal">/ night</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleOpenHotelEdit(hotel)}
                      className="p-2 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary rounded-lg transition-all text-xs"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteHotel(hotel._id)}
                      className="p-2 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 rounded-lg transition-all text-xs"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'settings' ? (
        <div className="glass-panel p-8 rounded-3xl border border-brand-border/40 animate-slideIn">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-brand-border/40">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-brand-primary" />
              <span>Site Settings & Customization</span>
            </h2>
          </div>

          {settingsSuccess && (
            <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 rounded-xl text-xs">
              {settingsSuccess}
            </div>
          )}

          {settingsError && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/25 text-rose-300 rounded-xl text-xs">
              {settingsError}
            </div>
          )}

          <form onSubmit={handleSettingsSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: About Page content */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-brand-secondary border-b border-brand-border/40 pb-2">About Section Contents</h3>
                
                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1.5 font-semibold">About Hero Title</label>
                  <input
                    type="text"
                    required
                    value={settingsFormData.aboutHeroTitle}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, aboutHeroTitle: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1.5 font-semibold">About Hero Subtitle</label>
                  <input
                    type="text"
                    required
                    value={settingsFormData.aboutHeroSubtitle}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, aboutHeroSubtitle: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1.5 font-semibold">Main Description</label>
                  <textarea
                    required
                    rows="4"
                    value={settingsFormData.aboutDescription}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, aboutDescription: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1.5 font-semibold">Brand Trust Title</label>
                  <input
                    type="text"
                    required
                    value={settingsFormData.aboutTrustTitle}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, aboutTrustTitle: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1.5 font-semibold">Trust Statement Part 1</label>
                  <textarea
                    required
                    rows="3"
                    value={settingsFormData.aboutTrustDescription1}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, aboutTrustDescription1: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1.5 font-semibold">Trust Statement Part 2</label>
                  <textarea
                    required
                    rows="3"
                    value={settingsFormData.aboutTrustDescription2}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, aboutTrustDescription2: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all resize-none"
                  />
                </div>
              </div>

              {/* Right Column: Contact Details & Social Links */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-brand-secondary border-b border-brand-border/40 pb-2">Contact Details & Social Links</h3>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1.5 font-semibold">Primary Phone Number</label>
                  <input
                    type="text"
                    required
                    value={settingsFormData.phoneNumber}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, phoneNumber: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1.5 font-semibold">Secondary Phone Number</label>
                  <input
                    type="text"
                    value={settingsFormData.phoneFallbackNumber}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, phoneFallbackNumber: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1.5 font-semibold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={settingsFormData.emailAddress}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, emailAddress: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1.5 font-semibold">Headquarters Address</label>
                  <textarea
                    required
                    rows="3"
                    value={settingsFormData.address}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, address: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1.5 font-semibold">Instagram URL</label>
                  <input
                    type="url"
                    value={settingsFormData.instagramUrl}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, instagramUrl: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1.5 font-semibold">Facebook URL</label>
                  <input
                    type="url"
                    value={settingsFormData.facebookUrl}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, facebookUrl: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1.5 font-semibold">WhatsApp URL (e.g. https://wa.me/919876543210)</label>
                  <input
                    type="url"
                    value={settingsFormData.whatsappUrl}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, whatsappUrl: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-brand-border/40">
              <button
                type="submit"
                disabled={savingSettings}
                className="px-6 py-3 bg-brand-accent hover:bg-amber-600 disabled:bg-brand-accent/40 text-brand-dark font-extrabold rounded-xl transition-all shadow-md hover:shadow-brand-accent/20 text-xs"
              >
                {savingSettings ? 'Saving Settings...' : 'Save Site Settings'}
              </button>
            </div>
          </form>



          {/* ========================================================
             SLIDESHOW CRUD (Merged into Site Settings)
             ======================================================== */}
          <div className="pt-12 mt-12 border-t border-brand-border/40">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                <Laptop className="w-5 h-5 text-brand-primary" />
              </div>
              <h2 className="text-xl font-extrabold text-brand-textPrimary tracking-tight">
                <span>Slideshow Configuration</span>
              </h2>
            </div>
            <div className="space-y-6 animate-fadeIn">
          {/* Form */}
          {showSlideForm && (
            <div className="glass-panel p-6 rounded-2xl border border-brand-border/60 max-w-2xl">
              <h2 className="text-base font-extrabold text-brand-textPrimary mb-4">
                {editingSlide ? 'Edit Slideshow Slide' : 'Create New Slideshow Slide'}
              </h2>
              <form onSubmit={handleSlideFormSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Slide Title *</label>
                    <input
                      type="text"
                      required
                      value={slideFormData.title}
                      onChange={(e) => setSlideFormData({ ...slideFormData, title: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Destination Tag *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Agra, India"
                      value={slideFormData.destination}
                      onChange={(e) => setSlideFormData({ ...slideFormData, destination: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Subtitle *</label>
                  <input
                    type="text"
                    required
                    value={slideFormData.subtitle}
                    onChange={(e) => setSlideFormData({ ...slideFormData, subtitle: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Redirect Link URL</label>
                    <input
                      type="text"
                      placeholder="e.g. /catalog?destination=Agra"
                      value={slideFormData.link}
                      onChange={(e) => setSlideFormData({ ...slideFormData, link: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Display Order (Sorting)</label>
                    <input
                      type="number"
                      required
                      value={slideFormData.order}
                      onChange={(e) => setSlideFormData({ ...slideFormData, order: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Photo Image URL *</label>
                  <input
                    type="text"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={slideFormData.image}
                    onChange={(e) => setSlideFormData({ ...slideFormData, image: e.target.value })}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-secondary hover:bg-brand-secondaryHover text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Save Slide
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSlideForm(false)}
                    className="px-6 py-2.5 bg-brand-card hover:bg-brand-card/85 text-brand-textPrimary border border-brand-border/60 text-xs font-bold rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-brand-textPrimary uppercase tracking-wider">
              Slideshow Background Directory ({slides.length})
            </h2>
            {!showSlideForm && (
              <button
                onClick={handleOpenSlideCreate}
                className="px-4 py-2 bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Create Slide</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {slides.map((slide) => (
              <div key={slide._id} className="glass-panel p-5 rounded-2xl flex gap-4 border border-brand-border/40 hover:border-brand-primary/45 transition-colors">
                <img
                  src={slide.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'}
                  alt={slide.title}
                  className="w-24 h-24 object-cover rounded-xl border border-brand-border/40 shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="text-sm font-bold text-brand-textPrimary truncate">{slide.title}</h3>
                      <span className="px-2 py-0.5 bg-brand-primary/20 text-brand-primary font-mono text-[9px] rounded font-bold shrink-0">
                        Order: {slide.order}
                      </span>
                    </div>
                    <p className="text-[10px] text-brand-textSecondary truncate mt-0.5">{slide.subtitle}</p>
                    <div className="text-[10px] text-brand-secondary font-semibold mt-1">
                      {slide.destination}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleOpenSlideEdit(slide)}
                      className="p-2 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary rounded-lg transition-all text-xs"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteSlide(slide._id)}
                      className="p-2 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 rounded-lg transition-all text-xs"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
        </div>
      ) : activeTab === 'users' ? (
        /* ========================================================
           TAB 6: USER MANAGEMENT CRUD
           ======================================================== */
        <div className="space-y-6 animate-fadeIn">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-brand-border/40 text-left">
              <span className="text-[10px] text-brand-textSecondary uppercase tracking-widest font-bold block mb-1">Total Registered Users</span>
              <span className="text-2xl font-extrabold text-brand-textPrimary">{usersSummary.total}</span>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-brand-border/40 text-left">
              <span className="text-[10px] text-brand-secondary uppercase tracking-widest font-bold block mb-1">Administrators</span>
              <span className="text-2xl font-extrabold text-brand-secondary">{usersSummary.admins}</span>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-brand-border/40 text-left">
              <span className="text-[10px] text-brand-primary uppercase tracking-widest font-bold block mb-1">Regular Users</span>
              <span className="text-2xl font-extrabold text-brand-primary">{usersSummary.users}</span>
            </div>
          </div>

          {/* Create/Edit User Form Box */}
          {showUserForm && (
            <div className="glass-panel p-6 rounded-2xl border border-brand-border/60 max-w-xl text-left">
              <h3 className="text-sm font-extrabold text-brand-textPrimary mb-4">
                {editingUser ? 'Modify User Profile' : 'Add New User'}
              </h3>
              <form onSubmit={handleUserFormSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={userFormData.name}
                      onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. jane@example.com"
                      value={userFormData.email}
                      onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">
                      {editingUser ? 'New Password (leave blank to keep current)' : 'Password'}
                    </label>
                    <input
                      type="password"
                      required={!editingUser}
                      placeholder={editingUser ? '••••••••' : 'Enter password'}
                      value={userFormData.password}
                      onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1">Account Role</label>
                    <select
                      value={userFormData.role}
                      onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    >
                      <option value="user">Regular User</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id="isVerified"
                    checked={userFormData.isVerified}
                    onChange={(e) => setUserFormData({ ...userFormData, isVerified: e.target.checked })}
                    className="w-4 h-4 rounded bg-brand-dark/50 border-brand-border/60 text-brand-primary focus:ring-0"
                  />
                  <label htmlFor="isVerified" className="text-xs text-brand-textSecondary select-none">
                    Mark email address as Verified / OTP complete
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-secondary hover:bg-brand-secondaryHover text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Save User
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUserForm(false)}
                    className="px-6 py-2.5 bg-brand-card hover:bg-brand-card/85 text-brand-textPrimary border border-brand-border/60 text-xs font-bold rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* User Directory List */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-brand-textPrimary uppercase tracking-wider">
              Registered Users Directory ({users.length})
            </h2>
            {!showUserForm && (
              <button
                onClick={handleOpenUserCreate}
                className="px-4 py-2 bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add User</span>
              </button>
            )}
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden border border-brand-border/60">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-brand-card/75 border-b border-brand-border/60 text-brand-textSecondary text-xs uppercase tracking-wider">
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Email Address</th>
                    <th className="py-4 px-6">Role</th>
                    <th className="py-4 px-6">Verification</th>
                    <th className="py-4 px-6">Provider</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/40">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-brand-card/30 transition-all">
                      <td className="py-4 px-6 font-bold text-brand-textPrimary">{u.name}</td>
                      <td className="py-4 px-6 text-xs text-brand-textSecondary">{u.email}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md border uppercase ${u.role === 'admin' ? 'text-brand-secondary bg-emerald-500/10 border-emerald-500/20' : 'text-brand-primary bg-indigo-500/10 border-indigo-500/20'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {u.isVerified ? (
                          <span className="text-xs text-brand-secondary font-semibold">Verified</span>
                        ) : (
                          <span className="text-xs text-brand-accent font-semibold">Pending OTP</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-xs font-mono uppercase text-brand-textSecondary">
                        {u.authProvider || 'local'}
                      </td>
                      <td className="py-4 px-6 text-center flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenUserEdit(u)}
                          className="p-2 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary rounded-lg transition-all text-xs"
                          title="Edit User"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="p-2 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 rounded-lg transition-all text-xs"
                          title="Delete User"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-16 text-center text-brand-textSecondary text-xs">
                        No users registered in database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ========================================================
             ADMIN ACCESS MANAGEMENT (DUAL-OTP)
             ======================================================== */}
          <div className="pt-12 mt-12 border-t border-brand-border/40">
            <div className="flex items-center gap-3 mb-8 text-left">
              <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 flex items-center justify-center border border-brand-secondary/20">
                <ShieldAlert className="w-5 h-5 text-brand-secondary" />
              </div>
              <h2 className="text-xl font-extrabold text-brand-textPrimary tracking-tight">
                <span>Admin Access Management</span>
              </h2>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl border border-brand-border/60 max-w-2xl text-left">
              <h3 className="text-sm font-bold text-brand-textPrimary mb-2">Invite New Administrator</h3>
              <p className="text-xs text-brand-textSecondary mb-6">
                Granting administrator access requires a secure 2-step verification. An OTP will be sent to your email, and a separate OTP will be sent to the invitee's email.
              </p>

              {inviteMsg && (
                <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-xl text-xs">
                  {inviteMsg}
                </div>
              )}
              {inviteError && (
                <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs">
                  {inviteError}
                </div>
              )}

              {inviteStep === 1 ? (
                <form onSubmit={handleInviteInitiate} className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-brand-textSecondary uppercase mb-1 font-bold">New Admin Email Address</label>
                    <input
                      type="email"
                      required
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                      placeholder="colleague@avenueglobal.com"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={inviteLoading}
                    className="px-6 py-2.5 bg-brand-secondary hover:bg-brand-secondaryHover disabled:bg-brand-secondary/40 text-brand-dark font-extrabold rounded-xl transition-all shadow-md text-xs"
                  >
                    {inviteLoading ? 'Sending Invites...' : 'Initiate Secure Invite'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleInviteVerify} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-brand-textSecondary uppercase mb-1 font-bold">Your OTP (Admin)</label>
                      <input
                        type="text"
                        required
                        maxLength="6"
                        value={adminOtp}
                        onChange={(e) => setAdminOtp(e.target.value)}
                        className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary text-center tracking-widest focus:outline-none focus:border-brand-primary transition-all"
                        placeholder="000000"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-brand-textSecondary uppercase mb-1 font-bold">Invitee's OTP</label>
                      <input
                        type="text"
                        required
                        maxLength="6"
                        value={inviteeOtp}
                        onChange={(e) => setInviteeOtp(e.target.value)}
                        className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary text-center tracking-widest focus:outline-none focus:border-brand-primary transition-all"
                        placeholder="000000"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={inviteLoading}
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/40 text-white font-extrabold rounded-xl transition-all shadow-md text-xs"
                    >
                      {inviteLoading ? 'Verifying...' : 'Verify & Grant Access'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setInviteStep(1); setInviteMsg(''); setInviteError(''); }}
                      className="px-6 py-2.5 bg-brand-surface hover:bg-brand-surface/80 border border-brand-border/60 text-brand-textPrimary font-bold rounded-xl transition-all text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : null}
        </div>
      </div>

      {/* ========================================================
         TELEMETRY LEAD DETAIL MODAL OVERLAY
         ======================================================== */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-xl rounded-3xl overflow-hidden relative shadow-2xl border border-brand-border">
            <div className="p-8 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-extrabold text-brand-textPrimary mb-4 flex items-center gap-2 border-b border-brand-border/40 pb-3">
                <FolderHeart className="w-5 h-5 text-brand-primary" />
                <span>Visitor Metadata File: {selectedLead.visitorName}</span>
              </h3>

              <div className="space-y-5 text-xs text-brand-textPrimary">
                {/* Section: Contact */}
                <div>
                  <h4 className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest mb-2">Lead Contact Info</h4>
                  <div className="bg-brand-dark/50 border border-brand-border/40 p-4 rounded-xl grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] text-brand-textSecondary block uppercase font-bold">Email</span>
                      <span className="font-semibold break-all">{selectedLead.contactDetails?.email}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-brand-textSecondary block uppercase font-bold">Phone</span>
                      <span className="text-brand-secondary font-bold">{selectedLead.contactDetails?.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Section: Geolocation */}
                <div>
                  <h4 className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest mb-2">Location Insights</h4>
                  <div className="bg-brand-dark/50 border border-brand-border/40 p-4 rounded-xl flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-brand-secondary shrink-0" />
                    <div>
                      <span className="font-bold text-xs">
                        {selectedLead.metadata?.location?.city || 'Unknown City'}, {selectedLead.metadata?.location?.country || 'Unknown Country'}
                      </span>
                      <div className="text-[10px] text-brand-textSecondary mt-0.5">
                        Latitude: {selectedLead.metadata?.location?.latitude?.toFixed(4) || 'N/A'} | Longitude: {selectedLead.metadata?.location?.longitude?.toFixed(4) || 'N/A'}
                        <span className="ml-2 px-1.5 py-0.5 bg-brand-primary/20 text-brand-primary font-mono text-[9px] rounded uppercase">
                          Source: {selectedLead.metadata?.location?.source || 'unknown'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Hotel stay details if present */}
                {/* Section: Package Booking Details if present */}
                {selectedLead.metadata?.bookingDetails && (
                  <div>
                    <h4 className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest mb-2">Package Booking Details</h4>
                    <div className="bg-brand-dark/50 border border-brand-border/40 p-4 rounded-xl grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] text-brand-textSecondary block uppercase font-bold">Travelers</span>
                        <span className="font-bold text-xs">{selectedLead.metadata.bookingDetails.travelers} travelers</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-brand-textSecondary block uppercase font-bold">Travel Date</span>
                        <span className="font-bold text-xs">{selectedLead.metadata.bookingDetails.travelDate || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-brand-textSecondary block uppercase font-bold">Custom Duration</span>
                        <span className="font-bold text-xs">
                          {selectedLead.metadata.bookingDetails.days !== undefined && selectedLead.metadata.bookingDetails.nights !== undefined
                            ? `${selectedLead.metadata.bookingDetails.nights} Nights / ${selectedLead.metadata.bookingDetails.days} Days`
                            : selectedLead.packageId?.duration || 'Default duration'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-brand-textSecondary block uppercase font-bold">Estimated Total</span>
                        <span className="font-bold text-xs text-brand-secondary">₹{selectedLead.metadata.bookingDetails.totalPrice?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedLead.metadata?.hotelInquiry && (
                  <div>
                    <h4 className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest mb-2">Hotel Stay Specifications</h4>
                    <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-blue-400 block uppercase font-bold">Target Hotel</span>
                        <span className="font-bold text-xs text-blue-300">{selectedLead.metadata.hotelInquiry.hotelName}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-blue-400 block uppercase font-bold">Requested Stays</span>
                        <span className="font-bold text-xs text-brand-secondary">{selectedLead.metadata.hotelInquiry.nights} nights</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section: Browser Data */}
                <div>
                  <h4 className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest mb-2">Device & Environment</h4>
                  <div className="bg-brand-dark/50 border border-brand-border/40 p-4 rounded-xl flex items-center gap-3">
                    <Laptop className="w-5 h-5 text-brand-primary shrink-0" />
                    <div className="font-mono text-[10px] break-all leading-normal">
                      {selectedLead.metadata?.browserData || 'Unknown Environment Details'}
                    </div>
                  </div>
                </div>

                {/* Section: Algorithmic Metrics */}
                <div>
                  <h4 className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest mb-2">Algorithmic Interest Insights</h4>
                  <div className="bg-brand-dark/50 border border-brand-border/40 p-4 rounded-xl space-y-3">
                    <div className="flex justify-between">
                      <span className="text-brand-textSecondary font-semibold">Active Session Duration:</span>
                      <span className="font-mono font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-primary" />
                        {((selectedLead.metadata?.sessionDurationMs || 0) / 1000).toFixed(1)} seconds
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] text-brand-textSecondary block uppercase font-bold mb-1.5">Inferred Categories/Destinations Viewed</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedLead.metadata?.inferredPreferences && selectedLead.metadata.inferredPreferences.length > 0 ? (
                          selectedLead.metadata.inferredPreferences.map((pref, i) => (
                            <span key={i} className="text-[10px] bg-brand-secondary/15 border border-brand-secondary/25 text-brand-secondary px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold">
                              <Star className="w-3 h-3 fill-brand-secondary" />
                              <span>{pref}</span>
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-brand-textSecondary italic">No pages recorded prior to submit.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Custom Notes */}
                {selectedLead.metadata?.customNotes && (
                  <div>
                    <h4 className="text-[10px] font-bold text-brand-textSecondary uppercase tracking-widest mb-2">Custom Query Notes</h4>
                    <div className="bg-brand-dark/50 border border-brand-border/40 p-4 rounded-xl text-xs italic leading-relaxed">
                      "{selectedLead.metadata.customNotes}"
                    </div>
                  </div>
                )}

              </div>

              <div className="flex justify-end pt-5 border-t border-brand-border/40 mt-6">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-5 py-2 bg-brand-card hover:bg-brand-card/85 text-brand-textPrimary text-xs font-bold rounded-xl border border-brand-border/60 transition-all"
                >
                  Close File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
