import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CustomInput from 'components/CustomInput/CustomInput';
import { makeSelectPassword } from '../selectors';
import * as mapDispatchToProps from '../actions';

const PasswordInput = props => {
  const { password, setStoreValue } = props;
  return (
    <CustomInput
      labelText="Password"
      id="password"
      formControlProps={{
        fullWidth: true,
      }}
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
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordInput);
