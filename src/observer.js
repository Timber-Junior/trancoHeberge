
const elements = document.querySelectorAll('.observe');

// Créer l'observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.1 // déclenche quand 10% est visible
});

// Attacher l'observer à chaque élément
elements.forEach(el => observer.observe(el));

