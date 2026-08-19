// Pequeñas mejoras UX: año dinámico y foco accesible, y selector de tema claro/oscuro.
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;

  // Theme toggle
  const THEME_KEY = 'theme'; // 'light' or 'dark'
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  function applyTheme(theme){
    if(theme === 'light'){
      root.setAttribute('data-theme','light');
    } else {
      root.removeAttribute('data-theme'); // default is dark variables in :root
    }
    if(toggle){
      const isDark = theme !== 'light';
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.innerHTML = isDark ? moonIconSVG() : sunIconSVG();
    }
  }

  function moonIconSVG(){
    return `
      <svg class="icon icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>`;
  }
  function sunIconSVG(){
    return `
      <svg class="icon icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="currentColor" d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.8 1.8-1.8zM1 13h3v-2H1v2zm10 9h2v-3h-2v3zm7.24-1.84l1.79-1.8-1.79-1.79-1.8 1.8 1.8 1.79zM20 13h3v-2h-3v2zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0-6h-2v3h2V0zM4.24 19.16l1.8-1.8-1.8-1.79L2.45 17.4l1.79 1.76zM18.36 4.64l1.79-1.8-1.79-1.79-1.8 1.8 1.8 1.79z" />
      </svg>`;
  }

  function getPreferredTheme(){
    const saved = localStorage.getItem(THEME_KEY);
    if(saved) return saved;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function setTheme(theme){
    if(theme === 'light') localStorage.setItem(THEME_KEY,'light');
    else localStorage.removeItem(THEME_KEY);
    applyTheme(theme);
  }

  if(toggle){
    // initialize
    const current = getPreferredTheme();
    applyTheme(current);

    toggle.addEventListener('click', () => {
      const newTheme = (root.getAttribute('data-theme') === 'light') ? 'dark' : 'light';
      setTheme(newTheme);
    });

    // if user changes system theme and there's no saved pref, react
    if(window.matchMedia){
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if(!localStorage.getItem(THEME_KEY)){
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  // Mejora de accesibilidad: cuando se hace tab en enlaces, mostrar outline claro (gestión en CSS).
});
