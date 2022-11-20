import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    player: undefined,
    room: undefined,
  },
  getters: {
    currentPlayer(state) {
      return state.player;
    },
    currentRoom(state) {
      return state.room;
    },
  },
  mutations: {
    setPlayer(state, payload) {
      state.player = payload;
    },

    setRoom(state, payload) {
      state.room = payload;
    },
  },
  actions: {},
  modules: {},
});
