// Données des bus disponibles
const buses = [
    {
        id: 1,
        name: "Bus Express Gold",
        capacity: 50,
        available: 5,
        image: "../assets/sectionPhoto.png",
        features: ["WiFi", "Climatisation", "Toilettes"]
    },
    {
        id: 2,
        name: "Bus Confort Premium",
        capacity: 45,
        available: 3,
        image: "../assets/sectionPhoto.png",
        features: ["WiFi", "Snack Bar", "Sièges Inclinables"]
    },
    {
        id: 3,
        name: "Bus Standard",
        capacity: 60,
        available: 8,
        image: "../assets/sectionPhoto.png",
        features: ["Climatisation", "Sièges Confortables"]
    },
    {
        id: 4,
        name: "Bus VIP Deluxe",
        capacity: 30,
        available: 2,
        image: "../assets/sectionPhoto.png",
        features: ["WiFi", "Snack Bar", "Sièges Massage", "Toilettes", "Douche"]
    }
];

// Données des arrêts et distances
const routes = {
    "kinshasa-center": { name: "Kinshasa Centre", distance: 0 },
    "ndjili": { name: "Ndjili", distance: 2 },
    "kasavubu": { name: "Kasavubu", distance: 1.5 },
    "kin-mall": { name: "Kin Mall", distance: 1 },
    "njili-airport": { name: "Aéroport Ndjili", distance: 3 }
};

// Prix par unité de distance (en $)
const PRICE_PER_UNIT = 1;

// Fonction pour charger les bus disponibles
function loadBuses() {
    const busesList = document.getElementById('busesList');
    busesList.innerHTML = '';
    
    buses.forEach(bus => {
        const busCard = document.createElement('div');
        busCard.className = 'col-lg-3 col-md-6 mb-4';
        busCard.innerHTML = `
            <div class="card bus-card h-100" style="position: relative;">
                <span class="available-badge">${bus.available} Disponible(s)</span>
                <img src="${bus.image}" class="card-img-top" alt="${bus.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${bus.name}</h5>
                    <p class="text-muted mb-2">
                        <strong>Capacité:</strong> ${bus.capacity} passagers
                    </p>
                    <div class="mb-3">
                        <strong>Équipements:</strong>
                        <div class="mt-2">
                            ${bus.features.map(f => `<span class="badge bg-info me-1 mb-1">${f}</span>`).join('')}
                        </div>
                    </div>
                    <button class="btn btn-primary w-100" onclick="selectBus(${bus.id})">
                        Réserver
                    </button>
                </div>
            </div>
        `;
        busesList.appendChild(busCard);
    });
}

// Fonction pour charger les informations des arrêts
function loadRoutes() {
    const routesList = document.getElementById('routesList');
    routesList.innerHTML = '';
    
    for (const [key, route] of Object.entries(routes)) {
        const routeCard = document.createElement('div');
        routeCard.className = 'col-md-4 col-lg-2 mb-3';
        const price = route.distance * PRICE_PER_UNIT;
        routeCard.innerHTML = `
            <div class="card text-center" style="border-radius: 10px; border: 2px solid #e0e0e0;">
                <div class="card-body p-3">
                    <h6 class="card-title">${route.name}</h6>
                    <p class="text-muted small mb-2">
                        <strong>${route.distance}</strong> unités
                    </p>
                    <p class="text-info fw-bold">
                        À partir de ${price.toFixed(2)} $
                    </p>
                </div>
            </div>
        `;
        routesList.appendChild(routeCard);
    }
}

// Fonction pour sélectionner un bus
function selectBus(busId) {
    const bus = buses.find(b => b.id === busId);
    alert(`Vous avez sélectionné: ${bus.name}\n\nContinuer avec ce bus pour réserver votre trajet.`);
}

// Fonction pour calculer le prix
function calculatePrice() {
    const departure = document.getElementById('departure').value;
    const destination = document.getElementById('destination').value;
    const passengers = parseInt(document.getElementById('passengers').value) || 1;
    const departureDate = document.getElementById('departureDate').value;
    
    // Validation
    if (!departure || !destination) {
        alert('Veuillez sélectionner un point de départ et une destination');
        return;
    }
    
    if (departure === destination) {
        alert('Le point de départ et la destination doivent être différents');
        return;
    }
    
    if (!departureDate) {
        alert('Veuillez sélectionner une date de départ');
        return;
    }
    
    if (passengers < 1 || passengers > 50) {
        alert('Le nombre de passagers doit être entre 1 et 50');
        return;
    }
    
    // Calcul de la distance (simplifié)
    const departureDistance = routes[departure].distance;
    const destinationDistance = routes[destination].distance;
    const distance = Math.abs(destinationDistance - departureDistance);
    
    // Calcul du prix (entre 1$ et 5$)
    const basePrice = Math.max(1, distance * PRICE_PER_UNIT);
    const totalPrice = basePrice * passengers;
    const pricePerPassenger = basePrice;
    
    // Affichage du résultat
    document.getElementById('priceDisplay').style.display = 'block';
    document.getElementById('totalPrice').textContent = `${totalPrice} $`;
    document.getElementById('pricePerPassenger').textContent = `${pricePerPassenger} $`;
    
    // Scroll vers le résultat
    document.getElementById('priceDisplay').scrollIntoView({ behavior: 'smooth' });
}

// Fonction pour définir la date minimale à aujourd'hui
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departureDate').min = today;
    document.getElementById('departureDate').value = today;
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    loadBuses();
    loadRoutes();
    setMinDate();
    
    // Event listener pour le calcul automatique
    document.getElementById('passengers').addEventListener('change', function() {
        const priceDisplay = document.getElementById('priceDisplay');
        if (priceDisplay.style.display !== 'none') {
            calculatePrice();
        }
    });
});

// Touches Enter pour calculer
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculatePrice();
    }
});