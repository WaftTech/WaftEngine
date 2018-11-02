import React from 'react';
import Button from '@material-ui/core/Button';

const Section = () => (
  <section className="hero text-center">
    <h1 className="hero-title">We're Hiring</h1>
    <p className="hero-lead">We’re a small startup, so everyone has a huge impact.</p>
    <Button variant ="contained" color="primary" className="btn-cta">See Openings</Button>
  </section>
)

export default Section;
