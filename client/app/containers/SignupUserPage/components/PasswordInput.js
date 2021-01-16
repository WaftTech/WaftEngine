import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeSelectPassword, makeSelectPasswordError } from '../selectors';
import * as mapDispatchToProps from '../actions';

const PasswordInput = props => {
  const { password, setStoreValue, error, classes } = props;
  const [isSecure, setIsSecure] = useState();

  const handleTogglePassword = () => {
    setIsSecure(state => !state);
  };

  const handleChange = e =>
    setStoreValue({ key: 'password', value: e.target.value });
  const hasError = Boolean(error);
  return (
    <div className="mb-4">
      <div className="flex justify-between">
        <label className="label" htmlFor="Password">
          Password
        </label>
      </div>
      <div className="relative">
        <input
          // error={error || hasError.toString()}
          onChange={handleChange}
          value={password}
          id="Password"
          type={isSecure ? 'text' : 'password'}
          className="inputbox"
        />
        <span
          className="absolute right-0 top-0 mt-2 mr-2"
          aria-label="Toggle password visibility"
          onClick={handleTogglePassword}
        >
          {isSecure ? <Visibility /> : <VisibilityOff />}
        </span>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

PasswordInput.propTypes = {
  password: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
  error: makeSelectPasswordError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PasswordInput);
