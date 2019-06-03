import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { logoutRequest } from '../../containers/App/actions';

/* eslint-disable react/prefer-stateless-function */
export class UserProfileSettingsPage extends React.PureComponent {
  render() {
    return (
      <div className="sidemenu">
        <React.Fragment>
          <div>
            <ul>
              <li>
                <NavLink to="/user/profile">Personal Information</NavLink>
              </li>
              <li>
                <NavLink to="/user/change-password">Change Password</NavLink>
              </li>
              {/* <li>Password set a minute ago</li> */}
            </ul>
          </div>
          <div style={{ padding: '5px 20px' }}>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => this.props.logoutRequest()}
            >
              <b>Logout</b>
            </Button>
          </div>
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
