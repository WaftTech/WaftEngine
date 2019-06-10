import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { withStyles } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircle from '@material-ui/icons/AccountCircle';

import MainListItems from './components/MainListItem';
import { logoutRequest } from '../../containers/App/actions';
import Logo from '../../assets/img/logo.svg';

import routes from '../../routes/admin';

import NotFoundPage from '../../containers/NotFoundPage/Loadable';

const switchRoutes = roles => {
  // is SuperAdmin?
  const isSuperAdmin = roles.includes('5bf7ae3694db051f5486f845');
  // is Admin?
  const isAdmin = roles.includes('5bf7af0a736db01f8fa21a25');
  // is NormalUser?
  const isNormalUser = roles.includes('5bf7ae90736db01f8fa21a24');
  // is Guest?
  const isGuest = roles.includes('5ce126fcdd1e3e3b0c8a36aa');

  const route = window.localStorage.getItem('routes');
  const arr = JSON.parse(route);
  const availableRoutes = arr;

  if (isSuperAdmin) {
    return (
      <Switch>
        {routes.map(prop => (
          <Route key={prop.path} {...prop} />
        ))}
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
  if (isAdmin) {
    return (
      <Switch>
        {routes
          .filter(each => availableRoutes.includes(each.path))
          .map(prop => (
            <Route key={prop.path} {...prop} />
          ))}
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
  if (isNormalUser) {
    return (
      <Switch>
        {routes
          .filter(each => availableRoutes.includes(each.path))
          .map(prop => (
            <Route key={prop.path} {...prop} />
          ))}
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
  if (isGuest) {
    return (
      <Switch>
        {routes
          .filter(each => availableRoutes.includes(each.path))
          .map(prop => (
            <Route key={prop.path} {...prop} />
          ))}
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
};

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paperAnchorLeft: { display: 'none' },
  toolbar: {
    paddingRight: 24, // keep right padding `when drawer closed
  },
  imgFluid: { maxWidth: '100%' },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    background: '#007AFF',
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 0, // theme.spacing.unit * 7,
    // [theme.breakpoints.up('sm')]: {
    //   width: 0, // theme.spacing.unit * 9,
    // },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {},
  drawerText: {
    textDecoration: 'none',
    '& a': {
      display: 'block',
      paddingTop: 5,
      paddingBottom: 5,
      textDecoration: 'none',
      fontSize: '0.8em',
      textTransform: 'uppercase',
      transition: 'background 0.2s',
    },
    '& a:hover': { backgroundColor: '#007AFF', color: '#fff' },
    '& span': {
      fontSize: 12,
    },
    '& svg': {
      fontSize: 16,
    },
    '& a:hover span, & a:hover svg': { color: '#fff' },
  },
});

const AdminLayout = ({ classes, logoutRequest: logout, roles }) => {
  const [open, setOpen] = useState(true);
  const [anchorel, setAnchorel] = useState(null);
  const anchorOpen = Boolean(anchorel);
  const handleMenu = event => {
    setAnchorel(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorel(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorel(null);
    push('/login-admin');
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <div className="flex overflow-y-hidden bg-grey-lighter">
        <div
          className="overflow-x-hidden h-screen bg-white WaftSideBar"
          style={{ width: 250 }}
        >
          <Link to="/">
            <img
              className="mt-3 mb-6 ml-4 mx-auto flex grayscale1"
              src={Logo}
              alt="waft engine"
            />
          </Link>
          <MainListItems />
        </div>
        <main className="h-screen flex-1 overflow-auto px-8 py-4">
          <div className="flex justify-end flex1 py-3 px-3 bg-white rounded">
            <AccountCircle onClick={handleMenu} />
            <div
              className="hidden"
              id="menu-appbar"
              anchorel={anchorel}
              open={anchorOpen}
              onClose={handleClose}
            >
              <div onClick={handleClose}>Dashboard</div>
              <div onClick={handleLogout}>Logout</div>
            </div>
          </div>
          {switchRoutes(roles)}
        </main>
      </div>
    </React.Fragment>
  );
};

AdminLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutRequest: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
};

const mapStateToProps = ({ global }) => ({
  roles: global.user.roles,
});

const withConnect = connect(
  mapStateToProps,
  { logoutRequest, push },
);

const withStyle = withStyles(styles);

export default compose(
  withConnect,
  withStyle,
)(AdminLayout);
