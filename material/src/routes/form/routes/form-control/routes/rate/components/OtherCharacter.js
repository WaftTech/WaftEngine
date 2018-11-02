import React from 'react';
import { Rate } from 'antd';
import MaterialIcon from 'components/MaterialIcon';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Other Character</div>
      <div className="box-body">
        <Rate character={<MaterialIcon icon="favorite" />} className="md-rate" allowHalf />
        <br />
        <Rate character="A" allowHalf style={{ fontSize: 36 }} />
      </div>
    </div>
  )
}

export default Box;