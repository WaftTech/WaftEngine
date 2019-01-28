import React from 'react';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { makeSelectMedia } from '../../containers/App/selectors';
import { loadMediaRequest } from '../../containers/App/actions';

class StaticMedia extends React.Component {
  state = { imageFilePath: '' };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.imageFilePath) {
      return null;
    }
    if (nextProps.media[nextProps._id]) {
      return { imageFilePath: nextProps.media[nextProps._id].path };
    }
    return null;
  }
  componentDidMount() {
    if (!this.props.media[this.props._id]) {
      this.props.loadMedia(this.props._id);
    }
  }
  render() {
    const { imageFilePath } = this.state;
    return <img className="img-fluid" src={`${BASE}${imageFilePath}`} alt="loading" />;
  }
}

const mapStateToProps = ({ media }) => ({
  media,
});

const mapDispatchToProps = dispatch => ({
  loadMedia: payload => dispatch(loadMediaRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(StaticMedia);
