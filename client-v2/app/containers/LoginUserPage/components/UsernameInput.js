import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Input from '@material-ui/core/Input';
import { makeSelectEmail, makeSelectEmailError } from '../selectors';
import * as mapDispatchToProps from '../actions';

const UsernameInput = props => {
  const { email, setStoreValue, error } = props;
  return (
    <Input
      error={error}
      inputProps={{
        value: email,
        onChange: e => setStoreValue({ key: 'email', value: e.target.value }),
        type: 'email',
      }}
    />
  );
};

UsernameInput.propTypes = {
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
)(UsernameInput);
