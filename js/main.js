/**
 * EL EFECTO BULLET - Script Principal
 * Modo Claro / Estilo Refactoring Guru
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Modales de Profundización (Para mantener la Home limpia)
  const openModalBtns = document.querySelectorAll('.js-open-modal');
  const closeBtns = document.querySelectorAll('.modal-close');
  const overlays = document.querySelectorAll('.modal-overlay');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      overlays.forEach(m => m.classList.remove('active'));
      document.body.style.overflow = '';
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlays.forEach(m => m.classList.remove('active'));
      document.body.style.overflow = '';
    }
  });

  // 2. Copiado de Citación BibTeX
  const copyBtn = document.getElementById('copy-citation-btn');
  const bibtexText = `@techreport{fabian2026efectobullet,
  author       = {Fabian, Ariel},
  title        = {El Efecto Bullet: Deuda Cognitiva y la Ilusi\\'on de la Velocidad en la Era de la IA},
  institution  = {Zenodo},
  year         = {2026},
  month        = {oct},
  doi          = {10.5281/zenodo.23641059},
  url          = {https://doi.org/10.5281/zenodo.23641059}
}`;

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(bibtexText).then(() => {
        const orig = copyBtn.innerHTML;
        copyBtn.innerHTML = '✓ ¡Cita Copiada!';
        copyBtn.style.color = '#34d399';
        setTimeout(() => {
          copyBtn.innerHTML = orig;
          copyBtn.style.color = '';
        }, 2200);
      });
    });
  }
});
