/**
 *
 * SignupPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  HelpBlock,
} from 'react-bootstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectErrors, makeSelectIsRequesting } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { signupRequest } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class SignupPage extends React.Component {
  state = {
    data: {
      email: this.props.match.params.email || '',
    },
    errors: {},
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors !== this.props.errors) {
      const errors = nextProps.errors.toJS();
      this.setState({ errors });
    }
  }
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
    // const { data } = this.state;
    // if (!data.email) errors.email = "Can't be empty";
    // if (!data.name) errors.name = "Can't be empty";
    // if (!data.password) errors.password = "Can't be empty";
    // if (!data.password2) errors.password2 = "Can't be empty";
    // if (data.password && data.password2 && data.password !== data.password2)
    //   errors.password2 = 'Passwords must match';
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
    const { isRequesting } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup validationState={errors.email ? 'error' : null}>
          <FormControl
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={this.handleChange}
            value={data.email || ''}
            autoComplete="email"
          />
          {!!errors.email && <HelpBlock>{errors.email}</HelpBlock>}
        </FormGroup>
        <FormGroup validationState={errors.name ? 'error' : null}>
          <FormControl
            name="name"
            placeholder="Full Name"
            onChange={this.handleChange}
            value={data.name || ''}
            autoComplete="name"
          />
          {!!errors.name && <HelpBlock>{errors.name}</HelpBlock>}
        </FormGroup>
        <FormGroup validationState={errors.password ? 'error' : null}>
          <FormControl
            name="password"
            placeholder="password"
            type="password"
            onChange={this.handleChange}
            value={data.password || ''}
            autoComplete="new-password"
          />
          {!!errors.password && <HelpBlock>{errors.password}</HelpBlock>}
        </FormGroup>
        <FormGroup validationState={errors.password2 ? 'error' : null}>
          <FormControl
            name="password2"
            placeholder="confirm password"
            type="password"
            onChange={this.handleChange}
            value={data.password2 || ''}
            autoComplete="new-password"
          />
          {!!errors.password2 && <HelpBlock>{errors.password2}</HelpBlock>}
        </FormGroup>
        <Button type="submit" bsStyle="primary" disabled={isRequesting}>
          {isRequesting ? 'loading' : 'Sign Up'}
        </Button>
      </Form>
    );
  }
}

SignupPage.propTypes = {
  register: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  isRequesting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    toJS: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  isRequesting: makeSelectIsRequesting(),
});

const mapDispatchToProps = dispatch => ({
  register: payload => dispatch(signupRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signupPage', reducer });
const withSaga = injectSaga({ key: 'signupPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignupPage);
