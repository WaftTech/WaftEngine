/**
 *
 * StaticMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectContent } from '../../containers/App/selectors';
import { loadContentRequest } from '../../containers/App/actions';

/* eslint-disable react/prefer-stateless-function */
class StaticMenu extends React.PureComponent {
  componentDidMount() {}

  render() {
    return <div />;
  }
}

StaticMenu.propTypes = {};

const mapStateToProps = createStructuredSelector({
  contentObj: makeSelectContent(),
});

const mapDispatchToProps = dispatch => ({
  loadContent: payload => dispatch(loadContentRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(StaticMenu);
