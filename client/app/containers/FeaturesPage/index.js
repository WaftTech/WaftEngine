/**
 *
 * FeaturesPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import StaticContentDiv from '../../components/StaticContentDiv';

export const FeaturesPage = () => (
  <>
    <Helmet>
      <title>FeaturesPage</title>
      <meta name="description" content="Description of FeaturesPage" />
    </Helmet>
    <div className="container mx-auto">
      <StaticContentDiv contentKey="feature-page" />
    </div>
  </>
);

FeaturesPage.propTypes = {};

export default FeaturesPage;
