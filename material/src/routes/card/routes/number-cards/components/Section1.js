import React from 'react';
import MaterialIcon from 'components/MaterialIcon';

const Section = () => (
  <article className="article">
    <h2 className="article-title">Number Cards <div className="badge badge-pill">v1</div></h2>

    <div className="row">
      <div className="col-xl-3">
        <div className="number-card-v1 border-0 mdc-elevation--z1 mb-4">
          <div className="card-top">
            <span>35<span className="h5">%</span></span>
          </div>
          <div className="card-info">
            <span>Profit</span>
          </div>
          <div className="card-bottom">
            <MaterialIcon icon="bar_chart" className="text-info" />
          </div>
        </div>
      </div>

      <div className="col-xl-3">
        <div className="number-card-v1 border-0 mdc-elevation--z1 mb-4">
          <div className="card-top">
            <MaterialIcon icon="group_add" className="text-success" />
          </div>
          <div className="card-info">
            <span>New Users</span>
          </div>
          <div className="card-bottom">
            <span>42<span className="h5">%</span></span>
          </div>
        </div>
      </div>

      <div className="col-xl-3">
        <div className="number-card-v1 border-0 mdc-elevation--z1 mb-4">
          <div className="card-top">
            <span>25<span className="h5">k</span></span>
          </div>
          <div className="card-info">
            <span>Sales</span>
          </div>
          <div className="card-bottom">
            <MaterialIcon icon="attach_money" className="text-warning" />
          </div>
        </div>
      </div>

      <div className="col-xl-3">
        <div className="number-card-v1 border-0 mdc-elevation--z1 mb-4">
          <div className="card-top">
            <MaterialIcon icon="airplanemode_active" className="text-danger" />
          </div>
          <div className="card-info">
            <span>Growth</span>
          </div>
          <div className="card-bottom">
            <span>55<span className="h5">%</span></span>
          </div>
        </div>
      </div>
    </div>

  </article>
)

export default Section;
