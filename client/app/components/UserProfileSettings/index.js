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
          <div className="mt-2 bg-grey-lighter px-3 py-5 rounded" style={{height:'150px'}}>
           
                <div className="pb-2"><NavLink className="text-grey-darker hover:text-black" to="/user/profile">Personal Information</NavLink></div>
            
                <div className="pb-2"><NavLink className="text-grey-darker hover:text-black" to="/user/change-password">Change Password</NavLink></div>
             
          </div>

          <button className="text-white py-2 px-4 rounded mt-4 btn-waft"   onClick={() => this.props.logoutRequest()}>
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
