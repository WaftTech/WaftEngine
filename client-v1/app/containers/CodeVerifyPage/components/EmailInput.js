import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CustomInput from 'components/CustomInput/CustomInput';
import { makeSelectEmail } from '../selectors';
import * as mapDispatchToProps from '../actions';

const EmailInput = props => {
  const { email, setStoreValue } = props;
  return (
    <CustomInput
      labelText="Email"
      id="email"
      formControlProps={{
        fullWidth: true,
      }}
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
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailInput);
