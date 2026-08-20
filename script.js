// ============================================
// SITE HEADER (shared component)
// Single source of truth for the top nav across every page.
// Each page only needs: <header class="site-header" data-site-header></header>
// Dark-mode toggle intentionally omitted — light mode only for now.
// ============================================
const SITE_HEADER_HTML = `
  <div class="nav-pill" data-nav-pill>
    <a href="/" class="nav-identity" aria-label="Home">
      <span class="avatar" role="img" aria-label="Harshit avatar">
        <img src="/images/me.jpg" alt="Harshit" />
      </span>
      <span class="nav-name">Harshit</span>
    </a>
    <nav class="nav-links" aria-label="Primary">
      <a href="/#work" class="nav-link">Work</a>
      <a href="/about" class="nav-link">About</a>
      <a href="/HarshitSuneja_ProductDesigner_Resume.pdf" download class="nav-link">Resume</a>
    </nav>
    <button class="nav-more" type="button" aria-label="Expand menu">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="5" cy="12" r="1.9" />
        <circle cx="12" cy="12" r="1.9" />
        <circle cx="19" cy="12" r="1.9" />
      </svg>
    </button>
  </div>
`;
const siteHeaderMount = document.querySelector('[data-site-header]');
if (siteHeaderMount && !siteHeaderMount.innerHTML.trim()) {
  siteHeaderMount.innerHTML = SITE_HEADER_HTML;
}

// ============================================
// THEME TOGGLE
// ============================================
const root = document.documentElement;
// Buttons are commented out in the header for now, so these resolve to null.
const lightBtn = document.getElementById('themeLight');
const darkBtn = document.getElementById('themeDark');

const applyTheme = (mode) => {
  root.setAttribute('data-theme', mode);
  localStorage.setItem('theme', mode);
  lightBtn?.classList.toggle('active', mode === 'light');
  darkBtn?.classList.toggle('active', mode === 'dark');
};

// DARK MODE DISABLED — force light mode only for now (logic kept, not deleted)
applyTheme('light');

/* Dark mode toggle — re-enable by uncommenting this block and the header buttons in index.html
// initialize from saved preference, falling back to system
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

lightBtn.addEventListener('click', () => applyTheme('light'));
darkBtn.addEventListener('click', () => applyTheme('dark'));
*/

// ============================================
// HEADER SCROLL STATE
// ============================================
const header = document.querySelector('.site-header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Reveal the name in the top nav once the hero has scrolled out of view
const heroSection = document.querySelector('.hero');
if (heroSection && 'IntersectionObserver' in window) {
  const heroObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle('past-hero', !entry.isIntersecting);
  }, { rootMargin: '-72px 0px 0px 0px', threshold: 0 });
  heroObserver.observe(heroSection);
} else {
  // No hero on this page (e.g. case study) — show the name in the nav right away
  header.classList.add('past-hero');
}

