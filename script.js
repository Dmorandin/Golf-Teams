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

    players.forEach((player) => {
        const li = document.createElement('li');
        li.textContent = `${player.name} (Handicap: ${player.handicap})`;
        playersList.appendChild(li);
    });
}

// Generate fair teams of 6 and play golf sound
function generateTeams() {
    if (players.length < 6) {
        alert("You need at least 6 players to form a team!");
        return;
    }

    // Play golf sound
    const sound = document.getElementById('golfSound');
    sound.play();

    // Sort players by handicap (ascending)
    const sortedPlayers = [...players].sort((a, b) => a.handicap - b.handicap);

    const teams = [];
    const teamSize = 6;

    // Distribute players into teams as fairly as possible
    while (sortedPlayers.length > 0) {
        const team = [];

        for (let i = 0; i < teamSize && sortedPlayers.length > 0; i++) {
            if (i % 2 === 0) {
                team.push(sortedPlayers.shift()); // pick the lowest
            } else {
                team.push(sortedPlayers.pop()); // pick the highest
            }
        }

        teams.push(team);
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

        const teamNames = team.map(player => `${player.name} (HC: ${player.handicap})`).join('<br>');
        const avgHandicap = (team.reduce((sum, player) => sum + player.handicap, 0) / team.length).toFixed(1);

        div.innerHTML = `<strong>Team ${index + 1}</strong><br>${teamNames}<br><em>Avg Handicap: ${avgHandicap}</em>`;
        teamsDiv.appendChild(div);
    });
}
