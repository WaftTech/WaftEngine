import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Simple from './Simple';
import Inset from './Inset';
import Folder from './Folder';
import Nested from './Nested';
import ListControlsCheckbox from './ListControlsCheckbox';
import ListControlsSwitch from './ListControlsSwitch';
import PinnedSubheader from './PinnedSubheader';
import Interactive from './Interactive';


const Lists = () => (
  <div className="container-fluid container-mw-xl chapter">
    <article className="article">
      <h2 className="article-title page-title">Lists</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-4">
          <Interactive />
        </div>
        <div key="2">
          <div className="row">

            <div className="col-xl-4 mb-4">
              <Simple />
            </div>
            <div className="col-xl-4 mb-4">
              <Folder />
            </div>
            <div className="col-xl-4 mb-4">
              <Inset />
            </div>

            <div className="col-xl-4 mb-4">
              <ListControlsCheckbox />
              <ListControlsSwitch />
            </div>
            <div className="col-xl-4 mb-4">
              <PinnedSubheader />
            </div>
            <div className="col-xl-4 mb-4">
              <Nested />
            </div>

          </div>
        </div>
      </QueueAnim>
    </article>
  </div>
);

export default Lists;
