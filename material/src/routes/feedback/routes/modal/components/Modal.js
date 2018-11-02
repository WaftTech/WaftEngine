import React from 'react';
import QueueAnim from 'rc-queue-anim';
import ModalDialog from './ModalDialog';
import CustomModalExamples from './CustomModalExamples';
import CustomPosition from './CustomPosition';

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-md chapter">
    <article className="article">
      <h2 className="article-title page-title">Modal</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div className="mb-4" key="1"> <CustomModalExamples /> </div>
        <div className="mb-4" key="2"> <ModalDialog /> </div>
        <div className="mb-4" key="3"> <CustomPosition /> </div>
      </QueueAnim>
    </article>
  </div>
)

export default Page;