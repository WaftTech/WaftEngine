import React from 'react';
import { Modal } from 'antd';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  state = {
    visible: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({ visible: false });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button variant="contained" onClick={this.showModal}> Open modal dialog </Button>
        <Modal
          visible={visible}
          title="Modal Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          closable={false}
          footer={[
            <Button key="back" color="primary" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="submit" color="primary" onClick={this.handleOk}> Submit </Button>,
          ]}
        >
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, nisi dicta atque facere dolorem ipsa provident.</p>
          <p>Quasi aliquam cumque laborum dolorum possimus itaque earum impedit molestias ullam velit magni perspiciatis vitae.</p>
        </Modal>
      </div>
    );
  }
}


const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Modal dialog</div>
      <div className="box-body">
        <App />
      </div>
    </div>
  )
}

export default Box;