import { fromJS } from 'immutable';
import codeVerifyPageReducer from '../reducer';

describe('codeVerifyPageReducer', () => {
  it('returns the initial state', () => {
    expect(codeVerifyPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
