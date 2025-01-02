import { Pokemon } from 'pokenode-ts';
import { CaughtPokemon } from 'utils/localStorage';

export interface AppState {
  listedPokemons: Pokemon[];
  selectedPokemon?: Pokemon;
  currentPage: number;
  caughtPokemons: CaughtPokemon[];
}
