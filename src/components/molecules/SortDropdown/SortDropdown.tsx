import React, { FC, useState } from 'react';

import { Stack, Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { SortingOptions } from 'pages/MyPokedex/types';

import { SortDropdownProps } from './types';

const SortDropdown: FC<SortDropdownProps> = ({ onSort, sortingOption, options }) => {
  const [selectedOption, setSelectedOption] = useState(sortingOption);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value as SortingOptions);
    onSort(event);
  };

  return (
    <Stack direction='row' spacing={2} alignItems={'center'}>
      <Typography variant='body1'>Sort:</Typography>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id='sort-by'>Sort by</InputLabel>
        <Select labelId='sort-by' id='demo-simple-select' value={selectedOption} label='Type' onChange={handleChange}>
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
