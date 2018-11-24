import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'react-materialize';
import changeLongitude from '../actions/changeLongitude';

const LongitudeInput = ({ longitude, handleLongitudeChange }) => (
  <Input
    s={12}
    m={3}
    id="longitudeInput"
    label="Longitude"
    value={`${longitude}`}
    labelClassName={`${longitude}` ? 'active' : ''}
    onChange={handleLongitudeChange}
  />
);

const mapStateToProps = ({ longitude }) => ({ longitude });

const mapDispatchToProps = dispatch => ({
  handleLongitudeChange(e) {
    dispatch(changeLongitude(e.target.value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LongitudeInput);
