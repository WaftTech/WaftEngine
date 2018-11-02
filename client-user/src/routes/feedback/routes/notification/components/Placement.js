import React from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { notification } from 'antd';

const options = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
};

class Box extends React.Component {

  state = {
    option: 'topRight',
  };

  handleChange = event => {
    let val = event.target.value;
    this.setState({ option: val });
    notification.config({
      placement: val,
    });
  };

  render() {
    return(
      <div className="box box-default">
        <div className="box-header">Placement</div>
        <div className="box-body">
          <Select
            value={this.state.option}
            className="mr-3"
            onChange={this.handleChange}
          >
            {options.map(val => <MenuItem key={val} value={val}>{val}</MenuItem>)}
          </Select>
          <Button variant="contained" color="primary" onClick={openNotification}>Open the notification box</Button>
        </div>
      </div>
    )
  }
}

export default Box;