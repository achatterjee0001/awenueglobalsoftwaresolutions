import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, LogOut, Menu, X, Sun, Moon, User as UserIcon } from 'lucide-react';
import logoImg from '../assets/logo.jpg';
import { AuthContext } from '../context/AuthContext';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    // 2. Initialize Theme configuration
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  const activeClass = (path) => 
    location.pathname === path 
      ? "text-brand-secondary glow-text-secondary font-bold" 
      : "text-brand-textSecondary hover:text-brand-textPrimary font-medium transition-colors";

  return (
    <>
      <nav className="sticky top-0 z-50 glass-panel border-b border-brand-border/40 py-4 px-6 md:px-12 grid grid-cols-2 lg:grid-cols-3 items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0 justify-self-start">
          <img 
            src={logoImg} 
            alt="Avenue Global Tour & Travels Logo" 
            className="w-10 h-10 rounded-full object-cover border border-brand-border/60 group-hover:rotate-6 transition-transform duration-300"
          />
          <div className="hidden sm:flex flex-col">
            <span className="text-lg font-extrabold tracking-wider text-brand-textPrimary group-hover:text-brand-primary transition-colors font-sans leading-tight">
              Avenue Global
            </span>
            <span className="text-[0.85rem] font-bold text-brand-secondary tracking-[0.15em] leading-tight uppercase mt-0.5">
              Tour & Travels
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-center gap-6 justify-self-center">
          <Link to="/" className={activeClass('/')}>Home</Link>
          <Link to="/catalog" className={activeClass('/catalog')}>Tours</Link>
          <Link to="/holidays" className={activeClass('/holidays')}>Holidays</Link>
          <Link to="/hotels" className={activeClass('/hotels')}>Hotels</Link>
          <Link to="/about" className={activeClass('/about')}>About</Link>
          <Link to="/contact" className={activeClass('/contact')}>Contact</Link>

          {user?.role === 'admin' && (
            <Link to="/admin" className={activeClass('/admin')}>Dashboard</Link>
          )}
        </div>

        {/* Right Controls: Theme Toggle & Admin Actions */}
        <div className="flex items-center gap-3 justify-self-end">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-brand-surface border border-brand-border/60 text-brand-textSecondary hover:text-brand-textPrimary transition-all"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-brand-accent" /> : <Moon className="w-4 h-4 text-brand-primary" />}
          </button>

          {user ? (
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-xs text-brand-textPrimary font-bold flex items-center gap-1.5 bg-brand-surface border border-brand-border/60 px-3 py-2 rounded-xl">
                <UserIcon className="w-3.5 h-3.5 text-brand-primary" />
                {(user.name || 'User').split(' ')[0]}
              </span>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 bg-rose-600/20 hover:bg-rose-600 border border-rose-500/30 text-rose-200 hover:text-white rounded-xl transition-all text-xs font-semibold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <button 
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 border border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10 rounded-xl transition-all text-xs font-bold tracking-wide"
              >
                Sign In
              </button>
              <button 
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 bg-brand-primary hover:bg-amber-600 border border-brand-primary text-brand-dark rounded-xl transition-all text-xs font-extrabold tracking-wide shadow-md shadow-brand-primary/20"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-brand-textPrimary focus:outline-none p-1" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full glass-panel border-b border-brand-border/60 py-6 px-8 flex flex-col gap-4 lg:hidden animate-fadeIn">
            <Link to="/" onClick={() => setIsOpen(false)} className={activeClass('/')}>Home</Link>
            <Link to="/catalog" onClick={() => setIsOpen(false)} className={activeClass('/catalog')}>Tours</Link>
            <Link to="/holidays" onClick={() => setIsOpen(false)} className={activeClass('/holidays')}>Holidays</Link>
            <Link to="/hotels" onClick={() => setIsOpen(false)} className={activeClass('/hotels')}>Hotels</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className={activeClass('/about')}>About Us</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className={activeClass('/contact')}>Contact Us</Link>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={() => setIsOpen(false)} className={activeClass('/admin')}>Admin Dashboard</Link>
                )}
                <button 
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-rose-600/20 text-rose-200 border border-rose-500/30 rounded-lg hover:bg-rose-600 transition-all text-sm font-bold mt-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3 mt-2">
                <button 
                  onClick={() => { setIsOpen(false); setShowAuthModal(true); }}
                  className="w-full py-3 border border-brand-primary/30 text-brand-primary rounded-xl transition-all text-sm font-bold"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => { setIsOpen(false); setShowAuthModal(true); }}
                  className="w-full py-3 bg-brand-primary text-brand-dark rounded-xl transition-all text-sm font-extrabold"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
