let players = [];

function addPlayer() {
    const nameInput = document.getElementById("playerName");
    const handicapInput = document.getElementById("playerHandicap");

    const name = nameInput.value.trim();
    const handicap = parseFloat(handicapInput.value);

    if (name === "" || isNaN(handicap) || handicap < 0) {
        alert("Please enter a valid name and handicap!");
        return;
    }

    players.push({ name, handicap });
    nameInput.value = "";
    handicapInput.value = "";

    updatePlayerList();
}

function updatePlayerList() {
    const list = document.getElementById("playerList");
    list.innerHTML = "";

    players.forEach((player, index) => {
        const li = document.createElement("li");
        li.textContent = `${player.name} (Handicap: ${player.handicap})`;
        list.appendChild(li);
    });
}

function generateTeams() {
    if (players.length < 2 || players.length % 2 !== 0) {
        alert("Please add an even number of players (at least 2) to form teams.");
        return;
    }

    const sortedPlayers = [...players].sort((a, b) => a.handicap - b.handicap);
    const teams = [];

    while (sortedPlayers.length > 0) {
        const low = sortedPlayers.shift();
        const high = sortedPlayers.pop();
        teams.push([low, high]);
    }

    displayTeams(teams);
}

function displayTeams(teams) {
    const container = document.getElementById("teamsContainer");
    container.innerHTML = "<h2>Generated Teams</h2>";

    teams.forEach((team, index) => {
        const teamDiv = document.createElement("div");
        teamDiv.className = "team";

        const avgHandicap = ((team[0].handicap + team[1].handicap) / 2).toFixed(1);

        teamDiv.innerHTML = `
            <strong>Team ${index + 1}</strong><br>
            ${team[0].name} (Handicap: ${team[0].handicap})<br>
            ${team[1].name} (Handicap: ${team[1].handicap})<br>
            <em>Avg Handicap: ${avgHandicap}</em>
        `;

        container.appendChild(teamDiv);
    });
}
