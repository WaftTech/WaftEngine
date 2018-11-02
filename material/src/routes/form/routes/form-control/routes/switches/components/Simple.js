import React from 'react';
import Switch from '@material-ui/core/Switch';

const Simple = () => (
  <div>
    <Switch defaultChecked value="checkedA" />
    <Switch defaultChecked value="checkedB" color="primary" />
    <Switch defaultChecked value="checkedC" color="default" />
    <Switch disabled value="checkedD" />
    <Switch disabled checked value="checkedE" />
  </div>
)

const Box = () => (
  <div className="box box-default">
    <div className="box-header">Basic</div>
    <div className="box-body">
      <Simple />
    </div>
  </div>
)

export default Box;

