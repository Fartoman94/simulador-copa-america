const teams = [
  { name: "Argentina", flag: "https://flagcdn.com/w320/ar.png", strength: 0.9 },
  { name: "Brasil", flag: "https://flagcdn.com/w320/br.png", strength: 0.88 },
  { name: "Uruguay", flag: "https://flagcdn.com/w320/uy.png", strength: 0.84 },
  { name: "Colombia", flag: "https://flagcdn.com/w320/co.png", strength: 0.82 },
  { name: "Chile", flag: "https://flagcdn.com/w320/cl.png", strength: 0.8 },
  { name: "Perú", flag: "https://flagcdn.com/w320/pe.png", strength: 0.78 },
  { name: "Paraguay", flag: "https://flagcdn.com/w320/py.png", strength: 0.76 },
  { name: "Ecuador", flag: "https://flagcdn.com/w320/ec.png", strength: 0.75 },
  {
    name: "Venezuela",
    flag: "https://flagcdn.com/w320/ve.png",
    strength: 0.72,
  },
  { name: "Bolivia", flag: "https://flagcdn.com/w320/bo.png", strength: 0.7 },
  {
    name: "Estados Unidos",
    flag: "https://flagcdn.com/w320/us.png",
    strength: 0.82,
  },
  { name: "México", flag: "https://flagcdn.com/w320/mx.png", strength: 0.8 },
  { name: "Jamaica", flag: "https://flagcdn.com/w320/jm.png", strength: 0.72 },
  { name: "Canadá", flag: "https://flagcdn.com/w320/ca.png", strength: 0.76 },
  {
    name: "Costa Rica",
    flag: "https://flagcdn.com/w320/cr.png",
    strength: 0.74,
  },
  { name: "Panamá", flag: "https://flagcdn.com/w320/pa.png", strength: 0.72 },
];

let selectedTeams = [];

function createTeamCards() {
  const container = document.getElementById("teams-container");
  teams.forEach((team) => {
    const card = document.createElement("div");
    card.className = "team-card";
    card.innerHTML = `
          <img src="${team.flag}" alt="${team.name} flag">
          <p>${team.name}</p>
      `;
    card.onclick = () => selectTeam(team);
    container.appendChild(card);
  });
}

function selectTeam(team) {
  if (selectedTeams.length < 2 && !selectedTeams.includes(team)) {
    selectedTeams.push(team);
    updateSelectedTeams();
  }
  if (selectedTeams.length === 2) {
    document.getElementById("simulate-btn").disabled = false;
  }
}

function updateSelectedTeams() {
  const team1Div = document.getElementById("team1-selected");
  const team2Div = document.getElementById("team2-selected");

  if (selectedTeams[0]) {
    team1Div.innerHTML = `
          <img src="${selectedTeams[0].flag}" alt="${selectedTeams[0].name} flag">
          <p>${selectedTeams[0].name}</p>
      `;
  } else {
    team1Div.innerHTML = "";
  }

  if (selectedTeams[1]) {
    team2Div.innerHTML = `
          <img src="${selectedTeams[1].flag}" alt="${selectedTeams[1].name} flag">
          <p>${selectedTeams[1].name}</p>
      `;
  } else {
    team2Div.innerHTML = "";
  }
}

function simulateMatch() {
  if (selectedTeams.length !== 2) return;

  const [team1, team2] = selectedTeams;
  const totalStrength = team1.strength + team2.strength;
  const team1Chance = (team1.strength / totalStrength) * 100;
  const team2Chance = (team2.strength / totalStrength) * 100;
  const drawChance = 100 - team1Chance - team2Chance;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
      <h3>Probabilidades:</h3>
      <p>${team1.name}: ${team1Chance.toFixed(2)}%</p>
      <div class="probability-bar">
          <div class="probability-fill" style="width: ${team1Chance}%;"></div>
      </div>
      <p>${team2.name}: ${team2Chance.toFixed(2)}%</p>
      <div class="probability-bar">
          <div class="probability-fill" style="width: ${team2Chance}%;"></div>
      </div>
      <p>Empate: ${drawChance.toFixed(2)}%</p>
      <div class="probability-bar">
          <div class="probability-fill" style="width: ${drawChance}%;"></div>
      </div>
  `;
}

window.onload = function () {
  createTeamCards();
  document.getElementById("simulate-btn").disabled = true;
};
