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

  const camelCaseKey =
    key[0].toUpperCase() +
    key
      .slice(1)
      .split('-')
      .join(' ');
  return (
    <React.Fragment>
      <Helmet>
        <title>{camelCaseKey}</title>
      </Helmet>
      <div className="container p-5">
        <StaticContentDiv contentKey={key} />
      </div>
    </React.Fragment>
  );
};

export default StaticPage;
