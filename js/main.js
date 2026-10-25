/**
 * EL EFECTO BULLET - Script Principal
 * Funcionalidades interactivas: Calculadora 10+10, Visor de Slides, Copiado de Citas
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Nav Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    // Cerrar al clickear enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }

  // 3. Calculadora de Asimilación y Regla 10 + 10
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
    const critLevel = selectCrit.value; // 'normal', 'alta', 'critica'

    valLocs.textContent = `${locs} LOC`;
    valAiHours.textContent = `${aiHours.toFixed(1)} h`;

    // Parámetros basados en Fagan (1976), Cohen (2006) y Regla 10+10
    // Lógica normal: 180 LOC/hora. Alta: 140 LOC/hora. Crítica: 100 LOC/hora.
    let inspectionRate = 180;
    let manualBaselineFactor = 8; // En promedio, manual tomaría 8 a 10x más que IA pura
    let riskMultiplier = 1.0;

    if (critLevel === 'alta') {
      inspectionRate = 140;
      manualBaselineFactor = 9;
      riskMultiplier = 1.3;
    } else if (critLevel === 'critica') {
      inspectionRate = 100;
      manualBaselineFactor = 10;
      riskMultiplier = 1.6;
    }

    // Horas mínimas requeridas de asimilación e inspección según Fagan
    const faganHours = locs / inspectionRate;

    // Regla 10+10: mínimo igualar las horas de generación IA en código crítico
    const ruleHours = aiHours * 1.0;

    // Tomamos el mayor entre la pauta 10+10 y la inspección Fagan para no subestimar
    const requiredAssimHours = Math.max(ruleHours, faganHours);
    const totalDeliveryHours = aiHours + requiredAssimHours;
    
    // Estimación manual equivalente (sin IA)
    const estimatedManualHours = Math.max(aiHours * manualBaselineFactor, (locs / 25)); // 25 LOC/h escritura manual
    const speedupFactor = (estimatedManualHours / totalDeliveryHours).toFixed(1);

    // Formateo de horas y minutos
    const assimH = Math.floor(requiredAssimHours);
    const assimM = Math.round((requiredAssimHours - assimH) * 60);
    resAssimTime.textContent = assimH > 0 ? `${assimH}h ${assimM}m` : `${assimM} min`;

    const totalH = Math.floor(totalDeliveryHours);
    const totalM = Math.round((totalDeliveryHours - totalH) * 60);
    resTotalDelivery.textContent = `${totalH}h ${totalM}m`;

    resSpeedup.textContent = `${speedupFactor}x más rápido`;

    // Evaluación de riesgo de Deuda Cognitiva si se aprueba sin asimilar
    if (requiredAssimHours > 3.0 || critLevel === 'critica') {
      resRiskBadge.textContent = 'Riesgo Crítico de Deuda Cognitiva';
      resRiskBadge.style.color = '#fb7185';
      resRiskBadge.style.borderColor = 'rgba(251, 113, 133, 0.4)';
      resRiskBadge.style.backgroundColor = 'rgba(251, 113, 133, 0.1)';
    } else if (requiredAssimHours > 1.2 || critLevel === 'alta') {
      resRiskBadge.textContent = 'Riesgo Moderado (Asimilación Obligatoria)';
      resRiskBadge.style.color = '#fbbf24';
      resRiskBadge.style.borderColor = 'rgba(251, 191, 36, 0.4)';
      resRiskBadge.style.backgroundColor = 'rgba(251, 191, 36, 0.1)';
    } else {
      resRiskBadge.textContent = 'Riesgo Bajo / Asimilable';
      resRiskBadge.style.color = '#34d399';
      resRiskBadge.style.borderColor = 'rgba(52, 211, 153, 0.4)';
      resRiskBadge.style.backgroundColor = 'rgba(52, 211, 153, 0.1)';
    }
  }

  if (inputLocs) inputLocs.addEventListener('input', updateCalculator);
  if (inputAiHours) inputAiHours.addEventListener('input', updateCalculator);
  if (selectCrit) selectCrit.addEventListener('change', updateCalculator);
  updateCalculator();

  // 4. Modal para Diapositivas
  const openSlidesBtn = document.querySelectorAll('.js-open-slides');
  const modalOverlay = document.getElementById('slides-modal');
  const closeSlidesBtn = document.getElementById('close-slides-modal');
  const slidesIframe = document.getElementById('slides-iframe');

  if (modalOverlay) {
    openSlidesBtn.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (slidesIframe && !slidesIframe.src) {
          slidesIframe.src = 'docs/presentacion.html';
        }
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeSlidesBtn) {
      closeSlidesBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 5. Citaciones académicas dinámicas (BibTeX, APA, IEEE, RIS)
  const citations = {
    bibtex: `@techreport{fabian2026efectobullet,
  author       = {Fabian, Ariel},
  title        = {El Efecto Bullet: Deuda Cognitiva y la Ilusi\\'on de la Velocidad en la Era de la IA},
  institution  = {Zenodo},
  year         = {2026},
  month        = {oct},
  doi          = {10.5281/zenodo.23641059},
  url          = {https://doi.org/10.5281/zenodo.23641059}
}`,
    apa: `Fabian, A. (2026). El Efecto Bullet: Deuda Cognitiva y la Ilusión de la Velocidad en la Era de la IA. Zenodo. https://doi.org/10.5281/zenodo.23641059`,
    ieee: `A. Fabian, "El Efecto Bullet: Deuda Cognitiva y la Ilusión de la Velocidad en la Era de la IA," Zenodo, Oct. 2026. doi: 10.5281/zenodo.23641059.`,
    ris: `TY  - RPRT
AU  - Fabian, Ariel
TI  - El Efecto Bullet: Deuda Cognitiva y la Ilusión de la Velocidad en la Era de la IA
PY  - 2026
DO  - 10.5281/zenodo.23641059
UR  - https://doi.org/10.5281/zenodo.23641059
PB  - Zenodo
ER  - `
  };

  const citationCode = document.getElementById('citation-code');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const copyBtn = document.getElementById('copy-citation-btn');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const format = btn.getAttribute('data-format');
      if (citationCode && citations[format]) {
        citationCode.textContent = citations[format];
      }
    });
  });

  if (copyBtn && citationCode) {
    copyBtn.addEventListener('click', () => {
      const text = citationCode.textContent;
      navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `✓ Copiado`;
        copyBtn.style.color = '#34d399';
        copyBtn.style.borderColor = '#34d399';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.style.color = '';
          copyBtn.style.borderColor = '';
        }, 2200);
      }).catch(err => {
        console.error('Error al copiar al portapapeles', err);
      });
    });
  }

  // 6. Conmutador de Escenarios (Tríptico de Deuda Cognitiva)
  const scenarioTabs = document.querySelectorAll('.scenario-tab');
  const scenarioViews = document.querySelectorAll('.scenario-view');

  scenarioTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      
      scenarioTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      scenarioViews.forEach(view => {
        if (view.id === targetId) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });
    });
  });

  // Toggles de "Ver más detalles del paper" en cada escenario
  const deepBtns = document.querySelectorAll('.scenario-deep-btn');
  deepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const drawer = btn.nextElementSibling;
      if (drawer && drawer.classList.contains('scenario-deep-drawer')) {
        drawer.classList.toggle('open');
        const isOpen = drawer.classList.contains('open');
        btn.innerHTML = isOpen ? `▲ Ocultar detalles` : `🔍 Ver detalles en el paper`;
      }
    });
  });
});
