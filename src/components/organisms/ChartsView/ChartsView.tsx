import React, { FC, useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Modal,
  Stack,
  Typography
} from '@mui/material';
import { BarChart, BarItemIdentifier } from '@mui/x-charts';
import { PlusCircle } from 'assets/svg';
import Icon from 'components/atoms/Icon/Icon';
import { PokemonTypes } from 'components/atoms/Icon/types';
import DeleteDialog from 'components/molecules/DeleteDialog/DeleteDialog';
import { useAppContext } from 'context';
import { ActionTypes } from 'reducer/types';
import { bulkRemoveCaughtPokemons } from 'utils/localStorage';

import { ChartDataset, getDataset } from './ChartsView.utils';
import { ChartsViewProps } from './types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const ChartsView: FC<ChartsViewProps> = ({ pokemons }) => {
  const { state, dispatch } = useAppContext();
  const [clickedBar, setClickedBar] = useState<BarItemIdentifier>();
  const [clickedDataset, setClickedDataset] = useState<ChartDataset[]>();
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [pokemonToRemove, setPokemonToRemove] = useState<number>();

  const onRemoveClick = () => {
    if (pokemonToRemove) {
      bulkRemoveCaughtPokemons([pokemonToRemove]);
      dispatch({
        type: ActionTypes.SET_CAUGHT_POKEMONS,
        payload: state.caughtPokemons.filter((pokemon) => pokemon.id !== pokemonToRemove)
      });
    }
    setShowRemoveDialog(false);
  };

  return (
    <Box>
      {pokemons.map((pokemon, index) => {
        const dataset = getDataset(pokemon);

        return (
          <Accordion key={`${pokemon.name}-${pokemon.id}-${index}`}>
            <AccordionSummary
              expandIcon={<PlusCircle width={24} fill='#000' />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}>
              {pokemon.name.toUpperCase()}
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <Box
                component={'img'}
                src={pokemon.sprites.front_default || ''}
                alt={pokemon.name}
                sx={{ margin: 'auto' }}
                width={200}
              />
              <Stack direction={'row'} justifyContent={'center'} spacing={2} mb={2}>
                {pokemon?.types.map((type) => {
                  return <Icon key={type.type.name} type={type.type.name as PokemonTypes} />;
                })}
              </Stack>
              <Typography variant='body2'>
                Below you have the chart with the stats of this pokemon. Click on each bar to see the value of that
                stat.
              </Typography>
              <Divider sx={{ mt: 3 }}>Stats chart</Divider>
              <BarChart
                yAxis={[{ scaleType: 'band', dataKey: 'label' }]}
                layout='horizontal'
                series={[{ type: 'bar', dataKey: 'stat' }]}
                dataset={dataset}
                height={300}
                sx={{ width: '100%' }}
                onItemClick={(_, bar) => {
                  setClickedBar(bar);
                  setClickedDataset(dataset);
                }}
              />
              <Typography variant='body2'>Was caught in: {pokemon.timestamp}</Typography>
              <Button
                sx={{ mt: 3 }}
                variant='contained'
                color='error'
                fullWidth
                onClick={() => {
                  setShowRemoveDialog(true);
                  setPokemonToRemove(pokemon.id);
                }}>
                Remove from pokedex
              </Button>
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Modal open={!!clickedBar} onClose={() => setClickedBar(undefined)}>
        <Box sx={style}>
          <Typography variant='body1' mb={2}>
            Stat value
          </Typography>
          <Typography variant='body2' mb={2}>
            {clickedDataset &&
              clickedBar &&
              `${clickedDataset[clickedBar.dataIndex].label}:${clickedDataset[clickedBar.dataIndex].stat}`}
          </Typography>
        </Box>
      </Modal>
      <DeleteDialog
        showRemoveDialog={showRemoveDialog}
        setShowRemoveDialog={setShowRemoveDialog}
        onRemoveClick={onRemoveClick}
      />
    </Box>
  );
};

export default ChartsView;
