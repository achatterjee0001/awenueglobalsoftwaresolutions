import React, { useState, useContext } from 'react';
import { X, Mail, Lock, User, ShieldCheck } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const { login } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('login'); // 'login', 'signup', 'otp'
  const [formData, setFormData] = useState({ name: '', email: '', password: '', otp: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email: formData.email, password: formData.password });
      if (res.data.success) {
        login(res.data.token, res.data.user);
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/register', { 
        name: formData.name, 
        email: formData.email, 
        password: formData.password 
      });
      if (res.data.success) {
        setActiveTab('otp');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/verify-otp', { email: formData.email, otp: formData.otp });
      if (res.data.success) {
        login(res.data.token, res.data.user);
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'OTP Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/google', { credential: credentialResponse.credential });
      if (res.data.success) {
        login(res.data.token, res.data.user);
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Google Auth failed');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (activeTab === 'otp') {
      return (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="text-center mb-6">
            <ShieldCheck className="w-12 h-12 text-brand-secondary mx-auto mb-2" />
            <p className="text-xs text-brand-textSecondary">We've sent a 6-digit code to {formData.email}</p>
          </div>
          <div>
            <label className="block text-[10px] uppercase text-brand-textSecondary mb-1 font-bold">Verification Code</label>
            <input 
              type="text" 
              name="otp"
              maxLength="6"
              required
              value={formData.otp} 
              onChange={handleChange}
              className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-3 px-4 text-sm text-center tracking-widest text-brand-textPrimary focus:outline-none focus:border-brand-primary"
              placeholder="000000"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-brand-primary hover:bg-amber-600 text-brand-dark font-extrabold rounded-xl transition-all shadow-md mt-4 disabled:opacity-50 text-xs"
          >
            {loading ? 'Verifying...' : 'Verify & Login'}
          </button>
        </form>
      );
    }

    return (
      <>
        {/* Tabs */}
        <div className="flex border-b border-brand-border/40 mb-6">
          <button 
            onClick={() => { setActiveTab('login'); setError(''); }}
            className={`flex-1 py-3 text-xs font-bold transition-all ${activeTab === 'login' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-textSecondary hover:text-brand-textPrimary'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => { setActiveTab('signup'); setError(''); }}
            className={`flex-1 py-3 text-xs font-bold transition-all ${activeTab === 'signup' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-textSecondary hover:text-brand-textPrimary'}`}
          >
            Create Account
          </button>
        </div>

        {/* Google Auth */}
        <div className="mb-6 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Login Failed')}
            theme="filled_black"
            shape="rectangular"
          />
        </div>

        <div className="relative flex items-center py-2 mb-6">
          <div className="flex-grow border-t border-brand-border/40"></div>
          <span className="flex-shrink-0 mx-4 text-brand-textSecondary text-[10px] uppercase font-bold">Or continue with email</span>
          <div className="flex-grow border-t border-brand-border/40"></div>
        </div>

        <form onSubmit={activeTab === 'login' ? handleLogin : handleSignup} className="space-y-4">
          {activeTab === 'signup' && (
            <div>
              <label className="block text-[10px] uppercase text-brand-textSecondary mb-1 font-bold">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-textSecondary" />
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name} 
                  onChange={handleChange}
                  className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 pl-10 pr-4 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-[10px] uppercase text-brand-textSecondary mb-1 font-bold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-textSecondary" />
              <input 
                type="email" 
                name="email"
                required
                value={formData.email} 
                onChange={handleChange}
                className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 pl-10 pr-4 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase text-brand-textSecondary mb-1 font-bold">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-textSecondary" />
              <input 
                type="password" 
                name="password"
                required
                value={formData.password} 
                onChange={handleChange}
                className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 pl-10 pr-4 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-brand-primary hover:bg-amber-600 text-brand-dark font-extrabold rounded-xl transition-all shadow-md mt-4 disabled:opacity-50 text-xs"
          >
            {loading ? 'Processing...' : (activeTab === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>
      </>
    );
  };

  return (
    <div className="fixed inset-0 top-0 left-0 w-full h-full z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md glass-panel p-8 rounded-3xl shadow-2xl border border-brand-border/40 relative animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-brand-surface/80 text-brand-textSecondary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-extrabold text-brand-textPrimary mb-1 tracking-tight text-center">
          Avenue Global
        </h2>
        <p className="text-xs text-brand-textSecondary text-center mb-6">
          Authentication required to continue
        </p>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        {renderContent()}
      </div>
    </div>
  );
}
