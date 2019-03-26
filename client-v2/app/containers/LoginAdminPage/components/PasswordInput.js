import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Input from '@material-ui/core/Input';
import { makeSelectPassword, makeSelectPasswordError } from '../selectors';
import * as mapDispatchToProps from '../actions';

class PasswordInput extends React.PureComponent {
  static propTypes = {
    password: PropTypes.string.isRequired,
    setStoreValue: PropTypes.func.isRequired,
    error: PropTypes.string,
  };

  state = { isSecure: true };

  render() {
    const { isSecure } = this.state;
    const { password, setStoreValue, error } = this.props;
    return (
      <Input
        fullWidth
        placeholder="Enter Password"
        error={error}
        inputProps={{
          type: isSecure ? 'password' : 'text',
          value: password,
          onChange: e =>
            setStoreValue({ key: 'password', value: e.target.value }),
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
