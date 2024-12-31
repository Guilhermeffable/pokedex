import React from 'react';

import {
  Bug,
  Dark,
  Dragon,
  Electric,
  Fairy,
  Fighting,
  Fire,
  Flying,
  Ghost,
  Grass,
  Ground,
  Ice,
  Normal,
  Poison,
  Psychic,
  Rock,
  Steel,
  Water
} from 'assets/svg';

export const getTypeIcon = (type: string) => {
  switch (type) {
    case 'bug':
      return <Bug />;
    case 'dark':
      return <Dark />;
    case 'dragon':
      return <Dragon />;
    case 'electric':
      return <Electric />;
    case 'fairy':
      return <Fairy />;
    case 'fighting':
      return <Fighting />;
    case 'fire':
      return <Fire />;
    case 'flying':
      return <Flying />;
    case 'ghost':
      return <Ghost />;
    case 'grass':
      return <Grass />;
    case 'ground':
      return <Ground />;
    case 'ice':
      return <Ice />;
    case 'normal':
      return <Normal />;
    case 'poison':
      return <Poison />;
    case 'psychic':
      return <Psychic />;
    case 'rock':
      return <Rock />;
    case 'steel':
      return <Steel />;
    case 'water':
      return <Water />;
  }
};
