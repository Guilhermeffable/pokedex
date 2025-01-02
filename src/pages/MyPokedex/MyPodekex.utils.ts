import { Option } from 'components/organisms/SortDropdown/types';
import { parseCustomDate } from 'utils/date';
import { CaughtPokemon } from 'utils/localStorage';

import { SortingOptions } from './types';

export const sortPokemons = (pokemons: CaughtPokemon[], sortOption: SortingOptions) => {
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
      return pokemons.sort((a, b) => parseCustomDate(b.timestamp).getTime() - parseCustomDate(a.timestamp).getTime());
    case SortingOptions.DATE_DESC:
      return pokemons.sort((a, b) => parseCustomDate(a.timestamp).getTime() - parseCustomDate(b.timestamp).getTime());
    default:
      return pokemons;
  }
};

export const dropdownOptions: Option[] = [
  { value: SortingOptions.NAME_ASC, label: 'Name - a - Z' },
  { value: SortingOptions.NAME_DESC, label: 'Name - z - A' },
  { value: SortingOptions.HEIGHT_ASC, label: 'Height - Ascending' },
  { value: SortingOptions.HEIGHT_DESC, label: 'Height - Descending' },
  { value: SortingOptions.WEIGHT_ASC, label: 'Weight - Ascending' },
  { value: SortingOptions.WEIGHT_DESC, label: 'Weight - Descending' },
  { value: SortingOptions.DATE_ASC, label: 'Caught date - Ascending' },
  { value: SortingOptions.DATE_DESC, label: 'Caught date - Descending' }
];
