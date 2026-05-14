const EMAILJS_PUBLIC_KEY = 'dB91tFISaTV4O-kfj';
const EMAILJS_SERVICE_ID = 'service_mma31jy';
const EMAILJS_TEMPLATE_ID = 'template_a3a1uzt';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

document.documentElement.classList.add('js-enabled');

// Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const delay = prefersReducedMotion ? 120 : 900;

  setTimeout(() => {
    loader?.classList.add('hidden');
    initAnimations();
  }, delay);
});

// Background canvas
const canvas = document.getElementById('bg-canvas');
const ctx = canvas?.getContext('2d');
let W = 0;
let H = 0;
let particles = [];
let mouse = { x: -9999, y: -9999 };

function resizeCanvas() {
  if (!canvas) return;
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const density = prefersReducedMotion ? 36000 : 12000;
  const maxCount = prefersReducedMotion ? 28 : 120;
  const count = Math.min(maxCount, Math.max(18, Math.floor((W * H) / density)));

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '#00f0ff' : '#b94fff'
    });
  }
}

function drawParticles() {
  if (!ctx) return;

  ctx.clearRect(0, 0, W, H);

  particles.forEach(p => {
    if (!prefersReducedMotion) {
      p.x += p.vx;
      p.y += p.vy;
    }

    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;

    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 100 && !prefersReducedMotion) {
      p.x += dx * 0.02;
      p.y += dy * 0.02;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
  });

  ctx.globalAlpha = 1;

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);

      if (d < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,240,255,${0.08 * (1 - d / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  if (!prefersReducedMotion) requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
  if (prefersReducedMotion) drawParticles();
});

document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Custom cursor
const cur = document.getElementById('cursor');
const fol = document.getElementById('cursor-follower');
let folX = 0;
let folY = 0;
let curX = 0;
let curY = 0;

if (hasFinePointer && cur && fol) {
  document.addEventListener('mousemove', e => {
    curX = e.clientX;
    curY = e.clientY;
    cur.style.left = `${curX}px`;
    cur.style.top = `${curY}px`;
  });

  function animateCursor() {
    folX += (curX - folX) * 0.1;
    folY += (curY - folY) * 0.1;
    fol.style.left = `${folX}px`;
    fol.style.top = `${folY}px`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  document.querySelectorAll('a,button,.skill-card,.project-card,.exp-card,.contact-method').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.transform = 'translate(-50%,-50%) scale(2)';
      fol.style.width = '60px';
      fol.style.height = '60px';
    });

    el.addEventListener('mouseleave', () => {
      cur.style.transform = 'translate(-50%,-50%) scale(1)';
      fol.style.width = '36px';
      fol.style.height = '36px';
    });
  });
}

// Navigation
const navbar = document.getElementById('navbar');
const scrollProg = document.getElementById('scroll-progress');
const scrollTopBtn = document.getElementById('scrollTop');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const navBackdrop = document.getElementById('navBackdrop');

function updateActiveNav() {
  const sections = [...document.querySelectorAll('section[id]')];
  const scrollY = window.scrollY + 130;
  let activeId = sections[0]?.id;

  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      activeId = sec.id;
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === activeId);
  });

  document.querySelectorAll('.mob-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
}

function setMobileMenu(open) {
  if (!hamburger || !mobileNav) return;

  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileNav.classList.toggle('open', open);
  mobileNav.setAttribute('aria-hidden', String(!open));
  navBackdrop?.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
}

function closeMob() {
  setMobileMenu(false);
}

hamburger?.addEventListener('click', () => {
  setMobileMenu(!mobileNav?.classList.contains('open'));
});

navBackdrop?.addEventListener('click', closeMob);

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', closeMob);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMob();
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docH > 0 ? (scrollY / docH) * 100 : 0;

  if (scrollProg) scrollProg.style.width = `${pct}%`;
  navbar?.classList.toggle('scrolled', scrollY > 50);
  scrollTopBtn?.classList.toggle('visible', scrollY > 400);
  updateActiveNav();
  revealElements();
});

scrollTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));

// Reveal animation
const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px 50px 0px' })
  : null;

function revealElements() {
  document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right,.timeline-item').forEach(el => {
    if (el.classList.contains('visible')) return;

    if (!revealObserver || prefersReducedMotion) {
      el.classList.add('visible');
      return;
    }

    revealObserver.observe(el);
  });
}

// Counters
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;
  countersAnimated = true;

  document.querySelectorAll('.stat-num').forEach(el => {
    const target = Number(el.dataset.target);

    if (prefersReducedMotion || !Number.isFinite(target)) {
      el.textContent = Number.isFinite(target) ? target : '0';
      return;
    }

    let current = 0;
    const step = Math.max(1, target / 60);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);

      if (current >= target) {
        el.textContent = target;
        clearInterval(interval);
      }
    }, 20);
  });
}

