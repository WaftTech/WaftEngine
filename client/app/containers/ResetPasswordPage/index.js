/**
 *
 * ResetPasswordPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

import injectReducer from 'utils/injectReducer';
import makeSelectResetPasswordPage from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class ResetPasswordPage extends React.Component {
  state = {
    data: {},
    errors: {},
  };
  /* for other input fields */
  handleChange = e => {
    e.persist();
    const { name, value } = e.target;
    this.setState(state => ({
      data: {
        ...state.data,
        [name]: value,
      },
    }));
  };
  validate = () => {
    const errors = {};
    const { data } = this.state;
    // if (!data.email) errors.email = "Can't be empty";
    return errors;
  };
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.register(this.state.data);
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl
              type="email"
              name="email"
              placeholder="john@doe.com"
              value={data.email || ''}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              name="code"
              placeholder="Enter code"
              value={data.code || ''}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              type="password"
              name="password"
              placeholder="password"
              value={data.password || ''}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              type="password"
              name="password2"
              placeholder="confirm password"
              value={data.password2 || ''}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit" bsStyle="primary">
            Change Password
          </Button>
        </Form>
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  resetpasswordpage: makeSelectResetPasswordPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'resetPasswordPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(ResetPasswordPage);
