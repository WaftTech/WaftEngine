import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CustomInput from 'components/CustomInput';
import { makeSelectPassword } from '../selectors';
import * as mapDispatchToProps from '../actions';

const PasswordInput = props => {
  const { password, setStoreValue } = props; // eslint-disable-line
  return (
    <CustomInput
      labelText="Password"
      id="password"
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{ type: 'password', value: password, onChange: e => setStoreValue({ key: 'password', value: e.target.value }) }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordInput);
