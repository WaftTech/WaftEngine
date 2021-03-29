import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style.css';

function App() {
  return (
    <div className="ml-4">
      <h2 className="text-2xl mb-4">Profile</h2>
      <div className="flex border border-b-0 Waft_Tab">
        <NavLink
          className="block py-2 px-4 hover:text-primary border-r"
          to="/admin/profile/information"
        >
          Information
        </NavLink>
        <NavLink
          className="block py-2 px-4 hover:text-primary border-r"
          to="/admin/profile/two-factor"
        >
          Two Factor Authentication
        </NavLink>
        <NavLink
          className="block py-2 px-4 hover:text-primary border-r"
          to="/admin/profile/change-password"
        >
          Change Password
        </NavLink>
      </div>
    </div>
  );
}
export default App;
