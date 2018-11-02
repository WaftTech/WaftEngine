import React from 'react';
import MaterialIcon from 'components/MaterialIcon';

const Section = () => (
  <article className="article">
    <h2 className="article-title">Icon Styles and Colors</h2>
    <ul className="list-inline">
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-primary"><MaterialIcon icon="phonelink" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--outlined border-primary"><MaterialIcon icon="phonelink" className="bg-primary"/> </div></li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--bordered border-primary"><MaterialIcon icon="phonelink" className="text-primary" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--rounded bg-primary"><MaterialIcon icon="phonelink" /></div> </li>
      <li className="list-inline-item"> <div className="icon--plain"><MaterialIcon icon="phonelink" className="text-primary" /></div> </li>
      <li className="list-inline-item"> <div className="icon--plain icon--sm"><MaterialIcon icon="phonelink" className="text-primary" /></div> </li>
    </ul>
    
    <ul className="list-inline">
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-dark"><MaterialIcon icon="phonelink" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--outlined border-dark"><MaterialIcon icon="phonelink" className="bg-dark"/> </div></li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--bordered border-dark"><MaterialIcon icon="phonelink" className="text-dark" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--rounded bg-dark"><MaterialIcon icon="phonelink" /></div> </li>
      <li className="list-inline-item"> <div className="icon--plain"><MaterialIcon icon="phonelink" className="text-dark" /></div> </li>
      <li className="list-inline-item"> <div className="icon--plain icon--sm"><MaterialIcon icon="phonelink" className="text-dark" /></div> </li>
    </ul>    
    
    <ul className="list-inline">
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-primary"><MaterialIcon icon="phonelink" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-info"><MaterialIcon icon="phonelink" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-success"><MaterialIcon icon="phonelink" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-warning"><MaterialIcon icon="phonelink" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-danger"><MaterialIcon icon="phonelink" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-dark"><MaterialIcon icon="phonelink" /></div> </li>
      <li className="list-inline-item"> <div className="icon-card__icon icon--circle bg-secondary"><MaterialIcon icon="phonelink" /></div> </li>
    </ul>      
    
  </article>
);

export default Section;
