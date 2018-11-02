import React from 'react';
import Button from '@material-ui/core/Button';
import MaterialIcon from 'components/MaterialIcon';
import { notification } from 'antd';

const openNotificationWithIcon = (type) => {
  switch(type) {
    case 'success':
      notification.open({
        message: 'Notification Title',
        description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        icon: <MaterialIcon icon="check_circle" className="text-success" />
      });
      break;
    case 'warning':
      notification.open({
        message: 'Notification Title',
        description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        icon: <MaterialIcon icon="warning" className="text-warning" />
      });
      break;
    case 'error':
      notification.open({
        message: 'Notification Title',
        description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        icon: <MaterialIcon icon="error" className="text-danger" />
      });
      break;
    default:
      notification.open({
        message: 'Notification Title',
        description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        icon: <MaterialIcon icon="info" className="text-info" />
      });
  }

};

const Box = () => {
  return(
    <div className="box box-default demo-style-button">
      <div className="box-header">Notification with icon</div>
      <div className="box-body">
        <Button className="text-success mr-1" onClick={() => openNotificationWithIcon('success')}>Success</Button>
        <Button className="text-info mr-1" onClick={() => openNotificationWithIcon('info')}>Info</Button>
        <Button className="text-warning mr-1" onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
        <Button className="text-danger mr-1" onClick={() => openNotificationWithIcon('error')}>Error</Button>
      </div>
    </div>
  )
}

export default Box;