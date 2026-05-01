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
// COMMAND PALETTE (⌘K)
// ============================================
const overlay = document.getElementById('cmdkOverlay');
const input = document.getElementById('cmdkInput');
const results = document.getElementById('cmdkResults');
const openBtn = document.getElementById('openCmdK');

const ITEMS = [
  { tag: 'Work',  label: 'Adobe Token System',     hint: 'semantic tokens · theming',   href: '#' },
  { tag: 'Work',  label: 'AI Component Critic',    hint: 'in-Figma copilot',            href: '#' },
  { tag: 'Work',  label: 'Token Forge',            hint: 'side project · 4k MAU',       href: '#' },
  { tag: 'Work',  label: 'Property Portfolio',     hint: 'investor watchlist',          href: '#' },
  { tag: 'Play',  label: 'Storybook Auditor',      hint: 'system-health report',        href: '#' },
  { tag: 'Play',  label: 'Prompt Garden',          hint: 'design-eng prompts',          href: '#' },
  { tag: 'Play',  label: 'Semantic Palette',       hint: 'WCAG palette generator',      href: '#' },
  { tag: 'Page',  label: 'About',                  hint: 'who I am',                    href: '#' },
  { tag: 'Page',  label: 'Under the hood',         hint: 'how this site is built',      href: '#' },
  { tag: 'Page',  label: 'Now',                    hint: 'what I am working on',        href: '#' },
  { tag: 'Link',  label: 'GitHub',                 hint: 'github.com/harshit',          href: 'https://github.com' },
  { tag: 'Link',  label: 'LinkedIn',               hint: 'linkedin.com/in/harshitux',   href: 'https://linkedin.com' },
  { tag: 'Link',  label: 'X (Twitter)',            hint: '@harshit',                    href: 'https://x.com' },
  { tag: 'Link',  label: 'Instagram',              hint: '@harshit',                    href: 'https://instagram.com' },
  { tag: 'Action',label: 'Toggle theme',           hint: 'switch light / dark',         action: 'toggleTheme' },
];

let activeIndex = 0;

const fuzzyMatch = (q, s) => {
  if (!q) return true;
  const qq = q.toLowerCase();
  return s.toLowerCase().includes(qq);
};

const render = () => {
  const q = input.value.trim();
  const filtered = ITEMS.filter(i =>
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
      <span class="cmdk-result-hint" style="color: var(--text-tertiary); font-size: 13px; margin-left: 8px;">${escapeHtml(item.hint)}</span>
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

  const filtered = ITEMS.filter(i =>
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
