/**
 *
 * AboutUs
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAboutUs from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class AboutUs extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>AboutUs</title>
          <meta name="description" content="Description of AboutUs" />
        </Helmet>
      </div>
    );
  }
}

AboutUs.propTypes = {
  // defaultAction: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  aboutUs: makeSelectAboutUs(),
});

const mapDispatchToProps = dispatch => ({
  defaultAction: () => dispatch(actions.defaultAction()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'aboutUs', reducer });
const withSaga = injectSaga({ key: 'aboutUs', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AboutUs);