// GSAP enhancements
function initAnimations() {
  revealElements();

  if (typeof gsap === 'undefined' || prefersReducedMotion) {
    animateCounters();
    return;
  }

  const canUseScrollTrigger = typeof ScrollTrigger !== 'undefined';
  if (canUseScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-badge', { opacity: 0, y: -20, duration: 0.8, delay: 0.2 });
  gsap.from('.hero-title', { opacity: 0, y: 30, duration: 0.9, delay: 0.35 });
  gsap.from('.hero-alias', { opacity: 0, y: 20, duration: 0.7, delay: 0.5 });
  gsap.from('.hero-desc', { opacity: 0, y: 20, duration: 0.7, delay: 0.65 });
  gsap.from('.hero-ctas', { opacity: 0, y: 20, duration: 0.7, delay: 0.8 });
  gsap.from('.hero-meta', { opacity: 0, y: 16, duration: 0.6, delay: 0.95 });
  gsap.from('.hero-stats', { opacity: 0, y: 20, duration: 0.7, delay: 1.05, onComplete: animateCounters });
  gsap.from('.profile-scene', { opacity: 0, scale: 0.72, duration: 1, delay: 0.45, ease: 'back.out(1.7)' });
  gsap.from('.scroll-indicator', { opacity: 0, x: -20, duration: 0.7, delay: 1.25 });

  if (hasFinePointer) {
    document.querySelectorAll('.skill-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { rotateY: 10, rotateX: -8, duration: 0.3, transformPerspective: 600 });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.4 });
      });
    });

    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, { rotateY: x * 12, rotateX: -y * 12, duration: 0.3, transformPerspective: 800, ease: 'power2.out' });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'elastic.out(1,.7)' });
      });
    });
  }

  if (canUseScrollTrigger) {
    gsap.to('.hero-content', {
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
      y: -60,
      opacity: 0.45
    });

    gsap.to('.hero-visual', {
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
      y: -40
    });
  }
}

if (hasFinePointer && !prefersReducedMotion) {
  document.querySelectorAll('.exp-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
      card.style.transition = 'box-shadow .3s,border-color .3s';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all .5s';
    });
  });
}

// Project modal
const projects = {
  p1:  { title: 'Single Image Super-Resolution',    github:  'https://github.com/Adib1133/Thesis',                           desc: 'A deep learning project using Generative Adversarial Networks (GANs) to upscale and enhance low-resolution images beyond their native quality. Built using TensorFlow and PyTorch with custom training pipelines.',                                                                    tags: ['Deep Learning', 'GANs', 'TensorFlow', 'PyTorch'] },
  p2:  { title: 'Healthcare Landing Page',           github: 'https://github.com/Adib1133/klinik24-landing',                 desc: 'A modern, responsive healthcare portal frontend built with Angular and TypeScript. Features animated service sections, doctor profiles, appointment booking UI, and full mobile responsiveness.',                                                                                   tags: ['Angular', 'TypeScript', 'CSS', 'JavaScript'] },
  p3:  { title: 'Klinik-24',                         github: 'https://github.com/Adib1133/klinik-24',                        desc: 'A full-featured clinic management platform built with React and TypeScript. Includes patient dashboards, doctor scheduling, ESLint-enforced code quality, and a polished modern UI.',                                                                                              tags: ['React', 'TypeScript', 'ESLint', 'CSS'] },
  p4:  { title: 'Stock Market Trend Simulation',     github: 'https://github.com/Adib1133/Predicting-Stock-Market-Trends-through-Monte-Carlo-Simulation',          desc: 'A Python-based simulation modeling stock market behaviors using mathematical and stochastic models. Visualizes trend patterns, volatility, and price movements over time.',                                                                                                      tags: ['Python', 'Simulation', 'Modeling', 'Data Visualization'] },
  p5:  { title: 'Hate Speech Detection',             github: 'https://github.com/Adib1133/Hate-Speech-Detection',            desc: 'An NLP-powered machine learning classifier that detects and categorizes hate speech in text datasets. Uses tokenization, feature extraction, and multiple ML algorithms for classification.',                                                                                     tags: ['Python', 'Machine Learning', 'NLP', 'Scikit-learn'] },
  p6:  { title: 'Interface Design',                  github: 'https://github.com/Adib1133/Interface-Design',                 desc: 'A sleek, modern UI/UX design system and component library built with Vue.js. Includes reusable components, a consistent design language, and interactive demo pages.',                                                                                                         tags: ['Vue', 'HTML', 'CSS', 'JavaScript'] },
  p7:  { title: 'E-Commerce Medicine Store',         github: 'https://github.com/Adib1133/Websites',                         desc: 'A full-featured online pharmacy platform with product management, user auth, shopping cart, prescription uploads, and admin dashboard. Built on Laravel with MySQL backend.',                                                                                                    tags: ['PHP', 'Laravel', 'MySQL', 'CSS', 'JavaScript'] },
  p8:  { title: 'Road Safety Animation',             github: 'https://github.com/Adib1133/2d-Animation',                     desc: 'An OpenGL-based 3D animated scene depicting road safety scenarios using Python and PyOpenGL. Demonstrates real-time 3D rendering, GLUT event handling, and animation loops.',                                                                                                    tags: ['Python', 'PyOpenGL', 'GLUT', 'TypeScript'] },
  p9:  { title: 'Complete Clinic Management System', github: 'https://github.com/Adib1133/Medicare',                         desc: 'A full-stack MERN clinic system with patient management, doctor scheduling, billing, and authentication. Built with React.js, Tailwind CSS, MongoDB, and Node.js REST API.',                                                                                                  tags: ['React.js', 'Tailwind', 'MongoDB', 'NodeJS'] },
  p10: { title: 'Minimalistic Weather App',          github: 'https://github.com/Adib1133/Aura-Weather',                     desc: 'A real-time weather dashboard using Python Flask backend, Open-Meteo API for weather data, and BigDataCloud API for geolocation. Features a glassmorphic, minimalist frontend with live updates.',                                                                               tags: ['Python', 'Flask', 'Open-Meteo API', 'JavaScript'] },
  p11: { title: 'Snake Master (Game)',               github: 'https://github.com/Adib1133/Snake-Master---Game',                     desc: 'A modern, feature-rich twist on the classic Snake arcade game with power-ups, combos, multiple difficulties, skins, and local leaderboards. Built with Vanilla HTML5, CSS3, and JavaScript (Canvas API).',                                                                          tags: ['HTML5 Canvas', 'JavaScript', 'CSS3'] },
  p12: { title: 'Scripts',                           github: 'https://github.com/Adib1133/Scripts',                         desc: 'Built these scripts to automate mundane tasks and simplify everyday challenges I used to face. Includes Python automation scripts, C++ utilities, and JavaScript helpers for file organisation, data processing, and system maintenance.',                                               tags: ['Python', 'C++', 'JavaScript'] }
};

