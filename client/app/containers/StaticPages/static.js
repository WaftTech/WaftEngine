/*
 * Static
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import StaticContentDiv from '../../components/StaticContentDiv';
import { Route } from 'react-router-dom';

const StaticPage = props => {
  const key = props.match.params.key;
  console.log(key, 'match', props.match);

  return (
    <React.Fragment>
      <Helmet>
        <title>{key}</title>
      </Helmet>
      <div className="container p-5">
        <StaticContentDiv contentKey={key} />
      </div>
    </React.Fragment>
  );
};

StaticPage.propTypes = {
  title: PropTypes.string.isRequired,
  contentKey: PropTypes.string.isRequired,
};

export default StaticPage;
