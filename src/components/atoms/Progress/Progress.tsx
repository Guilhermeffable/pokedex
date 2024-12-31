import React, { FC } from 'react';

import { Divider, Stack, Typography } from '@mui/material';

import { ProgressProps } from './types';

const Progress: FC<ProgressProps> = ({ progress, total }) => {
  return (
    <>
      <Divider sx={{ mb: 4 }}>Progress</Divider>
      <Stack direction='row' justifyContent={'center'} spacing={2} sx={{ mb: 2 }}>
        <Stack direction='column' spacing={2} sx={{ width: '100%' }} justifyContent={'center'}>
          <Typography variant='body1' className='text-center'>
            Your pokedex progress is : {progress} caught / {total} in the wild
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Progress;