const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
let lastFocusedElement = null;

function openModal(id) {
  const p = projects[id];
  if (!p || !modalOverlay || !modalBody) return;

  lastFocusedElement = document.activeElement;
  modalBody.innerHTML = `
    <h2>${p.title}</h2>
    <div class="project-tags" style="margin-bottom:1rem">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
    <p>${p.desc}</p>
    <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="modal-gh-link">
      <i class="fab fa-github"></i> View on GitHub
    </a>
  `;

  modalOverlay.classList.add('active');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalClose?.focus({ preventScroll: true });
}

function closeModal() {
  if (!modalOverlay?.classList.contains('active')) return;

  modalOverlay.classList.remove('active');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus({ preventScroll: true });
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeMob();
  }
});

// Contact form
function initializeEmailJs() {
  if (!window.emailjs || typeof window.emailjs.init !== 'function') return false;

  window.emailjs.init(EMAILJS_PUBLIC_KEY);
  return true;
}

function showStatusMessage(message, type) {
  const statusMessage = document.getElementById('statusMessage');
  if (!statusMessage) return;

  statusMessage.textContent = message;
  statusMessage.className = `status-message show ${type}`;

  if (type !== 'loading') {
    setTimeout(() => {
      statusMessage.classList.remove('show');
    }, 5000);
  }
}

initializeEmailJs();

const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', function(e) {
  e.preventDefault();

  const submitButton = this.querySelector('button[type=submit]');
  const originalButton = submitButton.innerHTML;
  const userName = document.getElementById('userName').value.trim();
  const userEmail = document.getElementById('userEmail').value.trim();
  const userMessage = document.getElementById('userMessage').value.trim();

  if (!userName || !userEmail || !userMessage) {
    showStatusMessage('Please fill out every field before sending.', 'error');
    return;
  }

  if (!window.emailjs || typeof window.emailjs.send !== 'function') {
    showStatusMessage('Email service is unavailable. Please contact directly via email.', 'error');
    return;
  }

  showStatusMessage('Sending message...', 'loading');
  submitButton.disabled = true;
  submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

  const templateParams = {
    from_name: userName,
    from_email: userEmail,
    message: userMessage,
    subject: `Portfolio Contact: ${userName}`
  };

  window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(response => {
      console.log('SUCCESS!', response.status, response.text);
      showStatusMessage('Message sent successfully! Thank you for reaching out.', 'success');
      contactForm.reset();
    })
    .catch(error => {
      console.error('FAILED...', error);
      showStatusMessage('Failed to send message. Please try again or contact directly via email.', 'error');
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButton;
    });
});

// Smooth hash scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href.length <= 1) return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', href);
    closeMob();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  revealElements();
  updateActiveNav();
});