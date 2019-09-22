import React from 'react';
import ChangePassword from '../Components/ChangePassword';
import SideMenu from '../Components/SideMenu';

function App() {
  return (
    <div className="flex justify-between py-4">
      <div className="w-1/4 bg-white rounded shadow">
        <SideMenu />
      </div>
      <div className="w-3/4 bg-white rounded ml-2 p-4 shadow">
        <ChangePassword />
      </div>
    </div>
  );
}
export default App;
