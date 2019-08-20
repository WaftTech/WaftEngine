/*
 * AboutUs
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import StaticContentDiv from '../../components/StaticContentDiv';

const AboutUsPage = () => (
  <React.Fragment>
    <Helmet>
      <title>About US</title>
    </Helmet>
    <div className="container mx-auto">
      <StaticContentDiv contentKey="aboutusheader" />
    </div>
  </React.Fragment>
);

export default AboutUsPage;
