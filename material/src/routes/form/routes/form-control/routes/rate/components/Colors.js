import React from 'react';
import { Rate } from 'antd';
import MaterialIcon from 'components/MaterialIcon';

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Colors</div>
      <div className="box-body">
        <Rate character={<MaterialIcon icon="star" />} className="md-rate" defaultValue={3} />
        <br/>
        <Rate character={<MaterialIcon icon="favorite" />} className="md-rate text-danger" defaultValue={3} />
        <br/>
        <Rate character={<MaterialIcon icon="offline_bolt" />} className="md-rate text-success" defaultValue={3} />
        <br/>
        <Rate character={<MaterialIcon icon="thumb_up" />} className="md-rate text-primary" defaultValue={3} />
        <br/>
        <Rate character={<MaterialIcon icon="turned_in" />} className="md-rate text-info" defaultValue={3} />
        <br/>
        <Rate character={<MaterialIcon icon="opacity" />} className="md-rate text-dark" defaultValue={3} />
      </div>
    </div>
  )
}

export default Box;