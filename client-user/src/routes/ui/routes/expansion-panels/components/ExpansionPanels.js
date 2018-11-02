import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Accordion from './Accordion';
import Simple from './Simple';

const Section = () => (
  <div className="container-fluid no-breadcrumb container-mw-md chapter">
    <article className="article">
      <h2 className="article-title page-title">Expansion Panels</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3"> <Simple /> </div>
        <div key="2" className="mb-3"> <Accordion /> </div>
      </QueueAnim>
    </article>
  </div>
)

export default Section;
