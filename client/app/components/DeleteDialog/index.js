import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   <Slide direction="up" ref={ref} {...props} />;
// });

export default function DeleteDialog(props) {
  const handleClose = () => {
    props.doClose();
  };

  const handleDialogDelete = () => {
    props.doDelete();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Do you really want to delete this item??'}
        </DialogTitle>
        <DialogActions style={{justifyContent:'center'}}>
          <button className="btn bg-info hover:bg-secondary" onClick={handleClose}>
            No
          </button>
          <button className="btn bg-primary hover:bg-secondary" onClick={handleDialogDelete}>
            Yes
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
