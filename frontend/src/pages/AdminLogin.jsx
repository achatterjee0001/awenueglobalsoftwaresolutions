import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, User, Lock, ArrowRight } from 'lucide-react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

export default function AdminLogin() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, skip login page
    const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMsg('Please input both credentials.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.post('/admin/login', { username, password });
      
      if (res.data.success && res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('token', res.data.token);
        
        // Update AuthContext state
        login(res.data.token, { name: 'Administrator', role: 'admin', email: 'admin@avenueglobal.com' });
        
        // Force state updates across components listening to storage
        window.dispatchEvent(new Event('storage'));
        navigate('/admin');
      } else {
        setErrorMsg(res.data.message || 'Login failed.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Invalid admin credentials or server offline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-primary/10 rounded-full blur-[90px] -z-10 pointer-events-none" />

      <div className="glass-panel w-full max-w-md p-8 md:p-10 rounded-3xl relative border border-brand-border/60 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-brand-primary/10 border border-brand-primary/20 p-4 rounded-2xl text-brand-primary mb-4">
            <ShieldAlert className="w-10 h-10 text-brand-secondary" />
          </div>
          <h1 className="text-2xl font-extrabold text-brand-textPrimary mb-1 glow-text-primary">
            Admin Portal
          </h1>
          <p className="text-brand-textSecondary text-xs">
            Authenticate to manage tours and view incoming lead telemetry.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-brand-textSecondary uppercase tracking-wider mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-textSecondary" />
              <input
                type="text"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-3 pl-11 pr-4 text-sm text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-textSecondary uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-textSecondary" />
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-3 pl-11 pr-4 text-sm text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-brand-primary hover:bg-brand-primaryHover disabled:bg-brand-primary/40 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-brand-primary/20 flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
