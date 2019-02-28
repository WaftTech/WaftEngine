import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CustomInput from 'components/CustomInput/CustomInput';
import { makeSelectPassword, makeSelectPasswordError } from '../selectors';
import * as mapDispatchToProps from '../actions';

const PasswordInput = props => {
  const { password, setStoreValue, errors } = props;
  return (
    <CustomInput
      labelText="Password"
      id="password"
      formControlProps={{
        fullWidth: true,
      }}
      error={errors}
      inputProps={{
        value: password,
        onChange: e => setStoreValue({ key: 'password', value: e.target.value }),
      }}
    />
  );
};

PasswordInput.propTypes = {
  password: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
  errors: makeSelectPasswordError(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordInput);
