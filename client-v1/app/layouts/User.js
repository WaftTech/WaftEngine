import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from 'routes/user';
import Header from '../containers/App/layouts/Header';

const switchRoutes = (
  <Switch>
    {routes.map(prop => (
      <Route key={prop.path} {...prop} />
    ))}
  </Switch>
);

class User extends React.Component {
  render() {
    return (
      <>
        <Header />
        {switchRoutes}
        <Footer />
      </>
    );
  }
}

export default User;
