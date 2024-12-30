import React, { useEffect, useRef, useState } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import Pagination from 'components/atoms/Pagination';
import { useAppContext } from 'context';
import { PokemonClient, Pokemon } from 'pokenode-ts';
import { ActionTypes } from 'reducer/types';
import { useNavigate } from 'react-router-dom';
import ProgressBar from 'components/atoms/ProgressBar';
import { getCaughtPokemons } from 'utils/localStorage';
import PokemonGrid from 'components/molecules/PokemonGrid';

const MainPage = () => {
  const caughtPokemons = getCaughtPokemons();

  const [pokemons, setPokemons] = useState<Pokemon[]>();
  const numberOfPokemons = useRef<number>(0);
  const { state, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [numberOfCaughtPokemons, setNumberOfCaughtPokemons] = useState<number>(
    caughtPokemons.length
  );

  const api = new PokemonClient();

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
        .catch((error) => console.error(error));
    };

    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentPage]);

  useEffect(() => {
    setNumberOfCaughtPokemons(caughtPokemons.length);
  }, [caughtPokemons]);

  return (
    <Container>
      <Typography
        variant='h1'
        sx={{ mt: 2, mb: 2, fontSize: { xs: '4rem', lg: '5rem' } }}
        className='uppercase text-center'
      >
        Pokedex
      </Typography>
      <Stack direction='row' spacing={2} sx={{ mb: 2 }}>
        <button
          className='cursor-pointer'
          onClick={() => navigate('/my-pokedex')}
        >
          My pokedex
        </button>
        <ProgressBar
          total={numberOfPokemons.current}
          progress={numberOfCaughtPokemons}
        />
      </Stack>
      <PokemonGrid isLoading={isLoading} pokemons={pokemons} />
      <Pagination numberOfPokemons={numberOfPokemons.current} />
    </Container>
  );
};

export default MainPage;
