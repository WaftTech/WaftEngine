import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Timeline1 from './Timeline1';
import Timeline2 from './Timeline2';


class Page extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { value } = this.state;

    return(
      <section className="page-with-tabs">
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
            <div className="page-header-title page-title"> Timeline </div>
          </div>

          <div key="2">
            <Tabs value={value} onChange={this.handleChange} className="page-tabs">
              <Tab label="Two Sides" />
              <Tab label="Left Sides" />
            </Tabs>
            <SwipeableViews
              index={value}
              onChangeIndex={this.handleChangeIndex}
            >
              <Timeline1 />
              <Timeline2 />
            </SwipeableViews>
          </div>
        </QueueAnim>
      </section>
    );
  }
}

export default Page;
