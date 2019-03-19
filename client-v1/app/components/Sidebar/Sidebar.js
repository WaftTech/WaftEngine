import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

import sidebarStyle from 'assets/jss/material-dashboard-react/components/sidebarStyle';

// core components
import AdminNavbarLinks from '../Navbars/AdminNavbarLinks';

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1;
  }
  const { classes, color, logo, image, logoText, routes } = props;
  const links = (
    <List className={classes.list}>
      {routes.map(prop => {
        const activePro = ' ';
        const listItemClasses = classNames({
          [` ${classes[color]}`]: activeRoute(prop.path),
        });
        const whiteFontClasses = classNames({
          [` ${classes.whiteFont}`]: activeRoute(prop.path),
        });
        return (
          <NavLink to={prop.path} className={activePro + classes.item} activeClassName="active" key={`sidebar-${prop.path}`}>
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === 'string' ? <Icon className={classNames(classes.itemIcon, whiteFontClasses)}>{prop.icon}</Icon> : <prop.icon className={classNames(classes.itemIcon, whiteFontClasses)} />}
              <ListItemText primary={prop.name} className={classNames(classes.itemText, whiteFontClasses)} disableTypography />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  const brand = (
    <div className={classes.logo}>
      <a href="https://www.wafttech.com" className={classNames(classes.logoLink)}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>
          {image !== undefined ? <div className={classes.background} style={{ backgroundImage: "url(" + image + ")" }} /> : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? <div className={classes.background} style={{ backgroundImage: "url(" + image + ")" }} /> : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  logoText: PropTypes.string.isRequired,
  routes: PropTypes.array.isRequired,
};

export default withStyles(sidebarStyle)(Sidebar);
