
//pour la section des lignes pour le bus 


document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.route-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, index * 100);
    });
});
