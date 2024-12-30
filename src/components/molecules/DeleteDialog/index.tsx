import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import React, { FC } from 'react';
import { DeleteDialogProps } from './types';

const DeleteDialog: FC<DeleteDialogProps> = ({
  showRemoveDialog,
  setShowRemoveDialog,
  onRemoveClick
}) => {
  return (
    <Dialog
      open={showRemoveDialog}
      onClose={() => setShowRemoveDialog(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {'Do you want to proceed with the deletion of these Pokemon?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          You'll have to catch them again if you proceed with the deletion! Are
          you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowRemoveDialog(false)}>No</Button>
        <Button onClick={onRemoveClick} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
