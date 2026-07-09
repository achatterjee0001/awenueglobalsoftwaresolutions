/* ==========================================================================
   AWENUE GLOBAL SOFTWARE SOLUTIONS - Contact Interaction Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCalendarInteraction();
});

let selectedDate = "9"; // Default selected day
let selectedTimeSlot = "10:00 AM"; // Default selected time

function initCalendarInteraction() {
  const dayCards = document.querySelectorAll('.calendar-day-card');
  const slotBtns = document.querySelectorAll('.time-slot-btn');
  
  // Date select handler
  dayCards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('disabled')) return;
      
      dayCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedDate = card.getAttribute('data-day');
    });
  });
  
  // Time Slot select handler
  slotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) return;
      
      slotBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTimeSlot = btn.getAttribute('data-time');
    });
  });
}

function submitContactForm() {
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const service = document.getElementById('contact-service').value;
  const msg = document.getElementById('contact-msg').value;
  const toast = document.getElementById('contact-success-toast');
  
  if (!name || !email) return;
  
  console.log(`Booking Request compiled:
  - Client: ${name} (${email})
  - Target: ${service}
  - Date Chosen: July ${selectedDate}, 2026 at ${selectedTimeSlot}
  - Scope: ${msg || "No description provided."}`);
  
  // Reveal success notification
  if (toast) {
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
  
  // Reset form
  document.getElementById('consultation-form').reset();
}
