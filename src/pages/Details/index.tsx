import {
  alpha,
  Container,
  Grid2 as Grid,
  styled,
  Switch,
  Typography
} from '@mui/material';
import { green } from '@mui/material/colors';
import { useAppContext } from 'context';
import { PokemonClient } from 'pokenode-ts';
import React, { useEffect } from 'react';
import { ActionTypes } from 'reducer/types';
import { formatDateTime } from 'utils/date';
import { updateCaughtPokemons, getCaughtPokemons } from 'utils/localStorage';

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

const pokemonQueryParam = new URLSearchParams(window.location.search).get(
  'pokemon'
);

const Details = () => {
  const caughtPokemons = getCaughtPokemons();

  const { state, dispatch } = useAppContext();
  const [pokemon, setPokemon] = React.useState(state.selectedPokemon);
  const [isChecked, setIsChecked] = React.useState<boolean>(
    caughtPokemons.some((p) => p.name === (pokemon?.name || pokemonQueryParam))
  );

  const caughtPokemon = caughtPokemons.find(
    (item) => item.name === pokemon?.name
  );

  const switchProps = { inputProps: { 'aria-label': 'Caught switch' } };

  const onCaughtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCaughtPokemons(pokemon, !event.target.checked);
    setIsChecked(event.target.checked);
  };

  const api = new PokemonClient();

  useEffect(() => {
    if (!pokemon && pokemonQueryParam) {
      api.getPokemonByName(pokemonQueryParam).then((data) => {
        dispatch({ type: ActionTypes.SET_SELECTED_POKEMON, payload: data });
        setPokemon(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Typography
        variant='h3'
        sx={{ mt: 2, mb: 2 }}
        className='uppercase text-center'
      >
        {pokemon?.name}
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <img
            src={pokemon?.sprites.front_default || ''}
            width={'100%'}
            height={'100%'}
            alt={pokemon?.name}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ul className='uppercase'>
            <li>Height: {pokemon?.height}</li>
            <li>Weight: {pokemon?.weight}</li>
            {pokemon?.stats.map((stat) => {
              return (
                <li>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              );
            })}
            {pokemon?.types.map((type) => {
              return <li>Type: {type.type.name}</li>;
            })}
            <div>
              <label htmlFor='caught'>Caught</label>
              <GreenSwitch
                id='caught'
                {...switchProps}
                defaultChecked={isChecked}
                onChange={onCaughtChange}
              />
              {isChecked && !caughtPokemon ? (
                <p>Timestamp: {formatDateTime(new Date())}</p>
              ) : (
                caughtPokemon?.timestamp
              )}
              {caughtPokemon?.textNote && (
                <p>Additional notes: {caughtPokemon.textNote}</p>
              )}
            </div>
          </ul>
        </Grid>
        <Grid size={{ xs: 12 }}></Grid>
      </Grid>
    </Container>
  );
};

export default Details;
