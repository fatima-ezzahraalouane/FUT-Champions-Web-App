const player = {
    name: "Messi",
    photo: "https://cdn.sofifa.net/players/158/023/25_120.png",
    position: "CF",
    rating: 90,
    nationality: "https://cdn.sofifa.net/flags/ar.png",
    clubLogo: "https://cdn.sofifa.net/meta/team/239235/120.png",
    stats: {
      PAC: 80,
      SHO: 87,
      PAS: 90,
      DRI: 94,
      DEF: 33,
      PHY: 64,
    },
  };
  
  const body = document.querySelector("body");
  
  const card = `
    <div class="player-card">
      <div class="card-header">
        <div class="rating">${player.rating}</div>
        <div class="position">${player.position}</div>
      </div>
      <div class="player-photo-container">
        <img src="${player.photo}" alt="${player.name}" class="player-photo">
      </div>
      <div class="player-name">${player.name}</div>
      <div class="club-info">
        <img src="${player.nationality}" alt="Flag" class="flag">
        <img src="${player.clubLogo}" alt="Club Logo" class="club-logo">
      </div>
      <div class="stats">
        <div>PAC ${player.stats.PAC}</div>
        <div>SHO ${player.stats.SHO}</div>
        <div>PAS ${player.stats.PAS}</div>
        <div>DRI ${player.stats.DRI}</div>
        <div>DEF ${player.stats.DEF}</div>
        <div>PHY ${player.stats.PHY}</div>
      </div>
    </div>
  `;
  
  body.innerHTML = card;
  