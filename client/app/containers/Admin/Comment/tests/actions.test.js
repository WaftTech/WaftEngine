import { defaultActionRequest } from '../actions';
import { DEFAULT_ACTION_REQUEST } from '../constants';

describe('BlogCommentManagePage actions', () => {
  describe('Default Action Request', () => {
    it('has a type of DEFAULT_ACTION_REQUEST', () => {
      const expected = {
        type: DEFAULT_ACTION_REQUEST,
      };
      expect(defaultActionRequest()).toEqual(expected);
    });
  });
});
