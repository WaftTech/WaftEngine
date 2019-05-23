import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminBlogCategoryManagePage state domain
 */

const selectAdminBlogCategoryManagePageDomain = state =>
  state.adminBlogCategoryManagePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminBlogCategoryManagePage
 */

export const makeSelectAll = () =>
  createSelector(
    selectAdminBlogCategoryManagePageDomain,
    substate => substate.all,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectAdminBlogCategoryManagePageDomain,
    substate => substate.query,
  );
export const makeSelectOne = () =>
  createSelector(
    selectAdminBlogCategoryManagePageDomain,
    substate => substate.one,
  );
