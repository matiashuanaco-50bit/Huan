// Pequeñas mejoras UX: año dinámico y foco accesible.
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;

  // Mejora de accesibilidad: cuando se hace tab en enlaces, mostrar outline claro (gestión en CSS).
});
