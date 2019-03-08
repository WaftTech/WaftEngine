import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import CustomInput from 'components/CustomInput/CustomInput';
import { makeSelectPassword, makeSelectPasswordError } from '../selectors';
import * as mapDispatchToProps from '../actions';

class PasswordInput extends React.PureComponent {
  static propTypes = {
    password: PropTypes.string.isRequired,
    setStoreValue: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    error: PropTypes.string,
  };

  state = { isSecure: true };

  render() {
    const { isSecure } = this.state;
    const { password, setStoreValue, classes, error } = this.props;
    return (
      <CustomInput
        labelText="Password"
        id="password"
        error={error}
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          type: isSecure ? 'password' : 'text',
          value: password,
          onChange: e => setStoreValue({ key: 'password', value: e.target.value }),
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
  password: makeSelectPassword(),
  error: makeSelectPasswordError(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordInput);
