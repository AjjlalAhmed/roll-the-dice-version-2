// Importing things we need
const { randomUUID } = require("crypto");
const { createPlayer } = require("./players");

// Functions

// This is function create new room
const createRoom = (rooms, data, userid) => {
  const name = data.name;
  const roomName = data.roomName;
  const role = "admin";
  const room = searchRoomName(rooms, roomName);
  // Checking if room exist
  if (room) throw { customMessage: "room already exist" };
  // Generating room id
  const id = randomUUID();
  // Creating new player
  const player = createPlayer(name, roomName, role, userid, id);

  rooms.push({
    id: id,
    roomName: roomName,
    admin: name,
    created: Date.now(),
    players: [player],
    turns: [],
    currentTurn: undefined,
    eliminated: [],
    scores: { highest: 0, lowest: 0 },
    winner: undefined,
    round: 1,
    gameStatus: "waiting",
  });

  return { id, player };
};

// This is function add new player to room
const joinRoom = (rooms, data, userid) => {
  const name = data.name;
  const roomName = data.roomName;
  const role = "player";
  const room = searchRoomName(rooms, roomName);
  // Checking if room exist
  if (!room) throw { customMessage: "room does not exist" };

  const id = room.id;
  // Creating new player
  const player = createPlayer(name, roomName, role, userid, id);

  room.players.push(player);

  return { id, player };
};

// This is function add new player to room
const leaveRoom = (rooms, playerId, roomId) => {
  const room = searchRoom(rooms, roomId);
  let newAdmin = false;
  // Checking if room exist
  if (!room) throw { customMessage: "room not available" };
  // Finding player index
  const index = room.players.findIndex((player) => player.id === playerId);
  // Checking if player
  if (index === -1) throw { customMessage: "player not available" };
  // Removing player for room
  room.players.splice(index, 1);
  // Checking if room is empty
  if (room.players.length === 0) {
    // Finding room index
    const index = rooms.findIndex((room) => room.id === roomId);
    // Removing room for rooms array
    rooms.splice(index, 1);
  } else {
    // Setting admin role
    room.admin = room.players[0].name;
    newAdmin = true;
  }

  return newAdmin;
};

// This is function will return specific room
const searchRoom = (rooms, id) => {
  return rooms.find((item) => item.id == id);
};

// This is function will return specific room
const searchRoomName = (rooms, name) => {
  return rooms.find((item) => item.roomName == name);
};

// Exporting room

module.exports = {
  createRoom,
  joinRoom,
  searchRoom,
  leaveRoom,
};
