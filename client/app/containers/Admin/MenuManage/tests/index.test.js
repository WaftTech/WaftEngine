/**
 *
 * Tests for MenuManage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { cleanup, render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { MenuManage } from '../index';

describe('<MenuManage />', () => {
  afterEach(cleanup);

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(<MenuManage dispatch={dispatch} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(false);
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<MenuManage />);
    expect(firstChild).toMatchSnapshot();
  });
});
