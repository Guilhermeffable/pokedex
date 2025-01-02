import { Pokemon } from 'pokenode-ts';

export interface PokemonGridProps {
  pokemons?: Pokemon[];
  isLoading?: boolean;
  isEditMode?: boolean;
  setIsEditMode?: (isEditMode: boolean) => void;
}
