<template lang="html">
  <table class="pokedex-list">
    <tbody>
      <tr
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        @click="openDetails(pokemon.name)"
      >
        <td class="pokedex-list__display-img">
          <img
            class="pokedex-list__img"
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
          >
        </td>
        <td>
          No. {{ formatNumber(pokemon.id) }}
        </td>
        <td>
          {{ pokemon.name }}
        </td>
        <td class="pokedex-list__display-pokeball">
          <img src="../../../../assets/pokebola.png">
        </td>
      </tr>
      <infinite-loading @infinite="infiniteHandler" />
    </tbody>
  </table>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: {
    InfiniteLoading,
  },
  props: {
    pokemons: Array,
    getPokemons: Function,
    seePokemonDetail: Function,
  },
  data: () => ({
  }),
  methods: {
    infiniteHandler($state) {
      this.getPokemons($state);
    },
    formatNumber(number) {
      return (`'000${number}`).substr(-3);
    },
    openDetails(name) {
      this.seePokemonDetail(name);
    },
  },
};
</script>

<style lang="scss" scoped>
  .pokedex-list {
    width: 100%;
    font-weight: bold;
    text-transform: capitalize;
    border-collapse: collapse;
    tbody tr:hover {
      background: #d7e2e4;
    }
    td {
      text-align: left;
      border-bottom: 1px solid #d7e2e4;
      padding: 8px
    }
    &__display-pokeball {
      width: 40px;
      opacity: .3
    }
    &__display-img {
      overflow: hidden;
      width: 50px
    }
    &__img {
      width: 80px;
    }
  }
</style>
