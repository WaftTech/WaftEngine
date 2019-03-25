import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Input from '@material-ui/core/Input';
import { makeSelectName, makeSelectNameError } from '../selectors';
import * as mapDispatchToProps from '../actions';

const NameInput = props => {
  const { name, setStoreValue, error } = props;
  return (
    <Input
      error={error}
      inputProps={{
        value: name,
        onChange: e => setStoreValue({ key: 'name', value: e.target.value }),
      }}
    />
  );
};

NameInput.propTypes = {
  name: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  name: makeSelectName(),
  error: makeSelectNameError(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NameInput);
