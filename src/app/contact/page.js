'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Lightbulb, Compass, Cpu, Send, HeartHandshake, Code, Globe, Cloud, Shield, ShieldCheck, Smartphone, Users, FolderCheck, Award, Briefcase, GraduationCap, Activity, Phone, Mail, MapPin, Calendar, CheckCircle, Clock, ChevronRight, Target, Building
} from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="page-route-contact">
      {/* CONTACT HERO */}
  <section className="section contact-hero">
    <div className="container content-wrapper">
      <p style={{fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Engage Our Team</p>
      <h1 className="text-gradient-chrome">Connect with Us</h1>
      <p style={{color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem'}}>
        Request a custom catalog, book scheduling calls with architects, or enquire about product demos.
      </p>
    </div>
  </section>

  {/* CONTACT LAYOUT GRID */}
  <section className="section" style={{paddingTop: '0'}}>
    <div className="container content-wrapper contact-grid">
      
      {/* General Form & Interactive Calendar */}
      <div className="card-premium">
        <h2 style={{fontSize: '1.4rem', marginBottom: 'var(--space-3)'}} className="text-gradient-chrome">Schedule Consultation</h2>
        
        <form id="consultation-form" onsubmit="event.preventDefault(); submitContactForm();">
          <div className="form-group">
            <label className="form-label" for="contact-name">Name</label>
            <input type="text" id="contact-name" className="form-control" required placeholder="Enter name" />
          </div>
          
          <div className="form-group">
            <label className="form-label" for="contact-email">Email</label>
            <input type="email" id="contact-email" className="form-control" required placeholder="Enter email" />
          </div>
          
          <div className="form-group">
            <label className="form-label" for="contact-service">Required Service</label>
            <select id="contact-service" className="form-control" style={{backgroundColor: 'rgba(10,10,10,0.8)', cursor: 'pointer'}}>
              <option value="software">Software Engineering</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Application</option>
              <option value="cloud">Cloud Deployments</option>
              <option value="consulting">IT Security & Consulting</option>
              <option value="demo">Product Suite Demo</option>
            </select>
          </div>
          
          {/* Calendar widget mockup */}
          <div className="form-group">
            <label className="form-label">Pick Call Date</label>
            <div className="calendar-widget">
              <div className="calendar-header">
                <span>July 2026</span>
                <Calendar  style={{ width: 24, height: 24, display: 'inline-block' }} />
              </div>
              <div className="calendar-days-grid">
                <span className="calendar-day-label">M</span>
                <span className="calendar-day-label">T</span>
                <span className="calendar-day-label">W</span>
                <span className="calendar-day-label">T</span>
                <span className="calendar-day-label">F</span>
                <span className="calendar-day-label">S</span>
                <span className="calendar-day-label">S</span>
                
                {/* Mock calendar dates for July (starting Wed July 1) */}
                <span className="calendar-day-card disabled">29</span>
                <span className="calendar-day-card disabled">30</span>
                <span className="calendar-day-card" data-day="1">1</span>
                <span className="calendar-day-card" data-day="2">2</span>
                <span className="calendar-day-card" data-day="3">3</span>
                <span className="calendar-day-card disabled">4</span>
                <span className="calendar-day-card disabled">5</span>
                
                <span className="calendar-day-card" data-day="6">6</span>
                <span className="calendar-day-card" data-day="7">7</span>
                <span className="calendar-day-card" data-day="8">8</span>
                <span className="calendar-day-card selected" data-day="9">9</span>
                <span className="calendar-day-card" data-day="10">10</span>
                <span className="calendar-day-card disabled">11</span>
                <span className="calendar-day-card disabled">12</span>
              </div>
            </div>
            
            <label className="form-label">Available Time Slots</label>
            <div className="time-slots-grid">
              <button type="button" className="time-slot-btn selected" data-time="10:00 AM">10:00 AM</button>
              <button type="button" className="time-slot-btn" data-time="02:30 PM">02:30 PM</button>
              <button type="button" className="time-slot-btn" data-time="04:00 PM">04:00 PM</button>
            </div>
          </div>
          
          <div className="form-group" style={{marginTop: 'var(--space-3)'}}>
            <label className="form-label" for="contact-msg">Message</label>
            <textarea id="contact-msg" className="form-control" rows="4" placeholder="Briefly describe your requirements"></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: 'var(--space-2)'}}>Confirm Call Request</button>
        </form>
      </div>
      
      {/* Contact Info Cards */}
      <div className="contact-info-panel">
        
        {/* Phone */}
        <div className="contact-info-card">
          <div className="contact-info-icon"><Phone  style={{ width: 24, height: 24, display: 'inline-block' }} /></div>
          <div>
            <h3 style={{fontSize: '0.85rem', marginBottom: '4px', color: 'var(--text-muted)'}}>Direct Line</h3>
            <p style={{fontWeight: '600', color: 'var(--text-primary)'}}>+91 7398068193</p>
          </div>
        </div>

        {/* Email */}
        <div className="contact-info-card">
          <div className="contact-info-icon"><Mail  style={{ width: 24, height: 24, display: 'inline-block' }} /></div>
          <div>
            <h3 style={{fontSize: '0.85rem', marginBottom: '4px', color: 'var(--text-muted)'}}>Electronic Mail</h3>
            <p style={{fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.9rem'}}>avenueglobalsoftwaresolutions@gmail.com</p>
            <p style={{fontWeight: '500', color: 'var(--text-muted)', fontSize: '0.8rem'}}>awenueglobalsoftwaresolutions.in</p>
          </div>
        </div>

        {/* Office Address */}
        <div className="contact-info-card">
          <div className="contact-info-icon"><MapPin  style={{ width: 24, height: 24, display: 'inline-block' }} /></div>
          <div>
            <h3 style={{fontSize: '0.85rem', marginBottom: '4px', color: 'var(--text-muted)'}}>Varanasi Office</h3>
            <p style={{fontWeight: '600', color: 'var(--text-primary)'}}>Varanasi, Uttar Pradesh, India</p>
            <p style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px'}}>Main development lab and engineering center.</p>
          </div>
        </div>
        
      </div>

    </div>
  </section>

  {/* SUCCESS TOAST */}
  <div id="contact-success-toast">
    <CheckCircle  style={{ width: 24, height: 24, display: 'inline-block' }} />
    <div>
      <h4 style={{fontFamily: 'var(--font-heading)', fontSize: '0.8rem', color: 'var(--text-primary)', letterSpacing: '0.1em'}}>REQUEST RECEIVED</h4>
      <p style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>An architect will reach out within 2 hours.</p>
    </div>
  </div>

  {/* FOOTER */}
    </div>
  );
}
