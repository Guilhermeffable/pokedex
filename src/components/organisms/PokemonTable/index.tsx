import React, { FC, useState } from 'react';
import { CustomToolbarProps, PokemonTableProps, Row } from './types';
import { Button, Paper } from '@mui/material';
import {
  DataGrid,
  GridRowSelectionModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton
} from '@mui/x-data-grid';
import { getDataGridColumns, getDataGridRows } from './PokemonTable.utils';
import { bulkRemoveCaughtPokemons } from 'utils/localStorage';
import { ReactComponent as DeleteIcon } from '../../../assets/svg/delete.svg';

const CustomToolbar: FC<CustomToolbarProps> = ({
  handleDeleteRows,
  selectionModel
}) => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />

      <Button onClick={handleDeleteRows} disabled={selectionModel.length === 0}>
        <DeleteIcon
          width={18}
          stroke={selectionModel.length === 0 ? '#00000042' : '#1976d2'}
          style={{ marginRight: '0.5rem' }}
        />
        <span> Delete Selected</span>
      </Button>
    </GridToolbarContainer>
  );
};

const PokemonTable: FC<PokemonTableProps> = ({ pokemons }) => {
  const dataGridRows = getDataGridRows(pokemons);
  const [rows, setRows] = useState<Row[]>(dataGridRows);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );

  const handleSelectionModelChange = (newSelection: GridRowSelectionModel) => {
    setSelectionModel(newSelection);
  };

  const handleDeleteRows = () => {
    setRows((prev) => prev.filter((row) => !selectionModel.includes(row.id)));
    bulkRemoveCaughtPokemons(selectionModel.map((id) => Number(id)));
  };

  const dataGridColumns = getDataGridColumns(setRows);

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={dataGridColumns}
        checkboxSelection
        className='leading-none'
        onRowSelectionModelChange={handleSelectionModelChange}
        slots={{
          toolbar: () => (
            <CustomToolbar
              handleDeleteRows={handleDeleteRows}
              selectionModel={selectionModel}
            />
          )
        }}
        sx={{
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            overflow: 'visible',
            whiteSpace: 'normal',
            lineHeight: 'normal'
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            lineHeight: '1.5rem',
            overflow: 'visible',
            whiteSpace: 'normal',
            textOverflow: 'clip'
          }
        }}
      />
    </Paper>
  );
};

export default PokemonTable;
