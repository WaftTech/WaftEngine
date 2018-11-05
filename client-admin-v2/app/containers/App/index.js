/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import GuestRoute from 'components/Routes/GuestRoute';
import UserRoute from 'components/Routes/UserRoute';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginForm from 'containers/LoginForm/Loadable';

import GlobalStyle from '../../global-styles';

const App = () => (
  <div>
    <Switch>
      <GuestRoute exact path="/login" component={LoginForm} />
      <UserRoute exact path="/" component={HomePage} />
      <Route component={NotFoundPage} />
    </Switch>
    <GlobalStyle />
  </div>
);

App.propTypes = {
  // location: PropTypes.shape({
  //   pathname: PropTypes.string.isRequired,
  //   search: PropTypes.string,
  //   hash: PropTypes.string,
  //   key: PropTypes.string,
  // }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  // location: makeSelectLocation(),
});

// const mapDispatchToProps = dispatch => ({
// deleteMsg: index => dispatch(deleteMessage(index)),
// });
const withConnect = connect(
  mapStateToProps,
  // mapDispatchToProps,
);

export default compose(withConnect)(App);
