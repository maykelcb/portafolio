/* ═══════════════════════════════════════════════
   SCRIPT.JS — Portfolio Interactions
   ═══════════════════════════════════════════════ */

// ─── Text Scramble Animation ───────────────────
// Letters scramble randomly then decode into "ANALISTA DE DATOS"
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="scramble-char">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Initialize scramble animation on hero role text
document.addEventListener('DOMContentLoaded', () => {
  const heroRole = document.getElementById('heroRole');
  if (heroRole) {
    const fx = new TextScramble(heroRole);
    const phrases = [
      'ANALISTA DE DATOS',
      'DATA ANALYST',
      'ANALISTA PROGRAMADOR',
      'PROBLEM SOLVER'
    ];
    let counter = 0;

    const runScramble = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(runScramble, 3000);
      });
      counter = (counter + 1) % phrases.length;
    };

    // Start after a small delay for the initial page load
    setTimeout(runScramble, 800);
  }

  // Add scramble char style dynamically
  const style = document.createElement('style');
  style.textContent = `
    .scramble-char {
      color: #1b6b99;
      opacity: 0.7;
    }
  `;
  document.head.appendChild(style);
});


// ─── Navbar Scroll Effect ──────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ─── Active Nav Link on Scroll ─────────────────
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
  root: null,
  rootMargin: '-20% 0px -60% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  if (section.id) sectionObserver.observe(section);
});


// ─── Section Reveal on Scroll ──────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.section').forEach(section => {
  revealObserver.observe(section);
});


// ─── Skill Bars Animation ─────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        const level = fill.getAttribute('data-level');
        fill.style.width = level + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('tecnologias');
if (skillsSection) skillObserver.observe(skillsSection);


// ─── Hero Particles ────────────────────────────
const particlesContainer = document.getElementById('heroParticles');

function createParticles() {
  if (!particlesContainer) return;

  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (4 + Math.random() * 4) + 's';
    particle.style.width = (2 + Math.random() * 3) + 'px';
    particle.style.height = particle.style.width;
    particlesContainer.appendChild(particle);
  }
}

createParticles();


// ─── Mobile Menu Toggle ────────────────────────
const menuBtn = document.getElementById('menuBtn');
const navLinksContainer = document.querySelector('.nav-links');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    menuBtn.classList.toggle('active');
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
      menuBtn.classList.remove('active');
    });
  });
}


// ─── Smooth scroll for nav links ───────────────
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});