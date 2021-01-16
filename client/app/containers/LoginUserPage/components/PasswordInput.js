import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as mapDispatchToProps from '../actions';
import { makeSelectPassword, makeSelectPasswordError } from '../selectors';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const PasswordInput = props => {
  const { password, setStoreValue, errors, classes } = props;
  const [isSecure, setIsSecure] = useState();

  const handleTogglePassword = () => {
    setIsSecure(state => !state);
  };

  const handleChange = e =>
    setStoreValue({ key: 'password', value: e.target.value });
  const hasError = Boolean(errors);
  return (
    <div className="mb-4">
      <label className="label" htmlFor="Password">
        Password
      </label>
      <div className="relative">
        <input
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
          {isSecure ? <FaRegEye /> : <FaRegEyeSlash />}
        </span>

        {/* <div className="error">{hasError.toString()}</div> */}
      </div>

      {errors && <div className="error">{errors}</div>}
      <Link
        className="inline-block align-baseline text-xs text-blue-700 hover:text-blue-700-darker"
        to="/forgot-password-user"
      >
        Forgot Password?
      </Link>
    </div>
  );
};

PasswordInput.propTypes = {
  password: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  errors: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
  errors: makeSelectPasswordError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PasswordInput);
