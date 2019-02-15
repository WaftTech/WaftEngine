/**
 *
 * VideosPage
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

import moment from 'moment';
// import CompanyList from '../../components/CompanyList';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loadVideosRequest } from './actions';
import { makeSelectVideos } from './selectors';
import reducer from './reducer';
import saga from './saga';

// import BlogList from '../BlogList';

export class VideosPage extends React.Component {
  componentDidMount() {
    this.props.loadVideos(this.props.match.params.id);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.loadVideos(this.props.match.params.id);
    }
  }
  render() {
    const { classes, videos } = this.props;
    const videosObj = videos.toJS();

    return (
      <div className="container">
        <Helmet>
          <title>{videosObj.video_library}</title>
        </Helmet>

        <Grid container spacing={8}>
          <Grid item lg={12}>
            <div className="videosHeader">
              <h1 className="pageTitle">
                <span>Videos Detail Of {videosObj.video_library}</span>
                <div className="videosItems">
                  <div>
                    <p>{videosObj.code}</p>
                  </div>
                  <div>
                    <p>{videosObj.videos}</p>
                  </div>
                </div>
              </h1>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

VideosPage.propTypes = {
  loadVideos: PropTypes.func.isRequired,
};

const withReducer = injectReducer({ key: 'videosPage', reducer });
const withSaga = injectSaga({ key: 'videosPage', saga });

const mapStateToProps = createStructuredSelector({
  videos: makeSelectVideos(),
});

const mapDispatchToProps = dispatch => ({
  loadVideos: payload => dispatch(loadVideosRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(VideosPage);
