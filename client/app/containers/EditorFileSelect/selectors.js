import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editorFileSelect state domain
 */

export const selectDomain = state => state.editorFileSelect || initialState;

/**
 * Other specific selectors
 */

export const selectFiles = createSelector(
  selectDomain,
  state => state.files,
);

export const selectFolders = createSelector(
  selectDomain,
  state => state.folders,
);

/**
 * Default selector used by EditorFileSelect
 */

const makeSelectEditorFileSelect = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectEditorFileSelect;
