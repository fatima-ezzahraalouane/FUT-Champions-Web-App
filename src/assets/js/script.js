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



// Références des champs et du menu déroulant
const positionSelect = document.getElementById('positionJoueur');
const paceLabel = document.querySelector('label[for="pace"]');
const shootingLabel = document.querySelector('label[for="shooting"]');
const passingLabel = document.querySelector('label[for="passing"]');
const dribblingLabel = document.querySelector('label[for="dribbling"]');
const defendingLabel = document.querySelector('label[for="defending"]');
const physicalLabel = document.querySelector('label[for="physical"]');

// Écouteur pour détecter les changements dans le menu déroulant
positionSelect.addEventListener('change', () => {
    const position = positionSelect.value;

    if (position === 'GK') {
        // Modifier les labels pour le gardien
        paceLabel.textContent = 'Diving';
        shootingLabel.textContent = 'Handling';
        passingLabel.textContent = 'Kicking';
        dribblingLabel.textContent = 'Reflexes';
        defendingLabel.textContent = 'Speed';
        physicalLabel.textContent = 'Positioning';
    } else {
        // Réinitialiser les labels pour les autres positions
        paceLabel.textContent = 'Pace';
        shootingLabel.textContent = 'Shooting';
        passingLabel.textContent = 'Passing';
        dribblingLabel.textContent = 'Dribbling';
        defendingLabel.textContent = 'Defending';
        physicalLabel.textContent = 'Physical';
    }
});
