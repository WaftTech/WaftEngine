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
import { makeSelectEmail } from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class SubscriberPage extends React.PureComponent {
  static propTypes = {
    setStoreValue: PropTypes.func.isRequired,
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
    const { email } = this.props;
    return (
      <>
        <div>
          <h3>Subscribe Page</h3>
        </div>
        <form>
          <div className="mb-2">
            <TextField
              fullWidth
              label="Enter Your Email"
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
        </form>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
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
