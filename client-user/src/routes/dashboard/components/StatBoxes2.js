import React from 'react';
import MaterialIcon from 'components/MaterialIcon';

const Statboxes = () => (
  <div className="row">
    <div className="col-xl-3 col-sm-6">
      <div className="number-card-v1 border-0 mdc-elevation--z1 mb-4">
        <div className="card-top">
          <span>35<span className="size-h5">%</span></span>
        </div>
        <div className="card-info">
          <span>Growth</span>
        </div>
        <div className="card-bottom">
          <MaterialIcon icon="airplanemode_active" className="text-success" />
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6">
      <div className="number-card-v1 border-0 mdc-elevation--z1 mb-4">
        <div className="card-top">
          <MaterialIcon icon="supervisor_account" className="text-info" />
        </div>
        <div className="card-info">
          <span>New Users</span>
        </div>
        <div className="card-bottom">
          <span>42<span className="size-h5">%</span></span>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6">
      <div className="number-card-v1 border-0 mdc-elevation--z1 mb-4">
        <div className="card-top">
          <span>37<span className="size-h5">k</span></span>
        </div>
        <div className="card-info">
          <span>Profit</span>
        </div>
        <div className="card-bottom">
          <MaterialIcon icon="attach_money" className="text-warning" />
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6">
      <div className="number-card-v1 border-0 mdc-elevation--z1 mb-4">
        <div className="card-top">
          <MaterialIcon icon="shopping_cart" className="text-danger" />
        </div>
        <div className="card-info">
          <span>Sales</span>
        </div>
        <div className="card-bottom">
          <span>25<span className="size-h5">k</span></span>
        </div>
      </div>
    </div>
  </div>
);

export default Statboxes;
