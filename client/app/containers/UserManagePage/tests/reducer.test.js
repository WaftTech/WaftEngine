import { fromJS } from 'immutable';
import userManagePageReducer from '../reducer';

describe('userManagePageReducer', () => {
  it('returns the initial state', () => {
    expect(userManagePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
