import {
  Dialog,
  DialogActions,
  DialogContent, DialogTitle
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import React from 'react';

export default function DeleteDialog(props) {
  const {
    open,
    handleClose,
    handleUpdate,
    width = 'sm',
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
        <DialogTitle
          id="alert-dialog-title"
          className="border-b"
          style={{ padding: '12px 20px', marginBottom: '1rem' }}
        >
          <div className="flex justify-between">
            Two-Factor Authentication
            <button className="hover:text-primary" onClick={handleClose}>
              <ClearIcon />
            </button>
          </div>
        </DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions
          className="mt-2 border-t py-2"
          style={{ justifyContent: 'flex-end' }}
        >
          <button
            type="button"
            className="btn bg-info hover:bg-secondary"
            onClick={handleClose}
          >
            {buttonLabel1}
          </button>
          <button
            type="button"
            className="btn bg-blue-500 border border-blue-600 hover:bg-blue-600"
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
