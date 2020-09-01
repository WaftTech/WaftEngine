import React from 'react';
import TwoFactor from '../Components/2FactorAuthentication';
import SideMenu from '../Components/SideMenu';

function App() {
  return (
    <div className="bg-white p-4 pl-0">
      <SideMenu />
      <TwoFactor />
    </div>
  );
}
export default App;
