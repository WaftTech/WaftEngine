/**
 *
 * VideoLinkPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectVideoLinkPage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class VideoLinkPage extends React.Component {
  render() {
    return <div>
      <button>Add New</button>
      table
    </div>;
  }
}

VideoLinkPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  videolinkpage: makeSelectVideoLinkPage(),
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

const withReducer = injectReducer({ key: 'videoLinkPage', reducer });
const withSaga = injectSaga({ key: 'videoLinkPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(VideoLinkPage);
