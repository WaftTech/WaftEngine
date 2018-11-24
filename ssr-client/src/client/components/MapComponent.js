/* eslint no-underscore-dangle: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import Marker from './Marker';

class MapComponent extends React.Component {
  render() {
    const { grocers, zoom, center } = this.props;

    // calculating center
    let maxLat = -90;
    let minLat = 90;
    let maxLon = -180;
    let minLon = 180;
    let lat = 0;
    let lng = 0;

    let centerObj;
    if (center.lat || center.lng) {
      centerObj = center;
    } else {
      grocers.map(each => {
        const { latitude, longitude } = each;
        lat += latitude;
        lng += longitude;
        if (latitude > maxLat) maxLat = latitude;
        if (latitude < minLat) minLat = latitude;
        if (longitude > maxLon) maxLon = longitude;
        if (longitude < minLon) minLon = longitude;
        return null;
      });
      if (grocers.length) {
        lat /= grocers.length;
        lng /= grocers.length;
      }
      centerObj = { lat, lng };
    }
    return (
      <div style={{ height: 'calc(100vh - 125px)', width: '100%' }}>
        <GoogleMapReact
          ref={el => (this.map = el)}
          bootstrapURLKeys={{ key: 'AIzaSyDrMdzB3i4v3U62r4Xww5blaRIjg9dji14' }}
          zoom={zoom}
          center={centerObj}
        >
          {grocers.map(each => (
            <Marker
              key={`marker-${each._id}`}
              lat={each.latitude}
              lng={each.longitude}
              grocer={each}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

MapComponent.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  zoom: PropTypes.number,
  grocers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  ).isRequired,
};

MapComponent.defaultProps = {
  zoom: 7,
};

const mapStateToProps = ({ grocers, latitude, longitude }) => ({
  grocers,
  center: { lat: +latitude, lng: +longitude },
});

export default connect(mapStateToProps)(MapComponent);
