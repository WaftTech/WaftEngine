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

          <svg width="823px" height="288px" viewBox="0 0 823 288" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g className="v3" id="Desktop-HD" transform="translate(0.000000, -167.000000)" stroke="#FF3824" stroke-width="2">
                <path d="M-30.3624616,427.986114 C-18.8305305,428.005766 640.235055,420.333027 669.788909,420.333027 C699.342764,420.333027 717.849369,397.089577 721.342764,391.000291 C722.845719,388.380511 684.342764,368.680387 696.342764,355.340339 C708.342764,342.000291 737.342764,383.000291 743.342764,368.000291 C745.689085,362.134489 709.342764,340.000291 721.342764,331.000291 C733.342764,322.000291 764.558048,352.803919 772.342764,345.890325 C776.839936,341.896394 782.568751,335.348953 772.342764,318.000291 C765.469316,306.339302 762.342764,275.000291 768.342764,258.000291 C780.099762,224.688796 818.345202,167.851611 819.342764,168.000291 C819.342764,171.638128 819.905245,197.125988 820.512627,225.011692 C820.553497,226.888057 820.831852,232.014241 820.882487,234.487447 C821.81719,280.141201 822.608838,337.196615 821.342764,345.890325 C819.092447,361.3425 786.342764,345.890325 762.342764,376.000291 C738.342764,406.110257 721.342764,442.000291 671.788909,442.000291 C638.753006,442.000291 404.702549,446.000291 -30.3624616,454.000291" id="Path-Copy-2"></path>
              </g>
            </g>
          </svg>


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
