/**
 *
 * Dashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Dashboard = props => {
  const {} = props;
  return <div />;
};

Dashboard.propTypes = {
  defaultAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch = {
  defaultAction: () => dispatch(actions.defaultAction()),
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Dashboard);
