import { fromJS } from 'immutable';
import organizationDetailPageReducer from '../reducer';

describe('organizationDetailPageReducer', () => {
  it('returns the initial state', () => {
    expect(organizationDetailPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
