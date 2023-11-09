const apiwka = 'https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF';
const playersUrl = `${apiwka}/players`;
const addPlayerForm = document.getElementById('addPlayerForm');

const fetchJson = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.error || 'Error fetching data');
    }
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
};

const getAllPlayers = async () => {
  return fetchJson(playersUrl);
};

const getPlayerById = async (playerId) => {
  const url = `${playersUrl}/${playerId}`;
  return fetchJson(url);
};

const addNewPlayer = async (newPlayerData) => {
  const url = playersUrl;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPlayerData),
  };

  return fetchJson(url, options);
};


function DisplayAllPlayers(data) {
  const dynamicContentContainer = document.getElementById('playersList');

  if (data && data.players && Array.isArray(data.players)) {
    data.players.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('player-item');
      itemDiv.innerHTML = `
          <div>
              <h4>ID: ${item.id}</h4>
              <h4>Name: ${item.name}</h4>
              <p>Breed ${item.breed}</p>
              <p>Status ${item.status}</p>
              <img src="${item.imageUrl}" alt="${item.name} Image">
          </div>
      `;

      dynamicContentContainer.appendChild(itemDiv);
    });
  } else {
    dynamicContentContainer.innerHTML = 'Error: Invalid player data structure.';
  }
}

const addPlayer = async () => {
  const name = document.getElementById('name').value;
  const breed = document.getElementById('breed').value;
  const status = document.getElementById('status').value;
  const imageUrl = document.getElementById('imageUrl').value;

  const newPlayerData = { name, breed, status, imageUrl };

  const addedPlayer = await addNewPlayer(newPlayerData);

  if (addedPlayer) {
    // Assuming a successful addition, add the new player to the list
    DisplayAllPlayers({ players: [addedPlayer] });
  } else {
    alert('Error adding player. Please try again.');
  }
};

const init = async () => {
  try {
    const playersListContainer = document.getElementById('playersList');
    const players = await getAllPlayers();

    if (players) {
      console.log("all players: ", players);
      DisplayAllPlayers(players)
    } else {
      playersListContainer.innerHTML = 'Error: Unable to fetch player data.';
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
};

init()
