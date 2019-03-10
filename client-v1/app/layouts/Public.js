import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import publicStyle from 'assets/jss/material-dashboard-react/layouts/publicStyle';

import routes from 'routes/public';
import Footer from '../containers/App/layouts/Footer';
import Header from '../containers/App/layouts/HeaderPublic';

const switchRoutes = (
  <Switch>
    {routes.map(prop => (
      <Route key={prop.path} {...prop} />
    ))}
  </Switch>
);

class PublicLayout extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Header />
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
        <Footer />
      </>
    );
  }
}

export default withStyles(publicStyle)(PublicLayout);
