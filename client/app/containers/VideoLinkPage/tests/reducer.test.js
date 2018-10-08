import { fromJS } from 'immutable';
import videoLinkPageReducer from '../reducer';

describe('videoLinkPageReducer', () => {
  it('returns the initial state', () => {
    expect(videoLinkPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
