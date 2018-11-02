import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Light from './Light';
import Dark from './Dark';


const Page = () => {
  return(
    <div className="container-fluid no-breadcrumb container-mw-lg chapter">
      <article className="article">
        <h2 className="article-title">Sidenav Menu</h2>
        <QueueAnim type="bottom" className="ui-animate row">
          <div key="1" className="mb-4 col-md-6"> <Light /> </div>
          <div key="2" className="mb-4 col-md-6"> <Dark /> </div>
        </QueueAnim>
      </article>
    </div>
  )
}

export default Page;
