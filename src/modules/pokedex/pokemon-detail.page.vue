<template lang="html">
  <div class="pokemon-detail">
    <div class="pokemon-detail__header">
      <p>{{ pokemon.name }}</p>
    </div>
    <div class="pokemon-detail__display-img">
      <img
        class="pokemon-detail__img"
        :src="pokemon.sprites.front_default"
      >
    </div>
    <div class="pokemon-detail__specs">
      <div class="pokemon-detail__types">
        <div
          class="pokemon-detail__type"
          :class="`bg--${item.type.name}`"
          v-for="item in pokemon.types"
          :key="item.slot"
        >
          {{ item.type.name }}
        </div>
      </div>
      <div class="pokemon-detail__abilities">
        <p>Abilities: &nbsp;</p>
        <span
          v-for="(item, index) in pokemon.abilities"  :key="item.slot"
          class="pokemon-detail__abilities-name"
        >
          {{ item.ability.name }}{{ ((index + 1) !== pokemon.abilities.length) ? ', &nbsp;' : '' }}
        </span>
      </div>
    </div>
    <div class="pokemon-detail__buttons">
      <button class="pokemon-detail__button" type="button" name="button">EVOLUTIONS</button>
      <button class="pokemon-detail__button" type="button" name="button">LOCATIONS</button>
      <button class="pokemon-detail__button" type="button" name="button">GAMES</button>
    </div>
  </div>
</template>

<script>
import PokemonService from '@/shared/services/pokemon.service';

export default {
  data: () => ({
    pokemonService: new PokemonService(),
    pokemon: {},
  }),
  methods: {
    getPokemon(name) {
      this.pokemonService.getPokemon(name).then(({ data }) => {
        console.log(data);
        this.pokemon = data;
      });
    },
  },
  created() {
    const { name } = this.$route.params;
    this.getPokemon(name);
  },
};
</script>

<style lang="scss" scoped>
  .pokemon-detail {
    padding: 8px;
    &__header {
      line-height: 40px;
      font-weight: bold;
      text-transform: capitalize;
      background: #f5efe9;
      border-radius: 8px;
      border: 4px solid #a7a8a2;
      box-shadow: 3px 3px 0px 0 rgba(138, 132, 126, 1);
      color: #555c56;
      letter-spacing: 3px;
    }
    &__specs {
      border-radius: 8px;
      border: 4px solid #a7a8a2;
      background: #f5efe9;
      box-shadow: 3px 3px 0px 0 rgba(138, 132, 126, 1);
      margin-top: 16px;
    }
    &__display-img {
      display: flex;
      justify-content: center;
      border-radius: 8px;
      border: 4px solid #a7a8a2;
      background: #f5efe9;
      box-shadow: 3px 3px 0px 0 rgba(138, 132, 126, 1);
      margin-top: 16px;
    }
    &__img {
      height: 200px;
    }
    &__types {
      display: flex;
      justify-content: space-around;
      border-bottom: 4px solid #a7a8a2;
    }
    &__type {
      width: 40%;
      padding: 16px;
      border-radius: 8px;
      margin: 16px 0;
      text-transform: uppercase;
      font-weight: bold;
      color: #fff;
      letter-spacing: 3px;
    }
    &__abilities {
      line-height: 40px;
      display: flex;
      font-weight: bold;
      padding: 0 16px;
      color: #555c56;
    }
    &__abilities-name {
      text-transform: uppercase;
      font-size: 12px;
      color: #555c56;
    }
    &__buttons {
      display: flex;
      flex-flow: column;
      margin-top: 16px;
    }
    &__button {
      margin-bottom: 16px;
      line-height: 60px;
      font-weight: bold;
      border: 4px solid #8a847e;
      border-radius: 8px;
      color: #555c56;
      background: linear-gradient(#f5efe9 70%, #a7a8a2);
      letter-spacing: 3px;
      &:hover {
        background: linear-gradient(#a7a8a2 70%, #f5efe9);
      }
    }
  }
</style>
