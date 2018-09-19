/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Link from 'react-router-dom/Link';
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { loginRequest, resetPasswordRequest } from './actions';
import { makeSelectIsRequesting, makeSelectErrors } from './selectors';
import reducer from './reducer';
import saga from './saga';

class LoginPage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
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
    // if (!data.password) errors.password = "Can't be empty";
    return errors;
  };
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.login(this.state.data);
    }
  };
  resetPassword = () => {
    const { data } = this.state;
    const errors = {};
    if (!data.email) errors.email = "Can't be empty";
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.resetPassword({ email: data.email });
    }
  };
  render() {
    const { data, errors } = this.state;
    const { isRequesting } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup validationState={errors.email ? 'error' : null}>
          <FormControl
            type="email"
            name="email"
            placeholder="E-mail address"
            onChange={this.handleChange}
            value={data.email || ''}
            autoComplete="username"
          />
          {!!errors.email && <HelpBlock>{errors.email}</HelpBlock>}
        </FormGroup>
        <FormGroup validationState={errors.password ? 'error' : null}>
          <FormControl
            name="password"
            placeholder="Password"
            type="password"
            onChange={this.handleChange}
            value={data.password || ''}
            autoComplete="current-password"
          />
          {!!errors.password && <HelpBlock>{errors.password}</HelpBlock>}
        </FormGroup>
        <Button type="submit" bsStyle="primary" disabled={isRequesting}>
          {isRequesting ? 'loading' : 'Login'}
        </Button>
        <a onClick={isRequesting ? () => null : () => this.resetPassword()}>
          {isRequesting ? 'loading' : 'Reset Password'}
        </a>
      </Form>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  isRequesting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    toJS: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  isRequesting: makeSelectIsRequesting(),
  errors: makeSelectErrors(),
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(loginRequest(data)),
  resetPassword: data => dispatch(resetPasswordRequest(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
