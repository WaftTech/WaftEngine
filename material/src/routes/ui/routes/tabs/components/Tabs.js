import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Simple from './Simple';
import Disabled from './Disabled';
import Scrollable from './Scrollable';
import IconTabs1 from './IconTabs1';
import IconTabs2 from './IconTabs2';


const Page = () => (
  <div className="chapter container-fluid container-mw-md no-breadcrumb">
    <article className="article">
      <h2 className="article-title page-title">Tabs</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div className="mb-4" key="1"><Simple /></div>
        <div className="mb-4" key="2"><Disabled /></div>
        <div className="mb-4" key="3"><Scrollable /></div>
        <div className="mb-4" key="4"><IconTabs1 /></div>
        <div className="mb-4" key="5"><IconTabs2 /></div>
      </QueueAnim>
    </article>
  </div>
)

export default Page;
