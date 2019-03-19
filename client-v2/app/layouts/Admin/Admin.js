import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import routes from '../../routes/admin';

import NotFoundPage from '../../containers/NotFoundPage/Loadable';

const switchRoutes = (
  <Switch>
    {routes.map(prop => (
      <Route key={prop.path} {...prop} />
    ))}
    <Route component={NotFoundPage} />
  </Switch>
);

const AdminLayout = () => (
  <>
    <Helmet>
      <title>Admin Dashboard</title>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Helmet>
    {switchRoutes}
  </>
);

export default AdminLayout;
