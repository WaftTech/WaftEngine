import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Icon from './Icon';
import Image from './Image';
import Letter from './Letter';

const Page = () => (
  <div className="container-fluid no-breadcrumb container-mw-md chapter">
    <article className="article demo-style-avatars">
      <h2 className="article-title page-title">Avatar</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-4"> <Image /> </div>
        <div key="2" className="mb-4"> <Icon /> </div>
        <div key="3" className="mb-4"> <Letter /> </div>
      </QueueAnim>
    </article>
  </div>
)

export default Page;
