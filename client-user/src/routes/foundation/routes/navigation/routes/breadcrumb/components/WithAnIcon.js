import React from 'react';
import { Breadcrumb } from 'antd';
import MaterialIcon from 'components/MaterialIcon';
import DEMO from 'constants/demoData';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">With an Icon</div>
      <div className="box-body">
        <Breadcrumb className="md-breadcrumb">
          <Breadcrumb.Item href={DEMO.link}>
            <MaterialIcon icon="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item href={DEMO.link}>
            <MaterialIcon icon="person_outline" />
            <span>Application List</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Application
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  )
}

export default Box;