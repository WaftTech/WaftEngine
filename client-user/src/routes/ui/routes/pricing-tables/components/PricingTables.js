import React from 'react';
import QueueAnim from 'rc-queue-anim';
import DEMO from 'constants/demoData';
import Button from '@material-ui/core/Button';

const PricingTables = () => (
  <div>
    <div className="divider my-4" />
    <div className="row">
      <div className="col-md-3 col-xsm-6">
        <section className="pricing-table pricing-table-primary">
          <header><h2>Free</h2></header>
          <p className="pricing-price"><span className="pricing-sign">$</span>0.00<span className="pricing-sub">/mo</span></p>
          <div className="pricing-plan-details">
            <p className="pricing-lead">Including</p>
            <ul>
              <li>No Support</li>
              <li>1 Website</li>
              <li>10GB Disk Space</li>
              <li>3 Database</li>
              <li>1 Email Address</li>
            </ul>
          </div>
          <footer><Button href={DEMO.link} className="text-primary">Buy now</Button></footer>
        </section>
      </div>

      <div className="col-md-3 col-xsm-6">
        <section className="pricing-table pricing-table-success">
          <header><h2>Basic</h2></header>
          <p className="pricing-price"><span className="pricing-sign">$</span>29.00<span className="pricing-sub">/mo</span></p>
          <div className="pricing-plan-details">
            <p className="pricing-lead">Including</p>
            <ul>
              <li>24/7 Support</li>
              <li>1 Website</li>
              <li>100GB Disk Space</li>
              <li>10 Database</li>
              <li>10 Email Address</li>
            </ul>
          </div>
          <footer><Button href={DEMO.link} className="text-success">Get it now</Button></footer>
        </section>
      </div>

      <div className="col-md-3 col-xsm-6">
        <section className="pricing-table pricing-table-warning">
          <header> <h2>Standard</h2> </header>
          <p className="pricing-price"><span className="pricing-sign">$</span>39.00<span className="pricing-sub">/mo</span></p>
          <div className="pricing-plan-details">
            <p className="pricing-lead">Including</p>
            <ul>
              <li>24/7 Support</li>
              <li>Unlimited Website</li>
              <li>500GB Disk Space</li>
              <li>25 Database</li>
              <li>50 Email Address</li>
            </ul>
          </div>
          <footer><Button href={DEMO.link} className="text-warning">Get it now</Button></footer>
        </section>
      </div>

      <div className="col-md-3 col-xsm-6">
        <section className="pricing-table pricing-table-danger">
          <header> <h2>Ultimate</h2> </header>
          <p className="pricing-price"><span className="pricing-sign">$</span>99.00<span className="pricing-sub">/mo</span></p>
          <div className="pricing-plan-details">
            <p className="pricing-lead">Including</p>
            <ul>
              <li>24/7 Support</li>
              <li>Unlimited Website</li>
              <li>Unlimited Disk Space</li>
              <li>Unlimited Database</li>
              <li>100 Email Address</li>
            </ul>
          </div>
          <footer><Button href={DEMO.link} className="text-danger">Get it now</Button></footer>
        </section>
      </div>
    </div>

    <div className="row">
      <div className="col-md-3 col-xsm-6">
        <section className="pricing-table pricing-table-info">
          <header><h2>Basic</h2></header>
          <p className="pricing-price"><span className="pricing-sign">$</span>29.00<span className="pricing-sub">/mo</span></p>
          <div className="pricing-plan-details">
            <p className="pricing-lead">Including</p>
            <ul>
              <li>24/7 Support</li>
              <li>1 Website</li>
              <li>100GB Disk Space</li>
              <li>10 Database</li>
              <li>10 Email Address</li>
            </ul>
          </div>
          <footer><Button href={DEMO.link} className="text-info">Get it now</Button></footer>
        </section>
      </div>

      <div className="col-md-3 col-xsm-6">
        <section className="pricing-table">
          <header> <h2>Standard</h2> </header>
          <p className="pricing-price"><span className="pricing-sign">$</span>39.00<span className="pricing-sub">/mo</span></p>
          <div className="pricing-plan-details">
            <p className="pricing-lead">Including</p>
            <ul>
              <li>24/7 Support</li>
              <li>Unlimited Website</li>
              <li>500GB Disk Space</li>
              <li>25 Database</li>
              <li>50 Email Address</li>
            </ul>
          </div>
          <footer><Button href={DEMO.link}>Get it now</Button></footer>
        </section>
      </div>
    </div>
  </div>
);

const Page = () => (
  <section className="container-fluid no-breadcrumb container-mw-xxl chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><PricingTables /></div>
    </QueueAnim>
  </section>
);

export default Page;
