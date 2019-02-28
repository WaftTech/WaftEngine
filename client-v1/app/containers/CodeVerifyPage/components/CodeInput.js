import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CustomInput from 'components/CustomInput/CustomInput';
import { makeSelectCode, makeSelectCodeError } from '../selectors';
import * as mapDispatchToProps from '../actions';

const CodeInput = props => {
  const { code, setStoreValue, errors } = props;
  return (
    <CustomInput
      labelText="Code"
      id="code"
      formControlProps={{
        fullWidth: true,
      }}
      error={errors}
      inputProps={{
        value: code,
        onChange: e => setStoreValue({ key: 'code', value: e.target.value }),
      }}
    />
  );
};

CodeInput.propTypes = {
  code: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  code: makeSelectCode(),
  errors: makeSelectCodeError(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeInput);
