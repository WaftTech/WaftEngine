import React from 'react';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { UITIMELINE } from 'constants/uiComponents'

const EXAMPLEPAGE = UITIMELINE[1].path;

const TabContent1 = () => (
  <div className="container-fluid">
    <div className="callout callout-info">
      <p>Page with Tabs takes advantage of <code>Tabs</code> component API</p>
    </div>
    <div className="callout callout-success">
      <p>To see in action, check out <Link to={EXAMPLEPAGE}>Timeline page</Link></p>
    </div>
  </div>
)

const TabContent2 = () => (
  <div className="container-fluid container-mw-md">
    <div className="callout callout-warning">
      <p>You can change container max-width with <code>.container-mw-</code> utility class</p>
    </div>
  </div>
)

const TabContent3 = () => (
  <div className="container-fluid"><div className="article-title-style text-secondary">Blank 3</div></div>
)

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
            <div className="page-header-title"> Page Title </div>
          </div>

          <div key="2">
            <Tabs value={value} onChange={this.handleChange} className="page-tabs">
              <Tab label="Tab One" />
              <Tab label="Tab Two" />
              <Tab label="Tab Three" />
            </Tabs>
            <SwipeableViews
              index={value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabContent1 />
              <TabContent2 />
              <TabContent3 />
            </SwipeableViews>
          </div>
        </QueueAnim>
      </section>
    );
  }
}

export default Page;
