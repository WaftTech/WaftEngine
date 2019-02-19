/**
 *
 * VideoDetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loadVideoDetailRequest } from './actions';
import { makeSelectVideoDetail } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class VideoDetailPage extends React.Component {
  componentDidMount() {
    this.props.loadVideoDetail(this.props.match.params.id);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.loadVideoDetail(this.props.match.params.id);
    }
  }
  render() {
    const { classes, videoDetail } = this.props;
    const videoDetailObj = videoDetail.toJS();

    return <div className="container" />;
  }
}

VideoDetailPage.propTypes = {
  loadVideoDetail: PropTypes.func.isRequired,
};

const withReducer = injectReducer({ key: 'videoDetailPage', reducer });
const withSaga = injectSaga({ key: 'videoDetailPage', saga });

const mapStateToProps = createStructuredSelector({
  videoDetail: makeSelectVideoDetail(),
});

const mapDispatchToProps = dispatch => ({
  loadVideoDetail: payload => dispatch(loadVideoDetailRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(VideoDetailPage);
