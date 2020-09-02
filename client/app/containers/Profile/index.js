import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Information, ChangePasswords, VerifyEmail } from './Pages/Loadable';

import reducer from './reducer';
import saga from './saga';
import Layout from './Components/Layout';

const key = 'userPersonalInformationPage';

const Blog = ({ match: { url } }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <>
      {/* <Helmet>Profile</Helmet> */}
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
        </Switch>
      </Layout>
    </>
  );
};

export default Blog;
