import { CaughtPokemon } from 'utils/localStorage';
import { SortingOptions } from './types';
import { parseCustomDate } from 'utils/date';

export const sortPokemons = (
  pokemons: CaughtPokemon[],
  sortOption: SortingOptions
) => {
  switch (sortOption) {
    case SortingOptions.NAME_ASC:
      return pokemons.sort((a, b) => a.name.localeCompare(b.name));
    case SortingOptions.NAME_DESC:
      return pokemons.sort((a, b) => b.name.localeCompare(a.name));
    case SortingOptions.HEIGHT_ASC:
      return pokemons.sort((a, b) => a.height - b.height);
    case SortingOptions.HEIGHT_DESC:
      return pokemons.sort((a, b) => b.height - a.height);
    case SortingOptions.WEIGHT_ASC:
      return pokemons.sort((a, b) => a.weight - b.weight);
    case SortingOptions.WEIGHT_DESC:
      return pokemons.sort((a, b) => b.weight - a.weight);
    case SortingOptions.DATE_ASC:
      return pokemons.sort(
        (a, b) =>
          parseCustomDate(b.timestamp).getTime() -
          parseCustomDate(a.timestamp).getTime()
      );
    case SortingOptions.DATE_DESC:
      return pokemons.sort(
        (a, b) =>
          parseCustomDate(a.timestamp).getTime() -
          parseCustomDate(b.timestamp).getTime()
      );
    default:
      return pokemons;
  }
};
