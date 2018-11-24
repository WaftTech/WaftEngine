import React from 'react';
import { create } from 'react-test-renderer';
import NotFoundPage from '../NotFoundPage';

test('snapshot', () => {
  const Component = NotFoundPage.component;
  const c = create(<Component />);
  expect(c.toJSON()).toMatchSnapshot();
});
