<template>
  <!-- Home  -->
  <div class="home">
    <h1 class="title">roll the dice</h1>
    <div class="btns">
      <router-link class="action-btn" to="/lobby">join room</router-link>
      <button @click="createRoomModalToggle" class="action-btn">create room</button>
    </div>

    <CreateRoomModal
      v-if="showCreateRoomModal"
      @close="createRoomModalToggle"
      @send="createRoomModalSend"
    />
  </div>
  <!-- Home  -->
</template>

<script>
import CreateRoomModal from "@/components/CreateRoomModal.vue";
export default {
  name: "Home",
  components: { CreateRoomModal },

  data() {
    return {
      showCreateRoomModal: false,
    };
  },

  mounted() {},

  methods: {
    createRoomModalToggle() {
      this.showCreateRoomModal = !this.showCreateRoomModal;
    },
    createRoomModalSend() {},
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #faf33e;
  min-height: 100vh;
  .title {
    text-transform: capitalize;
    color: #0a0908;
    font-family: "Ultra", serif;
    font-size: clamp(2rem, 5vw + 2rem, 5rem);
    text-align: center;
  }
  .btns {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
    }
  }
}
</style>
