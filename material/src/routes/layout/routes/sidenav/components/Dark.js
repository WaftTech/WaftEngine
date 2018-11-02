import React from 'react';
import { Menu } from 'antd';
import MaterialIcon from 'components/MaterialIcon';
import Button from '@material-ui/core/Button';
import DEMO from 'constants/demoData';
const SubMenu = Menu.SubMenu;

class Sider extends React.Component {

  render() {
    return (
      <Menu
        className="app-menu"
        style={{ width: 240 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
      >
        <SubMenu
          key="sub1"
          title={<Button className="nav-item"><MaterialIcon icon="mail" /><span className="nav-text">Navigation One</span></Button>}
        >
          <Menu.Item key="1"><Button className="nav-item" href={DEMO.link}><span>Option 1</span></Button></Menu.Item>
          <Menu.Item key="2"><Button className="nav-item" href={DEMO.link}><span>Option 2</span></Button></Menu.Item>
          <Menu.Item key="3"><Button className="nav-item" href={DEMO.link}><span>Option 3</span></Button></Menu.Item>
          <Menu.Item key="4"><Button className="nav-item" href={DEMO.link}><span>Option 4</span></Button></Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={<Button className="nav-item"><MaterialIcon icon="store" /><span className="nav-text">Navigation Two</span></Button>}
        >
          <Menu.Item key="5"><Button className="nav-item" href={DEMO.link}><span>Option 5</span></Button></Menu.Item>
          <Menu.Item key="6"><Button className="nav-item" href={DEMO.link}><span>Option 6</span></Button></Menu.Item>
          <SubMenu
            key="sub3"
            title={<Button className="nav-item"><span className="nav-text">Submenu</span></Button>}
          >
            <Menu.Item key="7"><Button className="nav-item" href={DEMO.link}><span>Option 7</span></Button></Menu.Item>
            <Menu.Item key="8"><Button className="nav-item" href={DEMO.link}><span>Option 8</span></Button></Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={<Button className="nav-item"><MaterialIcon icon="settings" /><span className="nav-text">Navigation Three</span></Button>}
        >
          <Menu.Item key="9"><Button className="nav-item" href={DEMO.link}><span>Option 9</span></Button></Menu.Item>
          <Menu.Item key="10"><Button className="nav-item" href={DEMO.link}><span>Option 10</span></Button></Menu.Item>
          <Menu.Item key="11"><Button className="nav-item" href={DEMO.link}><span>Option 11</span></Button></Menu.Item>
          <Menu.Item key="12"><Button className="nav-item" href={DEMO.link}><span>Option 12</span></Button></Menu.Item>
        </SubMenu>
        <Menu.Item key="sub5">
          <Button className="nav-item" href={DEMO.link}>
            <MaterialIcon icon="dashboard" />
            <span className="nav-text">Navigation Four</span>
          </Button>
        </Menu.Item>
      </Menu>
    );
  }
}


const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Dark Theme</div>
      <div className="box-body">
        <Sider />
      </div>
    </div>
  )
}

export default Box;
