import React from 'react';
import { Rate } from 'antd';
import MaterialIcon from 'components/MaterialIcon';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Basic</div>
      <div className="box-body">
        <Rate character={<MaterialIcon icon="star" />} className="md-rate" />
        <br />
        <Rate character={<MaterialIcon icon="star" />} className="md-rate" allowHalf defaultValue={3.5} />
      </div>
    </div>
  )
}

export default Box;