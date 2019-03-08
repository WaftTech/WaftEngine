import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import CustomInput from 'components/CustomInput/CustomInput';
import { makeSelectEmail, makeSelectEmailError } from '../selectors';
import * as mapDispatchToProps from '../actions';

const UsernameInput = props => {
  const { email, setStoreValue, classes, error } = props;
  return (
    <CustomInput
      labelText="Email"
      id="email"
      formControlProps={{
        fullWidth: true,
      }}
      error={error}
      inputProps={{
        value: email,
        onChange: e => setStoreValue({ key: 'email', value: e.target.value }),
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

UsernameInput.propTypes = {
  email: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  error: makeSelectEmailError(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsernameInput);
