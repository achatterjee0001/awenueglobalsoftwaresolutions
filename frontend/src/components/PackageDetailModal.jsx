import React, { useState } from 'react';
import { X, Users, MapPin, Clock, Tag, CheckCircle, Info, FileText } from 'lucide-react';

export default function PackageDetailModal({ pkg, onClose, onProceedBook }) {
  const [members, setMembers] = useState(1);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('itinerary'); // 'highlights', 'itinerary', 'booking', 'cancellation'
  
  const handleMembersChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) val = 1;
    if (val < 1) val = 1;
    if (val > 45) val = 45;
    setMembers(val);
  };

  const options = pkg.durationOptions && pkg.durationOptions.length > 0
    ? pkg.durationOptions
    : [{ nights: pkg.nights || 0, days: pkg.days || 1, price: pkg.price }];

  const selectedOption = options[selectedOptionIdx] || options[0];
  const basePrice = selectedOption.price;
  const totalPrice = basePrice * members;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full md:w-[85vw] h-full md:h-[85vh] rounded-3xl overflow-hidden relative shadow-2xl border border-brand-border/60 flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 p-2 bg-black/40 text-white hover:bg-black/60 rounded-full transition-all backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image & Core Details */}
        <div className="md:w-1/3 bg-brand-dark/80 relative flex flex-col overflow-y-auto custom-scrollbar">
          <div className="relative h-48 md:h-2/5 w-full shrink-0">
            <img 
              src={pkg.imageUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'} 
              alt={pkg.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
          </div>
          
          <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10 -mt-16 md:-mt-24">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 drop-shadow-md">{pkg.title}</h2>
            
            <div className="flex flex-wrap gap-3 mb-4 text-xs font-semibold text-gray-200">
              <span className="flex items-center gap-1 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-brand-secondary" /> {pkg.destination}
              </span>
              <span className="flex items-center gap-1 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
                <Clock className="w-3.5 h-3.5 text-brand-primary" /> {selectedOption.nights} Nights / {selectedOption.days} Days
              </span>
            </div>

            <p className="text-sm text-gray-300 mb-6 line-clamp-4 md:line-clamp-none">
              {pkg.description}
            </p>

            {/* Price Configurator */}
            <div className="mt-auto bg-brand-surface/60 backdrop-blur-md border border-brand-border/60 rounded-2xl p-5 shadow-lg space-y-4">
              
              {/* Select Duration Option */}
              <div className="border-b border-brand-border/40 pb-4">
                <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-wider mb-2">
                  Select Trip Duration Option
                </label>
                {options.length > 1 ? (
                  <select
                    value={selectedOptionIdx}
                    onChange={(e) => setSelectedOptionIdx(parseInt(e.target.value) || 0)}
                    className="w-full bg-brand-dark border border-brand-border/60 rounded-xl py-3 px-3 text-xs text-white focus:outline-none focus:border-brand-primary font-bold transition-all"
                  >
                    {options.map((opt, idx) => (
                      <option key={idx} value={idx}>
                        {opt.nights} Nights / {opt.days} Days (₹{opt.price.toLocaleString()} / person)
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="bg-brand-dark/65 border border-brand-border/60 rounded-xl p-3 text-xs text-gray-300 font-bold flex items-center justify-between">
                    <span>{selectedOption.nights} Nights / {selectedOption.days} Days</span>
                    <span className="text-brand-secondary">₹{selectedOption.price.toLocaleString()} / person</span>
                  </div>
                )}
              </div>

              {/* Group Size Configurator */}
              <div>
                <label className="block text-xs font-bold text-brand-textSecondary uppercase tracking-wider mb-2">
                  Configure Group Size (Min 1, Max 45)
                </label>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-1/2">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-textSecondary" />
                    <input
                      type="number"
                      min="1"
                      max="45"
                      value={members}
                      onChange={(e) => setMembers(parseInt(e.target.value) || 1)}
                      onBlur={handleMembersChange}
                      className="w-full bg-brand-dark border border-brand-border/60 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-primary transition-all font-bold"
                    />
                  </div>
                  <div className="w-1/2 text-right">
                    <div className="text-[10px] text-brand-textSecondary uppercase font-bold tracking-wider mb-1">Total Price</div>
                    <div className="text-2xl font-extrabold text-brand-secondary">
                      ₹{totalPrice.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => onProceedBook(members, totalPrice, selectedOption.days, selectedOption.nights)}
                  className="w-full py-3.5 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold rounded-xl transition-all shadow-md hover:shadow-brand-primary/20 flex items-center justify-center gap-2"
                >
                  <span>Proceed to Booking</span>
                  <CheckCircle className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: Tabbed Content */}
        <div className="md:w-2/3 flex flex-col h-full bg-brand-card/95 border-t md:border-t-0 md:border-l border-brand-border/40">
          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto shrink-0 border-b border-brand-border/40 p-4 gap-2 scrollbar-hide">
            {[
              { id: 'itinerary', label: 'Itinerary', icon: MapPin },
              { id: 'highlights', label: 'Highlights', icon: Tag },
              { id: 'booking', label: 'Booking Policy', icon: Info },
              { id: 'cancellation', label: 'Cancellation', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-brand-secondary text-white shadow-md' : 'bg-brand-surface/40 text-brand-textSecondary hover:bg-brand-surface hover:text-brand-textPrimary'}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
            {activeTab === 'itinerary' && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-xl font-extrabold text-brand-textPrimary mb-6">Day-by-Day Itinerary</h3>
                {pkg.itinerary && pkg.itinerary.length > 0 ? (
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-border/20 before:via-brand-border/60 before:to-brand-border/20">
                    {pkg.itinerary.map((day) => (
                      <div key={day.day} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        {/* Timeline dot */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-brand-card bg-brand-dark shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">
                          <span className="text-[10px] font-black text-brand-secondary">D{day.day}</span>
                        </div>
                        {/* Content Card */}
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] glass-panel p-5 rounded-2xl border border-brand-border/40 hover:border-brand-primary/40 transition-colors">
                          <h4 className="text-brand-primary font-bold text-sm mb-2">{day.title}</h4>
                          <p className="text-brand-textSecondary text-xs leading-relaxed">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-brand-textSecondary bg-brand-surface/30 p-4 rounded-xl">
                    Detailed itinerary will be provided upon booking confirmation.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'highlights' && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-extrabold text-brand-textPrimary mb-6">Trip Highlights</h3>
                {pkg.highlights && pkg.highlights.length > 0 ? (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pkg.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 glass-panel p-4 rounded-xl border border-brand-border/40">
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-brand-textPrimary leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-brand-textSecondary bg-brand-surface/30 p-4 rounded-xl">
                    Experience the best of {pkg.destination} with our curated highlights.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'booking' && (
              <div className="animate-fadeIn max-w-3xl">
                <h3 className="text-xl font-extrabold text-brand-textPrimary mb-6">Booking Policy</h3>
                {pkg.bookingPolicy ? (
                  <div className="prose prose-invert prose-sm text-brand-textSecondary leading-loose">
                    {pkg.bookingPolicy.split('\n').map((para, i) => (
                      <p key={i} className="mb-4 min-h-[1rem]">{para}</p>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-brand-textSecondary bg-brand-surface/30 p-4 rounded-xl">
                    Standard booking terms apply. Please contact our support for detailed policies.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'cancellation' && (
              <div className="animate-fadeIn max-w-3xl">
                <h3 className="text-xl font-extrabold text-brand-textPrimary mb-6">Cancellation Policy</h3>
                {pkg.cancellationPolicy ? (
                  <div className="prose prose-invert prose-sm text-brand-textSecondary leading-loose">
                    {pkg.cancellationPolicy.split('\n').map((para, i) => (
                      <p key={i} className="mb-4 min-h-[1rem]">{para}</p>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-brand-textSecondary bg-brand-surface/30 p-4 rounded-xl">
                    Standard cancellation terms apply. Please contact our support for detailed policies.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
