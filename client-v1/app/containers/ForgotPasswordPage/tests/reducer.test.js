import { fromJS } from 'immutable';
import forgotPasswordPageReducer from '../reducer';

describe('forgotPasswordPageReducer', () => {
  it('returns the initial state', () => {
    expect(forgotPasswordPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
