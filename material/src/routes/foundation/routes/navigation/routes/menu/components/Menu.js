import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Simple from './Simple';
import Selected from './Selected';
import MaxHeight from './MaxHeight';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article">
        <h2 className="article-title page-title">Menu</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-4"> <Simple /> </div>
          <div key="2" className="mb-4"> <Selected /> </div>
          <div key="3" className="mb-4"> <MaxHeight /> </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;