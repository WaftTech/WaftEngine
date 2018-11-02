import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Downshift from './Downshift';

const AutoCompleteSection = () => (
  <div className="container-fluid no-breadcrumb container-mw-md chapter">
    <article className="article">
      <h2 className="article-title page-title">Autocomplete</h2>

      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-4"> <Downshift /> </div>
      </QueueAnim>
    </article>
  </div>
);

export default AutoCompleteSection;
