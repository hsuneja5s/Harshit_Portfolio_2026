// ============================================
// SITE HEADER (shared component)
// Single source of truth for the top nav across every page.
// Each page only needs: <header class="site-header" data-site-header></header>
// Dark-mode toggle intentionally omitted — light mode only for now.
// ============================================
const SITE_HEADER_HTML = `
  <div class="nav-scrim" data-nav-scrim aria-hidden="true"></div>
  <div class="nav-pill" data-nav-pill>
    <a href="/" class="nav-identity" aria-label="Home">
      <span class="avatar" role="img" aria-label="Harshit avatar">
        <img src="/images/me.jpg" alt="Harshit" />
      </span>
      <span class="nav-identity-text">
        <span class="nav-name">Harshit</span>
      </span>
    </a>
    <nav class="nav-links" aria-label="Primary">
      <a href="/#work" class="nav-link">Work</a>
      <!-- About hidden for now — section moving to Home after the AI Design Accelerator. Restore to bring back.
      <a href="/about" class="nav-link">About</a>
      -->
      <a href="/HarshitSuneja_ProductDesigner_2026.pdf" target="_blank" rel="noopener" class="nav-link">Resume</a>
    </nav>
    <button class="nav-more" type="button" aria-label="Open menu" aria-expanded="false" data-nav-toggle>
      <svg class="nav-more-dots" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="5" cy="12" r="1.9" />
        <circle cx="12" cy="12" r="1.9" />
        <circle cx="19" cy="12" r="1.9" />
      </svg>
      <svg class="nav-more-close" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
      </svg>
    </button>
  </div>
  <nav class="nav-sheet" data-nav-sheet aria-label="Mobile menu">
    <a href="/#work" class="nav-chip">Work</a>
    <!-- About hidden for now — section moving to Home after the AI Design Accelerator. Restore to bring back.
    <a href="/about" class="nav-chip">About</a>
    -->
    <a href="/HarshitSuneja_ProductDesigner_2026.pdf" target="_blank" rel="noopener" class="nav-chip">Resume</a>
  </nav>
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

// Mobile nav — tap ••• to open (dots → X), reveal Work/About/Resume chips + scrim
const navToggle = header?.querySelector('[data-nav-toggle]');
const navScrim = header?.querySelector('[data-nav-scrim]');
if (navToggle && header) {
  const closeNav = () => {
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  };
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = header.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navScrim?.addEventListener('click', closeNav);
  header.querySelectorAll('.nav-sheet .nav-chip').forEach((chip) => {
    chip.addEventListener('click', closeNav);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });
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
      heading: 'Deal intelligence for global energy operations',
      sub: 'Control cockpit for global energy operations',
      chips: ['Energy', 'Web Platform', 'B2B'],
      status: 'shipped',
      outcome: 'Cut deal review cycles across hundreds of live opportunities',
      hint: 'hundreds of deals · control cockpit',
      href: '/work/energy-deal-operations',
      imageClass: 'work-image-energy-deal',
      accent: 'var(--yellow-400)',
    },
    {
      sector: 'Healthcare • Product Design • Design System',
      label: 'Healthcare — Patient App',
      title: 'Designing AI Assisted Experiences for Preventive Healthcare',
      heading: 'Designing AI assisted experiences for preventive healthcare',
      sub: 'AI assisted experiences for preventive healthcare',
      chips: ['Healthcare', 'Product Design', 'Design System'],
      status: 'shipped',
      outcome: 'Shipped accessible AI diagnostics live to patients',
      hint: 'live · accessible diagnostics',
      href: '/work/healthcare-patient-experience',
      imageClass: 'work-image-healthcare-patient',
      accent: 'var(--green-200)',
    },
    {
      sector: 'Banking • Conversational UX',
      label: 'Banking — AI Assistant',
      title: 'Astha.ai: turning AI hesitation into banking self-service',
      heading: 'Astha.ai',
      sub: 'Turning AI hesitation into banking self-service',
      chips: ['Banking', 'Conversational UX', 'AI'],
      status: 'soon',
      outcome: 'Lifted assistant satisfaction from 7 to 9.2 NPS',
      hint: 'Astha.ai · NPS 7 → 9.2',
      href: '/work/banking-ai-self-service',
      imageClass: 'work-image-banking-ai',
      accent: 'var(--blue-100-c)',
      comingSoon: true, // detail page hidden for now; card shows "Coming Soon"
      hidden: true, // hidden from Home screen for now
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
      title: 'Research Copilot',
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
    { label: 'Email', hint: 'harshit.experiencedesign@gmail.com', href: 'mailto:harshit.experiencedesign@gmail.com' },
    { label: 'GitHub', hint: 'github.com/hsuneja5s', href: 'https://github.com/hsuneja5s' },
    { label: 'LinkedIn', hint: 'linkedin.com/in/harshitux', href: 'https://linkedin.com/in/harshitux' },
    { label: 'Resume', hint: 'email me for the latest PDF', href: 'mailto:harshit.experiencedesign@gmail.com?subject=Resume%20request' },
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
      const readCta = item.comingSoon
        ? `<span class="work-readcta work-readcta--soon">Coming soon</span>`
        : `<span class="work-readcta">Read case study <span class="work-readcta-arrow" aria-hidden="true">→</span></span>`;
      const inner = `
          <div class="work-image ${item.imageClass}" aria-hidden="true"></div>
          <h3 class="work-heading">${escapeHtml(item.heading || item.title)}</h3>
          <p class="work-sub">${escapeHtml(item.sub || item.outcome || '')}</p>
          ${readCta}`;
      return item.comingSoon
        ? `<div class="work-card work-card--disabled">${inner}</div>`
        : `<a href="${item.href}" class="work-card">${inner}</a>`;
    }).join('');
  }

  if (pluginGrid) {
    const items = PORTFOLIO_DATA.plugins;
    const first = items[0];
    pluginGrid.classList.add('accel-showcase');
    pluginGrid.innerHTML = `
      <div class="accel-list" role="tablist" aria-label="AI Design Accelerator plugins">
        ${items.map((item, i) => `
          <button type="button" class="accel-item${i === 0 ? ' is-active' : ''}" role="tab" aria-selected="${i === 0 ? 'true' : 'false'}" data-index="${i}">
            <span class="accel-item-title">${escapeHtml(item.title)}</span>
          </button>
        `).join('')}
      </div>
      <div class="accel-preview">
        <a class="accel-preview-media" href="${first.href}" data-accel-link aria-label="Open ${escapeHtml(first.title)}">
          <img class="accel-preview-img" src="${first.image}" alt="${escapeHtml(first.title)} preview" data-accel-img />
        </a>
        <div class="accel-preview-body">
          <h3 class="accel-preview-title" data-accel-title>${escapeHtml(first.title)}</h3>
          <p class="accel-preview-sub" data-accel-sub>${escapeHtml(first.summary)}</p>
          <a class="accel-preview-cta" href="${first.href}" data-accel-cta>Explore plugin <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    `;

    const buttons = pluginGrid.querySelectorAll('.accel-item');
    const imgEl = pluginGrid.querySelector('[data-accel-img]');
    const linkEl = pluginGrid.querySelector('[data-accel-link]');
    const titleEl = pluginGrid.querySelector('[data-accel-title]');
    const subEl = pluginGrid.querySelector('[data-accel-sub]');
    const ctaEl = pluginGrid.querySelector('[data-accel-cta]');
    let activeIndex = 0;

    const selectPlugin = (i) => {
      const item = items[i];
      if (!item || i === activeIndex) return;
      activeIndex = i;
      buttons.forEach((b, bi) => {
        const on = bi === i;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (imgEl) {
        imgEl.style.opacity = '0';
        setTimeout(() => {
          imgEl.src = item.image;
          imgEl.alt = `${item.title} preview`;
          imgEl.style.opacity = '1';
        }, 150);
      }
      if (linkEl) { linkEl.href = item.href; linkEl.setAttribute('aria-label', `Open ${item.title}`); }
      if (titleEl) titleEl.textContent = item.title;
      if (subEl) subEl.textContent = item.summary;
      if (ctaEl) ctaEl.href = item.href;
    };

    buttons.forEach((b) => {
      const idx = parseInt(b.dataset.index, 10);
      b.addEventListener('click', () => selectPlugin(idx));
      b.addEventListener('mouseenter', () => selectPlugin(idx));
    });
  }

  const logoTrack = document.querySelector('[data-logo-marquee]');
  if (logoTrack) {
    const logos = [
      'MF.png', 'MHA.png','Nykaa.png', 'PwC Logo.png', 'Torrent Diagnostics.png', 'shell_logo.svg.png',
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

    // Hero name typewriter animation hidden per user request — keeping it simple "Harshit"
    /*
    const heroNameEl = document.querySelector('.hero-name-animated');
    if (heroNameEl) {
      heroNameEl.innerHTML = '<span class="typewriter-name">Harshit</span>';
      const target = heroNameEl.querySelector('.typewriter-name');
      runTypewriter(target);
    }
    */
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

    // Wave once by default when the session loads (a little hello)
    setTimeout(() => {
      hand.classList.remove('is-waving');
      void hand.offsetWidth; // restart the wiggle animation
      hand.classList.add('is-waving');
    }, 600);
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

    // Hover: give the card a gentle sway (alternating side each time),
    // only when it's mostly settled so it stays soft — pairs with the drag.
    let hoverDir = 1;
    swing.addEventListener('pointerenter', () => {
      if (dragging) return;
      if (Math.abs(vel) < 0.6) {
        vel += 0.9 * hoverDir;
        hoverDir *= -1;
      }
    });
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
    const COPY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
    const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

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

    // kind: 'view' | 'soon' | 'copy'
    const show = (kind, text) => {
      pill.classList.remove('is-view', 'is-soon');
      if (kind === 'soon') {
        pill.classList.add('is-soon');
        icon.textContent = '🚧';
      } else {
        pill.classList.add('is-view');
        icon.innerHTML = kind === 'copy' ? COPY : EYE;
      }
      label.textContent = text;
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

    const bind = (selector, kind, text) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.addEventListener('pointerenter', (e) => { mx = e.clientX; my = e.clientY; show(kind, text); });
        el.addEventListener('pointerleave', hide);
      });
    };

    bind('a.work-card', 'view', 'View Case Study');
    bind('.plugin-bento-card', 'view', 'VIEW CASE STUDY');
    bind('.work-card--disabled', 'soon', 'COMING SOON');

    // Email: hover shows a "COPY EMAIL" pill; click copies + confirms.
    const emailLink = document.querySelector('[data-copy-email]');
    if (emailLink) {
      const email = emailLink.getAttribute('data-copy-email');
      emailLink.addEventListener('pointerenter', (e) => { mx = e.clientX; my = e.clientY; show('copy', 'COPY EMAIL'); });
      emailLink.addEventListener('pointerleave', hide);
      emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        const done = () => {
          icon.innerHTML = CHECK;
          label.textContent = 'COPIED!';
          setTimeout(() => {
            if (pill.classList.contains('is-visible')) { icon.innerHTML = COPY; label.textContent = 'COPY EMAIL'; }
          }, 1400);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(done).catch(() => { window.location.href = 'mailto:' + email; });
        } else {
          window.location.href = 'mailto:' + email;
        }
      });
    }
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

  // ============================================
  // TOOLS BALL-PILE — lightweight 2D physics.
  // Balls fall, collide, and pile up. Move the cursor through them to shove
  // them around (faster cursor = harder shove); tap one to make it bounce.
  // No external library — a small Verlet-ish integrator over ~7 circles.
  // ============================================
  (() => {
    const pile = document.querySelector('[data-tool-pile]');
    const arena = document.querySelector('.tools-zone');
    if (!pile || !arena) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(pile.querySelectorAll('.tool-ball'));
    if (!els.length) return;

    // Tuning
    const G = 0.7;            // gravity per frame
    const WALL_E = 0.55;      // wall bounciness
    const BALL_E = 0.72;      // ball-ball bounciness
    const AIR = 0.992;        // air drag
    const FLOOR_FRICTION = 0.9;
    const REST_V = 1.2;       // below this, a floored ball is considered resting
    const MAX_V = 46;
    const CURSOR_REACH = 26;  // extra px around a ball the cursor can touch
    const CURSOR_PUSH = 5;    // proximity shove strength
    const CURSOR_TRANSFER = 0.5; // how much cursor speed is imparted

    const balls = els.map((el) => {
      const r = (parseFloat(el.getAttribute('width')) || el.offsetWidth || 64) / 2;
      return { el, r, m: r * r, x: 0, y: 0, vx: 0, vy: 0, angle: 0 };
    });

    let W = 0, H = 0;
    const measure = () => {
      const rect = arena.getBoundingClientRect();
      W = rect.width; H = rect.height;
    };

    // Start as a loose pile hard against the bottom-right corner.
    const initPile = () => {
      let edge = W; // walk leftward from the right wall
      let row = 0, rowRightStart = W;
      balls.forEach((b, i) => {
        if (edge - b.r * 2 < W - 240) { row++; edge = rowRightStart; } // wrap into a new row after ~240px
        b.x = Math.max(b.r, edge - b.r);
        b.y = H - b.r - row * 70;
        edge -= b.r * 2 + 4;
        b.vx = 0; b.vy = 0;
      });
    };

    const clampInside = () => balls.forEach((b) => {
      b.x = Math.min(Math.max(b.r, b.x), Math.max(b.r, W - b.r));
      b.y = Math.min(Math.max(b.r, b.y), Math.max(b.r, H - b.r));
    });

    const render = () => balls.forEach((b) => {
      b.el.style.transform =
        `translate(${(b.x - b.r).toFixed(2)}px, ${(b.y - b.r).toFixed(2)}px) rotate(${b.angle.toFixed(2)}deg)`;
    });

    // Cursor tracking (arena-relative)
    let cx = -9999, cy = -9999, pcx = -9999, pcy = -9999, cvx = 0, cvy = 0, cursorInside = false;
    window.addEventListener('pointermove', (e) => {
      const rect = arena.getBoundingClientRect();
      cx = e.clientX - rect.left; cy = e.clientY - rect.top;
      cursorInside = cx >= -CURSOR_REACH && cx <= W + CURSOR_REACH && cy >= -CURSOR_REACH && cy <= H + CURSOR_REACH;
      wake();
    }, { passive: true });
    window.addEventListener('pointerleave', () => { cursorInside = false; });

    // Tap = bounce
    els.forEach((el, i) => el.addEventListener('click', () => {
      const b = balls[i];
      b.vy = -Math.max(20, Math.abs(b.vy) + 20);
      b.vx += (Math.random() - 0.5) * 8;
      wake();
    }));

    let visible = false, running = false, sleep = 0;
    const wake = () => {
      if (!running && visible && !reduceMotion) { running = true; sleep = 0; requestAnimationFrame(step); }
    };

    const step = () => {
      cvx = cx - pcx; cvy = cy - pcy; pcx = cx; pcy = cy;
      if (Math.abs(cvx) > 200) cvx = 0;   // ignore teleport-sized jumps
      if (Math.abs(cvy) > 200) cvy = 0;

      // Forces + integrate
      for (const b of balls) {
        b.vy += G;
        if (cursorInside) {
          const dx = b.x - cx, dy = b.y - cy, d = Math.hypot(dx, dy), reach = b.r + CURSOR_REACH;
          if (d < reach) {
            const nx = d > 0 ? dx / d : Math.random() - 0.5;
            const ny = d > 0 ? dy / d : Math.random() - 0.5;
            const push = (reach - d) / reach;
            b.vx += nx * push * CURSOR_PUSH + cvx * CURSOR_TRANSFER;
            b.vy += ny * push * CURSOR_PUSH + cvy * CURSOR_TRANSFER;
          }
        }
        b.vx *= AIR; b.vy *= AIR;
        b.vx = Math.max(-MAX_V, Math.min(MAX_V, b.vx));
        b.vy = Math.max(-MAX_V, Math.min(MAX_V, b.vy));
        b.x += b.vx; b.y += b.vy;
        b.angle += (b.vx / b.r) * 57.2958; // roll without slipping
      }

      // Ball-ball collisions (a couple of passes for stability)
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            const a = balls[i], c = balls[j];
            let dx = c.x - a.x, dy = c.y - a.y, dist = Math.hypot(dx, dy);
            const min = a.r + c.r;
            if (dist === 0) { dx = Math.random() - 0.5; dy = Math.random() - 0.5; dist = Math.hypot(dx, dy) || 1; }
            if (dist < min) {
              const nx = dx / dist, ny = dy / dist, overlap = min - dist, tot = a.m + c.m;
              a.x -= nx * overlap * (c.m / tot); a.y -= ny * overlap * (c.m / tot);
              c.x += nx * overlap * (a.m / tot); c.y += ny * overlap * (a.m / tot);
              const vn = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
              if (vn < 0) {
                const imp = -(1 + BALL_E) * vn / (1 / a.m + 1 / c.m);
                a.vx -= (imp * nx) / a.m; a.vy -= (imp * ny) / a.m;
                c.vx += (imp * nx) / c.m; c.vy += (imp * ny) / c.m;
              }
            }
          }
        }
      }

      // Walls / floor
      for (const b of balls) {
        if (b.x - b.r < 0) { b.x = b.r; b.vx = -b.vx * WALL_E; }
        else if (b.x + b.r > W) { b.x = W - b.r; b.vx = -b.vx * WALL_E; }
        if (b.y - b.r < 0) { b.y = b.r; b.vy = -b.vy * WALL_E; }
        else if (b.y + b.r > H) {
          b.y = H - b.r;
          b.vy = Math.abs(b.vy) < REST_V ? 0 : -b.vy * WALL_E;
          b.vx *= FLOOR_FRICTION;
          if (Math.abs(b.vx) < 0.08) b.vx = 0;
        }
      }

      render();

      // Sleep when everything has settled and the cursor is away
      let energy = 0;
      for (const b of balls) energy += b.vx * b.vx + b.vy * b.vy;
      sleep = (energy < 0.05 && !cursorInside) ? sleep + 1 : 0;
      if (sleep > 24 || !visible) { running = false; return; }
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) wake();
    }, { threshold: 0 });
    io.observe(arena);

    window.addEventListener('resize', () => { measure(); clampInside(); render(); wake(); });

    // Boot
    measure();
    initPile();
    clampInside();
    render();
    wake();
  })();

  // ============================================
  // FLOATING MASCOT — fixed to the viewport bottom while scrolling,
  // then parks just above the separator so it never covers the tools pile.
  // ============================================
  const dogFloat = document.querySelector('[data-dog-float]');
  const dogWrap = dogFloat && dogFloat.querySelector('.claude-gif-wrap');
  const dogSeparator = document.querySelector('.footer-separator');
  if (dogFloat && dogWrap && dogSeparator) {
    const PARK_GAP = 8;      // px of breathing room above the separator
    const FLOAT_BOTTOM = 0; // must match .dog-float bottom
    let ticking = false;
    const updateDog = () => {
      ticking = false;
      const dogHeight = dogWrap.offsetHeight;
      const sepDocTop = dogSeparator.getBoundingClientRect().top + window.scrollY;
      const floatBottomDoc = window.scrollY + window.innerHeight - FLOAT_BOTTOM;
      if (floatBottomDoc >= sepDocTop - PARK_GAP) {
        dogFloat.classList.add('is-parked');
        dogFloat.style.top = (sepDocTop - PARK_GAP - dogHeight) + 'px';
      } else {
        dogFloat.classList.remove('is-parked');
        dogFloat.style.top = '';
      }
    };
    const onScrollOrResize = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(updateDog); }
    };
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    updateDog();
  }
});

