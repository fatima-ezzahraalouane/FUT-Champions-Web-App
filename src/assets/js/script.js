// carousel
const carousel = document.querySelector('.carousel-wrapper');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let offset = 0;

nextBtn.addEventListener('click', () => {
    if (offset > -480) { // Limite maximale (5 rangees * 120px)
        offset -= 120; // Chaque clic fait defiler une rangee
        carousel.style.transform = `translateY(${offset}px)`;
    }
});

prevBtn.addEventListener('click', () => {
    if (offset < 0) { // Limite minimale
        offset += 120;
        carousel.style.transform = `translateY(${offset}px)`;
    }
});




// Sélectionne tous les boutons "+" et le modal
const addPlayerButtons = document.querySelectorAll('.add-player-btn');
const modal = document.getElementById('modal');
const cancelButton = document.getElementById('cancelButton');

// Fonction pour afficher le modal
addPlayerButtons.forEach((button) => {
    button.addEventListener('click', () => {
        modal.style.display = 'flex'; // Affiche le modal
    });
});

// Fonction pour fermer le modal
cancelButton.addEventListener('click', () => {
    modal.style.display = 'none'; // Cache le modal
});

// Fermer le modal en cliquant en dehors de la boîte
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});



