/* ═══════════════════════════════════════════════
   SCRIPT.JS — High-Impact Portfolio Interactions
   ═══════════════════════════════════════════════ */

// ─── 1. Text Scramble Animation (Hero Role) ───
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
      const start = Math.floor(Math.random() * 30);
      const end = start + Math.floor(Math.random() * 30);
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

// ─── 2. DOM Ready Initializations ───────────────
document.addEventListener('DOMContentLoaded', () => {
  // Scramble effect
  const heroRole = document.getElementById('heroRole');
  if (heroRole) {
    const fx = new TextScramble(heroRole);
    const phrases = [
      'ANALISTA DE DATOS',
      'DATA ANALYST',
      'ANALISTA PROGRAMADOR',
      'DATA-DRIVEN DEVELOPER'
    ];
    let counter = 0;

    const runScramble = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(runScramble, 3200);
      });
      counter = (counter + 1) % phrases.length;
    };

    setTimeout(runScramble, 800);
  }

  // Scramble char style injection
  const scrambleStyle = document.createElement('style');
  scrambleStyle.textContent = `
    .scramble-char {
      color: #2d8ac2;
      opacity: 0.85;
      font-weight: 600;
    }
  `;
  document.head.appendChild(scrambleStyle);

  // Init interactive features
  initCursorGlow();
  initHeroParallax();
  initSkillSpotlightAndTilt();
  initSkillsFilter();
  initScrollProgressAndBackToTop();
  initCopyEmail();
  initContactForm();
  initHeroParticles();
});

// ─── 3. Ambient Cursor Glow ─────────────────────
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderGlow() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    requestAnimationFrame(renderGlow);
  }
  requestAnimationFrame(renderGlow);
}

// ─── 4. Hero Silhouette 3D Parallax Tilt ────────
function initHeroParallax() {
  const heroSection = document.getElementById('home');
  const silhouetteWrapper = document.getElementById('silhouetteWrapper');
  if (!heroSection || !silhouetteWrapper) return;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    silhouetteWrapper.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(10px)`;
  });

  heroSection.addEventListener('mouseleave', () => {
    silhouetteWrapper.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
  });
}

// ─── 5. Skill Spotlight & 3D Tilt ───────────────
function initSkillSpotlightAndTilt() {
  const cards = document.querySelectorAll('.skill-card, .project-showcase-card, .bento-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (card.classList.contains('skill-card')) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('skill-card')) {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
      }
    });
  });
}

// ─── 6. Skills Category Filter ──────────────────
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.92)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

// ─── 7. Scroll Progress Ring & Back to Top ───────
function initScrollProgressAndBackToTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const circle = document.querySelector('.progress-ring-circle');
  if (!scrollTopBtn || !circle) return;

  const circumference = 2 * Math.PI * 20; // radius = 20 -> ~125.66
  circle.style.strokeDasharray = `${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  window.addEventListener('scroll', () => {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const scrollCurrent = window.scrollY;
    const scrollPercentage = Math.min(100, Math.max(0, (scrollCurrent / scrollTotal) * 100));

    const offset = circumference - (scrollPercentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    if (scrollCurrent > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── 8. Toast Notification Utility ──────────────
function showToast(message = '¡Copiado al portapapeles!') {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast) return;

  if (toastMsg) toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

// ─── 9. Copy Email Button ───────────────────────
function initCopyEmail() {
  const copyBtn = document.getElementById('btnCopyEmail');
  const emailText = document.getElementById('emailText');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      const email = emailText.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        showToast('¡Correo copiado al portapapeles!');
        const icon = copyBtn.querySelector('i');
        const text = copyBtn.querySelector('span');
        if (icon) icon.className = 'fas fa-check';
        if (text) text.textContent = '¡Listo!';

        setTimeout(() => {
          if (icon) icon.className = 'fas fa-copy';
          if (text) text.textContent = 'Copiar';
        }, 2000);
      }).catch(() => {
        showToast('Error al copiar el correo');
      });
    });
  }
}

// ─── 10. Contact Form Interaction ───────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('btnSubmit');

  if (form && submitBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const originalHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Enviando...</span>';

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> <span>¡Mensaje Enviado!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        showToast('¡Gracias! Me pondré en contacto contigo muy pronto.');
        form.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
          submitBtn.style.background = '';
        }, 3500);
      }, 1200);
    });
  }
}

// ─── 11. Hero Floating Particles ────────────────
function initHeroParticles() {
  const particlesContainer = document.getElementById('heroParticles');
  if (!particlesContainer) return;

  for (let i = 0; i < 28; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (4 + Math.random() * 5) + 's';
    const size = 2 + Math.random() * 3.5;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particlesContainer.appendChild(particle);
  }
}

// ─── 12. Navbar Scroll & Mobile Menu ────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const menuBtn = document.getElementById('menuBtn');
const navLinksContainer = document.getElementById('navLinks');

if (menuBtn && navLinksContainer) {
  menuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    menuBtn.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
      menuBtn.classList.remove('active');
    });
  });
}

// ─── 13. Active Nav Link on Scroll ──────────────
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
  root: null,
  rootMargin: '-20% 0px -55% 0px',
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

// ─── 14. Section Reveal on Scroll ───────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.section').forEach(section => {
  revealObserver.observe(section);
});

// ─── 15. Skill Bars & Percentage Animation ──────
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
}, { threshold: 0.2 });

const skillsSection = document.getElementById('habilidades');
if (skillsSection) skillObserver.observe(skillsSection);