import React from 'react';
import QueueAnim from 'rc-queue-anim';
import CustomPaginationActionsTable from './CustomPaginationActionsTable';
import SortingSelecting from './SortingSelecting';

const Page = () => (
  <div className="container-fluid container-mw-xl chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1" className="article__section"><SortingSelecting /></div>
      <div key="2" className="article__section"><CustomPaginationActionsTable /></div>
    </QueueAnim>
  </div>
);

export default Page;
