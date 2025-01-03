import React, { FC } from 'react';

import { Box, Button, FormControl, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { capitalizeFirstLetter } from 'utils/generic';

import { FiltersProps } from './types';

const Filters: FC<FiltersProps> = ({ selectedType, onSelectType, types, onSearch, search, clearFilters }) => {
  return (
    <Box
      component={'div'}
      paddingTop={4}
      paddingLeft={4}
      paddingRight={6}
      sx={{ paddingBottom: { xs: '1rem', lg: 0 } }}
      display={'flex'}
      flexDirection={'column'}
      height={'100%'}>
      <Stack direction={'column'} spacing={2} marginBottom={4} flex={{ xs: 1, lg: 0 }}>
        <Typography variant='body1' marginBottom={4}>
          Filters:
        </Typography>
        <Stack
          direction={'row'}
          spacing={2}
          alignItems={'center'}
          sx={{ marginBottom: 2 }}
          justifyContent={'space-between'}
          marginBottom={2}>
          <p>Type:</p>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              labelId='pokemon-type'
              id='demo-simple-select'
              value={selectedType}
              fullWidth
              displayEmpty
              onChange={onSelectType}
              aria-placeholder='Type'>
              <MenuItem value=''>Type</MenuItem>
              {types.map((type, index) => {
                return (
                  <MenuItem value={type} key={`${type}-${index}`}>
                    {capitalizeFirstLetter(type)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent='space-between' marginBottom={2}>
          <Typography variant='body1' flexBasis={'25%'}>
            Search by name:
          </Typography>
          <TextField
            id='outlined-basic'
            variant='outlined'
            sx={{ width: 200 }}
            onChange={onSearch}
            value={search}
            placeholder='Name'
          />
        </Stack>
      </Stack>
      <Button
        color='primary'
        variant='outlined'
        sx={{ justifySelf: { xs: 'flex-end', md: 'start' }, fontSize: '0.75rem' }}
        onClick={clearFilters}
        disabled={!selectedType && !search}>
        Clear filters
      </Button>
    </Box>
  );
};

export default Filters;
