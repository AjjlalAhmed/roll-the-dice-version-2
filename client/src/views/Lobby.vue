<template>
  <!-- container  -->
  <div class="container">
    <!-- wrapepr  -->
    <div class="wrapper">
      <!-- title   -->
      <h1 class="title">Lobby</h1>
      <!-- input control  -->
      <div class="input-control">
        <label>name</label>
        <input v-model="name" type="text" placeholder="Name..." />
        <p v-if="isError" class="error">Input should not be empty</p>
      </div>
      <!-- room title  -->
      <h2 class="room-title">all rooms</h2>
      <!-- rooms  -->
      <ul v-if="rooms.length > 0" class="rooms">
        <!-- room  -->
        <li
          @click="joinRoom(room)"
          v-for="(room, index) in rooms"
          :key="index"
          class="room"
        >
          <!-- name  -->
          <p class="name">
            <span>{{ index + 1 }} )</span> {{ room.roomName }}
          </p>
          <!-- count  -->
          <p class="count">{{ room.players.length }} / 10</p>
        </li>
      </ul>
    </div>
  </div>
  <!-- container  -->
</template>

<script>
// Importing things we need
import SocketioService from "../services/socketio.service.js";
export default {
  name: "RollTheDiceVersion2Lobby",

  data() {
    return {
      rooms: [],
      name: "",
      isError: false,
      socket: undefined,
    };
  },

  mounted() {
    this.socket = SocketioService.socket;

    this.socket.emit("get rooms list");

    this.socket.on("rooms list", (data) => {
      data.rooms.forEach((room) => {
        this.rooms.push(room);
      });
    });

    this.socket.on("rooms update", (data) => {
      this.rooms = [];
      data.rooms.forEach((room) => {
        this.rooms.push(room);
      });
    });
  },

  methods: {
    joinRoom(room) {
      if (this.name === "") return (this.isError = true);
      this.isError = false;
      this.socket.emit("join room", { roomName: room.roomName, name: this.name });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: block;
  background: #faf33e;
  min-height: 100vh;
  .wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 0px;
    .title {
      font-size: 3rem;
      font-weight: 400;
      text-transform: capitalize;
    }
    .input-control {
      display: flex;
      flex-direction: column;
      padding: 20px 0px;
      gap: 20px;
      label {
        font-size: 1.5rem;
        font-weight: 400;
        text-transform: capitalize;
      }
      input {
        border: 3px solid #0a0908;
        padding: 20px 0px;
        text-indent: 10px;
        border-radius: 5px;
        transition: 0.2s linear;
        background: transparent;
        font-size: 1.5rem;
      }
      .error {
        color: crimson;
        font-size: 1.5rem;
        font-weight: 700;
      }
    }
    .room-title {
      font-size: 1.5rem;
      font-weight: 400;
      text-transform: capitalize;
      margin-top: 30px;
      padding: 10px 0px;
    }
    .rooms {
      display: flex;
      flex-direction: column;
      gap: 20px;
      list-style: none;

      .room {
        display: flex;
        justify-content: space-between;
        border: 3px solid #0a0908;
        padding: 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.2s linear;
        &:hover {
          scale: 1.02;
        }
        .name {
          color: #0a0908;
          font-size: 1.5rem;
          font-weight: 700;
        }
        .count {
          color: #0a0908;
          font-size: 1.5rem;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
