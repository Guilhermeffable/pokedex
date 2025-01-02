import { CaughtPokemon } from 'utils/localStorage';

export type ChartDataset = {
  label: string;
  stat: number;
};

export const getDataset = (pokemon: CaughtPokemon): ChartDataset[] => {
  return [
    { label: 'Hgt', stat: pokemon.height },
    { label: 'Wgt', stat: pokemon.weight },
    { label: 'Att', stat: pokemon.stats.find((stat) => stat.stat.name === 'attack')?.base_stat || 0 },
    { label: 'Def', stat: pokemon.stats.find((stat) => stat.stat.name === 'defense')?.base_stat || 0 },
    { label: 'Spd', stat: pokemon.stats.find((stat) => stat.stat.name === 'speed')?.base_stat || 0 },
    { label: 'HP', stat: pokemon.stats.find((stat) => stat.stat.name === 'hp')?.base_stat || 0 }
  ];
};
