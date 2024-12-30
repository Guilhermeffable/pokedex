import { Pokemon } from 'pokenode-ts';
import { formatDateTime } from './date';

export type CaughtPokemon = Pokemon & { timestamp: string; textNote?: string };

export const updateCaughtPokemons = (
  pokemon?: Pokemon,
  shouldRemove: boolean = false
) => {
  const caughtPokemons = localStorage.getItem('caughtPokemons');
  let updatedCaughtPokemons: CaughtPokemon[] = [];

  if (caughtPokemons && pokemon) {
    updatedCaughtPokemons = JSON.parse(caughtPokemons);
    if (!shouldRemove) {
      updatedCaughtPokemons.push({
        ...pokemon,
        timestamp: formatDateTime(new Date())
      });
    } else {
      updatedCaughtPokemons = updatedCaughtPokemons.filter(
        (caughtPokemon) => caughtPokemon.id !== pokemon.id
      );
    }

    localStorage.setItem(
      'caughtPokemons',
      JSON.stringify(updatedCaughtPokemons)
    );
  } else {
    localStorage.setItem('caughtPokemons', JSON.stringify([]));
  }
};

export const addTextNoteToCaughtPokemon = (
  pokemonId: number,
  textNote: string
) => {
  const caughtPokemons = getCaughtPokemons();

  if (caughtPokemons) {
    const updatedCaughtPokemons = caughtPokemons.map((pokemon) => {
      if (pokemon.id === Number(pokemonId)) {
        return {
          ...pokemon,
          textNote
        };
      }

      return pokemon;
    });

    localStorage.setItem(
      'caughtPokemons',
      JSON.stringify(updatedCaughtPokemons)
    );
  }
};

export const getCaughtPokemons = () => {
  const caughtPokemons = localStorage.getItem('caughtPokemons');

  const parsedCaughtPokemons: CaughtPokemon[] = JSON.parse(
    caughtPokemons || '[]'
  );

  return parsedCaughtPokemons;
};

export const bulkRemoveCaughtPokemons = (pokemonIds: number[]) => {
  const caughtPokemons = getCaughtPokemons();

  if (caughtPokemons) {
    const updatedCaughtPokemons = caughtPokemons.filter(
      (pokemon) => !pokemonIds.includes(pokemon.id)
    );

    localStorage.setItem(
      'caughtPokemons',
      JSON.stringify(updatedCaughtPokemons)
    );
  }
};
