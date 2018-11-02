import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Shadow from './Shadow';
import './styles.scss';

const Intro = () => (
  <div className="row">
    <div className="col-xl-4">
      <p>Elevation is the relative distance between two surfaces along the z-axis.</p>
      <p>Elevation in Material Design is measured as the distance between Material surfaces. The distance from the front of one Material surface to the front of another is measured along the z-axis in density-independent pixels (dps) and depicted (by default) using <strong>shadows</strong></p>
    </div>
    <div className="col-xl-8">
      <img src="assets/md/baselineelevation-chart.png" alt="" className="img-fluid" />
    </div>
  </div>
)

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-lg chapter">
    <article className="article">
      <h2 className="article-title page-title">Elevation</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="2" className="mb-3"> <Intro />  </div>
        <div key="1" className="mb-3"> <Shadow />  </div>
      </QueueAnim>
    </article>
  </div>
)

export default Page;
