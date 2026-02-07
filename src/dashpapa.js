
        // Animation stats
        window.addEventListener('load', () => {
            document.querySelectorAll('.stat-card').forEach((card, index) => {
                setTimeout(() => {
                    animateValue(card);
                }, index * 200);
            });
        });

        function animateValue(element) {
            const valueElement = element.querySelector('.stat-value');
            const target = parseInt(valueElement.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    valueElement.textContent = target.toLocaleString() + (target === 500 ? '' : '+');
                    clearInterval(timer);
                } else {
                    valueElement.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        }

        // Voir arrêt
        function voirArret() {
            const select = document.getElementById('arretSelect');
            const info = document.getElementById('arretInfo');
            
            if (select.value) {
                info.classList.remove('d-none');
                info.style.animation = 'slideUp 0.4s ease';
            }
        }

        // Filter routes
        function filterRoutes(type) {
            const items = document.querySelectorAll('.route-item');
            items.forEach(item => {
                if (type === 'all' || item.dataset.type === type) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // Calculate price
        function calculatePrice() {
            const display = document.getElementById('priceDisplay');
            const total = document.getElementById('totalPrice');
            const per = document.getElementById('pricePerPassenger');
            
            // Simulation
            const price = 500;
            const passengers = parseInt(document.getElementById('passengers').value) || 1;
            const totalPrice = price * passengers;
            
            total.textContent = totalPrice.toLocaleString() + ' fc';
            per.textContent = price.toLocaleString() + ' fc';
            
            display.style.display = 'block';
            display.style.animation = 'slideUp 0.5s ease';
        }

        function reserver() {
            alert('Redirection vers la page de réservation...');
        }