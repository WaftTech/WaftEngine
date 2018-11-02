import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import ChipArray from './ChipArray';

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-md chapter">
    <article className="article">
      <h2 className="article-title page-title">Chips</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-4"> <Basic />  </div>
        <div key="2" className="mb-4"> <ChipArray />  </div>
      </QueueAnim>
    </article>
  </div>
)

export default Page;

