import React from 'react';
import { create } from 'react-test-renderer';
import { MapList } from '../GrocersListPage';

test('snapshot', () => {
  const c = create(<MapList grocers={[]} searchParams={{ handleSearch: () => null }} />);
  expect(c.toJSON()).toMatchSnapshot();
});
