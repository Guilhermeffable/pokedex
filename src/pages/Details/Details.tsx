import React, { useEffect } from 'react';

import { alpha, Box, Container, Divider, Grid2 as Grid, Paper, Stack, styled, Switch, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import Icon from 'components/atoms/Icon/Icon';
import { PokemonTypes } from 'components/atoms/Icon/types';
import Header from 'components/organisms/Header/Header';
import { useAppContext } from 'context';
import { PokemonClient } from 'pokenode-ts';
import { ActionTypes } from 'reducer/types';
import { formatDateTime } from 'utils/date';
import { updateCaughtPokemons } from 'utils/localStorage';

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: green[500],
    '&:hover': {
      backgroundColor: alpha(green[500], theme.palette.action.hoverOpacity)
    }
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: green[500]
  }
}));

const pokemonQueryParam = new URLSearchParams(window.location.search).get('pokemon');

const Details = () => {
  const { state, dispatch } = useAppContext();
  const [pokemon, setPokemon] = React.useState(state.selectedPokemon);
  const [isChecked, setIsChecked] = React.useState<boolean>(
    state.caughtPokemons.some((p) => p.name === (pokemon?.name || pokemonQueryParam))
  );

  const caughtPokemons = state.caughtPokemons;

  const caughtPokemon = caughtPokemons.find((item) => item.name === pokemon?.name);

  const switchProps = { inputProps: { 'aria-label': 'Caught switch' } };

  const onCaughtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCaughtPokemons(!event.target.checked, pokemon);

    if (event.target.checked && pokemon) {
      dispatch({
        type: ActionTypes.ADD_CAUGHT_POKEMON,
        payload: { ...pokemon, timestamp: formatDateTime(new Date()) }
      });
    } else {
      dispatch({
        type: ActionTypes.SET_CAUGHT_POKEMONS,
        payload: caughtPokemons.filter((p) => p.name !== pokemon?.name)
      });
    }

    setIsChecked(event.target.checked);
  };

  const api = new PokemonClient();

  useEffect(() => {
    if (!pokemon && pokemonQueryParam) {
      api
        .getPokemonByName(pokemonQueryParam)
        .then((data) => {
          dispatch({ type: ActionTypes.SET_SELECTED_POKEMON, payload: data });
          setPokemon(data);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Header dividerLabel='Pokemon details' />
      <Box sx={{ mt: 2, mb: 2, textTransform: 'uppercase', textAlign: 'center' }}>
        <Stack direction={'column'} spacing={2} alignItems={'center'}>
          <Stack direction={'row'} spacing={2}>
            <span>{pokemon?.name}</span>
            <span>(#{pokemon?.id})</span>
          </Stack>
          <Stack direction={'row'} spacing={2}>
            {pokemon?.types.map((type) => {
              return <Icon key={type.type.name} type={type.type.name as PokemonTypes} />;
            })}
          </Stack>
        </Stack>
      </Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper square={false} elevation={3}>
            <img
              src={
                pokemon?.sprites.front_default ||
                'https://icon-library.com/images/small-pokeball-icon/small-pokeball-icon-5.jpg'
              }
              width={'100%'}
              height={'100%'}
              alt={pokemon?.name}
            />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant='h5' sx={{ mt: 2, mb: 2, textTransform: 'uppercase' }}>
            Base stats
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Box component={'ul'} sx={{ textTransform: 'uppercase', '& li': { my: 1 } }}>
            <Box component={'li'}>Height: {pokemon?.height}</Box>
            <Box component={'li'}>Weight: {pokemon?.weight}</Box>
            {pokemon?.stats.map((stat) => {
              return (
                <Box component={'li'} key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </Box>
              );
            })}
            <Box component={'li'}>
              {isChecked && (
                <Box component={'span'}>
                  Was caught in:
                  {isChecked && !caughtPokemon ? formatDateTime(new Date()) : caughtPokemon?.timestamp}
                </Box>
              )}
            </Box>
            <Box component={'li'}>
              {caughtPokemon?.textNote && <Box component={'p'}>Additional notes: {caughtPokemon.textNote}</Box>}
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }} sx={{ paddingBottom: 2 }}>
          <Divider sx={{ mt: 3, mb: 2 }} />
          <Stack direction={'row'} spacing={2} justifyContent={'space-between'} alignItems={'center'}>
            <Box component={'label'} htmlFor='caught' sx={{ fontSize: { xs: '0.75rem', lg: '1rem' } }}>
              Did you catch this Pokemon ?
            </Box>
            <GreenSwitch id='caught' {...switchProps} checked={isChecked} onChange={onCaughtChange} />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Details;
