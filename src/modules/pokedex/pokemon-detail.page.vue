<template lang="html">
  <div class="pokemon-detail" v-if="!loading">
    <div class="pokemon-detail__header">
      <button
        type="button"
        class="pokemon-detail__back-button"
        @click="backRoute"
      >
        &lt;
      </button>
      <div class="pokemon-detail__header-title">
        <p>{{ pokemon.name }}</p>
      </div>
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
      <button
        class="pokemon-detail__button"
        type="button"
        name="button"
        v-if="hasEvolution"
        @click="toggleModal"
      >
        EVOLUTIONS
      </button>
      <button
        class="pokemon-detail__button"
        type="button"
        name="button"
        @click="toggleModal"
      >
        LOCATIONS
      </button>
      <button
        class="pokemon-detail__button"
        type="button"
        name="button"
        @click="toggleModal"
      >
        GAMES
      </button>
    </div>
    <evolution-modal :modalStatus="evolutionModal"/>
  </div>
</template>

<script>
import PokemonService from '@/shared/services/pokemon.service';
import EvolutionModal from './components/evolution-modal/evolution-modal.component.vue';

export default {
  components: {
    EvolutionModal,
  },
  data: () => ({
    pokemonService: new PokemonService(),
    pokemon: {},
    evolutions: [],
    loading: true,
    evolutionModal: false,
    evolutionChain: '',
    hasEvolution: false,
  }),
  methods: {
    getPokemon(name) {
      this.pokemonService.getPokemon(name).then(({ data }) => {
        this.loading = false;
        this.pokemon = data;
        this.getSpecies();
      });
    },
    getSpecies() {
      this.pokemonService.getSpecies(this.pokemon.name).then(({ data }) => {
        this.loading = false;
        this.evolutionChain = data.evolution_chain.url;
        this.getEvolutionChain();
      });
    },
    getEvolutionChain() {
      this.pokemonService.getEvolutionChain(this.evolutionChain).then(({ data }) => {
        this.loading = false;
        this.evolutions = this.mapChain(data.chain);
        console.log(this.evolutions);
      });
    },
    mapChain(chain) {
      const names = [];
      if (chain.evolves_to.length > 0) {
        this.hasEvolution = true;
        names.push(chain.species.name);
        names.push(chain.evolves_to[0].species.name);
        if (chain.evolves_to[0].evolves_to.length > 0) {
          names.push(chain.evolves_to[0].evolves_to[0].species.name);
        }
      }
      return names;
    },
    backRoute() {
      this.$router.push('/');
    },
    toggleModal() {
      this.evolutionModal = !this.evolutionModal;
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
      display: flex;
    }
    &__header-title {
      line-height: 40px;
      font-weight: bold;
      text-transform: capitalize;
      border-radius: 8px;
      background: #f5efe9;
      border: 4px solid #a7a8a2;
      box-shadow: 3px 3px 0px 0 rgba(138, 132, 126, 1);
      color: #555c56;
      letter-spacing: 3px;
      display: flex;
      justify-content: center;
      width: 100%
    }
    &__back-button {
      background: transparent;
      color: #555c56;
      border: none;
      font-weight: bold;
      border: 4px solid #a7a8a2;
      border-radius: 8px;
      color: #555c56;
      background: linear-gradient(#f5efe9 70%, #a7a8a2);
      margin-right: 8px;
      width: 64px;
      box-shadow: 3px 3px 0px 0 rgba(138, 132, 126, 1);
      cursor: pointer;
      &:hover {
        background: linear-gradient(#a7a8a2 70%, #f5efe9);
      }
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
      cursor: pointer;
      margin-bottom: 16px;
      line-height: 60px;
      font-weight: bold;
      border: 4px solid #a7a8a2;
      border-radius: 8px;
      color: #555c56;
      background: linear-gradient(#f5efe9 70%, #a7a8a2);
      letter-spacing: 3px;
      box-shadow: 3px 5px 0px 0 rgba(138, 132, 126, 1);
      &:hover {
        background: linear-gradient(#a7a8a2 70%, #f5efe9);
      }
    }
  }
</style>
