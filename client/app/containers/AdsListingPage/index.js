/**
 *
 * AdsListingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAdsListingPage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class AdsListingPage extends React.Component {
  render() {
    return <div />;
  }
}

AdsListingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adslistingpage: makeSelectAdsListingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'adsListingPage', reducer });
const withSaga = injectSaga({ key: 'adsListingPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdsListingPage);
