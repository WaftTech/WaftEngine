import React from 'react';
import DEMO from 'constants/demoData';
import { Icon } from 'antd'; 
import IconButton from '@material-ui/core/IconButton';

const Section = () => (
  <div className="box box-default">
    <div className="box-header">Sizes</div>
    <div className="box-body text-center">
      <p>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-sm btn-twitter"><Icon type="twitter" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-normal btn-facebook"><Icon type="facebook" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-md btn-google-plus"><Icon type="google" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-lg btn-instagram"><Icon type="instagram" /></IconButton>
        <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-xl btn-youtube"><Icon type="youtube" /></IconButton>
      </p>  
    </div>
  </div> 
)

export default Section;
