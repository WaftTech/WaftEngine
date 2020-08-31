import React from 'react';
import TwoFactor from '../Components/2FactorAuthentication';
import SideMenu from '../Components/SideMenu';

function App() {
  return (
    <div className="flex justify-between py-4">
      <div className="w-1/4 bg-white rounded shadow">
        <SideMenu />
      </div>
      <div className="w-3/4 bg-white rounded ml-2 p-4 shadow">
        <TwoFactor />
      </div>
    </div>
  );
}
export default App;
