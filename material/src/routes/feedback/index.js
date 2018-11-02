import React from 'react';
import { Route } from 'react-router-dom';
import loadable from 'react-loadable';
import LoadingComponent from 'components/Loading';

import Dialog from './routes/dialog/';
import Modal from './routes/modal/';
import Notification from './routes/notification/';
import Progress from './routes/progress/';
import Snackbars from './routes/snackbars/';

let Drawer = loadable({
  loader: () => import('./routes/drawer/'),
  loading: LoadingComponent
})
let Loaders = loadable({
  loader: () => import('./routes/loaders/'),
  loading: LoadingComponent
})

const FeedbackComponents = ({ match }) => (
  <div>
    <Route path={`${match.url}/dialog`} component={Dialog}/>
    <Route path={`${match.url}/drawer`} component={Drawer}/>
    <Route path={`${match.url}/loaders`} component={Loaders}/>
    <Route path={`${match.url}/modal`} component={Modal}/>
    <Route path={`${match.url}/notification`} component={Notification}/>
    <Route path={`${match.url}/progress`} component={Progress}/>
    <Route path={`${match.url}/snackbars`} component={Snackbars}/>
  </div>
)

export default FeedbackComponents;
