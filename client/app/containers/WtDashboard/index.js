/**
 *
 * WtDashboard
 *
 */

import React from "react";
//import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle";

import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";

import logo from "assets/img/logo.svg";
import image from "assets/img/register.jpg";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectWtDashboard from "./selectors";
import reducer from "./reducer";
import saga from "./saga";

import sidebarRoutes from "./sidebarRoutes";

const switchRoutes = (
  <Switch>
    {sidebarRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return (
        <Route
          path={prop.path}
          component={prop.component}
          exact={prop.exact || false}
          key={key}
        />
      );
    })}
  </Switch>
);

/* eslint-disable react/prefer-stateless-function */
export class WtDashboard extends React.Component {
  state = {
    mobileOpen: false
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { mobileOpen } = this.state;
    const { location, classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={sidebarRoutes}
          // logoText={'ASK4TRIP'}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={mobileOpen}
          color="blue"
          location={location}
        />
        <div className={classes.mainPanel} ref={el => (this.mainPanel = el)}>
          <Header
            routes={sidebarRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            location={location}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        </div>
      </div>
    );
  }
}

WtDashboard.propTypes = {};

const mapStateToProps = createStructuredSelector({
  wtdashboard: makeSelectWtDashboard()
});


const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: "wtDashboard", reducer });
const withSaga = injectSaga({ key: "wtDashboard", saga });
const withStyle = withStyles(dashboardStyle);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect
)(WtDashboard);
