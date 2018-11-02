import React from 'react';
import { Route } from 'react-router-dom';
import loadable from 'react-loadable';
import LoadingComponent from 'components/Loading';

import Avatars from './routes/avatars/';
import BackTop from './routes/back-top/';
import Badges from './routes/badges/';
import CallToAction from './routes/call-to-action/';


let AsyncPaper = loadable({
  loader: () => import('./routes/paper/'),
  loading: LoadingComponent
})

const MoreComponents = ({ match }) => (
  <div>
    <Route path={`${match.url}/avatars`} component={Avatars}/>
    <Route path={`${match.url}/back-top`} component={BackTop}/>
    <Route path={`${match.url}/badges`} component={Badges}/>
    <Route path={`${match.url}/call-to-action`} component={CallToAction}/>
    <Route path={`${match.url}/paper`} component={AsyncPaper}/>
  </div>
)

export default MoreComponents;
