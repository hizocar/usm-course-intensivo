/* MathJax v3 config for MkDocs Material + arithmatex(generic=true) */
window.MathJax = {
    tex: {
      inlineMath: [['\\(', '\\)'], ['$', '$']],   // usa \( ... \) o $...$ en línea
      displayMath: [['\\[', '\\]'], ['$$', '$$']], // usa \[ ... ] o $$ ... $$ en bloque
      processEscapes: true,
      tags: 'ams'
    },
    options: {
      skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'] // evita code blocks
    }
  };
  
  // Re-typeset al cambiar de página con navigation.instant
  function typeset() {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }
  
  // Material (SPA) expone document$ cuando hay navegación instantánea
  if (typeof document$ !== 'undefined') {
    document$.subscribe(() => typeset());
  } else {
    document.addEventListener('DOMContentLoaded', typeset);
  }
  