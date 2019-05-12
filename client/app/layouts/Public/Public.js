import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from '../../routes/public';

import NotFoundPage from '../../containers/NotFoundPage/Loadable';
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

const PublicLayout = () => (
  <>
    <Header />
    <main className="flex-1">{switchRoutes}</main>
    <Footer />
  </>
);

export default PublicLayout;
