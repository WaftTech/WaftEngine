/**
 *
 * SubscriberPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectEmail,
  makeSelectEmailError,
  makeSelectSuccess,
  makeSelectLoading,
} from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class SubscriberPage extends React.PureComponent {
  static propTypes = {
    setStoreValue: PropTypes.func.isRequired,
    errors: PropTypes.string,
    email: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  handleChange = name => e => {
    e.persist();
    this.props.clearQuery();
    this.props.setStoreValue({ key: name, value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.saveSubscriberRequest();
  };

  render() {
    const { email, errors, loading } = this.props;
    const hasError = Boolean(errors);
    return (
      <>
        <input
          type="text"
          className="appearance-none outline-none shadow text-white bg-gray-900 font-sans border border-gray-600 rounded py-2 px-3 text-white leading-tight md:1/2 lg:w-1/4"
          placeholder="Enter Your Email"
          value={email}
          onChange={this.handleChange('email')}
        />
        <div id="component-error-text">{errors}</div>

        <button
          type="submit"
          className="text-white py-2 px-4 rounded border border-gray-600 font-bold shadow font-sans leading-normal text-sm"
          onClick={this.handleSubmit}
        >
          {loading ? '...' : 'Subscribe'}
        </button>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  errors: makeSelectEmailError(),
  success: makeSelectSuccess(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'subscriberPage', reducer });
const withSaga = injectSaga({ key: 'subscriberPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SubscriberPage);
