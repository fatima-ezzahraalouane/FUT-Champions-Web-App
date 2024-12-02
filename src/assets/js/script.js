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

// Fonction pour valider un nombre entre 0 et 100
function isValidStat(value) {
    const regex = /^(100|[0-9]{1,2})$/; // Accepte 0-100
    return regex.test(value.trim());
}

// Fonction pour vérifier si une URL se termine par .png
function isValidPngUrl(value) {
    const regex = /^https:\/\/.*\.(png)$/i; // Vérifie que l'URL commence par http(s):// et se termine par .png
    return regex.test(value.trim());
}

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
                // Remplir les champs communs
                document.getElementById('nationality').value = player.nationality || '';
                document.getElementById('club').value = player.club || '';
                document.getElementById('photo').value = player.photo || '';
                document.getElementById('flag').value = player.flag || '';
                document.getElementById('logoJoueur').value = player.logo || '';
                document.getElementById('positionJoueur').value = player.position || '';
                document.getElementById('rating').value = player.rating || '';

                // Vérifier si le joueur est un gardien (GK)
                if (player.position === 'GK') {
                    document.getElementById('diving').value = player.diving || ''; // Diving
                    document.getElementById('handling').value = player.handling || ''; // Handling
                    document.getElementById('kicking').value = player.kicking || ''; // Kicking
                    document.getElementById('reflexes').value = player.reflexes || ''; // Reflexes
                    document.getElementById('speed').value = player.speed || ''; // Speed
                    document.getElementById('positioning').value = player.positioning || ''; // Positioning
                } else {
                    // Si ce n'est pas un GK, utiliser les statistiques standards
                    document.getElementById('pace').value = player.pace || '';
                    document.getElementById('shooting').value = player.shooting || '';
                    document.getElementById('passing').value = player.passing || '';
                    document.getElementById('dribbling').value = player.dribbling || '';
                    document.getElementById('defending').value = player.defending || '';
                    document.getElementById('physical').value = player.physical || '';
                }

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

document.addEventListener('DOMContentLoaded', () => {
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

    // Ajouter un joueur sur le terrain
    addButton.addEventListener('click', (event) => {
        event.preventDefault(); // Empêche le comportement par défaut
        console.log("Bouton cliqué !");
        // Récupérer les données du formulaire
        const playerName = document.getElementById('nom').value.trim();
        const playerPhoto = document.getElementById('photo').value.trim();
        const playerPosition = document.getElementById('positionJoueur').value.trim();
        const playerRating = document.getElementById('rating').value.trim();
        const playerNationality = document.getElementById('nationality').value.trim();
        const playerFlag = document.getElementById('flag').value.trim();
        const playerClub = document.getElementById('club').value.trim();
        const playerLogo = document.getElementById('logoJoueur').value.trim();

        let diving, handling, kicking, reflexes, speed, positioning;
        let pace, shooting, passing, dribbling, defending, physical;

        // Si la position est GK, récupérer les statistiques spécifiques
        if (playerPosition === 'GK') {
            diving = document.getElementById('pace').value.trim(); // Diving
            handling = document.getElementById('shooting').value.trim(); // Handling
            kicking = document.getElementById('passing').value.trim(); // Kicking
            reflexes = document.getElementById('dribbling').value.trim(); // Reflexes
            speed = document.getElementById('defending').value.trim(); // Speed
            positioning = document.getElementById('physical').value.trim(); // Positioning
        } else {
            // Pour les autres positions, récupérer les statistiques standards
            pace = document.getElementById('pace').value.trim();
            shooting = document.getElementById('shooting').value.trim();
            passing = document.getElementById('passing').value.trim();
            dribbling = document.getElementById('dribbling').value.trim();
            defending = document.getElementById('defending').value.trim();
            physical = document.getElementById('physical').value.trim();
        }

        // Validation des champs avec regex
        if (!isValidAlphabetInput(playerName) || !isValidAlphabetInput(playerNationality) || !isValidAlphabetInput(playerClub)) {
            showPopup("Le champ doit contenir uniquement des lettres et des espaces.");
            return;
        }

        // Valider les statistique
        if (!isValidStat(playerRating)) {
            showPopup("Le champ 'Rating' doit contenir un nombre entre 0 et 100.");
            return;
        }

        if (playerPosition === 'GK') {
            if (!isValidStat(diving) || !isValidStat(handling) || !isValidStat(kicking) || !isValidStat(reflexes) || !isValidStat(speed) || !isValidStat(positioning)) {
                showPopup("Toutes les statistiques spécifiques à GK doivent contenir un nombre entre 0 et 100.");
                return;
            }
        } else {
            if (!isValidStat(pace) || !isValidStat(shooting) || !isValidStat(passing) || !isValidStat(dribbling) || !isValidStat(defending) || !isValidStat(physical)) {
                showPopup("Toutes les statistiques doivent contenir un nombre entre 0 et 100.");
                return;
            }
        }

        // Valider les URL .png
        if (!isValidPngUrl(playerPhoto) || !isValidPngUrl(playerLogo) || !isValidPngUrl(playerFlag)) {
            showPopup("Le champ doit contenir une URL HTTPS valide se terminant par .png.");
            return;
        }

        // Trouver la position correspondante sur le terrain
        const positionCard = document.querySelector(`.player-card[data-position="${playerPosition}"]`);

        if (positionCard) {
            //Ajouter la carte gold
            positionCard.classList.add("player-card-gold");

            // Remplacer le contenu de la position avec la carte du joueur
            if (playerPosition === 'GK') {
                // Carte pour gardien
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
                        <div class="statsp"><div>DIV</div><div>${diving}</div></div>
                        <div class="statsp"><div>HAN</div><div>${handling}</div></div>
                        <div class="statsp"><div>KIC</div><div>${kicking}</div></div>
                        <div class="statsp"><div>REF</div><div>${reflexes}</div></div>
                        <div class="statsp"><div>SPD</div><div>${speed}</div></div>
                        <div class="statsp"><div>POS</div><div>${positioning}</div></div>
                    </div>
                `;
            } else {
                // Carte pour autres positions
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
                        <div class="statsp"><div>PAC</div><div>${pace}</div></div>
                        <div class="statsp"><div>SHO</div><div>${shooting}</div></div>
                        <div class="statsp"><div>PAS</div><div>${passing}</div></div>
                        <div class="statsp"><div>DRI</div><div>${dribbling}</div></div>
                        <div class="statsp"><div>DEF</div><div>${defending}</div></div>
                        <div class="statsp"><div>PHY</div><div>${physical}</div></div>
                    </div>
                `;
            }

            showPopup(`Le joueur ${playerName} a été ajouté à la position ${playerPosition}.`);
            document.getElementById('modal').style.display = 'none'; // Fermer le modal

            // Réinitialiser les champs du formulaire
            document.querySelector('form').reset();
        } else {
            showPopup("Position introuvable sur le terrain.");
        }
    });
});
