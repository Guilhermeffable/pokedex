import React, { Dispatch, SetStateAction } from 'react';
import { GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import { bulkRemoveCaughtPokemons, CaughtPokemon } from 'utils/localStorage';
import { ReactComponent as DeleteIcon } from '../../../assets/svg/delete.svg';
import { Row } from './types';

export const getDataGridColumns = (
  setRows: Dispatch<SetStateAction<Row[]>>
): GridColDef[] => {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Pokemon',
      width: 200
    },
    { field: 'height', headerName: 'Height', width: 200 },
    {
      field: 'weight',
      headerName: 'Weight',
      width: 200
    },
    { field: 'attack', headerName: 'Attack', width: 200 },
    {
      field: 'defense',
      headerName: 'Defense',
      width: 200
    },
    {
      field: 'specialAttack',
      headerName: 'Special Attack',
      width: 200
    },
    {
      field: 'specialDefense',
      headerName: 'Special Defense',
      width: 200
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: ({ id }) => {
        const handleDelete = (id: GridRowId) => () => {
          bulkRemoveCaughtPokemons([Number(id)]);
          setRows((prev) => prev.filter((row) => row.id !== id));
        };

        return [
          <GridActionsCellItem
            icon={<DeleteIcon width={24} stroke='#000' />}
            onClick={handleDelete(id)}
            label='Delete'
            color='inherit'
          />
        ];
      }
    }
  ];

  return columns;
};

export const getDataGridRows = (pokemons: CaughtPokemon[]): Row[] => {
  return pokemons.map((pokemon) => {
    return {
      id: `${pokemon.id}`,
      name: pokemon.name.toLocaleUpperCase(),
      height: pokemon.height,
      weight: pokemon.weight,
      attack: pokemon.stats.find((stat) => stat.stat.name === 'attack')
        ?.base_stat,
      defense: pokemon.stats.find((stat) => stat.stat.name === 'defense')
        ?.base_stat,
      specialAttack: pokemon.stats.find(
        (stat) => stat.stat.name === 'special-attack'
      )?.base_stat,
      specialDefense: pokemon.stats.find(
        (stat) => stat.stat.name === 'special-defense'
      )?.base_stat
    };
  });
};
