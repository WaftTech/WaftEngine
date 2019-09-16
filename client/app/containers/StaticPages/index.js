/*
 * Static
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import StaticContentDiv from '../../components/StaticContentDiv';

const StaticPage = props => (
  <React.Fragment>
    <Helmet>
      <title>{props.title}</title>
    </Helmet>
    <div className="container p-5">
      <StaticContentDiv contentKey={props.contentKey} />
    </div>
  </React.Fragment>
);

StaticPage.propTypes = {
  title: PropTypes.string.isRequired,
  contentKey: PropTypes.string.isRequired,
};

export default StaticPage;
