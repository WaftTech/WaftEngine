import React from 'react';
import { Route } from 'react-router-dom';
import loadable from 'react-loadable';
import LoadingComponent from 'components/Loading';

import Boxes from './routes/boxes/';
import Buttons from './routes/buttons/';
import ColorPalette from './routes/color-palette/';
import Elevation from './routes/elevation/';
import Typography from './routes/typography/';

let Icon = loadable({
  loader: () => import('./routes/icon/'),
  loading: LoadingComponent
})

let Navigation = loadable({
  loader: () => import('./routes/navigation/'),
  loading: LoadingComponent
})


const Layout = ({ match }) => (
  <div>
    <Route path={`${match.url}/boxes`} component={Boxes}/>
    <Route path={`${match.url}/buttons`} component={Buttons}/>
    <Route path={`${match.url}/color-palette`} component={ColorPalette}/>
    <Route path={`${match.url}/elevation`} component={Elevation}/>
    <Route path={`${match.url}/icon`} component={Icon}/>
    <Route path={`${match.url}/navigation`} component={Navigation}/>
    <Route path={`${match.url}/typography`} component={Typography}/>

  </div>
)

export default Layout;
