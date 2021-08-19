import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import logo from '../../../assets/img/logo.svg';
import DropdownMenu from '../../../components/DropdownMenu/index';
import { logoutRequest } from '../../../containers/App/actions';
import { IMAGE_BASE } from '../../../containers/App/constants';
import {
  makeSelectToken,
  makeSelectUser,
} from '../../../containers/App/selectors';
import './header.css';

const Header = props => {
  const { classes, token, user, logoutRequest: logout } = props;
  const [checked, setChecked] = useState('');
  const handleToggle = () => {
    checked === '' ? setChecked('checked') : setChecked('');
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const redirectToLogin = () => {
    handleClose();
    props.push('/login-user');
  };

  const redirectToRegister = () => {
    handleClose();
    props.push('/signup-user');
  };
  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <header className="border-b lg:border-b">
      <div className="container mx-auto flex justify-between flex-wrap relative">
        <div className="py-2 p w-full md:w-1/2 lg:w-1/6 order-2 md:order-none">
          <Link to="/">
            <img src={logo} alt="WaftEngine" />
          </Link>
        </div>
        <div className="w-full nav-bar lg:w-auto lg:m-auto xl:w-3/6">
          <input
            className="ham"
            type="checkbox"
            checked={checked}
            onChange={handleToggle}
          />
          <svg
            className="icon icon-menu-toggle hamIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <g className="svg-menu-toggle">
              <path className="line line-1" d="M5 13h90v14H5z" />
              <path className="line line-2" d="M5 43h90v14H5z" />
              <path className="line line-3" d="M5 73h90v14H5z" />
            </g>
          </svg>
        </div>

        {!token ? (
          <div className="w-full text-base flex flex-wrap justify-end header_right pb-2 border-b px-5 md:w-1/2 md:border-b-0 md:pb-0 lg:w-1/3">
            <button
              onClick={redirectToRegister}
              className="items-center hover:text-primary"
            >
              Register <span className="ml-2 mr-2"> | </span>
            </button>
            <button
              onClick={redirectToLogin}
              className="items-center hover:text-primary"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="w-full text-base flex flex-wrap justify-end header_right pb-2 border-b px-5 md:w-1/2 md:border-b-0 md:pb-0 lg:w-1/3">
            <DropdownMenu
              main={
                <button>
                  <div className="text-base flex items-center">
                    <span className="ml-2 mr-2">{user.name} | </span>
                    {user.image && user.image.path ? (
                      <img
                        src={`${IMAGE_BASE}${user.image.path}`}
                        className="w-8 h-8 rounded-full overflow-hidden"
                      />
                    ) : (
                      <FaUserAlt className="text-base" />
                    )}
                  </div>
                </button>
              }
              items={
                <>
                  {user.isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      style={{ textDecoration: 'none', color: 'black' }}
                      onClick={handleClose}
                      className="py-2 block px-4 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                    >
                      <p>Dashboard</p>
                    </Link>
                  )}
                  <Link
                    to="/user/profile"
                    style={{ textDecoration: 'none', color: 'black' }}
                    onClick={handleClose}
                    className="py-2 block px-4 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                  >
                    <p>Profile</p>
                  </Link>
                  <p
                    className="py-2 block px-4 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Log Out
                  </p>
                </>
              }
            />
          </div>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  logoutRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps, { push, logoutRequest });

export default compose(withConnect)(Header);
