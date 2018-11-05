import { fromJS } from 'immutable';
import loginFormReducer from '../reducer';

describe('loginFormReducer', () => {
  it('returns the initial state', () => {
    expect(loginFormReducer(undefined, {})).toEqual(fromJS({}));
  });
});
