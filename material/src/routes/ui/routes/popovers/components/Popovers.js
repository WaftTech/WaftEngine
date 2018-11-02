import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Playground from './Playground';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-lg chapter demo-style-popover">
      <article className="article">
        <h2 className="article-title page-title">Popover</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3">
            <Playground />
          </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;