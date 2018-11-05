import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUsername } from '../selectors';
import { changeHandler } from '../actions';

const UsernameInput = ({ username, onChange }) => (
  <TextField
    id="login2-name"
    label="Name"
    fullWidth
    autoComplete="off"
    value={username}
    onChange={onChange}
  />
);

UsernameInput.propTypes = {
  username: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(changeHandler(e.target.value, 'username')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsernameInput);
