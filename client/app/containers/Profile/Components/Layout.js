import React from 'react';
import SideMenu from './SideMenu';

function Layout(props) {
  return (
    <div className="flex justify-between py-4 container mx-auto">
      <div className="w-1/4 bg-white rounded shadow">
        <SideMenu />
      </div>
      <div className="w-3/4 bg-white rounded ml-2 p-4 shadow">
        {props.children}
      </div>
    </div>
  );
}
export default Layout;
