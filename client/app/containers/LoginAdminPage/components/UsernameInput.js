import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectEmail, makeSelectEmailError } from '../selectors';
import * as mapDispatchToProps from '../actions';

const EmailInput = props => {
  const { email, setStoreValue, error } = props;
  const handleChange = e =>
    setStoreValue({ key: 'email', value: e.target.value });
  const hasError = Boolean(error);
  return (
    <div className="mb-4">
      <label className="label" htmlFor="username">
        {'Email'}
      </label>
      <input
        // error={hasError.toString()}
        onChange={handleChange}
        value={email}
        className="inputbox"
        id="username"
        type="text"
        placeholder="Username"
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

EmailInput.propTypes = {
  email: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  error: makeSelectEmailError(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailInput);
