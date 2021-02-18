import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import routes from '../../routes/public';
import { compose } from 'redux';

import NotFoundPage from '../../containers/NotFoundPage/Loadable';
import { makeSelectLocation } from '../../containers/App/selectors';
import { makeSelectOpen } from '../../containers/LoginUserPage/selectors';
import Header from './components/Header';
import Footer from './components/Footer';
import { setOpen } from '../../containers/LoginUserPage/actions';
import Dialog from '../../components/Dialog/index';

const switchRoutes = (
  <Switch>
    {routes.map(prop => (
      <Route key={prop.path} {...prop} />
    ))}
    <Route component={NotFoundPage} />
  </Switch>
);

const checkPathname = pathname => {
  switch (pathname) {
    case '/login-admin':
    // case '/login-user':
    case '/login-admin/':
      // case '/login-user/':
      return false;
    case '/editor-file-select':
      return false;
    case '/editor-file-select/':
      return false;
    default:
      break;
  }
  return true;
};
const PublicLayout = ({ location, open, setOpen }) => {
  const { pathname } = location;
  const showHeaderAndFooter = checkPathname(pathname);

  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <>
      {showHeaderAndFooter && <Header />}
      <div className="flex-1">{switchRoutes}</div>
      {showHeaderAndFooter && <Footer />}
      <Dialog
        title="Google login success"
        body="Check your mail for password."
        onClose={handleCloseDialog}
        open={open}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  open: makeSelectOpen(),
});

const withConnect = connect(mapStateToProps, { setOpen });

export default compose(withConnect)(PublicLayout);
