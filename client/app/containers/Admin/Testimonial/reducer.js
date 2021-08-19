/*
 *
 * Testimonial reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: [],
    page: 1,
    size: 10,
    totalData: 0,
    sort: {},
  },
  one: {
    name: '',
    designation: '',
    company: '',
    description: '',
    date: '',
    image: '',
  },
  showPopUp: false,
  slider_setting: {
    arrows: false,
    dots: false,
    slidesPerRow: 1,
    slidesToScroll: 1,
    slidesToShow: 1,
    centerMode: false,
    centerPadding: '',
    autoplay: false,
    autoplaySpeed: 0,
    focusOnSelect: false,
    className: '',
    extra_setting: ''
  },
  query: { size: 10, page: 1 },
  errors: {},
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const testimonialReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;

      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        draft.errors[action.payload.key] = ' ';
        break;

      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ALL_SUCCESS:
        debugger
        draft.all.data = action.payload.data.testimonial_data;
        draft.all.page = action.payload.page
        draft.all.size = action.payload.size
        draft.all.totalData = action.payload.totalData
        // draft.all.sort = action.payload.sort
        draft.loading = false;
        break;

      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = action.payload.data;
        draft.loading = false;
        break;

      case types.ADD_EDIT_FAILURE:
        draft.errors = { ...draft.errors, ...action.payload.errors };
        break;

      case types.DELETE_ONE_SUCCESS:
        draft.all = {
          ...draft.all,
          totalData: draft.all.totalData - 1,

          data: draft.all.data.filter(
            each => each._id != action.payload.data._id,
          ),
        };
        break;

      case types.ADD_FROM_MEDIA:
        draft.one.image = { ...action.payload };
        break;

      case types.SLIDER_SETTING_CHANGE:
        draft.slider_setting[action.payload.key] = action.payload.value
        break;
      case types.SLIDER_SETTING_REQUEST:
        draft.loading = true;
        break;
      case types.SLIDER_SETTING_FAILURE:
        draft.loading = false;
        break;
      case types.SLIDER_SETTING_SUCCESS:
        draft.slider_setting = initialState.slider_setting;
        draft.loading = false;
        break;
      case types.LOAD_SLIDER_SETTING_SUCCESS:

        draft.slider_setting = action.payload.data;
        draft.loading = false;
        break;
      case types.CLOSE_POPUP:
        draft.showPopUp = false;
        break;
      case types.OPEN_POPUP:
        draft.showPopUp = true;
        break;
    }
  });

export default testimonialReducer;
