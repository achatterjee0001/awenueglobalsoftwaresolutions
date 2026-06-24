import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Map, Award, HelpCircle, ChevronLeft, ChevronRight, Star, MessageSquare, Quote } from 'lucide-react';
import { getInferredPreferences, getApproximateLocation } from '../utils/telemetry';
import api from '../utils/api';
import PackageCard from '../components/PackageCard';
import BookingModal from '../components/BookingModal';
import PackageDetailModal from '../components/PackageDetailModal';
import CustomRequestModal from '../components/CustomRequestModal';
import AuthModal from '../components/AuthModal';
import { AuthContext } from '../context/AuthContext';

// Slides data for beautiful Indian destinations
const SLIDES = [
  {
    title: 'The Majestic Taj Mahal',
    subtitle: 'Experience the eternal symbol of love and architectural marvel in Agra.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1920&q=80',
    destination: 'Agra, India',
    link: '/catalog?destination=Agra'
  },
  {
    title: 'Tranquil Kerala Backwaters',
    subtitle: 'Sail through palm-fringed tropical lagoons on traditional houseboats.',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80',
    destination: 'Kerala, India',
    link: '/catalog?destination=Kerala'
  },
  {
    title: 'Royal Palaces of Jaipur',
    subtitle: 'Step into the vibrant colors, majestic fortresses, and heritage of the Pink City.',
    image: 'https://images.unsplash.com/photo-1477584308802-e26a79bfc57a?auto=format&fit=crop&w=1920&q=80',
    destination: 'Jaipur, India',
    link: '/catalog?destination=Jaipur'
  },
  {
    title: 'Breathtaking Ladakh Heights',
    subtitle: 'Witness the azure waters of Pangong Tso surrounded by majestic snow-capped peaks.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80',
    destination: 'Ladakh, India',
    link: '/catalog?destination=Ladakh'
  }
];

