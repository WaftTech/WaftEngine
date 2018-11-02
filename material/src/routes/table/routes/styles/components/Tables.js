import React from 'react';
import QueueAnim from 'rc-queue-anim';
import HeadOptions from './HeadOptions';
import Bordered from './Bordered';
import Borderless from './Borderless';
import Striped from './Striped';
import Contextual from './Contextual';
import Hover from './Hover';


const Page = () => (
  <section className="container-fluid container-mw-xl chapter">
    <article className="article">
      <h2 className="article-title">Table Styles</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-6"> 
          <div className="article-title-v2">Dark Head <span className="triangle triangle-down"></span></div>
          <HeadOptions /> 
        </div>
        <div key="2" className="mb-6"> 
          <div className="article-title-v2">Hover <span className="triangle triangle-down"></span></div>
          <Hover /> 
        </div>
        <div key="3" className="mb-6"> 
          <div className="article-title-v2">Striped <span className="triangle triangle-down"></span></div>
          <Striped /> 
        </div>
        <div key="4" className="mb-6">
          <div className="article-title-v2">Bordered <span className="triangle triangle-down"></span></div>
          <Bordered />
        </div>
        <div key="5" className="mb-6">
          <div className="article-title-v2">Borderless <span className="triangle triangle-down"></span></div>
          <Borderless />
        </div>
        <div key="6" className="mb-6">
          <div className="article-title-v2">Contextual <span className="triangle triangle-down"></span></div>
          <Contextual />
        </div>
      </QueueAnim>
    </article>
  </section>
);

export default Page;
