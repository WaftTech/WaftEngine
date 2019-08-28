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
import { Link } from 'react-router-dom';
import CategoryElement from '../../components/CategoryElement';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    const { classes, category } = this.props;

    return (
      <>
        <div className="container mx-auto pt-12 pb-12">
          <p className="">
            For Admin Login:
            <br />
            <Link className="text-blue-dark" to="/login-admin">
              /login-admin
            </Link>
          </p>
          <br />
          <br />
          <p className="">
            For Documentation:
            <br />
            <a
              className="text-blue-dark"
              target="_blank"
              rel="noopener"
              href="https://waftengine.org/documentation"
            >
              https://www.waftengine.org/documentation
            </a>
          </p>
          <br />
          <div>
            <CategoryElement cat_id="5d09d3c5ba5fe21594e59bb4" />
          </div>
        </div>
      </>
    );
  }
}
