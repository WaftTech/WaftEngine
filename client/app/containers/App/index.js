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
import { Switch, Route, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import GuestRoute from 'components/Routes/GuestRoute';
import UserRoute from 'components/Routes/UserRoute';
import ResetPasswordPage from '../ResetPasswordPage';
import LoginPage from '../LoginPage';
import SignupPage from '../SignupPage';
import NotFoundPage from '../NotFoundPage';
import WtDashboard from '../WtDashboard';
import UserLayout from './layouts/UserLayout';
import HomePage from '../HomePage';
import ErrorBoundary from '../../ErrorBoundary';
import { makeSelectDialog, makeSelectLocation, makeSelectContent } from './selectors';
import ContactUs from '../ContactUs';
import AboutUs from '../AboutUs';
import BlogList from '../BlogList';
import { loadContentRequest } from './actions';
import BlogPage from '../BlogPage';
import CategoryListingPage from '../CategoryListingPage';
import CategoryDetailPage from '../CategoryDetailPage';
import saga from './saga';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';

class App extends React.Component {
  componentDidMount() {
    this.props.loadContent();
  }
  render() {
    const { location, contents } = this.props;
    return (
      <ErrorBoundary>
        <Switch location={location}>
          <Route
            exact
            path="/"
            render={() => (
              <UserLayout>
                <HomePage />
                <Helmet>
                  <title>Waft Engine</title>
                </Helmet>
              </UserLayout>
            )}
          />

          <Route
            exact
            path="/blog-list"
            render={() => (
              <div>
                <UserLayout>
                  <BlogList />
                </UserLayout>
                <Helmet>
                  <title>Blogs</title>
                </Helmet>
              </div>
            )}
          />
          <Route
            exact
            path="/blog/:slug"
            render={props => (
              <UserLayout>
                <BlogPage {...props} />
              </UserLayout>
            )}
          />
          <Route
            exact
            path="/contact-us"
            render={() => (
              <UserLayout>
                <ContactUs />
              </UserLayout>
            )}
          />
          <Route
            exact
            path="/about-us"
            render={() => (
              <div>
                <UserLayout>
                  <AboutUs />
                </UserLayout>
                <Helmet>
                  <title>About Us</title>
                </Helmet>
              </div>
            )}
          />
          <Route
            exact
            path="/blog-category"
            render={() => (
              <div>
                <UserLayout>
                  <CategoryListingPage />
                </UserLayout>
                <Helmet>
                  <title>Blog Categories</title>
                </Helmet>
              </div>
            )}
          />
          <Route
            exact
            path="/blog-category/:slug"
            render={() => (
              <UserLayout>
                <CategoryDetailPage />
              </UserLayout>
            )}
          />

          <UserRoute path="/wt" component={WtDashboard} />
          <Route exact path="/login" component={LoginPage} />
          <GuestRoute exact path="/register" component={SignupPage} />
          <GuestRoute exact path="/resetpassword" component={ResetPasswordPage} />
          <Route
            exact
            path="*"
            render={() => (
              <UserLayout>
                <NotFoundPage />
              </UserLayout>
            )}
          />
        </Switch>
      </ErrorBoundary>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
    hash: PropTypes.string,
    key: PropTypes.string,
  }).isRequired,
  dialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  dialog: makeSelectDialog(),
  location: makeSelectLocation(),
  contents: makeSelectContent(),
});

const mapDispatchToProps = dispatch => ({
  loadContent: payload => dispatch(loadContentRequest(payload)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
