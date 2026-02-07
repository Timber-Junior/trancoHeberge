function toggleSchedules() {
  const hiddenSection = document.getElementById('hiddenSchedules');
  const toggleBtn = document.getElementById('toggleBtn');
  const btnText = toggleBtn.querySelector('.btn-text');
  const btnIcon = toggleBtn.querySelector('.toggle-icon');
  
  // Toggle la classe show
  hiddenSection.classList.toggle('show');
  toggleBtn.classList.toggle('active');
  
  // Changer le texte et l'icône
  if (hiddenSection.classList.contains('show')) {
    btnText.textContent = 'Voir moins d\'horaires';
    btnIcon.classList.remove('bi-chevron-down');
    btnIcon.classList.add('bi-chevron-up');
    
    // Scroll smooth vers les nouveaux éléments si besoin
    setTimeout(() => {
      const firstHidden = hiddenSection.querySelector('.schedule-item');
      if (firstHidden) {
        firstHidden.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 300);
    
  } else {
    btnText.textContent = 'Voir plus d\'horaires';
    btnIcon.classList.remove('bi-chevron-up');
    btnIcon.classList.add('bi-chevron-down');
    
    // Scroll vers le haut de la section
    document.querySelector('.schedules-section').scrollIntoView({ 
      behavior: 'smooth', 
      block: 'nearest' 
    });
  }
}

// Animation au scroll (optionnel)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observer les items visibles
document.querySelectorAll('.schedule-item').forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = `all 0.5s ease ${index * 0.1}s`;
  observer.observe(item);
});