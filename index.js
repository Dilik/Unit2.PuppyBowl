const apiwka = 'https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF';
const playersUrl = `${apiwka}/players`;

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

const init = async () => {
  try {
    const players = await getAllPlayers();
    console.log("all players: ", players);
    
    const player = await getPlayerById("1077");
    console.log("player: ", player);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const addNewPlayerOnInit = async () => {
  const newPlayerData = {
    "id": 100,
    "name": "dilmurod2",
    "breed": "mak2",
    "status": "bench",
    "imageUrl": "https://media.tenor.com/FuYhS1n_c0IAAAAM/cat-piano.gif",
    "teamId": null,
    "cohortId": 23,
  };

  try {
    const addedPlayer = await addNewPlayer(newPlayerData);
    console.log("new player added: ", addedPlayer);
  } catch (error) {
    console.error('Error adding a new player:', error.message);
  }
};

// Call init when the script starts
init();

// Call addNewPlayerOnInit if you want to add a new player separately
addNewPlayerOnInit();