export default function Home() {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailPkg, setDetailPkg] = useState(null);
  const [bookingPkg, setBookingPkg] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({ travelers: 1, totalPrice: 0 });
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useContext(AuthContext);

  const handleOpenCustomModal = () => {
    if (user) {
      setShowCustomModal(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleOpenDetailModal = (pkg) => {
    if (user) {
      setDetailPkg(pkg);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleProceedBook = (members, totalPrice) => {
    setBookingDetails({ travelers: members, totalPrice });
    setBookingPkg(detailPkg);
    setDetailPkg(null);
  };

  // Slideshow States
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Customer Reviews states
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [currentReviewIdx, setCurrentReviewIdx] = useState(0);

  // Review submission form states
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewDesignation, setReviewDesignation] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState('');
  const [reviewErrorMsg, setReviewErrorMsg] = useState('');

  // Fetch reviews helper
  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      const res = await api.get('/reviews');
      setReviews(res.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setReviewsLoading(false);
    }
  };

  // Fetch slides helper
  const fetchSlides = async () => {
    try {
      const res = await api.get('/slides');
      setSlides(res.data);
    } catch (err) {
      console.error('Error fetching slides:', err);
    }
  };

  const activeSlides = slides.length > 0 ? slides : SLIDES;

  // Auto-play slideshow effect
  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [activeSlides]);

  const nextSlide = () => {
    if (activeSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };

  const prevSlide = () => {
    if (activeSlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  // Fetch Recommended Packages, Reviews & Slides
  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const prefs = getInferredPreferences().join(',');
        const location = await getApproximateLocation();

        const headers = {};
        if (prefs) headers['x-inferred-preferences'] = prefs;
        if (location && location.country && location.country !== 'Unknown Country') {
          headers['x-location-country'] = location.country;
        }

        const res = await api.get('/packages/recommended?limit=3', { headers });
        setRecommended(res.data);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
    fetchReviews();
    fetchSlides();
  }, []);

  // Auto-play reviews effect
  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentReviewIdx((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) {
      setReviewErrorMsg('Name and comment are required.');
      return;
    }

    setSubmittingReview(true);
    setReviewErrorMsg('');
    setReviewSuccessMsg('');

    try {
      await api.post('/reviews', {
        name: reviewName,
        rating: reviewRating,
        comment: reviewComment,
        designation: reviewDesignation || 'Verified Traveler'
      });
      setReviewSuccessMsg('Thank you! Your testimonial has been successfully submitted.');
      setReviewName('');
      setReviewDesignation('');
      setReviewRating(5);
      setReviewComment('');
      
      // Reload reviews list
      await fetchReviews();
      setCurrentReviewIdx(0);
      
      setTimeout(() => {
        setShowReviewForm(false);
        setReviewSuccessMsg('');
      }, 2500);
    } catch (err) {
      console.error(err);
      setReviewErrorMsg('Failed to dispatch review to database. Please verify connectivity.');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Full-Screen Slideshow Hero */}
      <section className="relative h-screen w-full -mt-[73px] overflow-hidden bg-black select-none">
        {activeSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-black/50 z-10" /> {/* Dark Overlay */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transform scale-105 transition-transform duration-[4500ms] ease-out"
            />
            
            {/* Overlay Slide Text */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6 max-w-4xl mx-auto pt-[73px]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-secondary/20 border border-brand-secondary/30 text-brand-secondary text-[10px] font-bold uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore India</span>
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
                {slide.title}
              </h2>
              <p className="text-gray-200 text-sm md:text-lg max-w-xl mb-8 leading-relaxed font-light drop-shadow">
                {slide.subtitle}
              </p>
              <div className="flex gap-4">
                <Link
                  to={slide.link}
                  className="px-6 py-3 bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold rounded-xl transition-all shadow-lg hover:shadow-brand-primary/20"
                >
                  Explore Packages
                </Link>
                <button
                  onClick={handleOpenCustomModal}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 backdrop-blur-xs transition-all"
                >
                  Request Custom Plan
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Manual Slideshow Controls */}
        {activeSlides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-xl bg-black/45 text-white hover:bg-brand-primary hover:scale-105 border border-white/10 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-xl bg-black/45 text-white hover:bg-brand-primary hover:scale-105 border border-white/10 transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Slide Indicators / Dots */}
        {activeSlides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-brand-secondary w-6' : 'bg-white/40 hover:bg-white'}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Core Features / Value Props */}
      <section className="bg-brand-surface border-b border-brand-border py-16 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-2xl flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-textPrimary">Custom Curated Itineraries</h3>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              Every detail of our travel catalogs is customisable. From luxury beachside stays to remote hiking trails.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary border border-brand-secondary/20">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-textPrimary">Algorithmic Matchmaking</h3>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              Our site tracks your destination views dynamically to suggest the best value and relevant package fits.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent border border-brand-accent/20">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-textPrimary">High-Priority Operations</h3>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              Need custom options? Hit "Request Custom Package" to flag your account for rapid agency routing.
            </p>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-brand-textPrimary mb-2">
              Recommended For You
            </h2>
            <p className="text-brand-textSecondary text-sm max-w-md">
              Hand-picked packages based on your browsing pattern and regional travel interests.
            </p>
          </div>
          <Link
            to="/catalog"
            className="text-brand-secondary hover:text-brand-secondaryHover font-semibold text-sm transition-colors flex items-center gap-1 self-start"
          >
            <span>View All Tours &rarr;</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : recommended.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommended.map((pkg) => (
              <PackageCard 
                key={pkg._id} 
                pkg={pkg} 
                onBook={handleOpenDetailModal} 
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-12 rounded-2xl text-center text-brand-textSecondary text-sm max-w-md mx-auto">
            Explore our tour catalog to customize recommendations.
          </div>
        )}
      </section>

      {/* Customer Reviews Testimonials Section (Last Second Section) */}
      <section className="bg-brand-surface border-t border-b border-brand-border/40 py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold rounded-full mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Client Testimonials</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-textPrimary mb-2 glow-text-primary">
            What Our Customers Say
          </h2>
          <p className="text-brand-textSecondary text-sm max-w-md mx-auto mb-12">
            Read real stories of customized travel experiences and verified hospitality from our globally curated tours.
          </p>

          {/* Review Slider */}
          {reviewsLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : reviews.length > 0 ? (
            <div className="relative">
              {/* Outer card */}
              <div className="glass-panel p-8 md:p-12 rounded-3xl border border-brand-border/40 min-h-[250px] flex flex-col justify-between items-center transition-all duration-500 ease-in-out relative">
                
                {/* Quote Icon */}
                <Quote className="absolute top-6 left-8 w-12 h-12 text-brand-primary/10 select-none pointer-events-none" />

                {/* Comment */}
                <p className="text-base md:text-lg text-brand-textPrimary italic leading-relaxed mb-6 font-sans">
                  "{reviews[currentReviewIdx].comment}"
                </p>

                {/* User Specs */}
                <div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < reviews[currentReviewIdx].rating ? 'text-amber-400 fill-amber-400' : 'text-brand-border/20'}`} 
                      />
                    ))}
                  </div>
                  <h4 className="text-sm font-bold text-brand-textPrimary">{reviews[currentReviewIdx].name}</h4>
                  <span className="text-[10px] font-semibold text-brand-textSecondary uppercase tracking-wider block mt-0.5">
                    {reviews[currentReviewIdx].designation}
                  </span>
                </div>
              </div>

              {/* Slider Arrows */}
              {reviews.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentReviewIdx((prev) => (prev - 1 + reviews.length) % reviews.length)}
                    className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/45 text-white hover:bg-brand-primary hover:scale-105 border border-white/10 transition-all cursor-pointer z-20"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentReviewIdx((prev) => (prev + 1) % reviews.length)}
                    className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/45 text-white hover:bg-brand-primary hover:scale-105 border border-white/10 transition-all cursor-pointer z-20"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl text-center text-brand-textSecondary text-xs">
              No customer reviews found. Write the first review!
            </div>
          )}

          {/* Toggle write review button */}
          <div className="mt-8 flex justify-center">
            {!showReviewForm ? (
              <button
                onClick={() => setShowReviewForm(true)}
                className="px-5 py-2.5 bg-brand-surface hover:bg-brand-surface/90 text-brand-textPrimary hover:text-brand-primary border border-brand-border/60 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                Write a Customer Review
              </button>
            ) : (
              <button
                onClick={() => setShowReviewForm(false)}
                className="px-5 py-2.5 bg-brand-card hover:bg-brand-card/85 text-brand-textSecondary rounded-xl text-xs font-semibold transition-all border border-brand-border/40 cursor-pointer"
              >
                Cancel Review Form
              </button>
            )}
          </div>

          {/* Add Review Expandable Form */}
          {showReviewForm && (
            <div className="mt-8 glass-panel p-6 md:p-8 rounded-3xl border border-brand-border/60 text-left max-w-xl mx-auto animate-slideIn">
              <h3 className="text-base font-bold text-brand-textPrimary mb-4">Share Your Travel Experience</h3>
              
              {reviewSuccessMsg && (
                <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-xl text-xs">
                  {reviewSuccessMsg}
                </div>
              )}

              {reviewErrorMsg && (
                <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs">
                  {reviewErrorMsg}
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-brand-textSecondary uppercase mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-brand-textSecondary uppercase mb-1">Trip Type / Designation</label>
                    <input
                      type="text"
                      placeholder="e.g. Adventure Enthusiast"
                      value={reviewDesignation}
                      onChange={(e) => setReviewDesignation(e.target.value)}
                      className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-brand-textSecondary uppercase mb-1.5">Your Rating *</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((stars) => (
                      <button
                        type="button"
                        key={stars}
                        onClick={() => setReviewRating(stars)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        aria-label={`Rate ${stars} stars`}
                      >
                        <Star 
                          className={`w-6 h-6 ${stars <= reviewRating ? 'text-amber-400 fill-amber-400' : 'text-brand-border/40'}`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-brand-textSecondary uppercase mb-1">Review Comments *</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Describe your tour service, booking customization, guides or stay standards..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full bg-brand-dark/50 border border-brand-border/60 rounded-xl py-2.5 px-3.5 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-primary transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full py-3 bg-brand-accent hover:bg-amber-600 disabled:bg-brand-accent/40 text-brand-dark font-extrabold rounded-xl transition-all shadow-md hover:shadow-brand-accent/20 cursor-pointer"
                >
                  {submittingReview ? 'Submitting Testimonial...' : 'Submit Verified Review'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Book Modals */}
      {detailPkg && (
        <PackageDetailModal
          pkg={detailPkg}
          onClose={() => setDetailPkg(null)}
          onProceedBook={handleProceedBook}
        />
      )}

      {bookingPkg && (
        <BookingModal 
          pkg={bookingPkg}
          initialTravelers={bookingDetails.travelers}
          totalPrice={bookingDetails.totalPrice}
          onClose={() => setBookingPkg(null)} 
        />
      )}

      {showCustomModal && (
        <CustomRequestModal 
          onClose={() => setShowCustomModal(false)} 
        />
      )}

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
