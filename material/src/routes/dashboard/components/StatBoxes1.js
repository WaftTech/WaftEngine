import React from 'react';
import MaterialIcon from 'components/MaterialIcon';

const Statboxes = () => (
  <div className="row">
    <div className="col-xl-3 col-sm-6">
      <section className="number-card-v4 mdc-elevation--z1 mb-4">
        <div className="box-top">
          <div className="box-icon">
            <span className="icon-btn icon-btn-round bg-success text-white">
              <MaterialIcon icon="pageview" />
            </span>
          </div>
          <div className="box-info">
            <p className="info-desc">Visit Today</p>
            <p className="box-main-num">100k+</p>
          </div>
        </div>
        <div className="box-bottom">
          <div className="box-left">
            <p className="info-desc">Pages/Visit</p>
            <p className="text-success">8.55</p>
          </div>
          <div className="box-right">
            <p className="info-desc">% New Vist</p>
            <p className="text-success">56.23%</p>
          </div>
        </div>
      </section>
    </div>
    <div className="col-xl-3 col-sm-6">
      <section className="number-card-v4 mdc-elevation--z1 mb-4">
        <div className="box-top">
          <div className="box-icon">
            <span className="icon-btn icon-btn-round bg-info text-white">
              <MaterialIcon icon="people" />
            </span>
          </div>
          <div className="box-info">
            <p className="info-desc">% Unique Visitors</p>
            <p className="box-main-num">54.5%</p>
          </div>
        </div>
        <div className="box-bottom">
          <div className="box-left">
            <p className="info-desc">AVG Visit Duration (s)</p>
            <p className="text-info">9.60</p>
          </div>
        </div>
      </section>
    </div>
    <div className="col-xl-3 col-sm-6">
      <section className="number-card-v4 mdc-elevation--z1 mb-4">
        <div className="box-top">
          <div className="box-icon">
            <span className="icon-btn icon-btn-round bg-warning text-white">
              <MaterialIcon icon="attach_money" />
            </span>
          </div>
          <div className="box-info">
            <p className="info-desc">% Earning Growth</p>
            <p className="box-main-num">45.4%</p>
          </div>
        </div>
        <div className="box-bottom">
          <div className="box-left">
            <p className="info-desc">Last Week</p>
            <p className="text-warning">26.80%</p>
          </div>
          <div className="box-right">
            <p className="info-desc">Last Month</p>
            <p className="text-warning">39.33%</p>
          </div>
        </div>
      </section>
    </div>
    <div className="col-xl-3 col-sm-6">
      <section className="number-card-v4 mdc-elevation--z1 mb-4">
        <div className="box-top">
          <div className="box-icon">
            <span className="icon-btn icon-btn-round bg-primary text-white">
              <MaterialIcon icon="shopping_cart" />
            </span>
          </div>
          <div className="box-info">
            <p className="info-desc">% Sales Growth</p>
            <p className="box-main-num">25.5%</p>
          </div>
        </div>
        <div className="box-bottom">
          <div className="box-left">
            <p className="info-desc">Last Week</p>
            <p className="text-primary">16.50%</p>
          </div>
          <div className="box-right">
            <p className="info-desc">Last Month</p>
            <p className="text-primary">29.00%</p>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default Statboxes;
