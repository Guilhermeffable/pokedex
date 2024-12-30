import { useAppContext } from 'context';
import React, { FC } from 'react';
import { ActionTypes } from 'reducer/types';
import { PaginationProps } from './types';
import Pagination from '@mui/material/Pagination';

const PaginationComponent: FC<PaginationProps> = ({ numberOfPokemons }) => {
  const { dispatch } = useAppContext();

  const totalPages =
    Math.floor(numberOfPokemons / 20) + (numberOfPokemons % 20 === 2 ? 1 : 0);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch({ type: ActionTypes.SET_CURRENT_PAGE, payload: value });
  };

  return (
    <div className='my-3 flex justify-center'>
      <Pagination count={totalPages} onChange={handleChange} />
    </div>
  );
};

export default PaginationComponent;
