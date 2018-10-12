/**
 *
 * OrganizationDetailPage
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
import makeSelectOrganizationDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class OrganizationDetailPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>OrganizationDetailPage</title>
          <meta
            name="description"
            content="Description of OrganizationDetailPage"
          />
        </Helmet>
      </div>
    );
  }
}

OrganizationDetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  organizationdetailpage: makeSelectOrganizationDetailPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'organizationDetailPage', reducer });
const withSaga = injectSaga({ key: 'organizationDetailPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OrganizationDetailPage);
