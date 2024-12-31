import React, { FC } from 'react';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  Snackbar,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useAppContext } from 'context';
import { useNavigate } from 'react-router-dom';
import { ActionTypes } from 'reducer/types';
import { getCaughtPokemons } from 'utils/localStorage';

import { PokemonCardProps } from './types';
import { DEFAULT_IMG } from './utils';

const PokemonCard: FC<PokemonCardProps> = ({ pokemon, isEditMode = false, isChecked, onCheck, onSaveTextNote }) => {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const [isSnackBarOpen, setIsSnackBarOpen] = React.useState(false);
  const [isTextFieldShown, setIsTextFieldShown] = React.useState(false);
  const [textNote, setTextNote] = React.useState('');

  const hasBeenCaught = getCaughtPokemons().some((p) => p.name === pokemon.name);

  const moreDetailsClick = () => {
    dispatch({ type: ActionTypes.SET_SELECTED_POKEMON, payload: pokemon });
    void navigate('/details');
  };

  const shareLink = `${window.location.origin}/details?pokemon=${pokemon.name}`;

  const shareClick = () => {
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        setIsSnackBarOpen(true);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Failed to copy: ', error);
      });
  };

  const onSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  return (
    <Card sx={{ height: '100%', position: 'relative' }} className='flex-grow flex flex-col justify-between'>
      {isEditMode && (
        <Checkbox
          checked={isChecked}
          onChange={(e) => onCheck?.(e.target.checked)}
          sx={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}
      <CardMedia
        component='img'
        alt={pokemon.name}
        height='auto'
        width='248'
        image={pokemon.sprites.front_default || DEFAULT_IMG}
        sx={{ cursor: 'pointer' }}
        onClick={() => moreDetailsClick()}
      />
      <CardContent>
        <Stack spacing={2} justifyContent={'space-between'}>
          <div className='flex justify-between align-center mb-2'>
            <Typography
              variant='h5'
              component='div'
              className='uppercase'
              sx={{
                fontWeight: '800',
                wordBreak: 'break-word',
                textAlign: 'left'
              }}>
              {pokemon.name}
            </Typography>
            {hasBeenCaught && (
              <Chip
                label='CAUGHT'
                color='error'
                size='small'
                sx={{ position: 'absolute', top: '0.5rem', right: '0.25rem' }}
              />
            )}
          </div>
          <CardActions
            disableSpacing
            sx={{
              flexDirection: 'column',
              justifyContent: 'start',
              padding: '0'
            }}>
            <Button
              size='small'
              color='primary'
              sx={{ textAlign: 'left', alignSelf: 'start' }}
              onClick={() => shareClick()}>
              Share
            </Button>
            <Button size='small' sx={{ textAlign: 'left', alignSelf: 'start' }} onClick={() => moreDetailsClick()}>
              More details...
            </Button>
          </CardActions>
        </Stack>
        <Snackbar
          open={isSnackBarOpen}
          autoHideDuration={6000}
          onClose={onSnackBarClose}
          message='Link was copied to your clipboard!'
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        />
        {isEditMode && !isTextFieldShown && (
          <Button size='small' color='secondary' variant='contained' onClick={() => setIsTextFieldShown(true)}>
            Add text note
          </Button>
        )}
        {isTextFieldShown && (
          <div className='mt-2'>
            <TextField multiline label='Note' onChange={(e) => setTextNote(e.target.value)} />
            <Button
              color='success'
              variant='outlined'
              sx={{ mt: 1 }}
              onClick={() => {
                setIsTextFieldShown(false);
                onSaveTextNote?.(textNote);
              }}>
              Save
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
