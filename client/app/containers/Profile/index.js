import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  Information,
  ChangePasswords,
  VerifyEmail,
  TwoFactor,
} from './Pages/Loadable';

import reducer from './reducer';
import saga from './saga';
import Layout from './Components/Layout';

const key = 'userPersonalInformationPage';

const Blog = ({ match: { url } }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <>
      <Layout>
        <Switch>
          <Route exact path={`${url}`}>
            <Redirect to={`${url}/information`} />
          </Route>
          <Route exact path={`${url}/information`} component={Information} />
          <Route exact path={`${url}/verify`} component={VerifyEmail} />
          <Route
            exact
            path={`${url}/change-password`}
            component={ChangePasswords}
          />
          <Route exact path={`${url}/two-factor`} component={TwoFactor} />
        </Switch>
      </Layout>
    </>
  );
};

export default Blog;
