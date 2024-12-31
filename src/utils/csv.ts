/* eslint-disable no-console */
import { PokemonClient } from 'pokenode-ts';

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: string[];
}

export const fetchAllPokemons = async () => {
  const api = new PokemonClient();

  try {
    const allPokemons = await api.listPokemons(0, 10000);
    const pokemonDetailsPromises = allPokemons.results.map(async (pokemon) => {
      const details = await api.getPokemonByName(pokemon.name);
      return {
        id: details.id,
        name: details.name,
        height: details.height,
        weight: details.weight,
        base_experience: details.base_experience,
        types: details.types.map((type) => type.type.name)
      };
    });

    const detailedPokemons = await Promise.all(pokemonDetailsPromises);

    const csvHeaders = ['id', 'name', 'height', 'weight', 'base_experience', 'types'];
    const csvRows = detailedPokemons.map(
      (pokemon) =>
        `${pokemon.id},${pokemon.name},${pokemon.height},${pokemon.weight},${pokemon.base_experience},"${pokemon.types.join('|')}"`
    );

    const csvContent = [csvHeaders.join(','), ...csvRows].join('\n');

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger a download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'pokemons.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('Pokemons data has been exported to pokemons.csv');
  } catch (error) {
    console.error('Error fetching pokemons:', error);
  }
};
