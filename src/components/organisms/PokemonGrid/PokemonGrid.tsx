import React, { FC, useState } from 'react';

import { Box, Button, Grid2 as Grid, Skeleton, Stack } from '@mui/material';
import PokemonCard from 'components/molecules/PokemonCard/PokemonCard';
import { useAppContext } from 'context';
import { ActionTypes } from 'reducer/types';
import { addTextNoteToCaughtPokemon, bulkRemoveCaughtPokemons } from 'utils/localStorage';

import DeleteDialog from '../../molecules/DeleteDialog/DeleteDialog';

import { PokemonGridProps } from './types';

const PokemonGrid: FC<PokemonGridProps> = ({ pokemons, isLoading = false, isEditMode = false, setIsEditMode }) => {
  const { state, dispatch } = useAppContext();
  const [checkedPokemons, setCheckedPokemons] = useState<number[]>([]);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  const handleCheck = (pokemonId: number, isChecked: boolean) => {
    setCheckedPokemons((prev) => (isChecked ? [...prev, pokemonId] : prev.filter((id) => id !== pokemonId)));
  };

  const saveTextNote = (pokemonId: number, textNote: string) => {
    addTextNoteToCaughtPokemon(pokemonId, textNote);
    dispatch({ type: ActionTypes.ADD_TEXT_NOTE_TO_CAUGHT_POKEMON, payload: { pokemonId, textNote } });
  };

  const onRemoveClick = () => {
    dispatch({
      type: ActionTypes.SET_CAUGHT_POKEMONS,
      payload: state.caughtPokemons.filter((pokemon) => !checkedPokemons.includes(pokemon.id))
    });
    bulkRemoveCaughtPokemons(checkedPokemons);
    setCheckedPokemons([]);
    setIsEditMode?.(false);
    setShowRemoveDialog(false);
  };

  return (
    <Stack direction={'column'} width={'100%'}>
      <Grid container width={'100%'}>
        {isLoading
          ? Array(20)
              .fill(null)
              .map((_, index) => (
                <Grid size={{ xs: 6, md: 4, lg: 3 }} key={index}>
                  <Skeleton variant='rectangular' width={'auto'} height={'401px'} sx={{ mt: 1, mx: 2 }} />
                </Grid>
              ))
          : pokemons &&
            pokemons?.map((item) => {
              return (
                <Grid size={{ xs: 6, md: 4, lg: 4 }} key={item.id} display={'flex'}>
                  <Box mt={1} mx={2} flex={1}>
                    <PokemonCard
                      pokemon={item}
                      isEditMode={isEditMode}
                      isChecked={checkedPokemons.includes(item.id)}
                      onCheck={(checked) => handleCheck(item.id, checked)}
                      onSaveTextNote={(textNote) => saveTextNote(item.id, textNote)}
                    />
                  </Box>
                </Grid>
              );
            })}
      </Grid>
      {isEditMode && (
        <Button
          variant='contained'
          color='error'
          sx={{ mt: 2, width: '25%' }}
          onClick={() => setShowRemoveDialog(true)}
          disabled={checkedPokemons.length === 0}>
          Remove
        </Button>
      )}
      <DeleteDialog
        onRemoveClick={onRemoveClick}
        showRemoveDialog={showRemoveDialog}
        setShowRemoveDialog={setShowRemoveDialog}
      />
    </Stack>
  );
};

export default PokemonGrid;
