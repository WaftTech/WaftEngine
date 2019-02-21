import React from 'react';
import { connect } from 'react-redux';
import CustomInput from 'components/CustomInput';
import { createStructuredSelector } from 'reselect';
import { makeSelectUsername } from '../selectors';
import * as mapDispatchToProps from '../actions';

const UsernameInput = props => {
  const { username, setStoreValue } = props; // eslint-disable-line
  return (
    <CustomInput
      labelText="username"
      id="username"
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{ value: username, onChange: e => setStoreValue({ key: 'username', value: e.target.value }) }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsernameInput);
