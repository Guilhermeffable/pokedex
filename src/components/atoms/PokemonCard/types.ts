import { Pokemon } from 'pokenode-ts';

export interface PokemonCardProps {
  pokemon: Pokemon;
  isEditMode?: boolean;
  isChecked?: boolean;
  onCheck?: (checked: boolean) => void;
  onSaveTextNote?: (textNote: string) => void;
}
