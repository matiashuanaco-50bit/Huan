// Año dinámico y toggle de tema (persistencia en localStorage)
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;

  const THEME_KEY = 'theme-preference';
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    // theme: 'light' | 'dark'
    root.setAttribute('data-theme', theme);
    if (toggle) toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  // Inicializa tema
  const initial = getPreferredTheme();
  applyTheme(initial);

  // Escucha cambios en el toggle
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* si el navegador bloquea storage */ }
    });

    // Soporte accesible: Enter y Space
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      }
    });
  }

  // Opcional: reaccionar a cambios de preferencia del sistema (si no hay preferencia guardada)
  try {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener?.('change', (e) => {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved !== 'light' && saved !== 'dark') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  } catch (e) { /* navegadores antiguos */ }
});
