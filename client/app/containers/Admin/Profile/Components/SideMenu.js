import React from 'react';
import { NavLink } from 'react-router-dom';

function App() {
  return (
    <div className="p-4">
      <h2 className="text-2xl  font-bold">Profile</h2>
      <NavLink className="block" to="/admin/profile">
        Information
      </NavLink>
      <NavLink className="block" to="/admin/profile/change-password">
        Change Password
      </NavLink>
    </div>
  );
}
export default App;
