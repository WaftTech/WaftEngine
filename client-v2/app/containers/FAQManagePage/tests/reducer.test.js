import { fromJS } from 'immutable';
import roleManagePageReducer from '../reducer';

describe('FAQManagePageReducer', () => {
  it('returns the initial state', () => {
    expect(roleManagePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
