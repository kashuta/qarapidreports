/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
} from '@mui/material';

function DialogForm({
  open,
  handleClose,
  handleConfirm,
  statusBtn,
  handleConfirmSave,
  handleConfirmClear,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        {statusBtn === 'submit'
          ? 'Submit'
          : statusBtn === 'save'
            ? 'Save'
            : 'Clear'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {statusBtn === 'submit'
            ? 'Are you sure you want to Submit'
            : statusBtn === 'save'
              ? 'Are you sure you want to Save?'
              : 'Are you sure you want to Clear?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={
            statusBtn === 'submit'
              ? handleConfirm
              : statusBtn === 'save'
                ? handleConfirmSave
                : handleConfirmClear
          }
          color="primary"
          autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogForm;
