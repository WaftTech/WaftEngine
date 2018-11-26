import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Login from './LoginPage';

// import './styles.scss';

const Page = ({ location }) => (
  <Switch location={location}>
    <Route path={`/auth/login`} component={Login} />
  </Switch>
);

export default withRouter(Page);
