import React, { FC } from 'react';

import { Stack, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SortingOptions } from 'pages/MyPokedex/types';

import { SortDropdownProps } from './types';

const SortDropdown: FC<SortDropdownProps> = ({ onSort, sortingOption }) => {
  return (
    <Stack direction='row' spacing={2} alignItems={'center'}>
      <Typography variant='body1'>Sort:</Typography>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id='sort-by'>Sort by</InputLabel>
        <Select labelId='sort-by' id='demo-simple-select' value={sortingOption} label='Type' onChange={onSort}>
          <MenuItem value={SortingOptions.NAME_ASC}>Name - a - Z</MenuItem>
          <MenuItem value={SortingOptions.NAME_DESC}>Name - z - A</MenuItem>
          <MenuItem value={SortingOptions.HEIGHT_ASC}>Height - Ascending</MenuItem>
          <MenuItem value={SortingOptions.HEIGHT_DESC}>Height - Descending</MenuItem>
          <MenuItem value={SortingOptions.WEIGHT_ASC}>Weight - Ascending</MenuItem>
          <MenuItem value={SortingOptions.WEIGHT_DESC}>Weight - Descending</MenuItem>
          <MenuItem value={SortingOptions.DATE_ASC}>Caught date - Ascending</MenuItem>
          <MenuItem value={SortingOptions.DATE_DESC}>Caught date - Descending</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SortDropdown;
