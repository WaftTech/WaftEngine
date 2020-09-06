import React from 'react';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function DeleteDialog(props) {
  const {
    open,
    handleClose,
    handleUpdate,
    width = 'md',
    buttonLabel1 = 'No',
    buttonLabel2 = 'Update',
  } = props;

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        maxWidth={width}
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
            {buttonLabel1}
          </button>
          <button
            type="button"
            className="btn bg-primary hover:bg-secondary"
            onClick={handleUpdate}
          >
            {buttonLabel2}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  width: PropTypes.string,
  buttonLabel1: PropTypes.string,
  buttonLabel2: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
