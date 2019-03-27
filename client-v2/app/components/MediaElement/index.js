import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectMedia } from '../../containers/App/selectors';
import { loadMediaRequest } from '../../containers/App/actions';
import { IMAGE_BASE } from '../../containers/App/constants';

// assumsions media is always image. todo handle case for media not image

/* eslint-disable react/no-danger */
class MediaElement extends React.PureComponent {
  static propTypes = {
    mediaKey: PropTypes.string.isRequired,
    loadMedia: PropTypes.func.isRequired,
    mediaObj: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (this.props.mediaObj[this.props.mediaKey]) {
      return;
    }
    this.props.loadMedia(this.props.mediaKey);
  }

  render() {
    const { mediaObj } = this.props;

    if (!mediaObj[this.props.mediaKey]) return null; // maybe add a loader here
    const media = mediaObj[this.props.mediaKey];
    return <img src={`${IMAGE_BASE}${media.path}`} alt="slider media" />;
  }
}

const mapStateToProps = createStructuredSelector({
  mediaObj: makeSelectMedia(),
});

const mapDispatchToProps = dispatch => ({
  loadMedia: payload => dispatch(loadMediaRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MediaElement);
