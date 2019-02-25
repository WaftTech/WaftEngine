import React from 'react';
import { connect } from 'react-redux';
import CustomInput from 'components/CustomInput/CustomInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import { createStructuredSelector } from 'reselect';
import { makeSelectEmail, makeSelectEmailError, makeSelectErrors } from '../selectors';
import * as mapDispatchToProps from '../actions';

const EmailInput = props => {
  const { error, email, setStoreValue, classes, errors } = props; // eslint-disable-line
  return (
    <CustomInput
      labelText="email"
      id="email"
      formControlProps={{
        fullWidth: true,
      }}
      error={error}
      inputProps={{
        value: email,
        onChange: e => {
          setStoreValue({ key: 'email', value: e.target.value });
          if (error) setStoreValue({ key: 'errors', value: errors.set('email', undefined) });
        },
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
  errors: makeSelectErrors(),
  email: makeSelectEmail(),
  error: makeSelectEmailError(),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailInput);
