import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.faq || initialState;

export const makeSelectFAQ = () =>
  createSelector(
    selectDomain,
    state => state.faq,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    state => state.loading,
  );
