/**
 * EL EFECTO BULLET - Script Principal
 * Modo Claro / Estilo Refactoring Guru
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Calculadora de Asimilación (10 + 10)
  const inputLocs = document.getElementById('calc-locs');
  const valLocs = document.getElementById('val-locs');
  const inputAiHours = document.getElementById('calc-ai-hours');
  const valAiHours = document.getElementById('val-ai-hours');
  const selectCrit = document.getElementById('calc-crit');

  const resAssimTime = document.getElementById('res-assim-time');
  const resTotalDelivery = document.getElementById('res-total-delivery');
  const resSpeedup = document.getElementById('res-speedup');
  const resRiskBadge = document.getElementById('res-risk-badge');

  function updateCalculator() {
    if (!inputLocs || !inputAiHours || !selectCrit) return;

    const locs = parseInt(inputLocs.value, 10);
    const aiHours = parseFloat(inputAiHours.value);
    const critLevel = selectCrit.value;

    valLocs.textContent = `${locs} LOC`;
    valAiHours.textContent = `${aiHours.toFixed(1)} h`;

    // Ritmos Fagan (1976) y Cohen (2006)
    let inspectionRate = 180;
    let manualFactor = 8;

    if (critLevel === 'alta') {
      inspectionRate = 140;
      manualFactor = 9;
    } else if (critLevel === 'critica') {
      inspectionRate = 100;
      manualFactor = 10;
    }

    const faganHours = locs / inspectionRate;
    const ruleHours = aiHours * 1.0;
    const requiredAssimHours = Math.max(ruleHours, faganHours);
    const totalDeliveryHours = aiHours + requiredAssimHours;

    const manualEquivalentHours = Math.max(aiHours * manualFactor, (locs / 25));
    const speedup = (manualEquivalentHours / totalDeliveryHours).toFixed(1);

    const assimH = Math.floor(requiredAssimHours);
    const assimM = Math.round((requiredAssimHours - assimH) * 60);
    resAssimTime.textContent = assimH > 0 ? `${assimH}h ${assimM}m` : `${assimM} min`;

    const totH = Math.floor(totalDeliveryHours);
    const totM = Math.round((totalDeliveryHours - totH) * 60);
    resTotalDelivery.textContent = `${totH}h ${totM}m`;

    resSpeedup.textContent = `${speedup}x más rápido`;

    if (requiredAssimHours > 3.0 || critLevel === 'critica') {
      resRiskBadge.textContent = 'Riesgo Crítico (Asimilación e Inspección Obligatoria)';
      resRiskBadge.style.color = '#dc2626';
    } else if (requiredAssimHours > 1.2 || critLevel === 'alta') {
      resRiskBadge.textContent = 'Riesgo Moderado (Revisión Detallada)';
      resRiskBadge.style.color = '#d97706';
    } else {
      resRiskBadge.textContent = 'Riesgo Bajo / Asimilable';
      resRiskBadge.style.color = '#059669';
    }
  }

  if (inputLocs) inputLocs.addEventListener('input', updateCalculator);
  if (inputAiHours) inputAiHours.addEventListener('input', updateCalculator);
  if (selectCrit) selectCrit.addEventListener('change', updateCalculator);
  updateCalculator();

  // 2. Modales de Profundización (Para que no esté todo en la home)
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

  // 3. Copiado de Citación BibTeX
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
