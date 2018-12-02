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

import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import GuestRoute from "components/Routes/GuestRoute";
import UserRoute from "components/Routes/UserRoute";
import ResetPasswordPage from "../ResetPasswordPage";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import HomePage from "../HomePage";
import NotFoundPage from "../NotFoundPage";
import StartPage from "../StartPage";
import Dashboard from "../Dashboard";
import WtDashboard from "../WtDashboard";
import CategoryDetailPage from "../CategoryDetailPage";
import SearchResultsPage from "../SearchResultsPage";
import OrganizationDetailPage from "../OrganizationDetailPage";
import UserLayout from "./layouts/UserLayout";
import ErrorBoundary from '../../ErrorBoundary';
import {
  makeSelectDialog,
  makeSelectLocation,
  makeSelectMessages
} from "./selectors";
import { deleteMessage } from "./actions";

const App = props => {
  const { location } = props;
  return (
    <ErrorBoundary>
      <Switch location={location}>
        <Route exact path="/" render={() => <Redirect to="/wt" />} />
        <Route
          exact
          path="/search-results"
          render={() => (
            <UserLayout>
              <SearchResultsPage />
            </UserLayout>
          )}
        />
        <Route
          exact
          path="/organization/:slug"
          render={() => (
            <UserLayout>
              <OrganizationDetailPage />
            </UserLayout>
          )}
        />
        <Route
          exact
          path="/category/:slug"
          render={() => (
            <UserLayout>
              <CategoryDetailPage />
            </UserLayout>
          )}
        />
        <UserRoute exact path="/dashboard" component={Dashboard} />
        <UserRoute path="/wt" component={WtDashboard} />
        <GuestRoute exact path="/start" component={StartPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/login/:email" component={LoginPage} />
        <GuestRoute exact path="/register" component={SignupPage} />
        <GuestRoute exact path="/register/:email" component={SignupPage} />
        <GuestRoute exact path="/resetpassword" component={ResetPasswordPage} />
        <Route exact path="/home" component={HomePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </ErrorBoundary>
  );
};

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
    hash: PropTypes.string,
    key: PropTypes.string
  }).isRequired,
  dialog: PropTypes.object,
  messages: PropTypes.object,
  deleteMsg: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  dialog: makeSelectDialog(),
  location: makeSelectLocation(),
  messages: makeSelectMessages()
});

const mapDispatchToProps = dispatch => ({
  deleteMsg: index => dispatch(deleteMessage(index))
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(App);
