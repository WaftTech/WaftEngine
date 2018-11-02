import React from 'react';
import QueueAnim from 'rc-queue-anim';
import HorizontalLinear from './HorizontalLinear';
import VerticalLinear from './VerticalLinear';
import HonrizontalNonLinear from './HonrizontalNonLinear';
import './styles.scss';


const Stepper = () => (
  <div className="container-fluid container-mw-xl chapter">
    <article className="article">
      <h2 className="article-title">Steppers</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-5"><HorizontalLinear /></div>
        <div key="2" className="mb-5"><VerticalLinear /></div>
        <div key="3" className="mb-5"><HonrizontalNonLinear /></div>
      </QueueAnim>
    </article>
  </div>
);

export default Stepper;
