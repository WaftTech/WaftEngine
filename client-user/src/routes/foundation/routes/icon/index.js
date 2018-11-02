import React from 'react';
import { Route } from 'react-router-dom';

import MaterialIcons from './routes/material-icons/';
import SocialIcons from './routes/social-icons/';

const FeedbackComponents = ({ match }) => (
  <div>
    <Route path={`${match.url}/material-icons`} component={MaterialIcons}/>
    <Route path={`${match.url}/social-icons`} component={SocialIcons}/>
  </div>
)

export default FeedbackComponents;
