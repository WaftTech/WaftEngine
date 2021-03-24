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
    <div className="flex-1">
      <div className="container mx-auto pt-12 pb-12">
        {switchRoutes}
      </div>
    </div>
    <Footer />
  </>
);

export default UserLayout;