// ============================================
// PORTFOLIO CONTENT REGISTRY
// ============================================
const PORTFOLIO_DATA = {
  work: [
    {
      sector: 'Energy • Web Platform',
      label: 'Energy — Deal Pipeline',
      title: 'Deal intelligence for global energy operations',
      outcome: 'Cut deal review cycles across hundreds of live opportunities',
      hint: 'hundreds of deals · control cockpit',
      href: '/work/energy-deal-operations',
      imageClass: 'work-image-energy-deal',
    },
    {
      sector: 'Healthcare • Product Design • Design System',
      label: 'Healthcare — Patient App',
      title: 'Designing AI Assisted Experiences for Preventive Healthcare',
      outcome: 'Shipped accessible AI diagnostics live to patients',
      hint: 'live · accessible diagnostics',
      href: '/work/healthcare-patient-experience',
      imageClass: 'work-image-healthcare-patient',
    },
    {
      sector: 'Banking • Conversational UX',
      label: 'Banking — AI Assistant',
      title: 'Astha.ai: turning AI hesitation into banking self-service',
      outcome: 'Lifted assistant satisfaction from 7 to 9.2 NPS',
      hint: 'Astha.ai · NPS 7 → 9.2',
      href: '/work/banking-ai-self-service',
      imageClass: 'work-image-banking-ai',
      comingSoon: true, // detail page hidden for now; card shows "Coming Soon"
    },
    {
      sector: 'Banking',
      label: 'Banking — Flow Redesign',
      title: 'The economics of fewer decisions',
      outcome: 'Guided flows that cut onboarding errors',
      hint: 'guided, error-proof flows',
      href: '/work/retail-banking-onboarding',
      imageClass: 'work-image-retail-banking',
      hidden: true,
    },
    {
      sector: 'E-commerce',
      label: 'E-commerce — Ad Operations',
      title: 'From approval queues to self-serve campaign management',
      outcome: 'Replaced approval queues with self serve campaign launches',
      hint: 'self-serve ads console · B2B',
      href: '/work/commerce-ad-operations',
      imageClass: 'work-image-commerce-ads',
      hidden: true, // Hidden for now — content update pending
    },
    {
      sector: 'GovTech',
      label: 'GovTech — Citizen Services',
      title: 'Designing citizen trust into a national platform',
      outcome: 'Built citizen trust into a national scale platform',
      hint: 'national citizen services · NDA-protected',
      href: '/work/public-sector-citizen-services',
      imageClass: 'work-image-public-sector',
      nda: true,
      hidden: true, // Hidden for now — content update pending
    },
  ],
  plugins: [
    {
      title: 'PwC × Research Assistant',
      hint: 'PRD → IA, journeys, personas, wireframes',
      href: '/plugins/pwc-research-assistant',
      image: '/images/plugins/Research%20Assistance.png?v=20260525-4',
      summary: "Drop in a PRD. Get IA, personas, user journeys, and wireframes on canvas — grounded in the source document. Devil's advocate mode surfaces the gaps before your review meeting does.",
      featured: true,
    },
    {
      title: 'CLAUDE.md Exporter',
      hint: 'design system → Claude Code',
      href: '/plugins/claude-md-exporter',
      image: '/images/plugins/Claude_md.png?v=20260525-4',
      summary: 'Claude Code kept generating outside our design system. One exported file fixes it — every token, component, and rule.',
    },
    {
      title: 'Design System Generator',
      hint: 'tokens → starter screens · in Figma',
      href: '/plugins/design-system-generator',
      image: '/images/plugins/Design%20System%20Generator.png',
      summary: "Design system support was a 6-week queue. Now it's an afternoon — tokens, components, starter screens in one run.",
    },
    {
      title: 'Design System Validator',
      hint: 'flag breaks before handoff',
      href: '/plugins/design-system-validator',
      image: '/images/plugins/Design%20System%20Validator.png',
      summary: 'Catches token mismatches, detached components, and structural breaks before they reach engineering PR review.',
    },
    {
      title: 'Conversation Flow Generator',
      hint: 'flows · powered by Anthropic',
      href: '/plugins/conversation-flow-generator',
      image: '/images/plugins/UX%20Conversational.png',
      summary: 'Type a user goal. Get a complete flow with branches, fallbacks, and error states — localised across languages from one source.',
    },
  ],
  pages: [
    { label: 'About', hint: 'who I am', href: '/about' },
    { label: 'Under the hood', hint: 'how this site is built', href: '/under-the-hood' },
    { label: 'Now', hint: 'what I am working on', href: '/now' },
  ],
  links: [
    { label: 'Email', hint: 'hsuneja.suneja7@gmail.com', href: 'mailto:hsuneja.suneja7@gmail.com' },
    { label: 'GitHub', hint: 'github.com/hsuneja5s', href: 'https://github.com/hsuneja5s' },
    { label: 'LinkedIn', hint: 'linkedin.com/in/harshitux', href: 'https://linkedin.com/in/harshitux' },
    { label: 'Resume', hint: 'email me for the latest PDF', href: 'mailto:hsuneja.suneja7@gmail.com?subject=Resume%20request' },
  ],
};

