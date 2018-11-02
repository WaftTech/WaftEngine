import React from 'react';
import QueueAnim from 'rc-queue-anim';
import MaterialIcon from 'components/MaterialIcon';
import Hero from './Hero';

const services = [
  {
    icon: 'create',
    title: 'Web Design'
  }, {
    icon: 'code',
    title: 'Development'
  }, {
    icon: 'laptop',
    title: 'Website'
  }, {
    icon: 'camera_alt',
    title: 'Photography'
  }, {
    icon: 'phone_iphone',
    title: 'Mobile App'
  }, {
    icon: 'language',
    title: 'Marketing'
  }

];

const Services = () => (
  <article className="article py-7 article-bordered">

    <div className="container-fluid container-mw-xl">
      <div className="row">
        {
          services.map((service, i) => (
            <div className="col-xl-4" key={i.toString()}>
              <div className="box box-default mb-4">
                <div className="box-body">
                  <div className="icon-card-v1 icon-card--center">
                    <div className="icon--plain"><MaterialIcon icon={service.icon} className="text-primary" /></div>
                    <h4 className="icon-card__header">{service.title}</h4>
                    <div className="icon-card__content"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum adipisci sequi quis mollitia. </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>

  </article>
);

const Page = () => (
  <section className="chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Hero /></div>
      <div key="2"><Services /></div>
    </QueueAnim>
  </section>
);

export default Page;

