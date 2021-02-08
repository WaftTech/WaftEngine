/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Slicklider from '../../components/SlickSlider';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {

  state = { open: false };


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, category } = this.props;

    return (
      <>

        <Slicklider slideKey="homeSlider" />

      </>
    );
  }
}
