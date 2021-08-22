import Vue from 'vue';
import VueRouter from 'vue-router';
import Pokedex from '../modules/pokedex/pokedex.page.vue';
import PokemonDetail from '../modules/pokedex/pokemon-detail.page.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Pokedex',
    component: Pokedex,
  },
  {
    path: '/pokemon/:name',
    name: 'PokemonDetail',
    component: PokemonDetail,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
