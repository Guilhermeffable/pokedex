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
  TextField,
  Typography
} from '@mui/material';
import { PokemonCardProps } from './types';
import { DEFAULT_IMG } from './utils';

import { useAppContext } from 'context';
import { ActionTypes } from 'reducer/types';
import { useNavigate } from 'react-router-dom';
import { getCaughtPokemons } from 'utils/localStorage';

const PokemonCard: FC<PokemonCardProps> = ({
  pokemon,
  isEditMode = false,
  isChecked,
  onCheck,
  onSaveTextNote
}) => {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const [isSnackBarOpen, setIsSnackBarOpen] = React.useState(false);
  const [isTextFieldShown, setIsTextFieldShown] = React.useState(false);
  const [textNote, setTextNote] = React.useState('');

  const hasBeenCaught = getCaughtPokemons().some(
    (p) => p.name === pokemon.name
  );

  const moreDetailsClick = () => {
    dispatch({ type: ActionTypes.SET_SELECTED_POKEMON, payload: pokemon });
    navigate('/details');
  };

  const shareLink = `${window.location.origin}/details?pokemon=${pokemon.name}`;

  const shareClick = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setIsSnackBarOpen(true);
    });
  };

  const onSnackBarClose = () => {
    setIsSnackBarOpen(false);
  };

  return (
    <Card sx={{ height: '100%' }} className='flex-grow'>
      {isEditMode && (
        <Checkbox
          checked={isChecked}
          onChange={(e) => onCheck?.(e.target.checked)}
        />
      )}
      <CardMedia
        component='img'
        alt='green iguana'
        height='auto'
        width='248'
        image={pokemon.sprites.front_default || DEFAULT_IMG}
      />
      <CardContent>
        <div className='flex justify-between align-center mb-2'>
          <Typography
            variant='h5'
            component='div'
            className='uppercase'
            sx={{
              fontWeight: '800',
              wordBreak: 'break-word',
              textAlign: 'left'
            }}
          >
            {pokemon.name}
          </Typography>
          {hasBeenCaught && <Chip label='CAUGHT' color='error' />}
        </div>
        <CardActions
          disableSpacing
          sx={{
            flexDirection: 'column',
            justifyContent: 'start',
            padding: '0'
          }}
        >
          <Button
            size='small'
            color='primary'
            sx={{ textAlign: 'left', alignSelf: 'start' }}
            onClick={() => shareClick()}
          >
            Share
          </Button>
          <Button
            size='small'
            sx={{ textAlign: 'left', alignSelf: 'start' }}
            onClick={() => moreDetailsClick()}
          >
            More details...
          </Button>
        </CardActions>
        <Snackbar
          open={isSnackBarOpen}
          autoHideDuration={6000}
          onClose={onSnackBarClose}
          message='Link was copied to your clipboard!'
        />
        {isEditMode && !isTextFieldShown && (
          <Button
            size='small'
            color='secondary'
            variant='contained'
            onClick={() => setIsTextFieldShown(true)}
          >
            Add text note
          </Button>
        )}
        {isTextFieldShown && (
          <div className='mt-2'>
            <TextField
              multiline
              label='Note'
              onChange={(e) => setTextNote(e.target.value)}
            />
            <Button
              color='success'
              variant='outlined'
              sx={{ mt: 1 }}
              onClick={() => {
                setIsTextFieldShown(false);
                onSaveTextNote?.(textNote);
              }}
            >
              Save
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
