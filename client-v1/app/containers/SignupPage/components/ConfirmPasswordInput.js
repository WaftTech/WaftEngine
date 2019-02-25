import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomInput from 'components/CustomInput/CustomInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import { createStructuredSelector } from 'reselect';
import { makeSelectConfirmPassword, makeSelectConfirmPasswordError } from '../selectors';
import * as mapDispatchToProps from '../actions';

class PasswordInput extends React.PureComponent {
  static propTypes = {
    confirmPassword: PropTypes.string.isRequired,
    setStoreValue: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    error: PropTypes.string,
  };

  state = { isSecure: true };

  render() {
    const { isSecure } = this.state;
    const { error, confirmPassword, setStoreValue, classes } = this.props; // eslint-disable-line
    return (
      <CustomInput
        labelText="confirm password"
        id="confirmpassword"
        formControlProps={{
          fullWidth: true,
        }}
        error={error}
        inputProps={{
          type: isSecure ? 'password' : 'text',
          value: confirmPassword,
          onChange: e => setStoreValue({ key: 'confirmPassword', value: e.target.value }),
          endAdornment: (
            <InputAdornment position="end">
              <Icon className={`${classes.inputIconsColor} pointer`} onClick={() => this.setState(state => ({ isSecure: !state.isSecure }))}>
                {isSecure ? 'lock' : 'lock_open'}
              </Icon>
            </InputAdornment>
          ),
        }}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  confirmPassword: makeSelectConfirmPassword(),
  error: makeSelectConfirmPasswordError(),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordInput);
