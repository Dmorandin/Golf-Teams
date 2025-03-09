let players = [];

// Add a player to the list
function addPlayer() {
    const name = document.getElementById('playerName').value.trim();
    const handicap = parseFloat(document.getElementById('playerHandicap').value.trim());

    if (!name || isNaN(handicap)) {
        alert("Please enter both a name and a valid handicap.");
        return;
    }

    players.push({ name, handicap });
    displayPlayers();

    // Clear inputs
    document.getElementById('playerName').value = '';
    document.getElementById('playerHandicap').value = '';
}

// Display players list
function displayPlayers() {
    const playersList = document.getElementById('players');
    playersList.innerHTML = '';

    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.textContent = `${player.name} (Handicap: ${player.handicap})`;
        playersList.appendChild(li);
    });
}

// Generate fair teams and play golf sound
function generateTeams() {
    if (players.length < 2) {
        alert("You need at least 2 players to form teams!");
        return;
    }

    // Sort players by handicap
    const sortedPlayers = [...players].sort((a, b) => a.handicap - b.handicap);

    const teams = [];
    while (sortedPlayers.length >= 2) {
        const lowest = sortedPlayers.shift();
        const highest = sortedPlayers.pop();
        teams.push([lowest, highest]);
    }

    // If odd number of players, put the last one alone
    if (sortedPlayers.length === 1) {
        teams.push([sortedPlayers[0]]);
    }

    displayTeams(teams);
}

// Display the teams
function displayTeams(teams) {
    const teamsDiv = document.getElementById('teams');
    teamsDiv.innerHTML = '';

    teams.forEach((team, index) => {
        const div = document.createElement('div');
        div.className = 'team';

        const teamNames = team.map(player => `${player.name} (HC: ${player.handicap})`).join(' & ');
        const avgHandicap = (team.reduce((sum, player) => sum + player.handicap, 0) / team.length).toFixed(1);

        div.innerHTML = `<strong>Team ${index + 1}</strong><br>${teamNames}<br><em>Avg Handicap: ${avgHandicap}</em>`;
        teamsDiv.appendChild(div);
    });
}
