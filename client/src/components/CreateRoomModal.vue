<template>
  <!-- Modal  -->
  <div @click="close" class="modal">
    <!-- Form  -->
    <form @submit.prevent="send" class="form">
      <h1 class="title">create room</h1>
      <input type="text" v-model="name" placeholder="Name" />
      <input type="text" v-model="roomName" placeholder="Room Name" />
      <button class="action-btn">create</button>
    </form>
  </div>
  <!-- Modal  -->
</template>

<script>
// Importing things we need
import SocketioService from "../services/socketio.service.js";
export default {
  name: "CreateRoomModal",
  data() {
    return {
      name: "",
      roomName: "",
      socket: undefined,
    };
  },

  mounted() {
    this.socket = SocketioService.socket;
  },

  methods: {
    send() {
      if (this.name === "" || this.roomName === "") return;

      // Emitting create romm
      this.socket.emit("create room", {
        name: this.name,
        roomName: this.roomName,
      });

      this.$emit("close");

      this.socket.on("room created", (data) => {
        this.$store.commit("setPlayer", data.player);
        this.$store.commit("setRoom", data.room);
        this.$router.push({ path: "/game" });
      });
    },
    close(e) {
      if (e.target.classList.contains("modal")) {
        this.$emit("close");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: grid;
  place-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #3333;
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    background: #fff;
    width: 100%;
    max-width: 400px;
    margin: auto;
    border-radius: 5px;
    .title {
      text-transform: capitalize;
      color: #0a0908;
      font-size: 2rem;
      text-align: center;
    }
    input {
      padding: 10px 0px;
      text-indent: 10px;
      font-size: 1.2rem;
      border: 0px;
      border-bottom: 1px solid #0a0908;
      width: 100%;
      margin: 10px 0px;
    }
    .action-btn {
      display: inline-block;
      font-size: 1.5rem;
      text-transform: capitalize;
      border: 3px solid #0a0908;
      text-decoration: none;
      color: #0a0908;
      padding: 10px 20px;
      margin: 10px;
      min-width: 200px;
      text-align: center;
      border-radius: 5px;
      background: transparent;
      cursor: pointer;
      font-weight: 700;
    }
  }
}
</style>
