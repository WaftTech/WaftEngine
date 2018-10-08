import { fromJS } from 'immutable';
import organizationInfoPageReducer from '../reducer';

describe('organizationInfoPageReducer', () => {
  it('returns the initial state', () => {
    expect(organizationInfoPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
