import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Simple from './Simple';
import Positioned from './Positioned';

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-md chapter">
    <article className="article">
      <h2 className="article-title">Material Tooltips</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-4"> <Simple /> </div>
        <div key="2" className="mb-4"> <Positioned /> </div>
      </QueueAnim>
    </article>
  </div>
)

export default Page;