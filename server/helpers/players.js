// Functions

// This function will create new player
const createPlayer = (name, roomName, role, userId,roomId) => {
  const player = {
    id: userId,
    name: name,
    roomName: roomName,
    roomId:roomId ,
    role: role,
    joined: Date.now(),
    status: "waiting",
  };

  return player
};
// This function will create new player
const removePlayer = () => {};

module.exports = {
  createPlayer,
  removePlayer,
};
