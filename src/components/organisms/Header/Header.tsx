import React, { FC } from 'react';

import { Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import PokemonLogo from '../../../assets/images/pokemon-logo.png';

import { HeaderProps } from './types';

const Header: FC<HeaderProps> = ({ dividerLabel }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        component='img'
        src={PokemonLogo}
        alt='pokemon-logo'
        sx={{ width: '100%', maxWidth: '700px', margin: 'auto' }}
        onClick={() => void navigate('/')}
      />
      <Divider sx={{ mb: 4 }}>{dividerLabel}</Divider>
    </Box>
  );
};

export default Header;
