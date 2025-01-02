import React, { FC, useState } from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Box, Modal, Typography } from '@mui/material';
import { BarChart, BarItemIdentifier } from '@mui/x-charts';
import { PlusCircle } from 'assets/svg';

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
  const [clickedBar, setClickedBar] = useState<BarItemIdentifier>();
  const [clickedDataset, setClickedDataset] = useState<ChartDataset[]>();

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
              <Typography variant='body2'>Below you have the chart with the stats of this pokemon.</Typography>
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
              `${clickedDataset[clickedBar.dataIndex].label}}:${clickedDataset[clickedBar.dataIndex].stat}`}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default ChartsView;
