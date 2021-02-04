import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import MainListItems from './components/MainListItem';
import { logoutRequest } from '../../containers/App/actions';
import Logo from '../../assets/img/logo-white.svg';
import LogoIcon from '../../assets/img/logo-icon-white.svg';
import { FaAngleDown, FaExternalLinkAlt } from 'react-icons/fa';
import routes from '../../routes/admin';

import NotFoundPage from '../../containers/NotFoundPage/Loadable';
import ColoredScrollbars from '../../components/ColoredScrollbars';

import DropdownMenu from '../../components/DropdownMenu/index';

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
    width: 0, //theme.spacing(7),
    // [theme.breakpoints.up('sm')]: {
    //   width: 0, // theme.spacing(9),
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
      <div className="flex overflow-y-hidden bg-gray-100">
        <ColoredScrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          style={{
            width: 260,
            height: '100vh',
            backgroundColor: '#2D3446',
          }}
        >
          <div
            className="flex items-center px-4 py-3 fixed top-0 z-40"
            style={{ width: 260, backgroundColor: '#1F2430' }}
          >
            <Link target="_blank" to="/">
              <img
                className="opacity-75"
                style={{ height: 28 }}
                src={Logo}
                alt="waftengine"
              />
              <p className="text-xs text-white opacity-25 leading-none text-right">
                v1.0.1
              </p>
            </Link>
          </div>

          <MainListItems />
        </ColoredScrollbars>
        <ColoredScrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          style={{
            height: '100vh',
            backgroundColor: '#f9f9f9',
          }}
        >
          <main className="flex-1 flex flex-col justify-between pt-16">
            <div
              className="bg-white dark:bg-gray-800 border-b flex top-0 justify-between fixed z-40"
              style={{ width: 'calc(100% - 220px)' }}
            >
              <div className="flex-1 flex items-center h-16">
                <Link
                  target="_blank"
                  className="rounded px-2 py-2 ml-6 leading-none flex items-center text-sm text-white bg-blue-500 border border-blue-600 hover:bg-blue-600 transition-all duration-100 ease-in"
                  to="/"
                >
                  Visit Site
                  <FaExternalLinkAlt className="ml-2 text-xs" />
                </Link>
                <a
                  className="pl-8 text-sm"
                  target="_blank"
                  href="https://waftengine.org/documentation/2019-6-16-introduction-to-waftengine"
                >
                  Docs
                </a>
                <a
                  className="pl-8 text-sm"
                  target="_blank"
                  href="https://waftengine.org/blog"
                >
                  Blog
                </a>
                <a
                  className="pl-8 text-sm"
                  target="_blank"
                  href="https://waftengine.org"
                >
                  Forum
                </a>
              </div>

              <DropdownMenu
                main={
                  <button className="flex items-center justify-end">
                    <img
                      className="w-8 h-8 rounded-full overflow-hidden"
                      src={LogoIcon}
                      alt="profile image"
                    />
                    <div className="px-3 text-left">
                      <span className="block capitalize text-sm">
                        {users.name}
                      </span>
                      <span className="block leading-none truncate capitalize text-xs text-gray-600">
                        {users.roles &&
                        users.roles[0] &&
                        users.roles[0].role_title
                          ? users.roles[0].role_title
                          : ''}
                      </span>
                    </div>
                    <FaAngleDown className="opacity-50" />
                  </button>
                }
                items={
                  <>
                    <Link
                      to="/admin/dashboard"
                      style={{ textDecoration: 'none', color: 'black' }}
                      onClick={handleClose}
                      className="py-2 block px-4 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                    >
                      <p>Dashboard</p>
                    </Link>
                    <Link
                      to="/admin/profile"
                      style={{ textDecoration: 'none', color: 'black' }}
                      onClick={handleClose}
                      className="py-2 block px-4 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                    >
                      <p>Profile</p>
                    </Link>
                    <p className="py-2 block px-4 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                      Log Out
                    </p>
                  </>
                }
              />
              {/* <Menu
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
              >
                <Link
                  to="/admin/dashboard"
                  style={{ textDecoration: 'none', color: 'black' }}
                  onClick={handleClose}
                >
                  <MenuItem>Dashboard</MenuItem>
                </Link>
                <Link
                  to="/admin/profile"
                  style={{ textDecoration: 'none', color: 'black' }}
                  onClick={handleClose}
                >
                  <MenuItem>Profile</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu> */}
            </div>
            <div className="flex-1 m-6">{switchRoutes(roles)}</div>
            {/* <div className="border-t bg-white h-16 flex items-center justify-center">
              <p className="text-center text-gray-500 text-sm">
                WaftEngine v1.0.1
              </p>
            </div> */}
          </main>
        </ColoredScrollbars>
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

const withConnect = connect(mapStateToProps, { logoutRequest, push });

const withStyle = withStyles(styles);

export default compose(withConnect, withStyle)(AdminLayout);
