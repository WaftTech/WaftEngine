/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';

import saga from './saga';
import RoutesPublic from '../../layouts/Public';
import RoutesAdmin from '../../layouts/Admin';

import GlobalStyle from '../../global-styles';
import AdminRoute from '../../components/Routes/AdminRoute';

function App() {
  return (
    <>
      <Switch>
        <AdminRoute path="/admin" component={RoutesAdmin} />
        <Route path="/" component={RoutesPublic} />
      </Switch>
      <GlobalStyle />
    </>
  );
}

const withSaga = injectSaga({ key: 'global', saga });

export default compose(withSaga)(App);
