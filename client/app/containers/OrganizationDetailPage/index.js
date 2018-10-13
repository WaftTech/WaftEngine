/**
 *
 * OrganizationDetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { loadOrgRequest } from './actions';
import { makeSelectOrganization } from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class OrganizationDetailPage extends React.Component {
  componentDidMount() {
    const {
      params: { slug },
    } = this.props.match;
    this.props.loadOrganization(slug);
  }
  render() {
    const organizationObj = this.props.organization.toJS();
    const { category, organization } = organizationObj;
    return (
      <div className="container">
        <br />
        <br />
        <br />
        <h2>{organization.Organization}</h2>
        <div>Category: {category.CategoryName}</div>
        <div
          dangerouslySetInnerHTML={{ __html: organization.AboutOrganization }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: organization.FeatureofOrganization,
          }}
        />
      </div>
    );
  }
}

OrganizationDetailPage.propTypes = {
  loadOrganization: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganization(),
});

const mapDispatchToProps = dispatch => ({
  loadOrganization: payload => dispatch(loadOrgRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'organizationDetailPage', reducer });
const withSaga = injectSaga({ key: 'organizationDetailPage', saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(OrganizationDetailPage);
