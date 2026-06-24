import React from 'react';
import { Clock, MapPin, Tag } from 'lucide-react';
import { switchActiveCategory } from '../utils/telemetry';

export default function PackageCard({ pkg, onBook }) {
  const { title, description, price, duration, destination, imageUrl, isAffordable } = pkg;

  // Telemetry trigger: Log that the user is actively viewing this destination
  const handleMouseEnter = () => {
    if (destination) {
      switchActiveCategory(destination);
    }
  };

  return (
    <div 
      className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col h-full"
      onMouseEnter={handleMouseEnter}
    >
      {/* Package Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={imageUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'} 
          alt={title} 
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Affordable Badge */}
        {isAffordable && (
          <div className="absolute top-4 right-4 bg-emerald-500 text-brand-dark px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg shadow-emerald-500/20">
            <Tag className="w-3.5 h-3.5" />
            <span>Best Value</span>
          </div>
        )}
      </div>

      {/* Package Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-brand-textSecondary mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-brand-primary" />
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-secondary" />
            {destination}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-brand-textPrimary mb-2 line-clamp-1 hover:text-brand-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-brand-textSecondary line-clamp-3 mb-6 flex-grow">
          {description}
        </p>

        {/* Footer Pricing & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-brand-border/40 mt-auto">
          <div>
            <span className="text-xs text-brand-textSecondary block">Price Per Person</span>
            <span className="text-xl font-extrabold text-brand-secondary">
              ₹{price.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => onBook(pkg)}
            className="px-5 py-2 bg-brand-primary hover:bg-brand-primaryHover text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-brand-primary/20"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
