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

import { TextField, Button } from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectEmail,
  makeSelectEmailError,
  makeSelectSuccess,
  makeSelectSuccessMsg,
} from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class SubscriberPage extends React.PureComponent {
  static propTypes = {
    setStoreValue: PropTypes.func.isRequired,
    error: PropTypes.string,
    email: PropTypes.string.isRequired,
  };

  handleChange = name => e => {
    e.persist();
    this.props.setStoreValue({ key: name, value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.saveSubscriberRequest();
  };

  render() {
    const { email, error, successMsg } = this.props;
    const hasError = Boolean(error);
    return (
      <>
        <div>
          <h3 className="font-bold text-2xl">Subscribe Page</h3>
        </div>
        <form>
          <div className="mb-2">
            <TextField
              error={hasError}
              fullWidth
              label={error || 'Enter Your Email'}
              margin="normal"
              value={email}
              onChange={this.handleChange('email')}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Subscribe
          </Button>
          <div>
            <h1>{successMsg}</h1>
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  error: makeSelectEmailError(),
  success: makeSelectSuccess(),
  successMsg: makeSelectSuccessMsg(),
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
