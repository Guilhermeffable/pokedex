import React, { FC } from 'react';

import { Tooltip } from '@mui/material';
import { capitalizeFirstLetter } from 'utils/generic';

import { getTypeIcon } from './Icon.utils';
import { IconProps } from './types';

import './_icon.scss';

const Icon: FC<IconProps> = ({ type }) => {
  const svg = getTypeIcon(type);

  return (
    <Tooltip title={capitalizeFirstLetter(type)} sx={{ textTransform: 'capitalize' }} arrow>
      <span className={`icon icon--${type}`}>{svg}</span>
    </Tooltip>
  );
};

export default Icon;
