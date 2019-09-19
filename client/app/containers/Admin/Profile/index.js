import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Informtions, ChangePasswords } from './Pages/Loadable.js';

import reducer from './reducer';
import saga from './saga';

const key = 'userPersonalInformationPage';

const Blog = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <Switch>
      <Route exact path="/admin/profile" component={Informtions} />
      <Route
        exact
        path="/admin/profile/change-password"
        component={ChangePasswords}
      />
    </Switch>
  );
};

export default Blog;
