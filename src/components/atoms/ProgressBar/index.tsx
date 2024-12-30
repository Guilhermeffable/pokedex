import React, { FC } from 'react';
import { ProgressBarProps } from './types';
import { Box, LinearProgress, Stack, Typography } from '@mui/material';

const ProgressBar: FC<ProgressBarProps> = ({ progress, total }) => {
  return (
    <Stack
      direction='column'
      spacing={2}
      sx={{ width: '100%' }}
      justifyContent={'center'}
    >
      <Box sx={{ width: '100%' }}>
        <LinearProgress
          variant='determinate'
          value={(progress / total) * 100}
        />
      </Box>
      <Typography variant='body1' className='text-center'>
        {progress}/{total}
      </Typography>
    </Stack>
  );
};

export default ProgressBar;
