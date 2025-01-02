import React, { ChangeEvent, useEffect, useMemo } from 'react';

import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Grid2 as Grid,
  SelectChangeEvent,
  Stack,
  useMediaQuery
} from '@mui/material';
import PokemonGrid from 'components/molecules/PokemonGrid/PokemonGrid';
import ChartsView from 'components/organisms/ChartsView/ChartsView';
import Filters from 'components/organisms/Filters/Filters';
import Header from 'components/organisms/Header/Header';
import PokemonTable from 'components/organisms/PokemonTable/PokemonTable';
import SortDropdown from 'components/organisms/SortDropdown/SortDropdown';
import { PokemonClient } from 'pokenode-ts';
import { getCaughtPokemons } from 'utils/localStorage';

import { dropdownOptions, sortPokemons } from './MyPodekex.utils';
import { SortingOptions } from './types';

const MyPokedex = () => {
  const caughtPokemon = getCaughtPokemons();

  const [search, setSearch] = React.useState<string>('');
  const [types, setTypes] = React.useState<string[]>([]);
  const [selectedType, setSelectedType] = React.useState<string>('');
  const [sortingOption, setSortingOption] = React.useState<SortingOptions>();
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isTableView, setIsTableView] = React.useState(false);
  const [showDrawer, setShowDrawer] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:1200px)');

  const api = new PokemonClient();

  useEffect(() => {
    api
      .listTypes()
      .then((data) => setTypes(data.results.map((type) => type.name)))
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredAndSortedResults = useMemo(() => {
    let filtered = [...caughtPokemon];

    if (search) {
      filtered = filtered.filter((pokemon) => pokemon.name.toLowerCase().startsWith(search.toLowerCase()));
    }

    if (selectedType) {
      filtered = filtered.filter((pokemon) => pokemon.types.some((type) => type.type.name === selectedType));
    }

    return sortingOption ? sortPokemons(filtered, sortingOption) : filtered;
  }, [caughtPokemon, search, selectedType, sortingOption]);

  const onSelectType = (e: SelectChangeEvent) => {
    setSelectedType(e.target.value);
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.target.value);
  };

  const clearFilters = () => {
    setSelectedType('');
    setSearch('');
  };

  const onSort = (e: SelectChangeEvent) => {
    setSortingOption(e.target.value as SortingOptions);
  };

  return (
    <Container>
      <Header dividerLabel='My pokedex' />
      <Grid container paddingBottom={4}>
        {!isMobile && (
          <Grid size={{ xs: 12, lg: 12 }} offset={{ lg: 3 }}>
            <Stack direction={'row'} spacing={2} sx={{ mb: 2 }} justifyContent={'space-between'}>
              <Stack direction={'row'} spacing={2}>
                {isEditMode && !isTableView && (
                  <Button
                    variant='contained'
                    color='success'
                    sx={{ mt: 2, mr: 1 }}
                    onClick={() => setIsEditMode(false)}
                    size='small'>
                    Done
                  </Button>
                )}
                {!isTableView && (
                  <Button
                    variant='contained'
                    color='info'
                    sx={{ mt: 2 }}
                    onClick={() => setIsEditMode(true)}
                    disabled={isEditMode}>
                    Manage
                  </Button>
                )}
              </Stack>
              <Stack direction={'row'} spacing={2}>
                <SortDropdown onSort={onSort} sortingOption={sortingOption} options={dropdownOptions} />
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => (!isTableView ? setIsTableView(true) : setIsTableView(false))}>
                  {!isTableView ? 'Analytical view' : 'Grid view'}
                </Button>
              </Stack>
            </Stack>
          </Grid>
        )}
        <Grid size={{ xs: 12, lg: 3 }}>
          {isMobile ? (
            <>
              <Stack spacing={2} direction={'row'} justifyContent={'space-between'} sx={{ mb: 2 }}>
                <Button
                  variant='outlined'
                  color='primary'
                  sx={{ width: '50%' }}
                  size='small'
                  onClick={() => setShowDrawer(true)}>
                  Filters
                </Button>
                <SortDropdown onSort={onSort} sortingOption={sortingOption} options={dropdownOptions} />
              </Stack>
              <Stack direction={'row'} spacing={2} marginBottom={2}>
                {!isTableView && (
                  <Button
                    variant='contained'
                    color='info'
                    fullWidth
                    onClick={() => setIsEditMode(true)}
                    disabled={isEditMode}>
                    Manage
                  </Button>
                )}
                {isEditMode && !isTableView && (
                  <Button
                    variant='contained'
                    color='success'
                    sx={{ flexBasis: '33%' }}
                    fullWidth
                    onClick={() => setIsEditMode(false)}>
                    Done
                  </Button>
                )}
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => (!isTableView ? setIsTableView(true) : setIsTableView(false))}>
                  {!isTableView ? 'Analysis' : 'Grid view'}
                </Button>
              </Stack>
              <Divider sx={{ mb: 2, height: '20px' }} />
              <Drawer open={showDrawer} onClose={() => setShowDrawer(false)} sx={{ paddingBottom: '2rem' }}>
                <Filters
                  clearFilters={clearFilters}
                  onSearch={onSearch}
                  search={search}
                  onSelectType={onSelectType}
                  selectedType={selectedType}
                  types={types}
                />
                <Box component={'div'} paddingLeft={4} paddingRight={6}>
                  <Button
                    variant='contained'
                    color='success'
                    onClick={() => setShowDrawer(false)}
                    fullWidth
                    sx={{ marginBottom: '2rem' }}>
                    Aplly Filters
                  </Button>
                </Box>
              </Drawer>
            </>
          ) : (
            !isTableView && (
              <Filters
                clearFilters={clearFilters}
                onSearch={onSearch}
                onSelectType={onSelectType}
                selectedType={selectedType}
                search={search}
                types={types}
              />
            )
          )}
        </Grid>
        <Grid size={{ xs: 12, lg: isTableView ? 12 : 9 }}>
          {isTableView ? (
            isMobile ? (
              <ChartsView pokemons={filteredAndSortedResults} />
            ) : (
              <PokemonTable pokemons={filteredAndSortedResults} />
            )
          ) : (
            <Stack direction={'row'} spacing={2}>
              <PokemonGrid pokemons={filteredAndSortedResults} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
            </Stack>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyPokedex;
