import React from 'react';
import QueueAnim from 'rc-queue-anim';
import CircularDeterminate from './CircularDeterminate';
import CircularIndeterminate from './CircularIndeterminate';
import CircularStatic from './CircularStatic';
import InteractiveIntegration from './InteractiveIntegration';
import LinearBuffer from './LinearBuffer';
import LinearDeterminate from './LinearDeterminate';
import LinearIndeterminate from './LinearIndeterminate';
import LinearQuery from './LinearQuery';

const Section1 = () => (
  <section className="box box-default">
    <div className="box-header">Circular</div>
    <div className="box-body py-5">
      <CircularIndeterminate />
      <InteractiveIntegration />
      <CircularDeterminate />
      <CircularStatic />
    </div>
  </section>
)

const Section2 = () => (
  <section className="box box-default">
    <div className="box-header">Linear</div>
    <div className="box-body py-5">
      <LinearIndeterminate />
      <LinearDeterminate />
      <LinearBuffer />
      <LinearQuery />
    </div>
  </section>
)

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-md chapter">
    <article className="article demo-style-progress">
      <h2 className="article-title page-title">Progress</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-3"> <Section1 /> </div>
        <div key="2" className="mb-3"> <Section2 /> </div>
      </QueueAnim>
    </article>
  </div>
)


export default Page;
