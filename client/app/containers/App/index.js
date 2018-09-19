/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import isEmpty from 'utils/isEmpty';
import Toaster from 'components/Toaster';
import GuestRoute from 'components/Routes/GuestRoute';
import UserRoute from 'components/Routes/UserRoute';
import ResetPasswordPage from '../ResetPasswordPage';
import LoginPage from '../LoginPage';
import SignupPage from '../SignupPage';
import HomePage from '../HomePage';
import NotFoundPage from '../NotFoundPage';
import StartPage from '../StartPage';

const Playground = () => <div>Auth page</div>;

import {
  makeSelectDialog,
  makeSelectLocation,
  makeSelectMessages,
} from './selectors';
import { deleteMessage } from './actions';

const App = props => {
  const { location, dialog, messages, deleteMsg } = props;
  const messagesArr = messages.toJS();
  return (
    <div>
      <Helmet titleTemplate="%s - App" defaultTitle="App">
        <meta name="description" content="application" />
      </Helmet>
      {messagesArr.map((each, index) => (
        <Toaster
          key={`toast-msg-${index}`}
          message={'hello'}
          success={true}
          deleteMessage={() => deleteMsg(index)}
        />
      ))}
      {!isEmpty(dialog) && dialog.toJS()}
      <Switch location={location}>
        <UserRoute exact path="/" component={Playground} />
        <GuestRoute exact path="/start" component={StartPage} />
        <GuestRoute exact path="/login" component={LoginPage} />
        <GuestRoute exact path="/login/:email" component={LoginPage} />
        <GuestRoute exact path="/register" component={SignupPage} />
        <GuestRoute exact path="/register/:email" component={SignupPage} />
        <GuestRoute exact path="/resetpassword" component={ResetPasswordPage} />
        <Route exact path="/home" component={HomePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  );
};

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
    hash: PropTypes.string,
    key: PropTypes.string,
  }).isRequired,
  dialog: PropTypes.object,
  messages: PropTypes.object,
  deleteMsg: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dialog: makeSelectDialog(),
  location: makeSelectLocation(),
  messages: makeSelectMessages(),
});

const mapDispatchToProps = dispatch => ({
  deleteMsg: index => dispatch(deleteMessage(index)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
