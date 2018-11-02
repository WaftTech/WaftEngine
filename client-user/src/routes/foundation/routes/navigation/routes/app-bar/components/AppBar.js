import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Simple from './Simple';
import WithButtons from './WithButtons';
import WithMenu from './WithMenu';

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-md chapter">
    <article className="article">
      <h2 className="article-title page-title">App Bar</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-4"> <Simple />  </div>
        <div key="2" className="mb-4"> <WithButtons />  </div>
        <div key="3" className="mb-4"> <WithMenu />  </div>
      </QueueAnim>
    </article>
  </div>
)

export default Page;
