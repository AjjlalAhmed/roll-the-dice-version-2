<
<template>
  <!-- Container  -->
  <div class="container">
    <router-view />
  </div>
</template>

<script>
// Importing things we need
import SocketioService from "./services/socketio.service.js";
export default {
  name: "App",

  data() {
    return {
      socket: undefined,
    };
  },

  mounted() {
    // Conecting socket
    SocketioService.setupSocketConnection();
    this.socket = SocketioService.socket;

    // socket listerner
    this.socket.on("room joined", (data) => {
      this.$store.commit("setPlayer", data.player);
      this.$store.commit("setRoom", data.room);
      console.log(data);
    });

    this.socket.on("new player", (data) => {
      this.$store.commit("setPlayer", data.rooms);
      console.log(data);
    });

    this.socket.on("error message", (data) => {
      console.log(data);
    });
  },

  methods: {},
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;700&family=Ultra&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
</style>
