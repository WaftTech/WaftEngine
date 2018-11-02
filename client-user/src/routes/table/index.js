import React from 'react';
import { Route } from 'react-router-dom';

import DataTables from './routes/data-tables/';
// import Responsive from './routes/responsive/';
import Styles from './routes/styles/';


const Table = ({ match }) => (
  <div>
    <Route path={`${match.url}/data-tables`} component={DataTables}/>
    <Route path={`${match.url}/styles`} component={Styles}/>
  </div>
)

export default Table;
