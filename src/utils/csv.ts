/* eslint-disable no-console */
import { PokemonClient } from 'pokenode-ts';

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
        hp: details.stats.find((stat) => stat.stat.name === 'hp')?.base_stat,
        attack: details.stats.find((stat) => stat.stat.name === 'attack')?.base_stat,
        defense: details.stats.find((stat) => stat.stat.name === 'defense')?.base_stat,
        special_attack: details.stats.find((stat) => stat.stat.name === 'special-attack')?.base_stat,
        special_defense: details.stats.find((stat) => stat.stat.name === 'special-defense')?.base_stat,
        speed: details.stats?.find((stat) => stat.stat.name === 'speed')?.base_stat,
        base_experience: details.base_experience,
        types: details.types.map((type) => type.type.name)
      };
    });

    const detailedPokemons = await Promise.all(pokemonDetailsPromises);

    const csvHeaders = [
      'id',
      'name',
      'height',
      'weight',
      'hp',
      'attack',
      'defense',
      'special-attack',
      'special-defense',
      'speed',
      'base_experience',
      'types'
    ];
    const csvRows = detailedPokemons.map(
      (pokemon) =>
        `${pokemon.id},${pokemon.name},${pokemon.height},${pokemon.weight},${pokemon.hp || 0},${pokemon.attack || 0},${pokemon.defense || 0},${pokemon.special_attack || 0},${pokemon.special_defense || 0},${pokemon.speed || 0},${pokemon.base_experience},"${pokemon.types.join('|')}"`
    );

    const csvContent = [csvHeaders.join(','), ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

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
