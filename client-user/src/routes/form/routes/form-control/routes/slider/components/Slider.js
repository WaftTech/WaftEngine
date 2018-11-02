import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Basic from './Basic';
import WithSteps from './WithSteps';
import Disabled from './Disabled';
import Reverse from './Reverse';
import Vertical from './Vertical';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <article className="article demo-style-slider">
        <h2 className="article-title page-title">Slider</h2>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1" className="mb-3"> <Basic /> </div>
          <div key="2" className="mb-3"> <WithSteps /> </div>
          <div key="3" className="mb-3"> <Disabled /> </div>
          <div key="4" className="mb-3"> <Vertical /> </div>
          <div key="5" className="mb-3"> <Reverse /> </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;