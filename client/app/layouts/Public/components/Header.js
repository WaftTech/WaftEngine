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
} from '../../../containers/App/selectors';
import { logoutRequest } from '../../../containers/App/actions';
import logo from '../../../assets/img/logo.svg';

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
    <header className="">
      <div className="container mx-auto pt-2 pb-2 border-b flex justify-between">
        <Link to="/">
          <img src={logo} alt="WaftEngine" />
        </Link>

        {!token ? (
          <div>
            <button
              onClick={redirectToRegister}
              className="bg-grey-lighter hover:bg-grey-light text-red py-2 px-4 rounded text-sm mr-2"
            >
              Register
            </button>
            <button
              onClick={redirectToLogin}
              className="bg-red text-white py-2 px-4 rounded text-sm"
            >
              Login
            </button>
          </div>
        ) : (
          <div className={classes.topRightWrapper}>
            <button className={classes.dropDown} onClick={handleMenu}>
              <span>{user.name}</span>
              <AccountCircle />
            </button>
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
