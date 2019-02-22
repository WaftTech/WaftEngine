import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import CustomInput from 'components/CustomInput/CustomInput';
import { makeSelectUsername } from '../selectors';
import * as mapDispatchToProps from '../actions';

const UsernameInput = props => {
  const { username, setStoreValue, classes } = props; // eslint-disable-line
  return (
    <CustomInput
      labelText="Username"
      id="username"
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        value: username,
        onChange: e => setStoreValue({ key: 'username', value: e.target.value }),
        type: 'email',
        endAdornment: (
          <InputAdornment position="end">
            <Email className={classes.inputIconsColor} />
          </InputAdornment>
        ),
      }}
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
