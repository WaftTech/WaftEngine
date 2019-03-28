/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import injectSaga from 'utils/injectSaga';

import saga from './saga';
import RoutesPublic from '../../layouts/Public';
import RoutesAdmin from '../../layouts/Admin';
import RoutesUser from '../../layouts/User';

import GlobalStyle from '../../global-styles';
import AdminRoute from '../../components/Routes/AdminRoute';
import UserRoute from '../../components/Routes/UserRoute';
import Notifier from './components/Notifier';
import { enqueueSnackbar } from './actions';

const App = props => {
  const handleClick = () => {
    props.enqueueSnackbar({
      message: 'Failed fetching data.',
      options: {
        variant: 'warning',
      },
    });
  };
  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Display snackbar
      </Button>
      <Notifier />
      <Switch>
        <UserRoute path="/user" component={RoutesUser} />
        <AdminRoute path="/admin" component={RoutesAdmin} />
        <Route path="/" component={RoutesPublic} />
      </Switch>
      <GlobalStyle />
    </>
  );
};

App.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

const withSaga = injectSaga({ key: 'global', saga });

const withConnect = connect(
  null,
  { enqueueSnackbar },
);

export default compose(
  withSaga,
  withConnect,
)(App);
