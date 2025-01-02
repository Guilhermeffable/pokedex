import React, { FC } from 'react';

import { Divider, Stack, Typography } from '@mui/material';
import { useAppContext } from 'context';

import { ProgressProps } from './types';

const Progress: FC<ProgressProps> = ({ total }) => {
  const { state } = useAppContext();

  return (
    <>
      <Divider sx={{ mb: 4 }}>Progress</Divider>
      <Stack direction='row' justifyContent={'center'} spacing={2} sx={{ mb: 2 }}>
        <Stack direction='column' spacing={2} sx={{ width: '100%' }} justifyContent={'center'}>
          <Typography variant='body1' textAlign={'center'}>
            Your pokedex progress is : {state.caughtPokemons.length} caught / {total} in the wild
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Progress;
