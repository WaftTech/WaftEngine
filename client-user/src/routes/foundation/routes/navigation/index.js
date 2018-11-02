import React from 'react';
import { Route } from 'react-router-dom';

import AppBar from './routes/app-bar/';
import BottomNavigation from './routes/bottom-navigation/';
import Breadcrumb from './routes/breadcrumb/';
import Menu from './routes/menu/';

const FeedbackComponents = ({ match }) => (
  <div>
    <Route path={`${match.url}/app-bar`} component={AppBar}/>
    <Route path={`${match.url}/bottom-navigation`} component={BottomNavigation}/>
    <Route path={`${match.url}/breadcrumb`} component={Breadcrumb}/>
    <Route path={`${match.url}/menu`} component={Menu}/>
  </div>
)

export default FeedbackComponents;
