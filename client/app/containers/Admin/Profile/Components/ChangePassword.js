import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import * as mapDispatchToProps from '../actions';
import { makeSelectErrors } from '../selectors';

/* eslint-disable react/prefer-stateless-function */
export class ChangePassword extends React.Component {
  static propTypes = {
    changePasswordRequest: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  state = {
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
    errors: {},
    showPassword: false,
  };

  componentDidMount() {
    this.props.clearError();
  }

  static getDerivedStateFromProps = nextProps => ({ errors: nextProps.errors });

  handleChange = e => {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validate = () => {
    const errors = {};
    const { oldPassword, newPassword, newPassword2 } = this.state;
    if (!oldPassword) errors.oldPassword = "Can't be empty";
    if (!newPassword) errors.newPassword = "Can't be empty";
    if (!newPassword2) errors.newPassword2 = "Can't be empty";
    return { errors, isValid: !Object.keys(errors).length };
  };

  handleSave = e => {
    e.preventDefault();
    const { errors, isValid } = this.validate();
    this.setState({ errors });
    if (isValid) {
      const { oldPassword, newPassword, newPassword2 } = this.state;
      this.props.changePasswordRequest({
        oldPassword,
        newPassword,
        newPassword2,
      });
    }
  };

  render() {
    const {
      oldPassword,
      newPassword,
      newPassword2,
      showPassword,
      errors,
    } = this.state;
    const { classes } = this.props;

    return (
      <div className="ml-4 p-4 border">
        <div className="w-full md:w-1/2 pb-4">
          <label htmlFor="oldPassword">
            Old Password
          </label>
          <input
            className="inputbox"
            id="oldPassword"
            type="text"
            name="oldPassword"
            value={oldPassword}
            onChange={this.handleChange}
            type={showPassword ? 'text' : 'password'}
          />
          {errors.oldPassword && <span>{errors.oldPassword}</span>}
        </div>

        <div className="w-full md:w-1/2 pb-4">
          <label htmlFor="newPassword">
            New Password
          </label>
          <input
            className="inputbox"
            id="newPassword"
            type="text"
            name="newPassword"
            value={newPassword}
            onChange={this.handleChange}
            type={showPassword ? 'text' : 'password'}
          />
          {errors.newPassword && <span>{errors.newPassword}</span>}
        </div>

        <div className="w-full md:w-1/2 pb-4">
          <label htmlFor="newPassword">
            Confirm New Password
          </label>
          <input
            className="inputbox"
            id="newPassword2"
            type="text"
            name="newPassword2"
            value={newPassword2}
            onChange={this.handleChange}
            type={showPassword ? 'text' : 'password'}
          />
          {errors.newPassword2 && <span>{errors.newPassword2}</span>}
        </div>

        <button
          type="button"
          className="block btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
          onClick={this.handleSave}
        >
          Save
        </button>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(withConnect)(ChangePassword);
