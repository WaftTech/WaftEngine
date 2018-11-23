import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'react-materialize';
import changeDistance from '../actions/changeDistance';

const DistanceInput = ({ distance, handleDistanceChange }) => (
  <Input
    s={12}
    m={3}
    id="distanceInput"
    label="Distance (miles)"
    defaultValue={distance}
    onChange={handleDistanceChange}
  />
);

const mapStateToProps = ({ distance }) => ({ distance });

const mapDispatchToProps = dispatch => ({
  handleDistanceChange(e) {
    dispatch(changeDistance(e.target.value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DistanceInput);
