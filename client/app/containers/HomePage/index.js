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
import Dialog from '../../components/Dialog/index';


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

        <button
          type="button"
          className="bg-primary text-white p-2"
          onClick={this.handleOpen}
        >
          Show Dialog
          </button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          title={`Demo Dialog`}
          body={
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          }
          actions={
            <button
              type="button"
              className="block btn margin-none text-white bg-red-500 border border-red-600 hover:bg-red-600"
              onClick={this.handleClose}
            >
              Close
            </button>
          }
        />
      </>
    );
  }
}
