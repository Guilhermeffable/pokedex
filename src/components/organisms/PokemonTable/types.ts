import { GridRowSelectionModel } from '@mui/x-data-grid';
import { CaughtPokemon } from 'utils/localStorage';

export interface PokemonTableProps {
  pokemons: CaughtPokemon[];
}

export interface CustomToolbarProps {
  handleDeleteRows: () => void;
  selectionModel: GridRowSelectionModel;
}

export interface Row {
  id: string;
  name: string;
  height: number;
  weight: number;
  attack: number | undefined;
  defense: number | undefined;
  specialAttack: number | undefined;
  specialDefense: number | undefined;
}