const SEARCH_ITEMS = [
  ...PORTFOLIO_DATA.work.filter(item => !item.hidden && !item.disabled).map(item => ({ tag: 'Work', label: item.label, hint: item.hint, href: item.href })),
  ...PORTFOLIO_DATA.plugins.map(item => ({ tag: 'Plugin', label: item.title, hint: item.hint, href: item.href })),
  ...PORTFOLIO_DATA.pages.map(item => ({ tag: 'Page', ...item })),
  ...PORTFOLIO_DATA.links.map(item => ({ tag: 'Link', ...item })),
  // DARK MODE DISABLED — hidden from command palette for now (not deleted)
  // { tag: 'Action', label: 'Toggle theme', hint: 'switch light / dark', action: 'toggleTheme' },
];

const renderHomeCollections = () => {
  const workGrid = document.querySelector('[data-portfolio-work]');
  const pluginGrid = document.querySelector('[data-portfolio-plugins]');

  if (workGrid) {
    workGrid.innerHTML = PORTFOLIO_DATA.work.filter(item => !item.hidden).map(item => {
      const chip = item.nda ? `<span class="work-tag-coming-soon">🔒 NDA Redacted</span>` : '';
      const ctaLabel = item.comingSoon
        ? 'Coming Soon 🚧'
        : (item.nda ? 'View redacted case study' : 'View case study');
      const arrow = item.comingSoon ? '' : `<span class="work-cta-arrow" aria-hidden="true">→</span>`;
      const inner = `
          <div class="work-meta">
            <div class="work-header">
              <span class="work-tag">${escapeHtml(item.sector)}</span>
              ${chip}
            </div>
            <h3 class="work-title">${escapeHtml(item.title)}</h3>
            ${item.outcome ? `<p class="work-outcome">${escapeHtml(item.outcome)}</p>` : ''}
          </div>
          <div class="work-image ${item.imageClass}" aria-hidden="true"></div>
          <div class="work-cta">
            <span class="work-cta-label">${ctaLabel}</span>
            ${arrow}
          </div>`;
      return item.comingSoon
        ? `<div class="work-card work-card--disabled">${inner}</div>`
        : `<a href="${item.href}" class="work-card">${inner}</a>`;
    }).join('');
  }

  if (pluginGrid) {
    pluginGrid.innerHTML = PORTFOLIO_DATA.plugins.map(item => `
      <a href="${item.href}" class="plugin-bento-card${item.featured ? ' plugin-bento-card--featured' : ''}">
        <img src="${item.image}" alt="" class="plugin-bento-img" />
        <div class="plugin-bento-content">
          <h3 class="plugin-bento-title">${escapeHtml(item.title)}</h3>
          <p class="plugin-bento-sub">${escapeHtml(item.summary)}</p>
          <div class="plugin-bento-footer">
            <span class="plugin-bento-arrow" aria-hidden="true">↗</span>
          </div>
        </div>
      </a>
    `).join('');
  }

  const logoTrack = document.querySelector('[data-logo-marquee]');
  if (logoTrack) {
    const logos = [
      'CUB.png', 'IndusInd Bank.png', 'MF.png', 'MHA.png', 'Mobily Business.png',
      'Nykaa.png', 'PwC Logo.png', 'RBI.png', 'SBI.png', 'Torrent Diagnostics.png', 'shell_logo.svg.png',
    ];
    const group = logos.map(name => {
      const alt = name.replace(/\.(png|svg)(\.png)?$/i, '').replace(/_/g, ' ');
      return `<li class="logo-marquee-item"><img src="/images/Logoofbrands/${encodeURIComponent(name)}" alt="${escapeHtml(alt)}" /></li>`;
    }).join('');
    // Duplicate the group so the CSS translateX(-50%) loop is seamless
    logoTrack.innerHTML = `<ul class="logo-marquee-group" aria-hidden="false">${group}</ul><ul class="logo-marquee-group" aria-hidden="true">${group}</ul>`;
  }
};

renderHomeCollections();

