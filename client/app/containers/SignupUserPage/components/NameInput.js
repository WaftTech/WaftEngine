import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TextField from '@material-ui/core/TextField';
import { makeSelectName, makeSelectNameError } from '../selectors';
import * as mapDispatchToProps from '../actions';

const NameInput = props => {
  const { name, setStoreValue, error } = props;
  const handleChange = e =>
    setStoreValue({ key: 'name', value: e.target.value });
  const hasError = Boolean(error);
  return (
    <TextField
      error={hasError}
      label={error || 'name'}
      value={name}
      onChange={handleChange}
      margin="normal"
    />
  );
};

NameInput.propTypes = {
  name: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  name: makeSelectName(),
  error: makeSelectNameError(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NameInput);
