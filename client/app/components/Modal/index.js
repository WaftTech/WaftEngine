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

// const Transition = React.forwardRef(function Transition(props, ref) {
//   <Slide direction="up" ref={ref} {...props} />;
// });

export default function DeleteDialog(props) {
  const { open, handleClose, handleUpdate } = props;

  return (
    <div>
      <Dialog
        open={open}
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>{props.children}</DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
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