// ============================================
// COMMAND PALETTE (⌘K)
// ============================================
const overlay = document.getElementById('cmdkOverlay');
const input = document.getElementById('cmdkInput');
const results = document.getElementById('cmdkResults');
const openBtn = document.getElementById('openCmdK');

let activeIndex = 0;

const fuzzyMatch = (q, s) => {
  if (!q) return true;
  const qq = q.toLowerCase();
  return s.toLowerCase().includes(qq);
};

const render = () => {
  const q = input.value.trim();
  const filtered = SEARCH_ITEMS.filter(i =>
    fuzzyMatch(q, i.label) || fuzzyMatch(q, i.hint) || fuzzyMatch(q, i.tag)
  );

  if (filtered.length === 0) {
    results.innerHTML = `<li class="cmdk-empty">No results for "${escapeHtml(q)}"</li>`;
    return;
  }

  if (activeIndex >= filtered.length) activeIndex = 0;

  results.innerHTML = filtered.map((item, idx) => `
    <li class="cmdk-result ${idx === activeIndex ? 'active' : ''}" data-idx="${idx}" role="option">
      <span class="cmdk-result-label">${escapeHtml(item.label)}</span>
      <span class="cmdk-result-hint">${escapeHtml(item.hint)}</span>
      <span class="cmdk-result-tag">${item.tag}</span>
    </li>
  `).join('');

  // bind clicks
  results.querySelectorAll('.cmdk-result').forEach((el, idx) => {
    el.addEventListener('mouseenter', () => {
      activeIndex = idx;
      updateActive();
    });
    el.addEventListener('click', () => {
      activeIndex = idx;
      runActive(filtered);
    });
  });
};

const updateActive = () => {
  results.querySelectorAll('.cmdk-result').forEach((el, idx) => {
    el.classList.toggle('active', idx === activeIndex);
  });
};

const runActive = (filtered) => {
  const item = filtered[activeIndex];
  if (!item) return;
  closePalette();
  if (item.action === 'toggleTheme') {
    const cur = root.getAttribute('data-theme');
    applyTheme(cur === 'dark' ? 'light' : 'dark');
  } else if (item.href) {
    if (item.href.startsWith('http')) {
      window.open(item.href, '_blank', 'noopener');
    } else {
      window.location.href = item.href;
    }
  }
};

const openPalette = () => {
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  input.value = '';
  activeIndex = 0;
  render();
  setTimeout(() => input.focus(), 50);
};

const closePalette = () => {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  input.blur();
};

openBtn?.addEventListener('click', openPalette);

input.addEventListener('input', () => {
  activeIndex = 0;
  render();
});

document.addEventListener('keydown', (e) => {
  // ⌘K / Ctrl+K to open
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    overlay.classList.contains('open') ? closePalette() : openPalette();
    return;
  }

  if (!overlay.classList.contains('open')) return;

  const filtered = SEARCH_ITEMS.filter(i =>
    fuzzyMatch(input.value.trim(), i.label) ||
    fuzzyMatch(input.value.trim(), i.hint) ||
    fuzzyMatch(input.value.trim(), i.tag)
  );

  if (e.key === 'Escape') {
    e.preventDefault();
    closePalette();
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (filtered.length === 0) return;
    activeIndex = (activeIndex + 1) % filtered.length;
    updateActive();
    scrollActiveIntoView();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (filtered.length === 0) return;
    activeIndex = (activeIndex - 1 + filtered.length) % filtered.length;
    updateActive();
    scrollActiveIntoView();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    runActive(filtered);
  }
});

const scrollActiveIntoView = () => {
  const el = results.querySelector('.cmdk-result.active');
  if (el) el.scrollIntoView({ block: 'nearest' });
};

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closePalette();
});

// ============================================
// CASE STUDY SCROLL-SPY (left rail nav)
// ============================================
const caseNav = document.querySelector('.case-nav');
if (caseNav) {
  const navLinks = Array.from(caseNav.querySelectorAll('a:not(.case-nav-back)'));
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length) {
    const setActive = (id) => {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      // Find the topmost section currently in view
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
      if (visible.length) {
        setActive(visible[0].target.id);
      }
    }, {
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0,
    });

    sections.forEach(s => observer.observe(s));

    // Smooth scroll on click + immediate highlight
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActive(id);
        }
      });
    });

    // Set initial active state
    setActive(sections[0].id);
  }
}

