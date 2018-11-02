import React from 'react';
import DEMO from 'constants/demoData';
import { Icon } from 'antd'; 
import IconButton from '@material-ui/core/IconButton';

const Section = () => (
  <div className="box box-default">
    <div className="box-header">Styles</div>
    <div className="box-body text-center">
      <p>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-rounded icon-btn-sm btn-twitter"><Icon type="twitter" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-rounded icon-btn-sm btn-facebook"><Icon type="facebook" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-rounded icon-btn-sm btn-google-plus"><Icon type="google" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-rounded icon-btn-sm btn-instagram"><Icon type="instagram" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-rounded icon-btn-sm btn-rss"><Icon type="medium" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-rounded icon-btn-sm btn-wechat"><Icon type="wechat" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-rounded icon-btn-sm btn-linkedin"><Icon type="linkedin" /></IconButton>
      </p>
      <p>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-rounded icon-btn-sm btn-youtube"><Icon type="youtube" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-rounded icon-btn-sm btn-skype"><Icon type="skype" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-rounded icon-btn-sm btn-dribbble"><Icon type="dribbble" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-rounded icon-btn-sm btn-behance"><Icon type="behance" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-rounded icon-btn-sm btn-social"><Icon type="slack" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-rounded icon-btn-sm btn-github"><Icon type="github" /></IconButton>
      </p> 
      <div className="divider my-4"></div>
      <p>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-sm btn-twitter"><Icon type="twitter" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-sm btn-facebook"><Icon type="facebook" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-sm btn-google-plus"><Icon type="google" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-sm btn-instagram"><Icon type="instagram" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-sm btn-rss"><Icon type="medium" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-sm btn-wechat"><Icon type="wechat" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-sm btn-linkedin"><Icon type="linkedin" /></IconButton>
      </p>
      <p>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-sm btn-youtube"><Icon type="youtube" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-sm btn-skype"><Icon type="skype" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-sm btn-dribbble"><Icon type="dribbble" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-sm btn-behance"><Icon type="behance" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-sm btn-social"><Icon type="slack" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-sm btn-github"><Icon type="github" /></IconButton>
      </p>     
    </div>
  </div> 
)

export default Section;
