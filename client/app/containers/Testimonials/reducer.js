/*
 *
 * Testimonials reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  testimonials: [],
  testimonial_setting: {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    centerMode: false,
    centerPadding: '',
    arrow_position: '',
    dot_position: '',
    autoplay: true,
    autoplaySpeed: 2000,
    focusOnSelect: true,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  },
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const testimonialsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.loading = false;
        draft.testimonials = action.payload.data.testimonial_data;
        draft.testimonial_setting = action.payload.data.settings.value
        break;
      case types.LOAD_ALL_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default testimonialsReducer;
