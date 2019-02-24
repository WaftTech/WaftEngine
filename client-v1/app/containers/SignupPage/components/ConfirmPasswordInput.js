import React from 'react';
import { connect } from 'react-redux';
import CustomInput from 'components/CustomInput/CustomInput';
import { createStructuredSelector } from 'reselect';
import { makeSelectConfirmPassword } from '../selectors';
import * as mapDispatchToProps from '../actions';

const PasswordInput = props => {
  const { confirmPassword, setStoreValue } = props; // eslint-disable-line
  return (
    <CustomInput
      labelText="confirm password"
      id="confirmpassword"
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        value: confirmPassword,
        onChange: e => setStoreValue({ key: 'confirmPassword', value: e.target.value }),
        type: 'password',
      }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  confirmPassword: makeSelectConfirmPassword(),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordInput);
