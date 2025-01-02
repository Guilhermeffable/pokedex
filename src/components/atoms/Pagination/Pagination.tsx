import React, { FC } from 'react';

import { Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useAppContext } from 'context';
import { ActionTypes } from 'reducer/types';

import { PaginationProps } from './types';

const PaginationComponent: FC<PaginationProps> = ({ numberOfPokemons }) => {
  const { dispatch, state } = useAppContext();

  const totalPages = Math.floor(numberOfPokemons / 20) + (numberOfPokemons % 20 === 2 ? 1 : 0);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch({ type: ActionTypes.SET_CURRENT_PAGE, payload: value });
  };

  return (
    <Stack direction='row' justifyContent={'center'} py={3}>
      <Pagination count={totalPages} onChange={handleChange} defaultPage={state.currentPage} />
    </Stack>
  );
};

export default PaginationComponent;
