import React, { useEffect, useMemo } from 'react';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import PokemonGrid from 'components/molecules/PokemonGrid';
import { getCaughtPokemons } from 'utils/localStorage';
import { PokemonClient } from 'pokenode-ts';
import { SortingOptions } from './types';
import { sortPokemons } from './MyPodekex.utils';
import { useNavigate } from 'react-router-dom';
import PokemonTable from 'components/organisms/PokemonTable';

const MyPokedex = () => {
  const caughtPokemon = getCaughtPokemons();
  const navigate = useNavigate();

  const [search, setSearch] = React.useState<string>('');
  const [types, setTypes] = React.useState<string[]>([]);
  const [selectedType, setSelectedType] = React.useState<string>('');
  const [sortingOption, setSortingOption] = React.useState<SortingOptions>();
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isTableView, setIsTableView] = React.useState(false);

  const api = new PokemonClient();

  useEffect(() => {
    api
      .listTypes()
      .then((data) => setTypes(data.results.map((type) => type.name)));
  }, []);

  const filteredAndSortedResults = useMemo(() => {
    let filtered = [...caughtPokemon];

    if (search) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(search.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === selectedType)
      );
    }

    return sortingOption ? sortPokemons(filtered, sortingOption) : filtered;
  }, [caughtPokemon, search, selectedType, sortingOption]);

  return (
    <Container>
      <Typography
        variant='h1'
        sx={{ mt: 2, mb: 2 }}
        className='uppercase text-center'
      >
        Pokedex
      </Typography>
      <Stack
        direction='row'
        spacing={2}
        sx={{ mb: 2 }}
        justifyContent={'space-between'}
      >
        <Stack direction='row' spacing={2} alignItems={'center'}>
          <Typography variant='body1'>Filter:</Typography>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id='pokemon-type'>Type</InputLabel>
            <Select
              labelId='pokemon-type'
              id='demo-simple-select'
              value={selectedType}
              label='Type'
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {types.map((type, index) => {
                return (
                  <MenuItem value={type} key={`${type}-${index}`}>
                    {type}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            id='outlined-basic'
            label='Name'
            variant='outlined'
            sx={{ width: '200px' }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className='text-xs self-end'
            onClick={() => {
              setSelectedType('');
              setSearch('');
            }}
          >
            Clear filters
          </button>
        </Stack>
        <Stack direction='row' spacing={2} alignItems={'center'}>
          <Typography variant='body1'>Sort:</Typography>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id='sort-by'>Sort by</InputLabel>
            <Select
              labelId='sort-by'
              id='demo-simple-select'
              value={selectedType}
              label='Type'
              onChange={(e) =>
                setSortingOption(e.target.value as SortingOptions)
              }
            >
              <MenuItem value={SortingOptions.NAME_ASC}>Name - a - Z</MenuItem>
              <MenuItem value={SortingOptions.NAME_DESC}>Name - z - A</MenuItem>
              <MenuItem value={SortingOptions.HEIGHT_ASC}>
                Height - Ascending
              </MenuItem>
              <MenuItem value={SortingOptions.HEIGHT_DESC}>
                Height - Descending
              </MenuItem>
              <MenuItem value={SortingOptions.WEIGHT_ASC}>
                Weight - Ascending
              </MenuItem>
              <MenuItem value={SortingOptions.WEIGHT_DESC}>
                Weight - Descending
              </MenuItem>
              <MenuItem value={SortingOptions.DATE_ASC}>
                Caught date - Ascending
              </MenuItem>
              <MenuItem value={SortingOptions.DATE_DESC}>
                Caught date - Descending
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            variant='contained'
            color='primary'
            onClick={() =>
              !isTableView ? setIsTableView(true) : setIsTableView(false)
            }
          >
            {!isTableView ? 'Table view' : 'Grid view'}
          </Button>
        </Stack>
      </Stack>
      {isTableView ? (
        <PokemonTable pokemons={filteredAndSortedResults} />
      ) : (
        <PokemonGrid
          pokemons={filteredAndSortedResults}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
      )}

      {isEditMode && (
        <Button
          variant='contained'
          color='success'
          sx={{ mt: 2, mx: 1 }}
          onClick={() => setIsEditMode(false)}
        >
          Done
        </Button>
      )}
      <Button
        variant='contained'
        color='error'
        sx={{ mt: 2 }}
        onClick={() => setIsEditMode(true)}
        disabled={isEditMode}
      >
        Manage
      </Button>
    </Container>
  );
};

export default MyPokedex;
