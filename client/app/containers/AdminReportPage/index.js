/*
 * Report
 */

import React from 'react';
import StaticContentDiv from '../../components/StaticContentDiv';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className="container mx-auto">
          <StaticContentDiv contentKey="report" />
        </div>
      </React.Fragment>
    );
  }
}
