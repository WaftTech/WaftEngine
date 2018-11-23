import React from 'react';
// import { connect } from 'react-redux';
import LatitudeInput from './LatitudeInput';
import LongitudeInput from './LongitudeInput';
import DistanceInput from './DistanceInput';
// import changeLatitude from '../actions/changeLatitude';
// import changeLongitude from '../actions/changeLongitude';

class SearchBox extends React.Component {
  // componentDidMount() {
  //   if (navigator && navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //       this.props.changeLatitude(position.coords.latitude);
  //       this.props.changeLongitude(position.coords.longitude);
  //     });
  //   }
  // }

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.search();
  };
  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="row">
          <LatitudeInput />
          <LongitudeInput />
          <DistanceInput />
          <div className="col s12 m3">
            <button className="btn">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBox;
// export default connect(
//   null,
//   { changeLatitude, changeLongitude },
// )(SearchBox);
