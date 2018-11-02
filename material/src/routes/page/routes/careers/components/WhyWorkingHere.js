import React from 'react';
import MaterialIcon from 'components/MaterialIcon';

const features = [
  {
    icon: 'devices',
    title: 'Your own laptop',
    desc: "Choose the laptop you want, normally it's a Macbook Air or Macbook Pro."
  }, {
    icon: 'access_time',
    title: 'Flexible work hours',
    desc: 'Choose hours that work well for you and your life. We’re not all 9 to 5 here.'
  }, {
    icon: 'directions_bike',
    title: 'A new bike',
    desc: 'Getting around San Francisco is the best way to see the city all year round.'
  }, {
    icon: 'attach_money',
    title: 'Competitive Compensation',
    desc: 'We offer salaries and equity that compete with any tech company in the city.'
  }, {
    icon: 'local_hospital',
    title: 'Healthcare Coverage',
    desc: 'Have access to the best health coverage so you know you and your family are covered.'
  }, {
    icon: 'people_outline',
    title: 'Friendly colleague',
    desc: "All your colleague are friendly, you'll have fun working here."
  }, {
    icon: 'card_giftcard',
    title: 'Monthly gift',
    desc: 'We will have a monthly gift for everyone, and more surprise coming on the way.'
  }, {
    icon: 'autorenew',
    title: 'Free Gym Membership',
    desc: 'Our office is near a gym and you can walk there whenever you want.'
  }, {
    icon: 'favorite_border',
    title: 'A Watsi Donation',
    desc: 'Each employee receives a Watsi donation to help improve someones life.'
  }
]

const Section = () => (
  <div className="container-fluid container-mw-xl">
    <article className="article">
      <h2 className="article-title article-title--loose text-center">Why Working Here</h2>

      <div className="row">
        {
          features.map((feature, i) => (
            <div className="col-xl-4 mb-5" key={i.toString()} >
              <div className="media icon-card-v1 h-100">
                <div className="icon--plain mr-3"><MaterialIcon icon={feature.icon} className="text-primary" /></div>
                <div className="media-body">
                  <h4 className="icon-card__header">{feature.title}</h4>
                  <div className="icon-card__content">{feature.desc}</div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </article>
  </div>
);

export default Section;
