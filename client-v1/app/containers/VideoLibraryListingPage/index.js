import React from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link, withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectVideoLibraryList } from './selectors';
import saga from './saga';
import { loadVideoLibraryListRequest } from './actions';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class VideoLibraryListPage extends React.Component {
  state = {
    value: 0,
  };

  componentDidMount() {
    this.props.loadVideoLibraryList();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { videoLibraryList } = this.props;
    const videoLibraryListObj = videoLibraryList.toJS();

    return (
      <div>
        <Helmet>
          <title>Video Libraries</title>
        </Helmet>
        <h1>Video Gallary</h1>
        <React.Fragment>
          <div className="container">
            <Grid container spacing={24}>
              {videoLibraryListObj.map(each => {
                const { video_library } = each;

                return (
                  <Grid item xs={12} lg={4} key={`video-list-${each._id}`}>
                    <Link to={`/video/${each._id}`}>
                      <div className="videosLists">
                        <div className="video_library_name">
                          <h2>{video_library}</h2>
                        </div>
                      </div>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'videoLibraryList', reducer });
const withSaga = injectSaga({ key: 'videoLibraryList', saga });

const mapStateToProps = createStructuredSelector({
  videoLibraryList: makeSelectVideoLibraryList(),
});

const mapDispatchToProps = dispatch => ({
  loadVideoLibraryList: () => dispatch(loadVideoLibraryListRequest()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(VideoLibraryListPage);