// ============================================
// HELPERS
// ============================================
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ============================================
// PAGE TRANSITIONS
// ============================================
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href');
  if (
    link.target === '_blank' ||
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('http') && !href.startsWith(location.origin)
  ) return;

  e.preventDefault();
  document.body.style.opacity = '0';
  setTimeout(() => { location.href = href; }, 250);
});

// ============================================
// CASE STUDY CAROUSEL (Scroll Sync)
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".case-carousel");
  
  carousels.forEach(carousel => {
    const viewport = carousel.querySelector(".carousel-viewport");
    const slides = carousel.querySelectorAll(".carousel-slide");
    const indicators = carousel.querySelectorAll(".carousel-indicator");
    
    if (!viewport || !slides.length || !indicators.length) return;
    
    // Smooth scroll to target slide when dot indicator is clicked
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        const slideOffset = slides[index].offsetLeft;
        const viewportOffset = viewport.offsetLeft;
        viewport.scrollTo({
          left: slideOffset - viewportOffset,
          behavior: "smooth"
        });
      });
    });
    
    // Sync indicator active state dynamically on scroll snap
    viewport.addEventListener("scroll", () => {
      const scrollPos = viewport.scrollLeft;
      const width = viewport.clientWidth;
      const activeIndex = Math.round(scrollPos / width);
      
      indicators.forEach((ind, index) => {
        if (index === activeIndex) {
          ind.classList.add("active");
        } else {
          ind.classList.remove("active");
        }
      });
    });
  });

  // ============================================
  // SIDEBAR SCROLL-SPY (Intersection Observer)
  // ============================================
  const sections = document.querySelectorAll(".case-section[id]");
  const navLinks = document.querySelectorAll(".case-nav a:not(.case-nav-back)");

  if (sections.length && navLinks.length) {
    const activeSections = new Set();

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        if (entry.isIntersecting) {
          activeSections.add(id);
        } else {
          activeSections.delete(id);
        }
      });

      if (activeSections.size > 0) {
        for (const sec of sections) {
          const id = sec.getAttribute("id");
          if (activeSections.has(id)) {
            navLinks.forEach(l => l.classList.remove("active"));
            const activeLink = document.querySelector(`.case-nav a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add("active");
            break;
          }
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(sec => observer.observe(sec));
  }

  // ============================================
  // IDENTITY HEADER & HERO TYPEWRITER ANIMATION
  // ============================================
  function initHeaderTypewriter() {
    function runTypewriter(target) {
      if (!target) return;
      const words = ['Harshit', 'हर्षित', 'هارشيت', 'ಹರ್ಷಿತ್'];
      let wordIndex = 0;
      let charIndex = words[0].length;
      let isDeleting = true; // Initialize to true so we start by deleting "Harshit" after the pause
      let typingSpeed = 150;
      let cycleCount = 0;

      function type() {
        const currentWord = words[wordIndex];
        const chars = Array.from(currentWord);
        
        if (isDeleting) {
          charIndex--;
          typingSpeed = 80;
        } else {
          charIndex++;
          typingSpeed = 150;
        }

        target.textContent = chars.slice(0, charIndex).join('');

        if (!isDeleting && charIndex === chars.length) {
          if (wordIndex === 0 && cycleCount > 0) {
            // Finished the cycle. Remove cursor caret and stop permanently.
            target.classList.remove('typewriter-name');
            return;
          }
          typingSpeed = 2000; // Pause on complete word
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          if (wordIndex === 0) {
            cycleCount++;
          }
          typingSpeed = 400; // Pause on empty state
        }

        setTimeout(type, typingSpeed);
      }

      setTimeout(type, 1500); // Start after initial delay
    }

    // Temporarily hidden header typewriter animation per user request (avatar only)
    /*
    const identityNameEl = document.querySelector('.identity-name');
    if (identityNameEl) {
      identityNameEl.innerHTML = '<span class="typewriter-name">Harshit</span>';
      const target = identityNameEl.querySelector('.typewriter-name');
      runTypewriter(target);
    }
    */

    const heroNameEl = document.querySelector('.hero-name-animated');
    if (heroNameEl) {
      heroNameEl.innerHTML = '<span class="typewriter-name">Harshit</span>';
      const target = heroNameEl.querySelector('.typewriter-name');
      runTypewriter(target);
    }
  }
  initHeaderTypewriter();

  // ============================================
  // WAVE HAND — cursor turns into 👋🏻 on hover, high-five burst on click
  // ============================================
  function initWaveHand() {
    const hand = document.querySelector('.wave-hand');
    if (!hand) return;

    const cursor = document.createElement('div');
    cursor.className = 'hand-cursor';
    cursor.textContent = '👋🏻';
    document.body.appendChild(cursor);

    const move = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };
    hand.addEventListener('mouseenter', () => {
      cursor.classList.add('is-visible');
      hand.style.cursor = 'none';
      window.addEventListener('mousemove', move);
    });
    hand.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-visible');
      hand.style.cursor = '';
      window.removeEventListener('mousemove', move);
    });

    const emojis = ['🙌', '✨', '👋', '🎉', '⭐', '💫'];
    const burst = () => {
      hand.classList.remove('is-waving');
      void hand.offsetWidth; // restart the wiggle animation
      hand.classList.add('is-waving');

      const rect = hand.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const count = 9;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'hand-particle';
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
        document.body.appendChild(p);
        const ang = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
        const dist = 55 + Math.random() * 55;
        const dx = Math.cos(ang) * dist;
        const dy = Math.sin(ang) * dist - 25;
        p.animate([
          { transform: `translate(${cx}px, ${cy}px) translate(-50%, -50%) scale(0.4)`, opacity: 1 },
          { transform: `translate(${cx + dx}px, ${cy + dy}px) translate(-50%, -50%) scale(1.15)`, opacity: 0 },
        ], { duration: 700 + Math.random() * 250, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)' })
          .onfinish = () => p.remove();
      }
    };

    hand.addEventListener('click', burst);
    hand.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); burst(); }
    });
  }
  initWaveHand();

  // ============================================
  // HANGING ID BADGE — drag to swing (pendulum)
  // ============================================
  function initIdBadge() {
    const badge = document.querySelector('[data-id-badge]');
    if (!badge) return;
    const swing = badge.querySelector('.id-badge-swing');
    if (!swing) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      swing.style.transform = 'rotate(0deg)';
      return;
    }

    let angle = 0;    // degrees, 0 = hanging straight down
    let vel = 0;      // deg / frame
    let target = 0;   // where the cursor wants the card while dragging
    let dragging = false;
    let pivotX = 0, pivotY = 0;

    const K = 0.008;     // soft spring → slow, floaty swing
    const DAMP = 0.965;  // settles in ~2–3 swings
    const FOLLOW = 0.14; // eased drag follow (smooth, not snappy)
    const MAXVEL = 2.6;  // cap so releases stay gentle
    const MAX = 66;      // swing clamp

    const render = () => { swing.style.transform = `rotate(${angle}deg)`; };

    // One soft nudge once the drop-in settles → a couple of gentle swings
    setTimeout(() => { if (!dragging) vel = 1.4; }, 950);

    const tick = () => {
      if (dragging) {
        const prev = angle;
        angle += (target - angle) * FOLLOW; // smooth follow
        vel = angle - prev;                 // momentum for release
      } else {
        vel = (vel - K * angle) * DAMP;
        if (vel > MAXVEL) vel = MAXVEL;
        else if (vel < -MAXVEL) vel = -MAXVEL;
        angle += vel;
        if (angle > MAX) { angle = MAX; vel *= -0.35; }
        else if (angle < -MAX) { angle = -MAX; vel *= -0.35; }
      }
      render();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const setPivot = () => {
      const r = badge.getBoundingClientRect();
      pivotX = r.left + r.width / 2;
      pivotY = r.top; // transform-origin is top center
    };

    const angleFrom = (x, y) => {
      const a = Math.atan2(x - pivotX, Math.max(y - pivotY, 1)) * 180 / Math.PI;
      return Math.max(-MAX, Math.min(MAX, a));
    };

    const onMove = (e) => { if (dragging) target = angleFrom(e.clientX, e.clientY); };

    const onUp = () => {
      dragging = false;
      badge.classList.remove('is-grabbing');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    swing.addEventListener('pointerdown', (e) => {
      dragging = true;
      badge.classList.add('is-grabbing');
      setPivot();
      target = angleFrom(e.clientX, e.clientY);
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    });
    swing.addEventListener('dragstart', (e) => e.preventDefault());
  }
  initIdBadge();

  // ============================================
  // 3D TILT + mockup parallax on hover
  // Built for the split-editorial cards (reverted from Selected work).
  // KEPT for future reuse — likely on the "Building AI Design Accelator" cards.
  // To use: give each card [data-tilt] and rescope the querySelector below.
  // ============================================
  function initWorkTilt() {
    const cards = document.querySelectorAll('.selected-work [data-tilt]');
    if (!cards.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const MAXX = 4.5, MAXY = 6.5; // max tilt degrees

    cards.forEach((card) => {
      const img = card.querySelector('.work-image');
      let raf = 0;

      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          card.style.transition = 'none';
          card.style.transform = `rotateX(${(-py * MAXX).toFixed(2)}deg) rotateY(${(px * MAXY).toFixed(2)}deg)`;
          if (img) {
            img.style.transition = 'none';
            img.style.transform = `scale(1.06) translate(${(-px * 16).toFixed(1)}px, ${(-py * 16).toFixed(1)}px)`;
          }
        });
      };

      const reset = () => {
        cancelAnimationFrame(raf);
        card.style.transition = '';   // fall back to the CSS ease-out for a smooth settle
        card.style.transform = '';
        if (img) { img.style.transition = ''; img.style.transform = ''; }
      };

      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', reset);
    });
  }
  // initWorkTilt(); // disabled — re-enable when reused on the plugins section

  // ============================================
  // LIVE PRESENCE — Figma-style multiplayer cursors
  // Rarely spawns 1 (sometimes 2, very rarely 3) roaming cursors that
  // glide across the page and fade out, like other visitors browsing.
  // ============================================
  function initPresence() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return; // skip touch devices

    const DIR = '/images/Figma%20Arrows/';
    const FILES = ['Multiplayer.png'];
    for (let i = 1; i <= 15; i++) FILES.push(`Multiplayer-${i}.png`);

    let active = 0;
    let spawned = 0;

    // Per-session budget: usually 1–2 cursors total, at most 3. Once the
    // budget is spent, no more appear for the rest of the session.
    const budget = (() => {
      const r = Math.random();
      if (r < 0.15) return 3;
      if (r < 0.55) return 2;
      return 1;
    })();

    const spawnPoint = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const x = (0.08 + Math.random() * 0.80) * vw;
      // Avoid the hero (top of the homepage) ~90% of the time.
      const heroInView = document.querySelector('.hero') && window.scrollY < vh * 0.55;
      const avoidHero = Math.random() < 0.9;
      let y;
      if (heroInView && avoidHero) {
        y = (0.44 + Math.random() * 0.42) * vh; // lower band
      } else {
        y = (0.16 + Math.random() * 0.68) * vh;
      }
      return { x, y: Math.max(y, vh * 0.12) }; // never under the nav
    };

    const spawn = () => {
      active++;
      spawned++;
      const el = document.createElement('div');
      el.className = 'presence-cursor';
      const img = document.createElement('img');
      img.src = DIR + FILES[Math.floor(Math.random() * FILES.length)];
      img.alt = '';
      el.appendChild(img);

      const { x, y } = spawnPoint();
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;

      // Wander across several waypoints, like someone scrolling around,
      // then quietly fade out. Stays on screen ~10–15s.
      const life = 10000 + Math.random() * 5000;
      const legs = 4 + Math.floor(Math.random() * 3); // 4–6 legs
      let rx = 0, ry = 0;
      const pts = [{ x: rx, y: ry }];
      for (let i = 0; i < legs; i++) {
        rx += (Math.random() - 0.5) * 110;
        ry += (Math.random() - 0.5) * 90;
        pts.push({ x: rx, y: ry });
      }

      const frames = [
        { opacity: 0, transform: 'translate(0px, 0px) scale(0.9)', offset: 0 },
        { opacity: 1, transform: `translate(${pts[1].x}px, ${pts[1].y}px) scale(1)`, offset: 0.06 },
      ];
      for (let i = 2; i < pts.length; i++) {
        const offset = Math.min(0.06 + ((i - 1) / (pts.length - 1)) * 0.82, 0.9);
        frames.push({ opacity: 1, transform: `translate(${pts[i].x}px, ${pts[i].y}px) scale(1)`, offset });
      }
      frames.push({ opacity: 0, transform: `translate(${rx}px, ${ry}px) scale(0.97)`, offset: 1 });

      document.body.appendChild(el);
      const anim = el.animate(frames, { duration: life, easing: 'ease-in-out' });

      anim.onfinish = () => { el.remove(); active--; };
      anim.oncancel = () => { el.remove(); active--; };
    };

    const schedule = () => {
      if (spawned >= budget) return; // budget spent — stop for this session
      const delay = 8000 + Math.random() * 16000; // 8–24s between cursors
      setTimeout(() => {
        // one at a time; only while the user is actually on the tab
        if (document.visibilityState === 'visible' && active === 0 && spawned < budget) {
          spawn();
        }
        schedule();
      }, delay);
    };

    // First cursor a few seconds in, then maybe one or two more, then done.
    setTimeout(() => {
      if (document.visibilityState === 'visible') spawn();
      schedule();
    }, 3000 + Math.random() * 3500);
  }
  initPresence();

  // ============================================
  // HOVER CURSOR — "View case study" / "Coming soon" follower pill
  // Vector (real text + SVG) so it never pixelates like an image cursor.
  // ============================================
  function initHoverCursor() {
    if (window.matchMedia('(hover: none)').matches) return; // skip touch

    const EYE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';

    const pill = document.createElement('div');
    pill.className = 'hover-cursor';
    pill.innerHTML = '<span class="hover-cursor-icon"></span><span class="hover-cursor-label"></span>';
    document.body.appendChild(pill);
    const icon = pill.querySelector('.hover-cursor-icon');
    const label = pill.querySelector('.hover-cursor-label');

    let mx = -200, my = -200, raf = 0;
    const place = () => { pill.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%) scale(1)`; };
    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => { place(); raf = 0; });
    };

    const show = (variant) => {
      if (variant === 'soon') {
        pill.classList.add('is-soon'); pill.classList.remove('is-view');
        icon.textContent = '🚧'; label.textContent = 'Coming soon';
      } else {
        pill.classList.add('is-view'); pill.classList.remove('is-soon');
        icon.innerHTML = EYE; label.textContent = 'View case study';
      }
      pill.style.transition = 'none';
      place();
      void pill.offsetWidth; // reflow so it doesn't fly in from the last spot
      pill.style.transition = '';
      pill.classList.add('is-visible');
      window.addEventListener('mousemove', move);
    };

    const hide = () => {
      pill.classList.remove('is-visible');
      window.removeEventListener('mousemove', move);
    };

    const bind = (selector, variant) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.addEventListener('pointerenter', (e) => { mx = e.clientX; my = e.clientY; show(variant); });
        el.addEventListener('pointerleave', hide);
      });
    };

    bind('a.work-card', 'view');
    bind('.plugin-bento-card', 'view');
    bind('.work-card--disabled', 'soon');
  }
  initHoverCursor();

  // ============================================
  // SCROLL REVEAL (Fade-In & Slide-Up)
  // ============================================
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    });
    revealElements.forEach(el => revealObserver.observe(el));
  }
});

