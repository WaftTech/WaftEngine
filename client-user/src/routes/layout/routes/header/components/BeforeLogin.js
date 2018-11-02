import React from 'react';
import { Layout, Modal } from 'antd';
import FormCardLeft1 from 'routes/card/routes/form-cards/components/FormCardLeft1';
import FormCardCentered1 from 'routes/card/routes/form-cards/components/FormCardCentered1';
import DEMO from 'constants/demoData';
import MaterialIcon from 'components/MaterialIcon';
import Button from '@material-ui/core/Button';
const { Header } = Layout;

class Modal2 extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Button color="primary" onClick={this.showModal}>Sign in</Button>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          className="custom-modal-v1"
        >
          <FormCardLeft1 />
        </Modal>
      </div>
    );
  }
}

class Modal3 extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Button onClick={this.showModal}>Sign up</Button>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          className="custom-modal-v1"
        >
          <FormCardCentered1 />
        </Modal>
      </div>
    );
  }
}

const Section = () => {
  return(
    <Header className="app-header mdc-elevation--z8">
      <div className="app-header-inner bg-white">
        <div className="header-left">
          <div className="list-unstyled list-inline">
            <a href={DEMO.link} className="list-inline-item"> <MaterialIcon icon="menu" className="list-icon" /> </a>
          </div>
        </div>

        <div className="header-right">
          <div className="list-unstyled list-inline">
            <div className="list-inline-item"><Modal2 /></div>
            <div className="list-inline-item"><Modal3 /></div>
          </div>
        </div>
      </div>
    </Header>
  );
}

export default Section;
