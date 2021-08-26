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
          :class="`bg__${item.type.name}`"
          v-for="item in pokemon.types"
          :key="item.slot"
        >
          {{ item.type.name }}
        </div>
      </div>
      <div class="pokemon-detail__abilities">
        <span>Abilities: &nbsp;</span>
        <div class="pokemon-detail__display-abilities">
          <span
          v-for="(item, index) in pokemon.abilities"  :key="item.slot"
          class="pokemon-detail__abilities-name"
          >
          {{ item.ability.name }}{{ ((index + 1) !== pokemon.abilities.length) ? ', ' : '' }}
        </span>
        </div>
      </div>
    </div>
    <div class="pokemon-detail__buttons">
      <button
        class="pokemon-detail__button"
        type="button"
        name="button"
        v-if="hasEvolution"
        @click="toggleEvolutionModal"
      >
        EVOLUTIONS
      </button>
      <button
        class="pokemon-detail__button"
        type="button"
        name="button"
        @click="toggleLocationModal"
      >
        LOCATIONS
      </button>
      <button
        class="pokemon-detail__button"
        type="button"
        name="button"
        @click="toggleGamesModal"
      >
        GAMES
      </button>
    </div>
    <evolution-modal
      v-if="evolutionModal"
      :modalStatus="evolutionModal"
      :evolutions="evolutions"
      :evolutionsNames="evolutionsNames"
      :closeModal="closeModal"
    />
    <locations-modal
      v-if="locationsModal"
      :modalStatus="locationsModal"
      :locations="locations"
      :closeModal="closeModal"
    />
    <games-modal
      v-if="gamesModal"
      :modalStatus="gamesModal"
      :games="pokemon.game_indices"
      :closeModal="toggleGamesModal"
    />
  </div>
</template>

<script>
import PokemonService from '@/shared/services/pokemon.service';
import EvolutionModal from '../../components/evolution-modal/evolution-modal.component.vue';
import LocationsModal from '../../components/locations-modal/locations-modal.component.vue';
import GamesModal from '../../components/games-modal/games-modal.component.vue';

export default {
  components: {
    EvolutionModal,
    LocationsModal,
    GamesModal,
  },
  data: () => ({
    pokemonService: new PokemonService(),
    pokemon: {},
    evolutionsNames: [],
    evolutions: [],
    loading: true,
    evolutionModal: false,
    locationsModal: false,
    gamesModal: false,
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
    getPokemonEvolutions() {
      this.evolutionsNames.forEach((item) => {
        this.pokemonService.getPokemon(item).then(({ data }) => {
          this.evolutions.push(data);
        });
      });
      this.evolutions.sort((a, b) => a.id < b.id);
    },
    getSpecies() {
      this.pokemonService.getSpecies(this.pokemon.name).then(({ data }) => {
        this.evolutionChain = data.evolution_chain.url;
        this.getEvolutionChain();
      });
    },
    getEvolutionChain() {
      this.pokemonService.getEvolutionChain(this.evolutionChain).then(({ data }) => {
        this.evolutionsNames = this.mapChain(data.chain);
      });
    },
    getPokemonLocations() {
      this.pokemonService.getPokemonLocations(this.pokemon.id).then(({ data }) => {
        this.locations = data;
        this.locationsModal = !this.locationsModal;
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
    toggleEvolutionModal() {
      this.getPokemonEvolutions();
      this.evolutionModal = !this.evolutionModal;
    },
    toggleLocationModal() {
      this.getPokemonLocations();
    },
    toggleGamesModal() {
      this.gamesModal = !this.gamesModal;
    },
    closeModal() {
      this.evolutionModal = false;
      this.locationsModal = false;
      this.evolutions = [];
      this.locations = [];
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
      margin: 8px 0;
      display: flex;
      font-weight: bold;
      padding: 0 16px;
      color: #555c56;
    }
    &__display-abilities {
      max-width: 180px;
      text-align: left;
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
