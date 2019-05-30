import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import routes from '../../routes/public';

import NotFoundPage from '../../containers/NotFoundPage/Loadable';
import { makeSelectLocation } from '../../containers/App/selectors';
import Header from './components/Header';
import Footer from './components/Footer';

const switchRoutes = (
  <Switch>
    {routes.map(prop => (
      <Route key={prop.path} {...prop} />
    ))}
    <Route component={NotFoundPage} />
  </Switch>
);

const PublicLayout = ({location}) => {
  const { pathname }= location;
  return (
    <>
      {pathname !== '/login-admin' && pathname !== '/login-admin/' && <Header />}
      <main className="flex-1">{switchRoutes}</main>
      {pathname !== '/login-admin'&& pathname !== '/login-admin/' && <Footer />}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
})
export default connect(mapStateToProps)(PublicLayout);
