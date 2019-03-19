import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from '../routes/public';

import NotFoundPage from '../containers/NotFoundPage/Loadable';

const switchRoutes = (
  <Switch>
    {routes.map(prop => (
      <Route key={prop.path} {...prop} />
    ))}
    <Route component={NotFoundPage} />
  </Switch>
);

const PublicLayout = () => <>{switchRoutes}</>;

export default PublicLayout;
