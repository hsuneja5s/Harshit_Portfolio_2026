// ============================================
// THEME TOGGLE
// ============================================
const root = document.documentElement;
const lightBtn = document.getElementById('themeLight');
const darkBtn = document.getElementById('themeDark');

const applyTheme = (mode) => {
  root.setAttribute('data-theme', mode);
  localStorage.setItem('theme', mode);
  lightBtn.classList.toggle('active', mode === 'light');
  darkBtn.classList.toggle('active', mode === 'dark');
};

// initialize from saved preference, falling back to system
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

lightBtn.addEventListener('click', () => applyTheme('light'));
darkBtn.addEventListener('click', () => applyTheme('dark'));

// ============================================
// HEADER SCROLL STATE
// ============================================
const header = document.querySelector('.site-header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ============================================
// PORTFOLIO CONTENT REGISTRY
// ============================================
const PORTFOLIO_DATA = {
  work: [
    {
      sector: 'Energy',
      label: 'Energy — Deal Pipeline',
      title: 'Deal intelligence for global energy operations',
      hint: 'hundreds of deals · control cockpit',
      href: '/work/energy-deal-operations',
      imageClass: 'work-image-energy-deal',
    },
    {
      sector: 'Public Sector',
      label: 'Public Sector — Citizen Services',
      title: 'Designing citizen trust into a national platform',
      hint: 'national citizen services · NDA-protected',
      href: '/work/public-sector-citizen-services',
      imageClass: 'work-image-public-sector',
    },
    {
      sector: 'Banking',
      label: 'Banking — AI Assistant',
      title: 'AI banking assistant — turning AI hesitation into self-service',
      hint: 'AI banking assistant · NPS 4.7 → 9.2',
      href: '/work/banking-ai-self-service',
      imageClass: 'work-image-banking-ai',
    },
    {
      sector: 'Banking',
      label: 'Banking — Flow Redesign',
      title: 'The economics of fewer decisions',
      hint: 'guided, error-proof flows',
      href: '/work/retail-banking-onboarding',
      imageClass: 'work-image-retail-banking',
      hidden: true,
    },
    {
      sector: 'Healthcare',
      label: 'Healthcare — Patient App',
      title: 'Designing AI Assisted Experiences for Preventive Healthcare',
      hint: 'live · accessible diagnostics',
      href: '/work/healthcare-patient-experience',
      imageClass: 'work-image-healthcare-patient',
    },
    {
      sector: 'Commerce',
      label: 'Commerce — Ad Operations',
      title: 'From approval queues to self-serve campaign management',
      hint: 'self-serve ads console · B2B',
      href: '/work/commerce-ad-operations',
      imageClass: 'work-image-commerce-ads',
    },
  ],
  plugins: [
    {
      title: 'PwC × Research Assistant',
      hint: 'PRD → IA, journeys, personas, wireframes',
      href: '/plugins/pwc-research-assistant',
      image: '/images/plugins/Research%20Assistance.png',
      summary: "Drop in a PRD. Get IA, personas, user journeys, and wireframes on canvas — grounded in the source document. Devil's advocate mode surfaces the gaps before your review meeting does.",
      featured: true,
    },
    {
      title: 'CLAUDE.md Exporter',
      hint: 'design system → Claude Code',
      href: '/plugins/claude-md-exporter',
      image: '/images/plugins/Claude_md.png',
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
  ...PORTFOLIO_DATA.work.filter(item => !item.hidden).map(item => ({ tag: 'Work', label: item.label, hint: item.hint, href: item.href })),
  ...PORTFOLIO_DATA.plugins.map(item => ({ tag: 'Plugin', label: item.title, hint: item.hint, href: item.href })),
  ...PORTFOLIO_DATA.pages.map(item => ({ tag: 'Page', ...item })),
  ...PORTFOLIO_DATA.links.map(item => ({ tag: 'Link', ...item })),
  { tag: 'Action', label: 'Toggle theme', hint: 'switch light / dark', action: 'toggleTheme' },
];

const renderHomeCollections = () => {
  const workGrid = document.querySelector('[data-portfolio-work]');
  const pluginGrid = document.querySelector('[data-portfolio-plugins]');

  if (workGrid) {
    workGrid.innerHTML = PORTFOLIO_DATA.work.filter(item => !item.hidden).map(item => `
      <a href="${item.href}" class="work-card">
        <div class="work-meta">
          <p class="work-tag">${escapeHtml(item.sector)}</p>
          <h3 class="work-title">${escapeHtml(item.title)}</h3>
        </div>
        <div class="work-image ${item.imageClass}" aria-hidden="true"></div>
        <div class="work-card-overlay" aria-hidden="true"><span class="work-card-cta">View case</span></div>
      </a>
    `).join('');
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

openBtn.addEventListener('click', openPalette);

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
  // IDENTITY HEADER TYPEWRITER ANIMATION
  // ============================================
  function initHeaderTypewriter() {
    const identityNameEl = document.querySelector('.identity-name');
    if (!identityNameEl) return;

    // Render only the animated "Harshit" as requested.
    identityNameEl.innerHTML = '<span class="typewriter-name">Harshit</span>';
    
    const target = identityNameEl.querySelector('.typewriter-name');
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
  initHeaderTypewriter();

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

