import React from 'react';
import { Modal } from 'antd';
import Button from '@material-ui/core/Button';
import Card from './Card';

class App extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Button variant="contained" onClick={this.showModal}>Vertically centered</Button>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          className="custom-modal-v1"
          centered
        >
          <Card />
        </Modal>
      </div>
    );
  }
}

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Custom Position</div>
      <div className="box-body">
        <App />
      </div>
    </div>
  )
}

export default Box;