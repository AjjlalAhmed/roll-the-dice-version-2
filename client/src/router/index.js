import Vue from "vue";
import VueRouter from "vue-router";
import SocketioService from "../services/socketio.service";
import Home from "../views/Home.vue";
import Lobby from "../views/Lobby.vue";
import Game from "../views/Game.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/lobby",
    name: "Lobby",
    component: Lobby,
  },
  {
    path: "/game",
    name: "Game",
    component: Game,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
