import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as mapDispatchToProps from '../actions';
import { makeSelectPassword, makeSelectPasswordError } from '../selectors';

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
          // error={hasError.toString()}
          onChange={handleChange}
          value={password}
          id="Password"
          type={isSecure ? 'text' : 'password'}
          placeholder="Enter Password"
          className="inputbox"
        />
        <span
          className="absolute right-0 top-0 mt-2 mr-2"
          aria-label="Toggle password visibility"
          onClick={handleTogglePassword}
        >
          {isSecure ? <FaRegEye /> : <FaRegEyeSlash />}
        </span>
        {error && <div className="error">{error}</div>}
      </div>
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
