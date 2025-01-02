import React, { ChangeEvent, useEffect, useMemo } from 'react';

import { Container, Grid2 as Grid, SelectChangeEvent, Stack, useMediaQuery } from '@mui/material';
import ChartsView from 'components/organisms/ChartsView/ChartsView';
import Filters from 'components/organisms/Filters/Filters';
import Header from 'components/organisms/Header/Header';
import PokedexView from 'components/organisms/PokedexView/PokedexView';
import PokemonGrid from 'components/organisms/PokemonGrid/PokemonGrid';
import PokemonTable from 'components/organisms/PokemonTable/PokemonTable';
import { useAppContext } from 'context';
import { PokemonClient } from 'pokenode-ts';
import { getCaughtPokemons } from 'utils/localStorage';

import { dropdownOptions, sortPokemons } from './MyPodekex.utils';
import { SortingOptions } from './types';

const MyPokedex = () => {
  const { state } = useAppContext();
  const [search, setSearch] = React.useState<string>('');
  const [types, setTypes] = React.useState<string[]>([]);
  const [selectedType, setSelectedType] = React.useState<string>('');
  const [sortingOption, setSortingOption] = React.useState<SortingOptions>();
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isTableView, setIsTableView] = React.useState(false);
  const [showDrawer, setShowDrawer] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:1200px)');

  const caughtPokemon = state.caughtPokemons.length !== 0 ? state.caughtPokemons : getCaughtPokemons();

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
          <PokedexView.Desktop
            isEditMode={isEditMode}
            isTableView={isTableView}
            setIsEditMode={setIsEditMode}
            setIsTableView={setIsTableView}
            sortProps={{ onSort, sortingOption, options: dropdownOptions }}
          />
        )}
        <Grid size={{ xs: 12, lg: 3 }}>
          {isMobile ? (
            <PokedexView.Mobile
              isTableView={isTableView}
              setIsTableView={setIsTableView}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              setShowDrawer={setShowDrawer}
              showDrawer={showDrawer}
              filterProps={{ clearFilters, onSearch, onSelectType, selectedType, search, types }}
              sortProps={{ onSort, sortingOption, options: dropdownOptions }}
            />
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
