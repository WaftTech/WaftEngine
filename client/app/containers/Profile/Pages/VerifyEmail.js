import React from 'react';
import SideMenu from '../Components/SideMenu';
import VerifyEmail from '../Components/VerifyEmail';

function App() {
  return (
    <div className="flex justify-between py-4 container mx-auto">
      <div className="w-1/4 bg-white rounded shadow">
        <SideMenu />
      </div>
      <div className="w-3/4 bg-white rounded ml-2 p-4 shadow">
        <VerifyEmail />
      </div>
    </div>
  );
}
export default App;
