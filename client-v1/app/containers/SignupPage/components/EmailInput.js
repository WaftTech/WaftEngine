import React from 'react';
import { connect } from 'react-redux';
import CustomInput from 'components/CustomInput/CustomInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import { createStructuredSelector } from 'reselect';
import { makeSelectEmail } from '../selectors';
import * as mapDispatchToProps from '../actions';

const EmailInput = props => {
  const { email, setStoreValue, classes } = props; // eslint-disable-line
  return (
    <CustomInput
      labelText="email"
      id="email"
      formControlProps={{
        fullWidth: true,
      }}
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

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailInput);
