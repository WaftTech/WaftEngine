import React from 'react';
import APPCONFIG from 'constants/appConfig';
import Button from '@material-ui/core/Button';

const Cover = () => (
  <section className="cover cover-color-reverse text-center py-8">
    <div className="cover-bg-img overlay" style={{backgroundImage: 'url(assets/images-demo/covers/christopher-burns-435998-unsplash.jpg)'}}></div>
    <div className="container">
      <div className="row">
        <div className="col-md-7 col-lg-6 mx-auto">
          <h1><span className="bold">100+</span> Components</h1>
          <p className="lead">{APPCONFIG.brand} admin is a multi-purpose template which comes with a huge collection of components out of box.</p>
          <Button variant="contained" color="primary" className="btn-cta">Try it Now</Button>
        </div>
      </div>
    </div>
  </section>
);


const Section = () => (
  <article className="article">
    <div className="container-fluid container-mw-xl">
      <h2 className="article-title">Centered</h2>
    </div>

    <Cover />
  </article>
)

export default Section;
