import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircle from '@material-ui/icons/AccountCircle';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExtensionIcon from '@material-ui/icons/Extension';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import PeopleIcon from '@material-ui/icons/People';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Logo from '../../images/logo.png';

import LayersIcon from '@material-ui/icons/Layers';
// import { mainListItems, secondaryListItems } from './listItems';

import routes from '../../routes/admin';

import NotFoundPage from '../../containers/NotFoundPage/Loadable';

const switchRoutes = (
  <Switch>
    {routes.map(prop => (
      <Route key={prop.path} {...prop} />
    ))}
    <Route component={NotFoundPage} />
  </Switch>
);

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paperAnchorLeft: { display: 'none' },
  toolbar: {
    paddingRight: 24, // keep right padding `when drawer closed
  },
  imgFluid: { maxWidth:'100%'},
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
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
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

const mainListItems = (
  <List>
    <Link to="/admin/dashboard">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to="/admin/role-manage">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Role Manage" />
      </ListItem>
    </Link>
    <Link to="/admin/module-manage">
      <ListItem button>
        <ListItemIcon>
          <ExtensionIcon />
        </ListItemIcon>
        <ListItemText primary="Module Manage" />
      </ListItem>
    </Link>
    <Link to="/admin/user-manage">
      <ListItem button>
        <ListItemIcon>
          <ExtensionIcon />
        </ListItemIcon>
        <ListItemText primary="User Manage" />
      </ListItem>
    </Link>
    <Link to="/admin/content-manage">
      <ListItem
        style={{
          textDecoration: 'none',
          fontSize: '0.8em',
          textTransform: 'uppercase',
        }}
      >
        <ListItemIcon>
          <FormatSizeIcon />
        </ListItemIcon>
        <ListItemText primary="Content Manage" />
      </ListItem>
    </Link>
    <Link to="/admin/faq-manage">
      <ListItem
        style={{
          textDecoration: 'none',
          fontSize: '0.8em',
          textTransform: 'uppercase',
        }}
      >
        <ListItemIcon>
          <QuestionAnswerIcon />
        </ListItemIcon>
        <ListItemText primary="FAQ Manage" />
      </ListItem>
    </Link>
    <Link to="/">
      <ListItem>
        <ListItemIcon>
          <InsertChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
    </Link>
    <Link to="/">
      <ListItem>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItem>
    </Link>
  </List>
);

const AdminLayout = ({ classes }) => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <AppBar
        position="absolute"
        className={`${classes.appBar} ${open ? classes.appBarShift : ''}`}
      >
        <Toolbar disableGutters={!open} className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={`${classes.menuButton} ${
              open ? classes.menuButtonHidden : ''
            }`}
          >
            <MenuIcon />
          </IconButton>

          <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: `${classes.drawerPaper} ${
            open ? '' : classes.drawerPaperClose
          }`,
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
        <img className={classes.imgFluid} src={Logo} alt="waft engine" />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.drawerText}> {mainListItems}</div>
      </Drawer>
      <main className={classes.content}>
        {/* <div className={classes.appBarSpacer} /> */}
        {switchRoutes}
      </main>
    </div>
  );
};

AdminLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminLayout);
