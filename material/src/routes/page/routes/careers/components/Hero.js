import React from 'react';
import Button from '@material-ui/core/Button';
import APPCONFIG from 'constants/appConfig';

const Section = () => (
  <section className="hero px-3 text-center">
    <div className="hero-bg-img" style={{backgroundImage: 'url(assets/images-demo/covers/christopher-burns-435998-unsplash.jpg)'}}></div>
    <div className="hero-inner">
      <h1 className="hero-title">Careers at {APPCONFIG.brand}</h1>
      <p className="hero-lead">We’re a small startup, so everyone has a huge impact.</p>
      <div className="hero-cta">
        <Button variant ="contained" color="secondary" className="btn-cta">See Openings</Button>
      </div>
    </div>
  </section>
)

export default Section;
