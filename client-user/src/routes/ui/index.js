import React from 'react';
import { Route } from 'react-router-dom';
import loadable from 'react-loadable';
import LoadingComponent from 'components/Loading';

import Callouts from './routes/callouts/';
import Covers from './routes/covers/';
import ExpansionPanels from './routes/expansion-panels/';
import FeatureCallouts from './routes/feature-callouts/';
import Jumbotron from './routes/jumbotron/';
import PricingTables from './routes/pricing-tables/';
import Sashes from './routes/sashes/';
import Tabs from './routes/tabs/';
import Testimonials from './routes/testimonials/';
import Popovers from './routes/popovers/';
import Ribbons from './routes/ribbons/';
import Tooltips from './routes/tooltips/';


let Carousel = loadable({
  loader: () => import('./routes/carousel/'),
  loading: LoadingComponent
})
let Hover = loadable({
  loader: () => import('./routes/hover/'),
  loading: LoadingComponent
})

let More = loadable({
  loader: () => import('./routes/more/'),
  loading: LoadingComponent
})

let Timeline = loadable({
  loader: () => import('./routes/timeline/'),
  loading: LoadingComponent
})

let Utility = loadable({
  loader: () => import('./routes/utility/'),
  loading: LoadingComponent
})


const UI = ({ match }) => (
  <div>
    <Route path={`${match.url}/callouts`} component={Callouts}/>
    <Route path={`${match.url}/carousel`} component={Carousel}/>
    <Route path={`${match.url}/covers`} component={Covers}/>
    <Route path={`${match.url}/expansion-panels`} component={ExpansionPanels}/>
    <Route path={`${match.url}/feature-callouts`} component={FeatureCallouts}/>
    <Route path={`${match.url}/hover`} component={Hover}/>
    <Route path={`${match.url}/jumbotron`} component={Jumbotron}/>
    <Route path={`${match.url}/more`} component={More}/>
    <Route path={`${match.url}/pricing-tables`} component={PricingTables}/>
    <Route path={`${match.url}/sashes`} component={Sashes}/>
    <Route path={`${match.url}/tabs`} component={Tabs}/>
    <Route path={`${match.url}/testimonials`} component={Testimonials}/>
    <Route path={`${match.url}/popovers`} component={Popovers}/>
    <Route path={`${match.url}/ribbons`} component={Ribbons}/>
    <Route path={`${match.url}/timeline`} component={Timeline}/>
    <Route path={`${match.url}/tooltips`} component={Tooltips}/>
    <Route path={`${match.url}/utility`} component={Utility}/>
  </div>
)

export default UI;

