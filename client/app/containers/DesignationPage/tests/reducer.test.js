import { fromJS } from 'immutable';
import roleManagePageReducer from '../reducer';

describe('roleManagePageReducer', () => {
  it('returns the initial state', () => {
    expect(roleManagePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
