/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import AdminRoute from '../../components/Routes/AdminRoute';
import GuestRoute from 'components/Routes/GuestRoute';
import UserRoute from 'components/Routes/UserRoute';
import LoginPage from '../LoginPage';
import AdminLoginPage from '../AdminLoginPage';
import SignupPage from '../SignupPage';
import NotFoundPage from '../NotFoundPage';
// import WtDashboard from '../WtDashboard';
// import ResetPasswordPage from '../ResetPasswordPage';
import ForgotPasswordPage from '../ForgotPasswordPage';
import CodeVerifyPage from '../CodeVerifyPage';
import UserLayout from './layouts/UserLayout';
import HomePage from '../HomePage/Loadable';
import FAQPage from '../FAQPage';
import { makeSelectDialog, makeSelectLocation, makeSelectContent } from './selectors';
import ContactUs from '../ContactUs';
import AboutUs from '../AboutUs';
import BlogList from '../BlogList';
import BlogPage from '../BlogPage';
import VideosPage from '../VideosPage';
import CategoryDetailPage from '../CategoryDetailPage';
import VideoLibraryListingPage from '../VideoLibraryListingPage';
import VideoDetailPage from '../VideoDetailPage';
import WaftEngineDashboard from '../WaftEngineDashboard';
import saga from './saga';
import reducer from './reducer';

class App extends React.PureComponent {
  render() {
    const { location } = this.props;
    return (
      <Switch location={location}>
        <Route
          path="/wt-login"
          connect
          render={() => (
            <div>
              <UserLayout>
                <AdminLoginPage />
              </UserLayout>
              <Helmet>
                <title> Login Page </title>
              </Helmet>
            </div>
          )}
        />
        <Route
          exact
          path="/"
          connect
          render={() => (
            <UserLayout>
              <HomePage />
              <Helmet>
                <title>Waft-Engine</title>
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
          path="/videos"
          render={() => (
            <div>
              <UserLayout>
                <VideoLibraryListingPage />
              </UserLayout>
              <Helmet>
                <title>Available Videos</title>
              </Helmet>
            </div>
          )}
        />
        <Route
          exact
          path="/video/:id"
          render={props => (
            <UserLayout>
              <VideosPage {...props} />
            </UserLayout>
          )}
        />
        <Route
          exact
          path="/video/link/:id"
          render={props => (
            <UserLayout>
              <VideoDetailPage {...props} />
            </UserLayout>
          )}
        />
        <Route
          exact
          path="/faq"
          render={() => (
            <div>
              <UserLayout>
                <FAQPage />
              </UserLayout>
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
        {/* user login link */}
        <Route
          exact
          path="/login"
          connect
          render={() => (
            <div>
              <UserLayout>
                <LoginPage />
              </UserLayout>
              <Helmet>
                <title> Login Page </title>
              </Helmet>
            </div>
          )}
        />
        <Route
          exact
          path="/signup"
          connect
          render={() => (
            <div>
              <UserLayout>
                <SignupPage />
              </UserLayout>
              <Helmet>
                <title>Signup Page</title>
              </Helmet>
            </div>
          )}
        />
        <Route
          exact
          path="/reset-password"
          connect
          render={() => (
            <div>
              <UserLayout>
                <ForgotPasswordPage />
              </UserLayout>
              <Helmet>
                <title>Forgot Password Page</title>
              </Helmet>
            </div>
          )}
        />
        <Route
          exact
          path="/reset-password/code-verify"
          connect
          render={() => (
            <div>
              <UserLayout>
                <CodeVerifyPage />
              </UserLayout>
              <Helmet>
                <title>Code Verify Page</title>
              </Helmet>
            </div>
          )}
        />
        <AdminRoute path="/wt" component={WaftEngineDashboard} />
        <Route component={NotFoundPage} />
      </Switch>
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
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  contents: makeSelectContent(),
  dialog: makeSelectDialog(),
});

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(App);
