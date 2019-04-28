import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button, Grid, Menu, MenuItem } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectToken,
  makeSelectUser,
} from '../../containers/App/selectors';
import { logoutRequest } from '../../containers/App/actions';

const styles = theme => ({});

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
    <header>
      <div className="container mx-auto">
        {!token ? (
          <div>
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
      </div>
    </header>
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
