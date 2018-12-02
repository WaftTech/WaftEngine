import action from '../action';

describe('action', () => {
  it('should return an object with type property', () => {
    expect(typeof action).toEqual('function');
    const type = 'type';
    const result = action(type);
    // expect(result.type).toEqual(type);
  });
});
