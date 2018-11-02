import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Section from './Section';

const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-md chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="article__section"> <Section /> </div>
      </QueueAnim>
    </div>
  );
}

export default Page;
