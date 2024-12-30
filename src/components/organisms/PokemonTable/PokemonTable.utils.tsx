import React from 'react';
import { GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import { CaughtPokemon } from 'utils/localStorage';
import { ReactComponent as DeleteIcon } from '../../../assets/svg/delete.svg';
import { Row } from './types';
import { Box } from '@mui/material';

export const getDataGridColumns = (
  setRowToDeleteId: (id: string) => void
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
      field: 'types',
      headerName: 'Types',
      width: 200,
      renderCell: (params) => (
        <Box
          component='ul'
          sx={{ padding: 0, margin: 0, listStyleType: 'none' }}
        >
          {params.value.map((item, index) => (
            <Box component='li' key={index}>
              {item}
            </Box>
          ))}
        </Box>
      )
    },
    { field: 'caughtDate', headerName: 'Caught Date', width: 260 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      getActions: ({ id }) => {
        const handleDelete = (id: GridRowId) => () => {
          setRowToDeleteId(id as string);
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
      )?.base_stat,
      types: pokemon.types.map((type) => type.type.name),
      caughtDate: pokemon.timestamp
    };
  });
};
