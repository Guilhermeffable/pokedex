import React, { FC, useRef, useState } from 'react';

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
import { Delete } from 'assets/svg';
import DeleteDialog from 'components/molecules/DeleteDialog/DeleteDialog';
import { bulkRemoveCaughtPokemons } from 'utils/localStorage';

import { getDataGridColumns, getDataGridRows } from './PokemonTable.utils';
import { CustomToolbarProps, PokemonTableProps, Row } from './types';

const CustomToolbar: FC<CustomToolbarProps> = ({ handleDeleteRows, selectionModel }) => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />

      <Button onClick={handleDeleteRows} disabled={selectionModel.length === 0}>
        <Delete
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
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const rowToDeleteId = useRef<string | null>(null);

  const handleSelectionModelChange = (newSelection: GridRowSelectionModel) => {
    setSelectionModel(newSelection);
  };

  const handleDeleteRows = () => {
    setRows((prev) => prev.filter((row) => !selectionModel.includes(row.id)));
    bulkRemoveCaughtPokemons(selectionModel.map((id) => Number(id)));
    setShowDeleteDialog(false);
  };

  const handeSingleRowDelete = () => {
    bulkRemoveCaughtPokemons([Number(rowToDeleteId.current)]);
    setRows((prev) => prev.filter((row) => row.id !== rowToDeleteId.current));
    setShowDeleteDialog(false);
  };

  const getRowToDeleteId = (id: string) => {
    rowToDeleteId.current = id;
    setShowDeleteDialog(true);
  };

  const dataGridColumns = getDataGridColumns(getRowToDeleteId);

  return (
    <>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={dataGridColumns}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionModelChange}
          slots={{
            toolbar: () => (
              <CustomToolbar handleDeleteRows={() => setShowDeleteDialog(true)} selectionModel={selectionModel} />
            )
          }}
          getRowHeight={() => 'auto'}
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
            },
            '& .MuiDataGrid-cell': {
              display: 'flex',
              alignItems: 'center'
            }
          }}
        />
      </Paper>
      <DeleteDialog
        showRemoveDialog={showDeleteDialog}
        setShowRemoveDialog={setShowDeleteDialog}
        onRemoveClick={selectionModel.length === 0 ? handeSingleRowDelete : handleDeleteRows}
      />
    </>
  );
};

export default PokemonTable;
