// Importing things we need
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const Ajv = require("ajv");
const ajv = new Ajv();
const {
  createRoom,
  joinRoom,
  leaveRoom,
  searchRoom,
} = require("./helpers/rooms");
const {
  schemaCreateRoom,
  schemaJoinRoom,
  schemaLeaveRoom,
} = require("./validations/socket.validation");

// Creating app instance
const app = express();
// Creating server
const server = http.createServer(app);
// Socket io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middlewares
app.use(cors());
app.use(express.json());

// Functions

const createRoomController = (data, socket, rooms) => {
  try {
    // Validating data
    const validate = ajv.compile(schemaCreateRoom);
    const valid = validate(data);

    // Checking if data is valid
    if (!valid) throw { customMessage: "data is not valid" };

    // Creating new room
    const userid = socket.id;
    const { id, player } = createRoom(rooms, data, userid);

    // Getting room
    const room = searchRoom(rooms, id);

    // Storing player associated data inside socket
    socket["roomName"] = room.roomName;
    socket["roomId"] = room.id;
    socket.join(room.roomName);

    // Emits
    socket.emit("room created", { room, player });
    socket.broadcast.emit("rooms update", { rooms: rooms });
  } catch (e) {
    console.log(e.message);
    if (e.customMessage) {
      socket.emit("error message", { message: e.customMessage });
    } else {
      socket.emit("error message", { message: "Something went wrong" });
    }
  }
};

const joinRoomController = (data, rooms) => {
  try {
    // Validating data
    const validate = ajv.compile(schemaJoinRoom);
    const valid = validate(data);

    // Checking if data is valid
    if (!valid) throw { customMessage: "data is not valid" };

    // Creating new room
    const userid = socket.id;
    const { id, player } = joinRoom(rooms, data, userid);

    // Getting room
    const room = searchRoom(rooms, id);

    // Storing player associated data inside socket
    socket["roomName"] = room.roomName;
    socket["roomId"] = room.id;
    socket.join(room.roomName);

    // Emits
    socket.emit("room joined", { room, player });
    socket.in(roomName).emit("new player", { data: rooms });
  } catch (e) {
    console.log(e);
    if (e.customMessage) {
      socket.emit("error message", { message: e.customMessage });
    } else {
      socket.emit("error message", { message: "Something went wrong" });
    }
  }
};
const getRoomListController = (rooms, socket) => {
  try {
    socket.emit("rooms list", { rooms: rooms });
  } catch (e) {
    console.log(e);
    if (e.customMessage) {
      socket.emit("error message", { message: e.customMessage });
    } else {
      socket.emit("error message", { message: "Something went wrong" });
    }
  }
};

const leaveRoomController = (socket, rooms) => {
  try {
    const userid = socket.id;
    const roomId = socket.roomId;
    const roomName = socket.roomName;

    if (!roomId) return socket.leave(roomName);

    const newAdmin = leaveRoom(rooms, userid, roomId);

    if (newAdmin) {
      const room = searchRoom(rooms, data.roomId);
      socket.in(room.name).emit("new admin", { data: rooms });
      socket.leave(room.name);
    } else {
      socket.broadcast.emit("rooms update", { rooms: rooms });
    }

    socket.leave(roomName);
  } catch (e) {
    console.log(e);
    if (e.customMessage) {
      socket.emit("error message", { message: e.customMessage });
    } else {
      socket.emit("error message", { message: "Something went wrong" });
    }
  }
};

// Rooms

const rooms = [];

// Socket listeners
io.on("connection", (socket) => {
  console.log("a user connected");

  // listening to create room
  socket.on("create room", (data) => createRoomController(data, socket, rooms));
  // listening to join room
  socket.on("join room", (data) => joinRoomController(data, socket, rooms));
  // listening to get rooms list
  socket.on("get rooms list", () => getRoomListController(rooms, socket));
  // listening to leave room
  socket.on("leave room", () => leaveRoomController(socket, rooms));
  // listening to disconnect
  socket.on("disconnect", () => leaveRoomController(socket, rooms));
});

// Port
const port = process.env.PORT || 3000;

// Listening to server
server.listen(port, () => {
  console.log(`listening on ${port}`);
});
