import React, { FC } from 'react';

import {
  Box,
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

import Icon from '../../atoms/Icon/Icon';
import { PokemonTypes } from '../../atoms/Icon/types';

import { PokemonCardProps } from './types';
import { DEFAULT_IMG } from './utils';

const PokemonCard: FC<PokemonCardProps> = ({ pokemon, isEditMode = false, isChecked, onCheck, onSaveTextNote }) => {
  const { dispatch, state } = useAppContext();
  const navigate = useNavigate();
  const [isSnackBarOpen, setIsSnackBarOpen] = React.useState(false);
  const [isTextFieldShown, setIsTextFieldShown] = React.useState(false);
  const [textNote, setTextNote] = React.useState('');

  const hasBeenCaught = state.caughtPokemons.some((p) => p.name === pokemon.name);

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
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'space-between',
        display: 'flex',
        backgroundColor: '#3c5aa6',
        color: 'white'
      }}>
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
      <CardContent sx={{ flex: '1', display: 'flex' }}>
        <Stack spacing={2} direction={'column'} justifyContent={'space-between'} flex={1}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            alignItems={'center'}
            flex={1}
            mb={2}>
            <Typography
              variant='body2'
              component='div'
              textTransform={'uppercase'}
              sx={{
                fontWeight: '800',
                wordBreak: 'break-word',
                textAlign: 'left'
              }}>
              {pokemon.name} #{pokemon.id}
            </Typography>
            <Stack direction={'row'} spacing={2} my={1}>
              {pokemon?.types.map((type) => {
                return <Icon key={type.type.name} type={type.type.name as PokemonTypes} />;
              })}
            </Stack>
            {hasBeenCaught && (
              <Chip
                label='CAUGHT'
                color='error'
                size='small'
                sx={{ position: 'absolute', top: '0.5rem', right: '0.25rem' }}
              />
            )}
          </Box>
          <CardActions
            disableSpacing
            sx={{
              flexDirection: 'column',
              justifyContent: 'start',
              padding: '0',
              '& .MuiButton-root': {
                textAlign: 'left',
                alignSelf: 'start'
              }
            }}>
            <Button size='small' color='primary' sx={{ color: 'white' }} onClick={() => shareClick()}>
              Share
            </Button>
            <Button size='small' sx={{ color: 'white' }} onClick={() => moreDetailsClick()}>
              More details...
            </Button>
            {isEditMode && !isTextFieldShown && (
              <Button
                size='small'
                color='secondary'
                variant='contained'
                sx={{ justifySelf: 'start' }}
                onClick={() => setIsTextFieldShown(true)}>
                Add text note
              </Button>
            )}
            {isTextFieldShown && (
              <Box component='div' mt={2}>
                <TextField
                  multiline
                  label='Note'
                  onChange={(e) => setTextNote(e.target.value)}
                  sx={{ background: 'white' }}
                />
                <Button
                  color='success'
                  variant='outlined'
                  sx={{ mt: 1, background: 'white' }}
                  onClick={() => {
                    setIsTextFieldShown(false);
                    onSaveTextNote?.(textNote);
                  }}>
                  Save
                </Button>
              </Box>
            )}
          </CardActions>
        </Stack>
        <Snackbar
          open={isSnackBarOpen}
          autoHideDuration={6000}
          onClose={onSnackBarClose}
          message='Link was copied to your clipboard!'
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        />
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
