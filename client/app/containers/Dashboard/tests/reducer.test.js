import { fromJS } from 'immutable';
import dashboardReducer from '../reducer';

describe('dashboardReducer', () => {
  it('returns the initial state', () => {
    expect(dashboardReducer(undefined, {})).toEqual(fromJS({}));
  });
});
