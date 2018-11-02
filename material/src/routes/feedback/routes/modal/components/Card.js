import React from 'react';
import Button from '@material-ui/core/Button';

const Card = () => (
  <article className="img-card-v2 mb-4" style={{height: '400px'}}>
    <div className="img-card__cover" style={{backgroundImage: "url('assets/images-demo/covers/luca-bravo-198062-unsplash-mirror.jpg')"}}></div>
    <div className="img-card__body img-card__body--left">
      <h2 className="img-card__title">Limited Offer!</h2>
      <p className="img-card__desc lead mb-4">Hurry, take advantage of our best offer ever. Become a great designer | Enroll today & get 50% off!‎</p>
      <Button variant="contained" color="primary" className="btn-cta">Learn More</Button>
    </div>
  </article>
)

export default Card;

