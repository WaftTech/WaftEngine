import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectPassword } from '../selectors';
import { changeHandler } from '../actions';

class PasswordInput extends React.PureComponent {
  state = { showPassword: false };

  handleClickShowPassword = () =>
    this.setState(state => ({
      showPassword: !state.showPassword,
    }));

  render() {
    const { password, onChange } = this.props;
    return (
      <Input
        id="login2-password"
        label="Password"
        type={this.state.showPassword ? 'text' : 'password'}
        autoComplete="off"
        value={password}
        onChange={onChange}
        fullWidth
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={this.handleClickShowPassword}
            >
              {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    );
  }
}

PasswordInput.propTypes = {
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(changeHandler(e.target.value, 'password')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordInput);
