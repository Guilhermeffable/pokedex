import React, { FC, useState } from 'react';
import { PokemonGridProps } from './types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2 as Grid,
  Skeleton
} from '@mui/material';
import PokemonCard from 'components/atoms/PokemonCard';
import {
  addTextNoteToCaughtPokemon,
  bulkRemoveCaughtPokemons
} from 'utils/localStorage';
import DeleteDialog from '../DeleteDialog';

const PokemonGrid: FC<PokemonGridProps> = ({
  pokemons,
  isLoading = false,
  isEditMode = false,
  setIsEditMode
}) => {
  const [checkedPokemons, setCheckedPokemons] = useState<number[]>([]);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  const handleCheck = (pokemonId: number, isChecked: boolean) => {
    setCheckedPokemons((prev) =>
      isChecked ? [...prev, pokemonId] : prev.filter((id) => id !== pokemonId)
    );
  };

  const saveTextNote = (pokemonId: number, textNote: string) => {
    addTextNoteToCaughtPokemon(pokemonId, textNote);
  };

  const onRemoveClick = () => {
    bulkRemoveCaughtPokemons(checkedPokemons);
    setCheckedPokemons([]);
    setIsEditMode?.(false);
    setShowRemoveDialog(false);
  };

  return (
    <>
      <Grid container>
        {isLoading
          ? Array(20)
              .fill(null)
              .map((_, index) => (
                <Grid size={{ xs: 6, md: 4, lg: 3 }}>
                  <Skeleton
                    variant='rectangular'
                    width={'auto'}
                    height={'401px'}
                    sx={{ mt: 1, mx: 2 }}
                  />
                </Grid>
              ))
          : pokemons &&
            pokemons?.map((item) => {
              return (
                <Grid
                  size={{ xs: 6, md: 4, lg: 3 }}
                  key={item.id}
                  className='flex'
                >
                  <div className='mt-1 mx-2 flex-grow'>
                    <PokemonCard
                      pokemon={item}
                      isEditMode={isEditMode}
                      isChecked={checkedPokemons.includes(item.id)}
                      onCheck={(checked) => handleCheck(item.id, checked)}
                      onSaveTextNote={(textNote) =>
                        saveTextNote(item.id, textNote)
                      }
                    />
                  </div>
                </Grid>
              );
            })}
      </Grid>
      {isEditMode && (
        <Button
          variant='contained'
          color='error'
          sx={{ mt: 2 }}
          onClick={() => setShowRemoveDialog(true)}
        >
          Remove
        </Button>
      )}
      {showRemoveDialog && (
        <DeleteDialog
          onRemoveClick={onRemoveClick}
          showRemoveDialog={showRemoveDialog}
          setShowRemoveDialog={setShowRemoveDialog}
        />
      )}
    </>
  );
};

export default PokemonGrid;
