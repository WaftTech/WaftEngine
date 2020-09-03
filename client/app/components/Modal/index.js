import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

export default function DeleteDialog(props) {
  const { open, handleClose, handleUpdate } = props;

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          <DialogTitle id="alert-dialog-title" className="border-b" style={{padding:'12px 20px',marginBottom:'1rem'}}>
           <div className="flex justify-between">Two-Factor Authentication
        <button className="hover:text-primary" onClick={handleClose}>
            <ClearIcon/>
          </button>
          </div></DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions className="mt-2 border-t py-2" style={{ justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="btn bg-info hover:bg-secondary"
            onClick={handleClose}
          >
            No
          </button>
          <button
            type="button"
            className="btn bg-primary hover:bg-secondary"
            onClick={handleUpdate}
          >
            Update
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
