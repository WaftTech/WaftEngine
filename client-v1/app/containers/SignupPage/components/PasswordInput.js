import React from 'react';
import { connect } from 'react-redux';
import CustomInput from 'components/CustomInput/CustomInput';
import { createStructuredSelector } from 'reselect';
import { makeSelectPassword } from '../selectors';
import * as mapDispatchToProps from '../actions';

const PasswordInput = props => {
  const { password, setStoreValue } = props; // eslint-disable-line
  return (
    <CustomInput
      labelText="password"
      id="password"
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        value: password,
        onChange: e => setStoreValue({ key: 'password', value: e.target.value }),
        type: 'password',
      }}
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
