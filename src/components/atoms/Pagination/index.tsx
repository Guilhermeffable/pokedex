import React, { FC } from 'react';

import { Box, Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useAppContext } from 'context';
import { ActionTypes } from 'reducer/types';

import { PaginationProps } from './types';

const PaginationComponent: FC<PaginationProps> = ({ numberOfPokemons }) => {
  const { dispatch } = useAppContext();

  const totalPages = Math.floor(numberOfPokemons / 20) + (numberOfPokemons % 20 === 2 ? 1 : 0);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch({ type: ActionTypes.SET_CURRENT_PAGE, payload: value });
  };

  return (
    <Stack direction='row' justifyContent={'center'} py={3}>
      <Pagination count={totalPages} onChange={handleChange} />
    </Stack>
  );
};

export default PaginationComponent;
