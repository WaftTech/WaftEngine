import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Breadcrumb from 'components/Layout/Breadcrumb';
import Button from '@material-ui/core/Button';
import MaterialIcon from 'components/MaterialIcon';

const Section1 = () => (
  <article className="article">
    <h2 className="article-title">Page with Breadcrumb</h2>
    <div className="callout callout-info">
      <p>Breadcrumb are generated dynamically with <code>React-router</code> and <code>Breadcrumb</code> component</p>
    </div>
    <div className="callout callout-success">
      <p>To see it in action, click <Button variant="contained" className="button-v1 mx-1"><MaterialIcon icon="settings" /></Button> to open the right Customizer</p>
      <p>Then change layout option to option <Button variant="contained" className="button-v1 mx-1">2</Button> and you'll see the dynamic Breadcrumb in the top left corner</p>
    </div>
  </article>
)

const Page = () => {
  return(
    <div className="container-fluid container-mw-md no-breadcrumb chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"> <Breadcrumb /> </div>
        <div key="2"> <Section1 /> </div>
      </QueueAnim>
    </div>
  );
}

export default Page;
