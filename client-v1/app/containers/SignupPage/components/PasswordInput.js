import React from 'react';
import { connect } from 'react-redux';
import CustomInput from 'components/CustomInput/CustomInput';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import { createStructuredSelector } from 'reselect';
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
    const { error, password, setStoreValue, classes } = this.props; // eslint-disable-line
    return (
      <CustomInput
        labelText="password"
        id="password"
        formControlProps={{
          fullWidth: true,
        }}
        error={error}
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
