/* ==========================================================================
   AWENUE GLOBAL SOFTWARE SOLUTIONS - Main Interaction System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Systems
  initPreloader();
  initCustomCursor();
  initParticleCanvas();
  initHeaderScroll();
  initMobileMenu();
  initCardInteractiveGlow();
  initMagneticButtons();
  initScrollReveal();
  
  // Lucide Icons initialization
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

/* ==========================================================================
   1. Preloader Progression & Entrance
   ========================================================================== */
function initPreloader() {
  const loader = document.getElementById('loading-screen');
  const bar = document.querySelector('.loader-progress-bar');
  const percentText = document.querySelector('.loader-percentage');
  
  if (!loader || !bar || !percentText) return;
  
  let progress = 0;
  // Lock body scroll during load
  document.body.style.overflow = 'hidden';
  
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      // Animate progress elements out
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        document.body.style.overflow = '';
        
        // Trigger GSAP/CSS animations for the landing section
        setTimeout(() => {
          document.querySelectorAll('.hero-reveal').forEach((el, index) => {
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, index * 200);
          });
        }, 300);
      }, 500);
    }
    
    bar.style.width = `${progress}%`;
    percentText.textContent = `${progress}%`;
  }, 60);
}

/* ==========================================================================
   2. Custom Cursor Follower
   ========================================================================== */
function initCustomCursor() {
  const cursorDot = document.createElement('div');
  const cursorGlow = document.createElement('div');
  
  cursorDot.className = 'custom-cursor';
  cursorGlow.className = 'custom-cursor-glow';
  
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorGlow);
  
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let glowX = 0, glowY = 0;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Custom Lerp for smooth cursor lag
  function renderCursor() {
    // Inner dot (little lag)
    dotX += (mouseX - dotX) * 0.25;
    dotY += (mouseY - dotY) * 0.25;
    
    // Outer glow (more lag for smooth trailing)
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    
    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;
    
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;
    
    requestAnimationFrame(renderCursor);
  }
  
  renderCursor();
  
  // Interaction Hover States
  const hoverElements = 'a, button, .card-premium, input, textarea, select, .interactive-item';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverElements)) {
      cursorDot.style.width = '24px';
      cursorDot.style.height = '24px';
      cursorDot.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      cursorDot.style.border = '1px solid rgba(255, 255, 255, 0.6)';
    }
  });
  
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverElements)) {
      cursorDot.style.width = '8px';
      cursorDot.style.height = '8px';
      cursorDot.style.backgroundColor = 'var(--text-primary)';
      cursorDot.style.border = 'none';
    }
  });
}

/* ==========================================================================
   3. Interactive Background Canvas (Metallic Particles)
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  document.body.prepend(canvas);
  
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  let particles = [];
  const particleCount = Math.min(100, Math.floor((width * height) / 15000));
  let mouse = { x: null, y: null, radius: 180 };
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.5 + 0.5;
    }
    
    update() {
      // Repel from mouse
      if (mouse.x !== null && mouse.y !== null) {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          let force = (mouse.radius - dist) / mouse.radius;
          let angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force * 1.5;
          this.y += Math.sin(angle) * force * 1.5;
        }
      }
      
      this.x += this.vx;
      this.y += this.vy;
      
      // Screen edge wrapping
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.fill();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

/* ==========================================================================
   4. Header Scroll Behaviors
   ========================================================================= */
function initHeaderScroll() {
  const header = document.querySelector('.header-nav');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   5. Mobile Drawer Navigation
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.querySelector('.menu-btn');
  const mobileMenu = document.querySelector('.nav-menu-mobile');
  
  if (!menuBtn || !mobileMenu) return;
  
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  
  // Close menu on clicking links
  mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

/* ==========================================================================
   6. Card Dynamic Pointer-Glow System
   ========================================================================== */
function initCardInteractiveGlow() {
  const cards = document.querySelectorAll('.card-premium');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });
}

/* ==========================================================================
   7. Magnetic Button Micro-Interactions
   ========================================================================== */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-glass, .social-icon');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      // Calculate cursor position inside button boundaries
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Pull element in that vector (25% translation factor)
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.03)`;
      if (btn.classList.contains('btn-primary')) {
        btn.style.boxShadow = `${-x * 0.15}px ${-y * 0.15}px 25px rgba(255, 255, 255, 0.08)`;
      }
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.boxShadow = '';
    });
  });
}

/* ==========================================================================
   8. Scroll Reveal & GSAP Orchestrator
   ========================================================================== */
function initScrollReveal() {
  // GSAP Integration fallback check
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate cards on scroll reveal
    gsap.utils.toArray('.section').forEach(section => {
      const cards = section.querySelectorAll('.card-premium, .tech-badge, .timeline-node');
      const headers = section.querySelectorAll('h2, .section-subtitle');
      
      if (headers.length > 0) {
        gsap.from(headers, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }
      
      if (cards.length > 0) {
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        });
      }
    });
    
    // Parallax element effect
    const parallaxEl = document.querySelector('.hero-parallax');
    if (parallaxEl) {
      gsap.to(parallaxEl, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  } else {
    // CSS-based intersection observer fallback
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) scale(1)';
          observer.unobserve(el);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.fade-up, .fade-in, .scale-in').forEach(el => {
      el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  }
}
