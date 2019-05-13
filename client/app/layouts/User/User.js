import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from '../../routes/user';

import NotFoundPage from '../../containers/NotFoundPage/Loadable';
import Header from '../Public/components/Header';
import Footer from '../Public/components/Footer';

const switchRoutes = (
  <Switch>
    {routes.map(prop => (
      <Route key={prop.path} {...prop} />
    ))}
    <Route component={NotFoundPage} />
  </Switch>
);

const UserLayout = () => (
  <>
    <Header />
    {switchRoutes}
    <Footer />
  </>
);

export default UserLayout;
