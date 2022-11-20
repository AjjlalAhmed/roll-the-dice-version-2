<template>
  <!-- container  -->
  <div class="container">
    <h1>game</h1>
  </div>
  <!-- container  -->
</template>

<script>
// Importing things we need
import SocketioService from "../services/socketio.service.js";
export default {
  name: "RollTheDiceVersion2Game",

  data() {
    return { socket: undefined };
  },

  mounted() {
    this.socket = SocketioService.socket;
  },

  beforeRouteLeave(to, from, next) {
    this.socket.emit("leave room");
    next();
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
