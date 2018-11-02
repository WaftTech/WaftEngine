import React from 'react';
import { Route } from 'react-router-dom';
import loadable from 'react-loadable';
import LoadingComponent from 'components/Loading';

import Layouts from './routes/layouts/'
import Steppers from './routes/steppers/'


let FormControl = loadable({
  loader: () => import('./routes/form-control/'),
  loading: LoadingComponent
})
let Forms = loadable({
  loader: () => import('./routes/forms/'),
  loading: LoadingComponent
})

const Form = ({ match }) => (
  <div>
    <Route path={`${match.url}/form-control`} component={FormControl}/>
    <Route path={`${match.url}/forms`} component={Forms}/>
    <Route path={`${match.url}/layouts`} component={Layouts}/>
    <Route path={`${match.url}/steppers`} component={Steppers}/>
  </div>
)

export default Form;
