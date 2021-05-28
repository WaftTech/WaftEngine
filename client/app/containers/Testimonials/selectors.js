import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the testimonials state domain
 */

export const selectDomain = state => state.testimonials || initialState;

/**
 * Other specific selectors
 */

export const makeSelectTestimonial = () =>
  createSelector(
    selectDomain,
    state => state.testimonials,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    state => state.loading,
  );
export const makeSelectTestimonialSetting = () =>
  createSelector(
    selectDomain,
    state => state.testimonial_setting,
  );
/**
 * Default selector used by Testimonials
 */

const makeSelectTestimonials = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectTestimonials;
