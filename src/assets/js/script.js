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


// Références pour le pop-up
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupClose = document.getElementById('popup-close');

// Fonction pour afficher le pop-up
function showPopup(message) {
    popupMessage.textContent = message;
    popup.classList.remove('hidden'); // Affiche le pop-up
}

// Fonction pour fermer le pop-up
popupClose.addEventListener('click', () => {
    popup.classList.add('hidden'); // Cache le pop-up
});

// Fonction pour valider les champs avec regex
function isValidAlphabetInput(value) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    return regex.test(value.trim());
}

//modal
const addplayer = document.getElementById('addplayer');
const modal = document.getElementById('modal');
const cancelButton = document.getElementById('cancelButton');
const addButton = document.getElementById('addButton');


addplayer.addEventListener('click', () => {
    modal.style.display = 'flex';
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





// Charger le fichier JSON et chercher le joueur
document.getElementById('autofill').addEventListener('click', () => {
    fetch('./players.json')
        .then(response => response.json())
        .then(data => {
            const nameInput = document.getElementById('nom').value.trim().toLowerCase();
            const player = data.players.find(p => p.name.toLowerCase() === nameInput);

            if (player) {
                document.getElementById('nationality').value = player.nationality || '';
                document.getElementById('club').value = player.club || '';
                document.getElementById('photo').value = player.photo || '';
                document.getElementById('flag').value = player.flag || '';
                document.getElementById('logoJoueur').value = player.logo || '';
                document.getElementById('positionJoueur').value = player.position || '';
                document.getElementById('rating').value = player.rating || '';
                document.getElementById('pace').value = player.pace || '';
                document.getElementById('shooting').value = player.shooting || '';
                document.getElementById('passing').value = player.passing || '';
                document.getElementById('dribbling').value = player.dribbling || '';
                document.getElementById('defending').value = player.defending || '';
                document.getElementById('physical').value = player.physical || '';

                // document.getElementById('diving').value = player.diving || '';
                // document.getElementById('handling').value = player.handling || '';
                // document.getElementById('kicking').value = player.kicking || '';
                // document.getElementById('reflexes').value = player.reflexes || '';
                // document.getElementById('speed').value = player.speed || '';
                // document.getElementById('positioning').value = player.positioning || '';
                showPopup(`Les informations de ${player.name} ont été remplies.`);
            } else {
                showPopup("Aucun joueur trouvé avec ce nom.");
            }
        })
        .catch(error => {
            console.error("Erreur lors du chargement du fichier JSON : ", error);
            showPopup("Une erreur s'est produite.");
        });
});


// Ajouter un joueur sur le terrain
document.getElementById('addButton').addEventListener('click', () => {
    // Récupérer les données du formulaire
    const playerName = document.getElementById('nom').value.trim();
    const playerPhoto = document.getElementById('photo').value.trim();
    const playerPosition = document.getElementById('positionJoueur').value.trim();
    const playerRating = document.getElementById('rating').value.trim();
    const playerNationality = document.getElementById('nationality').value.trim();
    const playerFlag = document.getElementById('flag').value.trim();
    const playerClub = document.getElementById('club').value.trim();
    const playerLogo = document.getElementById('logoJoueur').value.trim();

    // Récupérer les statistiques
    const pace = document.getElementById('pace').value.trim();
    const shooting = document.getElementById('shooting').value.trim();
    const passing = document.getElementById('passing').value.trim();
    const dribbling = document.getElementById('dribbling').value.trim();
    const defending = document.getElementById('defending').value.trim();
    const physical = document.getElementById('physical').value.trim();

    // const diving = document.getElementById('diving').value.trim();
    // const handling = document.getElementById('handling').value.trim();
    // const kicking = document.getElementById('kicking').value.trim();
    // const reflexes = document.getElementById('reflexes').value.trim();
    // const speed = document.getElementById('speed').value.trim();
    // const positioning = document.getElementById('positioning').value.trim();

    // Validation des champs avec regex
    if (!isValidAlphabetInput(playerName)) {
        showPopup("Le champ 'Nom' doit contenir uniquement des lettres et des espaces.");
        return;
    }

    if (!isValidAlphabetInput(playerNationality)) {
        showPopup("Le champ 'Nationality' doit contenir uniquement des lettres et des espaces.");
        return;
    }

    if (!isValidAlphabetInput(playerClub)) {
        showPopup("Le champ 'Club' doit contenir uniquement des lettres et des espaces.");
        return;
    }

    // Validation des champs obligatoires avec le pop-up
    if (!playerName || !playerPhoto || !playerPosition || !playerRating || !playerNationality || !playerFlag || !playerClub || !playerLogo) {
        showPopup("Veuillez remplir tous les champs avant de soumettre.");
        return;
    }

    // Trouver la position correspondante sur le terrain
    const positionCard = document.querySelector(`.player-card[data-position="${playerPosition}"]`);

    if (positionCard) {
        //Ajouter la carte gold
        positionCard.classList.add("player-card-gold");

        // Remplacer le contenu de la position avec la carte du joueur
        positionCard.innerHTML = `
            <div class="card-header">
                <div class="rating">${playerRating}</div>
                <div class="position">${playerPosition}</div>
            </div>
            <div class="player-photo-container">
                <img src="${playerPhoto}" alt="Photo de ${playerName}" class="player-photo">
            </div>
            <div class="player-name">${playerName}</div>
            <div class="club-info">
                <img src="${playerFlag}" alt="Drapeau ${playerNationality}" class="flag">
                <img src="${playerLogo}" alt="Logo du club ${playerClub}" class="club-logo">
            </div>

            <div class="stats">
            <div class="statsp">
              <div>PAC</div>
              <div>${pace}</div>
            </div>
            <div class="statsp">
              <div>SHO</div>
              <div>${shooting}</div>
            </div>
            <div class="statsp">
              <div>PAS</div>
              <div>${passing}</div>
            </div>
            <div class="statsp">
              <div>DRI</div>
              <div>${dribbling}</div>
            </div>
            <div class="statsp">
              <div>DEF</div>
              <div>${defending}</div>
            </div>
            <div class="statsp">
              <div>PHY</div>
              <div>${physical}</div>
            </div>
            </div>
        `;

        //<div class="player-card-gold span">
        //    <span>${playerPosition}</span>
        //  </div>


        //   <div class="stats">
        //     <div class="statsp">
        //       <div>PAC</div>
        //       <div>${diving}</div>
        //     </div>
        //     <div class="statsp">
        //       <div>SHO</div>
        //       <div>${handling}</div>
        //     </div>
        //     <div class="statsp">
        //       <div>PAS</div>
        //       <div>${kicking}</div>
        //     </div>
        //     <div class="statsp">
        //       <div>DRI</div>
        //       <div>${reflexes}</div>
        //     </div>
        //     <div class="statsp">
        //       <div>DEF</div>
        //       <div>${speed}</div>
        //     </div>
        //     <div class="statsp">
        //       <div>PHY</div>
        //       <div>${positioning}</div>
        //     </div>
        //     </div>

        showPopup(`Le joueur ${playerName} a été ajouté à la position ${playerPosition}.`);
        document.getElementById('modal').style.display = 'none'; // Fermer le modal

        // Réinitialiser les champs du formulaire
        document.querySelector('form').reset();
    } else {
        showPopup("Position introuvable sur le terrain.");
    }
});
