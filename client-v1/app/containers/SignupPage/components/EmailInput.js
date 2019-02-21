import React from 'react';
import { connect } from 'react-redux';
import CustomInput from 'components/CustomInput';
import { createStructuredSelector } from 'reselect';
import { makeSelectEmail } from '../selectors';
import * as mapDispatchToProps from '../actions';

const EmailInput = props => {
  const { email, setStoreValue } = props; // eslint-disable-line
  return (
    <CustomInput
      labelText="email"
      id="email"
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{ type: 'email', value: email, onChange: e => setStoreValue({ key: 'email', value: e.target.value }) }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailInput);
