import { fromJS } from 'immutable';
import wtDashboardReducer from '../reducer';

describe('wtDashboardReducer', () => {
  it('returns the initial state', () => {
    expect(wtDashboardReducer(undefined, {})).toEqual(fromJS({}));
  });
});
