import React from 'react';
import Button from '@material-ui/core/Button';
import MaterialIcon from 'components/MaterialIcon';
import { notification } from 'antd';

const openNotification = () => {
  notification.open({
    placement: 'bottomRight',
    message: 'This website uses cookies',
    duration: 0,
    icon: <MaterialIcon icon="info" className="text-info" />,
    description: 'By visitng our site, you agree to use of cookies to enhance your user experience.',
  });
};

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Cookie Notice</div>
      <div className="box-body">
        <Button variant="contained" onClick={openNotification}> Open cookie notice </Button>

        <div className="callout callout-success">
          <p>If you set the <code>duration</code> value to 0, the notification box will never close automatically.</p>
        </div>
      </div>
    </div>
  )
}

export default Box;