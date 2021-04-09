import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutRequest } from '../../containers/App/actions';

/* eslint-disable react/prefer-stateless-function */
export class UserProfileSettingsPage extends React.PureComponent {
  render() {
    return (
      <div className="sidemenu">
        <React.Fragment>
          <div
            className="mt-2 bg-gray-200 px-3 py-5 rounded"
            style={{ height: '150px' }}
          >
            <div className="pb-2">
              <NavLink
                className="text-gray-800 hover:text-black"
                to="/user/profile"
              >
                Personal Information
              </NavLink>
            </div>

            <div className="pb-2">
              <NavLink
                className="text-gray-800 hover:text-black"
                to="/user/change-password"
              >
                Change Password
              </NavLink>
            </div>
          </div>

          <button
            className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme"
            onClick={() => this.props.logoutRequest()}
          >
            LogOut
          </button>
        </React.Fragment>
      </div>
    );
  }
}

UserProfileSettingsPage.propTypes = {
  logoutRequest: PropTypes.func.isRequired,
};

export default connect(
  null,
  { logoutRequest },
)(UserProfileSettingsPage);
