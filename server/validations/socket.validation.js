// Schema
const schemaCreateRoom = {
  type: "object",
  properties: {
    name: { type: "string" },
    roomName: { type: "string" },
  },
  required: ["name", "roomName"],
};

const schemaJoinRoom = {
  type: "object",
  properties: {
    name: { type: "string" },
    roomName: { type: "string" },
  },
  required: ["name", "roomName"],
};

const schemaLeaveRoom = {
  type: "object",
  properties: {
    playerId: { type: "string" },
    roomId: { type: "string" },
  },
  required: ["playerId", "roomId"],
};

module.exports = {
  schemaCreateRoom,
  schemaJoinRoom,
  schemaLeaveRoom,
};
