import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from 'routes/user';

const switchRoutes = (
  <Switch>
    {routes.map(prop => (
      <Route key={prop.path} {...prop} />
    ))}
  </Switch>
);

class User extends React.Component {
  render() {
    return <>{switchRoutes}</>;
  }
}

export default User;
