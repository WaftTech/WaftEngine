import React from 'react';
import { Route } from 'react-router-dom';
import loadable from 'react-loadable';
import LoadingComponent from 'components/Loading';

import Autocomplete from './routes/autocomplete/';
import Checkboxes from './routes/checkboxes/';
import Chips from './routes/chips/';
import RadioButtons from './routes/radio-buttons/';
import Rate from './routes/rate/';
import Selects from './routes/selects/';
import Slider from './routes/slider/';
import Switches from './routes/switches/';
import TextFields from './routes/text-fields/';
import Upload from './routes/upload/';

let Pickers = loadable({
  loader: () => import('./routes/pickers/'),
  loading: LoadingComponent
})


const FormComponents = ({ match }) => (
  <div>
    <Route path={`${match.url}/autocomplete`} component={Autocomplete}/>
    <Route path={`${match.url}/checkboxes`} component={Checkboxes}/>
    <Route path={`${match.url}/chips`} component={Chips}/>
    <Route path={`${match.url}/pickers`} component={Pickers}/>
    <Route path={`${match.url}/radio-buttons`} component={RadioButtons}/>
    <Route path={`${match.url}/rate`} component={Rate}/>
    <Route path={`${match.url}/selects`} component={Selects}/>
    <Route path={`${match.url}/slider`} component={Slider}/>
    <Route path={`${match.url}/switches`} component={Switches}/>
    <Route path={`${match.url}/text-fields`} component={TextFields}/>
    <Route path={`${match.url}/upload`} component={Upload}/>
  </div>
)

export default FormComponents;
