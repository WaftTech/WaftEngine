import React from 'react';
import Button from '@material-ui/core/Button';
import MaterialIcon from 'components/MaterialIcon';
import { notification } from 'antd';

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    icon: <MaterialIcon icon="insert_emoticon" className="text-primary" />
  });
};

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Customized Icon</div>
      <div className="box-body">
        <Button variant="contained" onClick={openNotification}>Open the notification box</Button>
      </div>
    </div>
  )
}

export default Box;