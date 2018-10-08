/**
 *
 * OrganizationInfoPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectOrganizationInfoPage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class OrganizationInfoPage extends React.Component {
  render() {
    return (
      <div>
        <input type="text" />
        <button>Search</button>
        <button>Add New</button>
      </div>
    );
  }
}

OrganizationInfoPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  organizationinfopage: makeSelectOrganizationInfoPage(),
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

const withReducer = injectReducer({ key: 'organizationInfoPage', reducer });
const withSaga = injectSaga({ key: 'organizationInfoPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OrganizationInfoPage);
