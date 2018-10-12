import React from 'react';
import Header from './Header';
import Footer from './Footer';

const UserLayout = props => (
  <React.Fragment>
    <Header />
    {props.children}
    <Footer />
  </React.Fragment>
);

export default UserLayout;
