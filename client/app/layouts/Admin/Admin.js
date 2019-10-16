import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { Scrollbars } from 'react-custom-scrollbars';

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
import ColoredScrollbars from '../../components/ColoredScrollbars';
import Breadcrumb from '../../components/Breadcrumb';

const switchRoutes = roles => {
  const route = window.localStorage.getItem('routes');
  const arr = JSON.parse(route);
  const availableRoutes = arr;

  const hasAccess = path => {
    const available = [];
    availableRoutes.map(
      each =>
        each.admin_routes &&
        each.admin_routes.length &&
        each.admin_routes.map(e => available.push(e)),
    );
    return available.includes(path);
  };

  return (
    <Switch>
      {routes
        .filter(each => hasAccess(each.path))
        .map(prop => (
          <Route key={prop.path} {...prop} />
        ))}
      <Route component={NotFoundPage} />
    </Switch>
  );
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

const AdminLayout = ({ classes, logoutRequest: logout, roles, users }) => {
  // const [open, setOpen] = useState(true);
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
  const handleDashboard = () => {
    setAnchorel(null);
    push('/admin/dashboard');
  };

  const handleProfile = () => {
    setAnchorel(null);
    push('/user/profile');
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <div className="flex overflow-y-hidden bg-gray-200">
        <ColoredScrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          style={{
            width: 250,
            height: '100vh',
          }}
          className="bg-white shadow-lg overflow-hidden"
        >
          <Link to="/">
            <img
              className="mt-3 mb-6 ml-4 mx-auto flex"
              src={Logo}
              alt="waftengine"
            />
          </Link>
          <MainListItems />
        </ColoredScrollbars>
        <main className="h-screen flex-1 overflow-auto px-8 py-4">
          <div className="flex justify-between flex1  px-3 bg-white rounded">
            <Breadcrumb />
            <button className="flex" onClick={handleMenu}>
              <div className="m-auto mr-1">{users.name}</div>
              <AccountCircle />
            </button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorel}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={anchorOpen}
              onClose={handleClose}
            ><Link
              to="/admin/dashboard"
              style={{ textDecoration: 'none', color: 'black' }} onClick={handleClose}
            >
                <MenuItem>
                  Dashboard
                </MenuItem>
              </Link>
              <Link
                to="/admin/profile"
                style={{ textDecoration: 'none', color: 'black' }} onClick={handleClose}
              >
                <MenuItem >
                  Profile
                  </MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
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
  users: PropTypes.object.isRequired,
};

const mapStateToProps = ({ global }) => ({
  roles: global.user.roles,
  users: global.user,
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
