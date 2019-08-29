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
import StarIcon from '@material-ui/icons/star';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    const { classes, category } = this.props;

    return (
      <>
        <div className="container mx-auto pt-12 pb-12 overflow-hidden relative">

          <div className="absolute">
            <h1>Help this to grow</h1>
            <p className="my-4">You don't have to donate always. A Github star is enough for WaftEngine.</p>
            <a className="px-3 py-2 no-underline inline-flex items-center font-bold" href="https://github.com/wafttech/waftengine" target="_blank" style={{
              color: '#333',
              backgroundImage: 'linear-gradient(-180deg, #FAFBFC 0%, #EFF3F6 100%)',
              border: '1px solid #CDCFD0',
              borderRadius: 4
            }}><StarIcon /><span className="pl-2">Star</span></a>

          </div>
          <svg width="1440px" height="289px" viewBox="0 0 1440 289" version="1.1">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Desktop-HD" transform="translate(0.000000, -166.000000)" stroke="#FF3824" strokeWidth="2">
                <g id="Group" transform="translate(-31.000000, 167.000000)">
                  <path className="v3" d="M853,259.986114 C864.531931,260.005766 1523.59752,252.333027 1553.15137,252.333027 C1582.70523,252.333027 1601.21183,229.089577 1604.70523,223.000291 C1606.20818,220.380511 1567.70523,200.680387 1579.70523,187.340339 C1591.70523,174.000291 1620.70523,215.000291 1626.70523,200.000291 C1629.05155,194.134489 1592.70523,172.000291 1604.70523,163.000291 C1616.70523,154.000291 1647.92051,184.803919 1655.70523,177.890325 C1660.2024,173.896394 1665.93121,167.348953 1655.70523,150.000291 C1648.83178,138.339302 1645.70523,107.000291 1651.70523,90.0002911 C1663.46222,56.6887965 1701.70766,-0.148389187 1702.70523,0.000291117353 C1702.70523,3.63812804 1703.26771,29.1259883 1703.87509,57.0116917 C1703.91596,58.8880574 1704.19431,64.0142415 1704.24495,66.4874467 C1705.17965,112.141201 1705.9713,169.196615 1704.70523,177.890325 C1702.45491,193.3425 1669.70523,177.890325 1645.70523,208.000291 C1621.70523,238.110257 1604.70523,274.000291 1555.15137,274.000291 C1522.11547,274.000291 1288.06501,278.000291 853,286.000291" id="Path-Copy" transform="translate(1279.181231, 143.000146) scale(-1, 1) translate(-1279.181231, -143.000146) "></path>
                  <path className="v3" d="M0.637538415,260.986114 C12.1694695,261.005766 671.235055,253.333027 700.788909,253.333027 C730.342764,253.333027 748.849369,230.089577 752.342764,224.000291 C753.845719,221.380511 715.342764,201.680387 727.342764,188.340339 C739.342764,175.000291 768.342764,216.000291 774.342764,201.000291 C776.689085,195.134489 740.342764,173.000291 752.342764,164.000291 C764.342764,155.000291 795.558048,185.803919 803.342764,178.890325 C807.839936,174.896394 813.568751,168.348953 803.342764,151.000291 C796.469316,139.339302 793.342764,108.000291 799.342764,91.0002911 C811.099762,57.6887965 849.345202,0.851610813 850.342764,1.00029112 C850.342764,4.63812804 850.905245,30.1259883 851.512627,58.0116917 C851.553497,59.8880574 851.831852,65.0142415 851.882487,67.4874467 C852.81719,113.141201 853.608838,170.196615 852.342764,178.890325 C850.092447,194.3425 817.342764,178.890325 793.342764,209.000291 C769.342764,239.110257 752.342764,275.000291 702.788909,275.000291 C669.753006,275.000291 435.702549,279.000291 0.637538415,287.000291" id="Path-Copy-2"></path>
                </g>
              </g>
            </g>
          </svg>

          <div>
            <CategoryElement cat_id="5d09d3c5ba5fe21594e59bb4" />
          </div>
        </div>
      </>
    );
  }
}
