import MainService from './main.service';

export default class PokemonService {
  getPokemons(params) {
    return MainService.get(`/pokemon?limit=${params.limit}&offset=${params.offset}`).then((resp) => resp);
  }

  getPokemon(name) {
    return MainService.get(`/pokemon/${name}`).then((resp) => resp);
  }
}
