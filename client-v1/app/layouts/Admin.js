import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import Navbar from 'components/Navbars/Navbar';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';
import routes from 'routes/admin';

import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle';

import image from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/reactlogo.png';
import DashboardPage from '../containers/Dashboard';

const switchRoutes = (
  <Switch>
    {routes.map(prop => (
      <Route key={prop.path} {...prop} />
    ))}
    <Route component={DashboardPage} />
  </Switch>
);

class Dashboard extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      image,
      color: 'blue',
      fixedClasses: 'dropdown show',
      mobileOpen: false,
    };
    this.mainPanel = React.createRef();
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      const ps = new PerfectScrollbar(this.mainPanel.current); // eslint-disable-line no-unused-vars
    }
    window.addEventListener('resize', this.resizeFunction);
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.mainPanel.current.scrollTop = 0;
      // if (this.state.mobileOpen) {
      //   this.setState({ mobileOpen: false });
      // }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunction);
  }

  handleImageClick = img => this.setState({ image: img });

  handleColorClick = color => this.setState({ color });

  handleFixedClick = () => {
    if (this.state.fixedClasses === 'dropdown') {
      this.setState({ fixedClasses: 'dropdown show' });
    } else {
      this.setState({ fixedClasses: 'dropdown' });
    }
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar routes={routes} logoText="Waft Engine" logo={logo} image={this.state.image} handleDrawerToggle={this.handleDrawerToggle} open={this.state.mobileOpen} color={this.state.color} {...rest} />
        <div className={classes.mainPanel} ref={this.mainPanel}>
          <Navbar routes={routes} handleDrawerToggle={this.handleDrawerToggle} {...rest} />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
