import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Informtions, ChangePasswords, TwoFactor } from './Pages/Loadable';

import reducer from './reducer';
import saga from './saga';

const key = 'userPersonalInformationPage';

const Blog = ({ match: { url } }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <Switch>
      <Route exact path={`${url}`}>
        <Redirect to={`${url}/information`} />
      </Route>
      <Route exact path={`${url}/information`} component={Informtions} />
      <Route
        exact
        path={`${url}/change-password`}
        component={ChangePasswords}
      />
      <Route exact path={`${url}/two-factor`} component={TwoFactor} />
    </Switch>
  );
};

export default Blog;
