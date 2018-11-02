import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Simple from './Simple';
import Alerts from './Alerts';
import AlertsSlide from './AlertsSlide';
import Fullscreen from './Fullscreen';
import ScrollingLongContent from './ScrollingLongContent';

const AlertSection = () => (
  <section className="box box-default">
    <div className="box-header">Alerts</div>
    <div className="box-body">
      <Alerts />
      <AlertsSlide />
    </div>
  </section>
)


const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-md chapter">
    <article className="article">
      <h2 className="article-title page-title">Dialog</h2>

      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-4"><Simple /></div>
        <div key="2" className="mb-4"><AlertSection /></div>
        <div key="3" className="mb-4"><Fullscreen /></div>
        <div key="4" className="mb-4"><ScrollingLongContent /></div>
      </QueueAnim>

    </article>
  </div>
);

export default Page;
