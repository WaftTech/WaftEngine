import React from 'react';
import QueueAnim from 'rc-queue-anim';
import SimpleSelect from './SimpleSelect';
import NativeSelect from './NativeSelect';
import MultipleSelect from './MultipleSelect';

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-md chapter">
    <article className="article">
      <h2 className="article-title page-title">Selects</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-4"> <SimpleSelect />  </div>
        <div key="2" className="mb-4"> <NativeSelect />  </div>
        <div key="3" className="mb-4"> <MultipleSelect />  </div>
      </QueueAnim>
    </article>
  </div>
)

export default Page;

