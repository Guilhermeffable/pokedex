import React, { useEffect, useRef, useState } from 'react';

import { Button, Container, Divider, Stack } from '@mui/material';
import Progress from 'components/atoms/Progress/Progress';
import LoadingScreen from 'components/molecules/LoadingScreen/LoadingScreen';
import Pagination from 'components/molecules/Pagination/Pagination';
import Header from 'components/organisms/Header/Header';
import PokemonGrid from 'components/organisms/PokemonGrid/PokemonGrid';
import { useAppContext } from 'context';
import { PokemonClient, Pokemon } from 'pokenode-ts';
import { useNavigate } from 'react-router-dom';
import { ActionTypes } from 'reducer/types';
import { fetchAllPokemons } from 'utils/csv';
import { createLocalStorage, getCaughtPokemons } from 'utils/localStorage';

const MainPage = () => {
  const { state, dispatch } = useAppContext();

  const [pokemons, setPokemons] = useState<Pokemon[]>();
  const numberOfPokemons = useRef<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const navigate = useNavigate();

  const api = new PokemonClient();

  useEffect(() => {
    createLocalStorage();

    dispatch({ type: ActionTypes.SET_CAUGHT_POKEMONS, payload: getCaughtPokemons() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const offset = state.currentPage === 1 ? 0 : (state.currentPage - 1) * 20;

    setIsLoading(true);

    const fetchPokemons = async () => {
      const listedPokemons = await api.listPokemons(offset, 20);

      numberOfPokemons.current = listedPokemons.count;

      Promise.all(
        listedPokemons.results.map(async (pokemon) => {
          const pokemonData: Pokemon = await api.getPokemonByName(pokemon.name);
          return pokemonData;
        })
      )
        .then((data) => {
          dispatch({ type: ActionTypes.SET_LISTED_POKEMONS, payload: data });
          setPokemons(data);
        })
        .finally(() => setTimeout(() => setIsLoading(false), 500))
        // eslint-disable-next-line no-console
        .catch((error) => console.error(error));
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentPage]);

  const exportPokemons = () => {
    setIsExporting(true);
    fetchAllPokemons().finally(() => setIsExporting(false));
  };

  return (
    <Container>
      <Header />
      <Stack direction='row' justifyContent={'center'} spacing={2} sx={{ mb: 2 }}>
        <Button
          sx={{ cursor: 'pointer' }}
          variant='contained'
          color='info'
          onClick={() => void navigate('/my-pokedex')}>
          My pokedex
        </Button>
        <Button color='secondary' variant='outlined' onClick={() => exportPokemons()}>
          Export all pokemons
        </Button>
      </Stack>
      <Progress total={numberOfPokemons.current} />
      <Divider sx={{ mb: 4 }} />
      <PokemonGrid isLoading={isLoading} pokemons={pokemons} />
      <Pagination numberOfPokemons={numberOfPokemons.current} />
      {isExporting && <LoadingScreen open={isExporting} />}
    </Container>
  );
};

export default MainPage;
