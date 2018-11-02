import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Temporary from './Temporary';

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-md chapter">
    <article className="article">
      <h2 className="article-title page-title">Drawer</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3"> <Temporary />  </div>
      </QueueAnim>
    </article>
  </div>
)

export default Page;
