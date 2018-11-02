import React from 'react';
import { Tag } from 'antd';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MaterialIcon from 'components/MaterialIcon';
import DEMO from 'constants/demoData';

const list = DEMO.list;

const NotificationTab = () => (
  <div>
    <List>
      {
        list.notifications.map((item, i) =>
          <ListItem button key={i}>
            <div className="list-style-v1">
              <div className="list-item">
                <div className={`icon-btn icon-btn-round mr-3 ${item.iconColor}`}><MaterialIcon icon={item.icon} /></div>
                <div className="list-item__body">
                  <div className="list-item__title">{item.title}</div>
                  <div className="list-item__datetime">{item.datetime}</div>
                </div>
              </div>
            </div>
          </ListItem>
        )
      }
      <ListItem button className="ahn-footer">
        <a href={DEMO.link} className="no-link-style">Read All <MaterialIcon icon="arrow_forward" /></a>
      </ListItem>
    </List>
  </div>
);

const MessageTab = () => (
  <div>
    <List>
      {
        list.messages.map((item, i) =>
          <ListItem button key={i}>
            <div className="list-style-v1">
              <div className="list-item">
                <Avatar src={item.avatar} className="mr-3"/>
                <div className="list-item__body">
                  <div className="list-item__title">{item.title}</div>
                  <div className="list-item__desc">{item.desc}</div>
                  <div className="list-item__datetime">{item.datetime}</div>
                </div>
              </div>
            </div>
          </ListItem>
        )
      }
      <ListItem button className="ahn-footer">
        <a href={DEMO.link} className="no-link-style">Read All <MaterialIcon icon="arrow_forward" /></a>
      </ListItem>
    </List>
  </div>
);

const TaskTab = () => (
  <div>
    <List>
      {
        list.tasks.map((item, i) =>
          <ListItem button key={i}>
            <div className="list-style-v1">
              <div className="list-item">
                <div className="list-item__body">
                  <div className="list-item__title">{item.title} <Tag color={item.tagColor}>{item.tag}</Tag></div>
                  <div className="list-item__datetime">{item.desc}</div>
                </div>
              </div>
            </div>
          </ListItem>

        )
      }
      <ListItem button className="ahn-footer">
        <a href={DEMO.link} className="no-link-style">Read All <MaterialIcon icon="arrow_forward" /></a>
      </ListItem>
    </List>
  </div>
);

class PopoverTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return(
      <div>
        <Tabs 
          value={value} 
          onChange={this.handleChange} 
          className="ahn-tabs"
        >
          <Tab label={<span><MaterialIcon icon="add_alert" />Notifications (4)</span>} />
          <Tab label={<span><MaterialIcon icon="message" />Messages (3)</span>} />
          <Tab label={<span><MaterialIcon icon="view_list" />Tasks (4)</span>} />
        </Tabs>
        {value === 0 && <NotificationTab />}
        {value === 1 && <MessageTab />}
        {value === 2 && <TaskTab />}
      </div>
    );
  }
}

const Notifications = () => (
  <div className="app-header-notifications">
    <PopoverTabs />
  </div>
)

export default Notifications;
