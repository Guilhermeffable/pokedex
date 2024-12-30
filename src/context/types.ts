import { Pokemon } from 'pokenode-ts';

export interface AppState {
  listedPokemons: Pokemon[];
  selectedPokemon?: Pokemon;
  currentPage: number;
}
