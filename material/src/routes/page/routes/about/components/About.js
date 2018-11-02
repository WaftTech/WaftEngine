import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Hero from './Hero';
import OutlinedButton from 'components/OutlinedButton';
import './styles.scss';


const Info = () => (
  <div>
  <div className="container-fluid container-mw-xxl">
    <article className="article">
      <div className="row stat-container">
        <div className="col-md-4">
          <section className="stat-item">
            <span className="stat-num">10</span>
            <span className="stat-desc">Years Experience</span>
          </section>
        </div>
        <div className="col-md-4">
          <section className="stat-item">
            <span className="stat-num">10K+</span>
            <span className="stat-desc">Satisfied Clients</span>
          </section>
        </div>
        <div className="col-md-4">
          <section className="stat-item">
            <span className="stat-num">12</span>
            <span className="stat-desc">Kinds of Products</span>
          </section>
        </div>
      </div>
    </article>
  </div>

  <div className="container-fluid container-mw-xxl">
    <section className="row info-container">
      <div className="col-md-6 mb-5">
        <h2><strong>Who</strong> We are?</h2>
        <p className="lead">Consectetur adipisicing elit. Molestias,  quaerat facilis rem aut sunt iusto deleniti fugiat dolor culpa aliquam quasi.</p>
        <p className="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, doloribus, debitis accusantium beatae a aspernatur esse fugit laboriosam cumque minus quia consequuntur error commodi cum consectetur ea officia eveniet reprehenderit quas nesciunt. Reprehenderit voluptatem tempore architecto quidem nobis saepe neque.</p>
        <OutlinedButton className="btn-w-md"> Join Us </OutlinedButton>
      </div>
      <div className="col-md-6 mb-5">
        <h2><strong>What</strong> do We do?</h2>
        <p className="lead">Vero, praesentium perspiciatis, ratione, nisi, reiciendis illo est veniam! Provident nihil eius velit labore odio earum quos in.</p>
        <p className="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, doloribus, debitis accusantium beatae a aspernatur esse fugit laboriosam cumque minus quia consequuntur error commodi cum consectetur ea officia eveniet reprehenderit quas nesciunt. Reprehenderit voluptatem tempore architecto quidem nobis saepe neque.</p>
        <OutlinedButton className="btn-w-md"> Contact Us </OutlinedButton>
      </div>
    </section>
  </div>
  </div>
);

const Culture = () => (
  <article className="article article-bordered section-culture">
    <div className="container-fluid container-mw-xxl">
      <div className="row">
        <div className="col-xl-3">
          <h2 className="section-title mt-0">OUR CULTURE</h2>
        </div>
        <div className="col-xl-9">
          <div className="row">
            <div className="col-xl-4">
              <p><span className="space-bar bg-primary" /><strong>Strong sense of purpose</strong> <br />We want to help everyone build their sites better and easier.</p>
            </div>
            <div className="col-xl-4">
              <p><span className="space-bar bg-info" /><strong>Relentless focus on success</strong> <br />Get rid of your excuses. Take pride in getting shit done.</p>
            </div>
            <div className="col-xl-4">
              <p><span className="space-bar bg-success" /><strong>New ideas on how to do things better</strong> <br />Question everything. Don't fall into the status-quo trap. Innovate!</p>
            </div>
          </div>
          <div className="divider my-4" />
          <div className="row">
            <div className="col-xl-4">
              <p><span className="space-bar bg-warning" /><strong>High bar for quality</strong> <br />We're obsessed with building the best and always see room for improvement.</p>
            </div>
            <div className="col-xl-4">
              <p><span className="space-bar bg-danger" /><strong>Embrace the challenge</strong> <br />Uncertainty is always part of a startup. We tackle big ideas with courage.</p>
            </div>
            <div className="col-xl-4">
              <p><span className="space-bar bg-dark" /><strong>Simplify</strong> <br />To create the best experience, we cut all distractions and get to the point.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </article>
);

const About = () => (
  <section className="page-about chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Hero /></div>
      <div key="2"><Info /></div>
      <div key="3"><Culture /></div>
    </QueueAnim>
  </section>
);

export default About;
