import React from 'react';
import { Layout, Popover } from 'antd';
import Badge from '@material-ui/core/Badge';
import DEMO from 'constants/demoData';
import Notifications from './Notifications';
import MaterialIcon from 'components/MaterialIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
const { Header } = Layout;


class AppHeader extends React.Component {
  state = {
    anchorEl: null,
    dropdownAnchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDropdownClick = event => {
    this.setState({ dropdownAnchorEl: event.currentTarget });
  };
  handleDropdownClose = () => {
    this.setState({ dropdownAnchorEl: null });
  };


  render() {
    const { anchorEl, dropdownAnchorEl } = this.state;

    return (
      <Header className="app-header mdc-elevation--z8">
        <div className="app-header-inner bg-white">
          <div className="header-left">
            <div className="list-unstyled list-inline">
              <a href={DEMO.link} className="list-inline-item"> <MaterialIcon icon="menu" className="list-icon" /> </a>
              <a className="list-inline-item" href={DEMO.link}>
                <div
                  className="avatar" 
                  aria-owns={dropdownAnchorEl ? 'app-header-dropdown-1' : null}
                  aria-haspopup="true"
                  onClick={this.handleDropdownClick}
                >
                  Dropdown Menu <MaterialIcon icon="expand_more" />
                </div>
                <Menu
                  id="app-header-dropdown-1"
                  className="app-header-dropdown"
                  anchorEl={dropdownAnchorEl}
                  open={Boolean(dropdownAnchorEl)}
                  onClose={this.handleDropdownClose}
                >
                  <MenuItem onClick={this.handleDropdownClose}> <a href={DEMO.link}><MaterialIcon icon="account_circle" /> Example Item 1</a> </MenuItem>
                  <MenuItem disabled> <MaterialIcon icon="settings" />Example Item 2 </MenuItem>
                  <MenuItem onClick={this.handleDropdownClose}> <a href={DEMO.link}><MaterialIcon icon="help" />Example Item 3</a> </MenuItem>
                  <div className="divider divider-solid my-1"></div>
                  <MenuItem onClick={this.handleDropdownClose}> <a href={DEMO.link}><MaterialIcon icon="forward" />Example Item 4</a> </MenuItem>
                </Menu>
              </a>
            </div>
          </div>

          <div className="header-right">
            <div className="list-unstyled list-inline">
              <li className="list-inline-item search-box seach-box-right">
                <div className="search-box-inner">
                  <div className="search-box-icon"><MaterialIcon icon="search" /></div>
                  <input type="text" placeholder="search..." />
                  <span className="input-bar"></span>
                </div>
              </li>
              <Popover placement="bottomRight" content={<Notifications />} trigger="click" overlayClassName="app-header-popover">
                <a href={DEMO.link} className="list-inline-item"><Badge className="header-badge" badgeContent={11}><MaterialIcon icon="notifications_none" className="header-icon-notification" /></Badge></a>
              </Popover>
              <a className="list-inline-item" href={DEMO.link}>
                <div
                  className="avatar" 
                  aria-owns={anchorEl ? 'app-header-menu-3' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <img src="assets/images-demo/g1-sm.jpg" alt="avatar" className="avatar-img" />
                </div>
                <Menu
                  id="app-header-menu-3"
                  className="app-header-dropdown"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}> <div>Signed in as <strong>{DEMO.user}</strong></div> </MenuItem>
                  <div className="divider divider-solid my-1"></div>
                  <MenuItem disabled> <a href={DEMO.link}><MaterialIcon icon="settings" />Settings</a> </MenuItem>
                  <MenuItem onClick={this.handleClose}> <a href={DEMO.headerLink.about}><MaterialIcon icon="info" />About</a> </MenuItem>
                  <MenuItem onClick={this.handleClose}> <a href={DEMO.headerLink.help}><MaterialIcon icon="help" />Need Help?</a> </MenuItem>
                  <div className="divider divider-solid my-1"></div>
                  <MenuItem onClick={this.handleClose}> <a href={DEMO.headerLink.signOut}><MaterialIcon icon="forward" />Sign out</a> </MenuItem>
                </Menu>
              </a>
            </div>
          </div>
        </div>
      </Header>
    );
  }
}

export default AppHeader;

