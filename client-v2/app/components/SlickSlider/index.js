/**
 *
 * SlickSlider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectSlide } from '../../containers/App/selectors';
import { loadSlideRequest } from '../../containers/App/actions';

/* eslint-disable react/prefer-stateless-function */
class SlickSlider extends React.PureComponent {
  static propTypes = {
    slideKey: PropTypes.string.isRequired,
    loadSlide: PropTypes.func.isRequired,
    slideObj: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (this.props.slideObj[this.props.slideKey]) {
      return;
    }
    this.props.loadSlide(this.props.slideKey);
  }

  render() {
    const { slideObj } = this.props;

    if (!slideObj[this.props.slideKey]) return null; // maybe add a loader here
    return <div />;
  }
}

const mapStateToProps = createStructuredSelector({
  slideObj: makeSelectSlide(),
});

const mapDispatchToProps = dispatch => ({
  loadSlide: payload => dispatch(loadSlideRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SlickSlider);
