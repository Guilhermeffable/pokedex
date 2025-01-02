import React, { FC } from 'react';

import { Stack, Button, Divider, Drawer, Box, Grid2 as Grid } from '@mui/material';
import SortDropdown from 'components/molecules/SortDropdown/SortDropdown';

import Filters from '../Filters/Filters';

import { PokedexViewDesktopProps, PokedexViewMobileProps } from './types';

const Mobile: FC<PokedexViewMobileProps> = ({
  isTableView,
  setIsTableView,
  isEditMode,
  setIsEditMode,
  showDrawer,
  setShowDrawer,
  filterProps,
  sortProps
}) => {
  return (
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
        <SortDropdown {...sortProps} />
      </Stack>
      <Stack direction={'row'} marginBottom={2} justifyContent={'space-between'}>
        <Box>
          {!isTableView && (
            <Button
              variant='contained'
              color='info'
              fullWidth
              onClick={() => setIsEditMode(true)}
              disabled={isEditMode}
              sx={{ width: 'fit-content', mr: 1 }}>
              Manage
            </Button>
          )}
          {isEditMode && !isTableView && (
            <Button
              variant='contained'
              color='success'
              fullWidth
              onClick={() => setIsEditMode(false)}
              sx={{ width: 'fit-content' }}>
              Done
            </Button>
          )}
        </Box>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => (!isTableView ? setIsTableView(true) : setIsTableView(false))}>
          {!isTableView ? 'Analytic View' : 'Grid view'}
        </Button>
      </Stack>
      <Divider sx={{ mb: 2, height: '20px' }} />
      <Drawer open={showDrawer} onClose={() => setShowDrawer(false)} sx={{ paddingBottom: '2rem' }}>
        <Filters {...filterProps} />
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
  );
};

const Desktop: FC<PokedexViewDesktopProps> = ({
  isEditMode,
  isTableView,
  setIsEditMode,
  setIsTableView,
  sortProps
}) => {
  return (
    <Grid size={{ xs: 12, lg: 12 }} offset={{ lg: 3 }}>
      <Stack direction={'row'} spacing={2} sx={{ mb: 2 }} justifyContent={'space-between'}>
        <Stack direction={'row'} spacing={2}>
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
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <SortDropdown {...sortProps} />
          <Button
            variant='contained'
            color='primary'
            onClick={() => (!isTableView ? setIsTableView(true) : setIsTableView(false))}>
            {!isTableView ? 'Analytical view' : 'Grid view'}
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default { Mobile, Desktop };
