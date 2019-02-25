import React from 'react';
import { connect } from 'react-redux';
import CustomInput from 'components/CustomInput/CustomInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/icons/People';
import { createStructuredSelector } from 'reselect';
import { makeSelectUsername, makeSelectUsernameError } from '../selectors';
import * as mapDispatchToProps from '../actions';

const UsernameInput = props => {
  const { error, username, setStoreValue, classes } = props; // eslint-disable-line
  return (
    <CustomInput
      labelText="username"
      id="username"
      formControlProps={{
        fullWidth: true,
      }}
      error={error}
      inputProps={{
        value: username,
        onChange: e => setStoreValue({ key: 'username', value: e.target.value }),
        endAdornment: (
          <InputAdornment position="end">
            <Icon className={classes.inputIconsColor} />
          </InputAdornment>
        ),
      }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  error: makeSelectUsernameError(),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsernameInput);
