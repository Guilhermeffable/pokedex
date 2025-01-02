import React, { FC } from 'react';

import { Stack, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { SortDropdownProps } from './types';

const SortDropdown: FC<SortDropdownProps> = ({ onSort, sortingOption, options }) => {
  return (
    <Stack direction='row' spacing={2} alignItems={'center'}>
      <Typography variant='body1'>Sort:</Typography>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id='sort-by'>Sort by</InputLabel>
        <Select labelId='sort-by' id='demo-simple-select' value={sortingOption} label='Type' onChange={onSort}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SortDropdown;
