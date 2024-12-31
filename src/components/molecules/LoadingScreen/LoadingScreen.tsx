import React from 'react';

import { Backdrop, CircularProgress, Stack, Typography } from '@mui/material';

import { LoadingScreenProps } from './types';

const LoadingScreen: React.FC<LoadingScreenProps> = ({ open = false }) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: 'blur(10px)'
      }}
      open={open}>
      <Stack direction='column' spacing={2} sx={{ width: '100%' }} alignItems={'center'}>
        <Typography variant='h4' className='mb-4'>
          Your file is being generated! Hang tight
        </Typography>
        <CircularProgress color='inherit' size={100} />
      </Stack>
    </Backdrop>
  );
};

export default LoadingScreen;
