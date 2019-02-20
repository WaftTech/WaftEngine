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
import { withStyles } from '@material-ui/core/styles';
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
    const {
      videoDetail,
      match: {
        params: { id },
      },
    } = this.props;
    const videoDetailObj = videoDetail.toJS();

    return (
      <div className="container">
        {videoDetailObj.videos &&
          videoDetailObj.videos.map(video => {
            if (video._id !== id) return null;
            const src = `https://www.youtube.com/embed/${video.url.split('=')[1]}?autoplay=1;rel=0;iv_load_policy=3?autoplay=1;rel=0;iv_load_policy=3?autoplay=1;rel=0;iv_load_policy=3`;
            return (
              <div key={video.url}>
                <Helmet>
                  <title>{video.title}</title>
                </Helmet>
                <div>
                  <iframe src={src} frameBorder="0" allowFullScreen style={{ width: '538px', minWidth: '100%', minHeight: '450px', maxHeight: '450px', marginLeft: '0px' }} />
                </div>
              </div>
            );
          })}
      </div>
    );
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
