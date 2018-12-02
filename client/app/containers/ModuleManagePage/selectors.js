import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the moduleManagePage state domain
 */

const selectDomain = state => state.get('moduleManagePage', initialState);

export const makeSelectAll = () => createSelector(selectDomain, state => state.get('all'));
export const makeSelectOne = () => createSelector(selectDomain, state => state.get('one'));

// export const makeSelectPath = props =>
//   createSelector(makeSelectOne(), state => console.log(props, state));
