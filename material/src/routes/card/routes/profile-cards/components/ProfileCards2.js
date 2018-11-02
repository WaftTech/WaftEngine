import React from 'react';
import DEMO from 'constants/demoData';
import { Icon } from 'antd';
import IconButton from '@material-ui/core/IconButton';

const profiles = DEMO.profiles;

const Section = () => {
  return(
    <article className="article">
      <h2 className="article-title">Profile Cards <span className="badge badge-pill">v2</span></h2>
      <div className="row">
        {
          profiles.map((profile, i) => {
            if (i < 3) {
              return (
                <div className="col-lg-4 mb-4" key={i}>
                  <article className="profile-card-v2 border-0 mdc-elevation--z1 h-100">
                    <img src={profile.avatar} alt="avatar"/>
                    <h4>{profile.name}</h4>
                    <span>{profile.title}</span>
                    <p>{profile.desc}</p>
                    <div>
                      <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-sm btn-social"><Icon type="twitter" /></IconButton>
                      <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-sm btn-social"><Icon type="facebook" /></IconButton>
                      <IconButton href={DEMO.link} className="mx-1 icon-btn-circle icon-btn-sm btn-social"><Icon type="instagram" /></IconButton>
                    </div>
                  </article>
                </div>
              )
            }
            return (null);
          })
        }
      </div>
    </article>
  );
}

export default Section;
