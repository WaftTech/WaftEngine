import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'react-materialize';
import changeLatitude from '../actions/changeLatitude';

const LatitudeInput = ({ latitude, handleLatitudeChange }) => (
  <Input
    s={12}
    m={3}
    id="latitudeInput"
    label="Latitude"
    onChange={handleLatitudeChange}
    value={`${latitude}`}
    labelClassName={`${latitude}` ? 'active' : ''}
  />
);

const mapStateToProps = ({ latitude }) => ({ latitude });

const mapDispatchToProps = dispatch => ({
  handleLatitudeChange(e) {
    dispatch(changeLatitude(e.target.value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LatitudeInput);
