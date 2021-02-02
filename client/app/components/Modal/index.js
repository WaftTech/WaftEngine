import PropTypes from 'prop-types';
import React from 'react';
import Dialog from '../../components/Dialog/index';

export default function DeleteDialog(props) {
  const {
    open,
    handleClose,
    handleUpdate,
    buttonLabel1 = 'No',
    buttonLabel2 = 'Update',
    loading,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title={`Two-Factor Authentication`}
      body={<div>{props.children}</div>}
      actions={
        <>
          <button
            type="button"
            className="block btn margin-none text-white bg-red-500 border border-red-600 hover:bg-red-600 mr-1"
            onClick={handleClose}
          >
            {buttonLabel1}
          </button>
          <button
            type="button"
            className="block btn margin-none text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
            onClick={handleUpdate}
            disabled={loading !== undefined && loading === true ? true : false}
          >
            {buttonLabel2}
          </button>
        </>
      }
    />
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
