/**
 *
 * AboutUs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import StaticContentDiv from '../../components/StaticContentDiv';
import { makeSelectAboutUs } from './selectors';
import { loadAboutUsRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class AboutUs extends React.PureComponent {
  componentDidMount() {
    this.props.loadAboutUs();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>AboutUs</title>
          <meta name="description" content="Description of AboutUs" />
        </Helmet>
        <div className="container">
          <h3>About Waft-Engine</h3>
          <StaticContentDiv contentKey="aboutusheader" />
        </div>
      </div>
    );
  }
}

AboutUs.PropTypes = {
  loadAboutUs: PropTypes.func.isRequired,
  aboutUs: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  aboutUs: makeSelectAboutUs(),
});

const mapDispatchToProps = dispatch => ({
  loadAboutUs: () => dispatch(loadAboutUsRequest()),
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
