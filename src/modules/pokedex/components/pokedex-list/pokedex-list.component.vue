<template lang="html">
  <div class="pokedex-list">
    <div
      class="pokedex-list__item"
      v-for="pokemon in pokemons"
      :key="pokemon.name"
      @click="openDetails(pokemon.name)"
    >
      <div class="pokedex-list__display-img">
        <img
          class="pokedex-list__img"
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
        >
      </div>
      <div class="pokedex-list__number">
        No. {{ formatNumber(pokemon.id) }}
      </div>
      <div class="pokedex-list__name">
        {{ pokemon.name }}
      </div>
      <div class="pokedex-list__display-pokeball">
        <img src="../../../../assets/pokebola.png">
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler" />
  </div>
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
    color: #555c56;
    font-size: 12px;
    &__item {
      border-radius: 8px;
      background: #f5efe9;
      border: 4px solid #a7a8a2;
      box-shadow: 3px 3px 0px 0 rgba(138, 132, 126, 1);
      color: #555c56;
      display: flex;
      align-items: center;
      margin: 8px;
      padding: 0 8px;
      cursor: pointer;
      &:hover {
        background: #d0cfcf;
      }
    }
    &__number {
      flex-basis: 25%;
    }
    &__name {
      flex-basis: 50%;
    }
    &__display-pokeball {
      width: 20px;
      opacity: .3;
      &:hover {
        opacity: 1;
      }
    }
    &__display-img {
      overflow: hidden;
      flex-basis: 20%;
    }
    &__img {
      width: 100px;
    }
  }
</style>
