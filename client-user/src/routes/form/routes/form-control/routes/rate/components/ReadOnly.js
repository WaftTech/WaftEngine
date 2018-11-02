import React from 'react';
import { Rate } from 'antd';
import MaterialIcon from 'components/MaterialIcon';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Read only</div>
      <div className="box-body">
        <Rate character={<MaterialIcon icon="star" />} className="md-rate" disabled defaultValue={3} />
      </div>
    </div>
  )
}

export default Box;