import React from 'react';
import PropTypes from 'prop-types';

class Marker extends React.Component {
  static propTypes = {
    grocer: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }).isRequired,
  };

  state = { showDetail: false };

  handleClick = () => {
    this.setState(state => ({ showDetail: !state.showDetail }));
  };

  render() {
    const { showDetail } = this.state;
    const { grocer } = this.props;
    return (
      <div onClick={this.handleClick} onKeyPress={this.handleClick} role="presentation">
        <img src="/marker.svg" alt="marker" />
        {showDetail && (
          <div
            style={{
              padding: '10px',
              position: 'relative',
              top: '10px',
              zIndex: '90',
              background: 'white',
              boxShadow: '0 2px 4px 0 rgba(0,0,0,0.50)',
              width: '150px',
              borderRadius: '4px',
            }}
          >
            {' '}
            <span
              className="arrow"
              style={{
                top: '-17px',
                left: '7px',
                border: 'solid transparent',
                content: ' ',
                height: '0',
                width: '0',
                position: 'absolute',
                pointerEvents: 'none',
                borderColor: 'rgba(136, 183, 213, 0)',
                borderBottomColor: '#ccc',
                borderWidth: '8px',
              }}
            />
            <span
              className="arrow"
              style={{
                top: '-16px',
                left: '7px',
                border: 'solid transparent',
                content: ' ',
                height: '0',
                width: '0',
                position: 'absolute',
                pointerEvents: 'none',
                borderColor: 'rgba(136, 183, 213, 0)',
                borderBottomColor: '#fff',
                borderWidth: '8px',
              }}
            />
            <div>
              Store Brand:
              {grocer.name}
            </div>
            <div>
              {grocer.address1}
              {grocer.address2}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Marker;
