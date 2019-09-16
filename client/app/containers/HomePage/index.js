/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import CategoryElement from '../../components/CategoryElement';
import SlickSlider from '../../components/SlickSlider';
import star from '../../assets/img/star.svg';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    const { classes, category } = this.props;

    return (
      <>
        <div className="bg-star">
          <div className="max-w-5xl mx-auto py-16 px-4 overflow-hidden relative md:flex">
            <div className="md:w-1/2">
              <h1 className="uppercase text-4xl">Help us to grow</h1>
              <p className="my-4">
                You don't have to donate always. A github star is enough for
                WaftEngine.
              </p>
              <a
                className="px-3 py-2 no-underline inline-flex items-center font-bold"
                href="https://github.com/wafttech/waftengine"
                target="_blank"
                style={{
                  color: '#333',
                  backgroundImage:
                    'linear-gradient(-180deg, #FAFBFC 0%, #EFF3F6 100%)',
                  border: '1px solid #CDCFD0',
                  borderRadius: 4,
                }}
              >
                <StarIcon />
                <span className="pl-2">Star WaftEngine</span>
              </a>
            </div>
            <div className="md:w-1/2 pt-10">
              <img className="opacity-25" src={star} alt="star waftengine" />
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto py-12 px-4 overflow-hidden">
          <h2>Slider Example</h2>
          <SlickSlider slideKey="slider-one" />
        </div>
        <div className="max-w-5xl mx-auto py-12 px-4 overflow-hidden headline titless">
          <CategoryElement cat_id="5d09d3c5ba5fe21594e59bb4" size={3} />
        </div>
        <div className="max-w-5xl mx-auto py-12 px-4 overflow-hidden layout-2">
          <CategoryElement cat_id="5d0a07f3f305de105c4fc674" size={4} />
        </div>
      </>
    );
  }
}
