<template lang="html">
  <div class="pokedex">
    <pokedex-list
      :pokemons="pokemons"
      :get-pokemons="getInfinitePokemons"
      :see-pokemon-detail="seePokemonDetail"
    />
  </div>
</template>

<script>
import PokemonService from '@/shared/services/pokemon.service';
import PokedexList from '../../components/pokedex-list/pokedex-list.component.vue';

export default {
  components: {
    PokedexList,
  },
  data: () => ({
    pokemonService: new PokemonService(),
    pokemons: [],
    currentPage: 1,
    offset: 0,
    limit: 10,
    next: null,
    previous: null,
  }),
  methods: {
    getInfinitePokemons($state) {
      const params = {
        offset: this.offset,
        limit: this.limit,
      };
      this.pokemonService.getPokemons(params).then(({ data }) => {
        this.next = data.next;
        this.previous = data.previous;
        this.offset += 10;
        data.results.forEach((pokemon) => {
          pokemon.id = pokemon.url.split('/')
            .filter((part) => !!part).pop();
          this.pokemons.push(pokemon);
        });
        $state.loaded();
      });
    },
    seePokemonDetail(name) {
      this.$router.push(`/pokemon/${name}`);
    },
  },
};
</script>
