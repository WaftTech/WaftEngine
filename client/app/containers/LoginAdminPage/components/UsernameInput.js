import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TextField from '@material-ui/core/TextField';
import { makeSelectEmail, makeSelectEmailError } from '../selectors';
import * as mapDispatchToProps from '../actions';

const EmailInput = props => {
  const { email, setStoreValue, error } = props;
  const handleChange = e =>
    setStoreValue({ key: 'email', value: e.target.value });
  const hasError = Boolean(error);
  return (
    <TextField
      error={hasError}
      label={error || 'email'}
      value={email}
      name="username"
      onChange={handleChange}
      margin="normal"
      variant="outlined"
      fullWidth
      InputLabelProps={{
        shrink:true
      }}
    />
  );
};

EmailInput.propTypes = {
  email: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  error: makeSelectEmailError(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailInput);
