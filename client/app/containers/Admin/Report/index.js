/*
 * Report
 */

import React from 'react';
import Helmet from 'react-helmet';
import StaticContentDiv from '../../../components/StaticContentDiv';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <title>Report</title>
        </Helmet>
        <div className="flex justify-between mt-3 mb-3">
          <div className="pageheader text-2xl my-auto">Report</div>
        </div>
        <div className="bg-white rounded py-5 px-5">
          <StaticContentDiv contentKey="report" />
        </div>
      </React.Fragment>
    );
  }
}
