import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CustomInput from 'components/CustomInput/CustomInput';
import { makeSelectEmail, makeSelectEmailError } from '../selectors';
import * as mapDispatchToProps from '../actions';

const EmailInput = props => {
  const { email, setStoreValue, errors } = props;
  return (
    <CustomInput
      labelText="Email"
      id="email"
      formControlProps={{
        fullWidth: true,
      }}
      error={errors}
      inputProps={{
        value: email,
        onChange: e => setStoreValue({ key: 'email', value: e.target.value }),
        type: 'email',
      }}
    />
  );
};

EmailInput.propTypes = {
  email: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  errors: makeSelectEmailError(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailInput);
