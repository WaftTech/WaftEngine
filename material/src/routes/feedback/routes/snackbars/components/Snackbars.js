import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Customized from './Customized';
import Positioned from './Positioned';
import Transitions from './Transitions';

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-md chapter">
    <article className="article">
      <h2 className="article-title page-title">Snackbars</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-4"> <Positioned />  </div>
        <div key="2" className="mb-4"> <Transitions />  </div>
        <div key="3" className="mb-4"> <Customized />  </div>
      </QueueAnim>
    </article>
  </div>
)

export default Page;
