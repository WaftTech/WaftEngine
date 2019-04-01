import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
// import {Helmet} from "react-helmet";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import logo from 'images/hello-tender-1.png';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectToken,
  makeSelectUser,
} from '../../containers/App/selectors';
import { logoutRequest } from '../../containers/App/actions';
import logo from '../../assets/img/we_logo.png';

const styles = theme => ({
  logo20: {
    width: 200,
    margin: 10,
  },
  button: {
    margin: theme.spacing.unit,
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 20,
    boxShadow: 'none',
    '&:hover': {
      background: '#cf0b24',
      color: '#fff',
    },
  },
  topRightWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-End',
    height: '100%',
  },
  menu: {
    marginRight: 30,
    marginLeft: 30,
    color: '#fff',
    textDecoration: 'none',
    fontSize: 18,
  },
  menuWrapper: {
    background: '#cf0b24',
    width: '100%',
    '& a': {
      display: 'inline-block',
      padding: '15px',
      fontSize: 14,
      margin: 0,
    },
    '& a:hover': {
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    '& a.active': {
      boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.8)',
    },
  },
  dropDown: {
    textTransform: 'capitalize',
  },
});

const Header = props => {
  const { classes, token, user, logoutRequest: logout } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const redirectToLogin = () => {
    props.push('/login-user');
  };

  const redirectToRegister = () => {
    props.push('/signup-user');
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <header>
        <div className="container">
          <Grid container>
            <Grid item xs={6} sm={6}>
              <img src={logo} alt="Waft Engine" className={classes.logo20} />
            </Grid>
            <Grid item xs={12} sm={6}>
              {!token ? (
                <div className={classes.topRightWrapper}>
                  <Button
                    onClick={redirectToRegister}
                    variant="contained"
                    className={classes.button}
                  >
                    Register
                  </Button>
                  <Button
                    onClick={redirectToLogin}
                    variant="contained"
                    className={classes.button}
                  >
                    Login
                  </Button>
                </div>
              ) : (
                <div className={classes.topRightWrapper}>
                  <Button className={classes.dropDown} onClick={handleMenu}>
                    <span>{user.name}</span>

                    <AccountCircle />
                  </Button>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    {user.isAdmin && (
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="/admin/dashboard"
                          style={{ textDecoration: 'none', color: 'black' }}
                        >
                          Dashboard
                        </Link>
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleClose}>
                      <Link
                        to="/user/profile"
                        style={{ textDecoration: 'none', color: 'black' }}
                      >
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>LogOut</MenuItem>
                  </Menu>
                </div>
              )}
            </Grid>
          </Grid>
        </div>

        <div className={classes.menuWrapper}>
          <div className="container">
            <NavLink className={classes.menu} exact to="/">
              Home
            </NavLink>
            <NavLink className={classes.menu} to="/slider">
              Slider Module
            </NavLink>
            <NavLink className={classes.menu} to="/blog-list">
              Blog Module
            </NavLink>
            <NavLink className={classes.menu} to="/contact">
              Contact Module
            </NavLink>
            <NavLink className={classes.menu} to="/faq">
              FAQ Module
            </NavLink>
            <NavLink className={classes.menu} to="/subscribe">
              Susbscribe Module
            </NavLink>
            <NavLink className={classes.menu} to="/blog-list">
              Blogs
            </NavLink>
          </div>
        </div>
      </header>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  logoutRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  { push, logoutRequest },
);

const withStyle = withStyles(styles);

export default compose(
  withConnect,
  withStyle,
)(Header);
