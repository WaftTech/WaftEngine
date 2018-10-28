/**
 *
 * StartPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectIsRequesting, makeSelectErrors } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { findUserRequest } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class StartPage extends React.Component {
  state = {
    data: {},
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
    const { data } = this.state;
    // if (!data.email) errors.email = "Can't be empty";
    return errors;
  };
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.findUser(this.state.data);
    }
  };

  render() {
    const { data, errors } = this.state;
    const { isRequesting } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} inline>
        <FormGroup validationState={errors.email ? 'error' : null}>
          <FormControl
            type="email"
            name="email"
            value={data.email || ''}
            placeholder="Enter your email"
            onChange={this.handleChange}
          />
          {!!errors.email && <HelpBlock>{errors.email}</HelpBlock>}
        </FormGroup>
        <Button bsStyle="primary" type="submit" disabled={isRequesting}>
          {isRequesting ? 'loading' : 'continue'}
        </Button>
      </Form>
    );
  }
}

StartPage.propTypes = {
  findUser: PropTypes.func.isRequired,
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
  findUser: email => dispatch(findUserRequest(email)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'startPage', reducer });
const withSaga = injectSaga({ key: 'startPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StartPage);
