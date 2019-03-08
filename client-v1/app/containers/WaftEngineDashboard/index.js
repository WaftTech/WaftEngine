/**
 *
 * WaftEngineDashboard
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import Sidebar from '../../components/Sidebar/Sidebar';

import sidebarRoutes from './sidebarRoutes';

const switchRoutes = (
  <Switch>
    {sidebarRoutes.map(props => (
      <Route path={props.path} component={props.component} exact={props.exact || false} key={props.path} />
    ))}
  </Switch>
);

/* eslint-disable react/prefer-stateless-function */
export class WaftEngineDashboard extends React.Component {
  state = {
    mobileOpen: false,
  };

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      const ps = new PerfectScrollbar(this.mainPanel); // eslint-disable-line no-unused-vars
    }
    window.addEventListener('resize', this.resizeFunction);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunction);
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  render() {
    const { mobileOpen } = this.state;
    const { location, classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar routes={sidebarRoutes} logo={logo} image={image} handleDrawerToggle={this.handleDrawerToggle} open={mobileOpen} color="blue" location={location} />
        <div
          className={classes.mainPanel}
          ref={el => {
            this.mainPanel = el;
          }}
        >
          <Header routes={sidebarRoutes} handleDrawerToggle={this.handleDrawerToggle} location={location} />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        </div>
      </div>
    );
  }
}

const withConnect = connect(null);

export default compose(withConnect)(WaftEngineDashboard);
