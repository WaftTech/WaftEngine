/**
 *
 * Toaster
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

class Toaster extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = { visible: true };
  componentDidMount() {
    if (this.props.timeout) {
      this.timer = setTimeout(() => {
        this.setState({ visible: false });
      }, this.props.timeout);
    }
  }
  componentWillUnmount() {
    if (this.props.timeout) clearTimeout(this.timer);
  }
  handleDismiss = () => {
    this.setState({ visible: false });
    if (this.props.deleteMessage) {
      this.props.deleteMessage();
    }
  };
  render() {
    const { visible } = this.state;
    const { message, success, error, warning } = this.props;
    if (visible) {
      let bsStyle = 'info';
      if (success) bsStyle = 'success';
      if (error) bsStyle = 'danger';
      if (warning) bsStyle = 'warning';
      return (
        <Alert bsStyle={bsStyle} onDismiss={this.handleDismiss}>
          {message}
        </Alert>
      );
    }
    return null;
  }
}

Toaster.propTypes = {
  timeout: PropTypes.number,
  message: PropTypes.string.isRequired,
  success: PropTypes.bool,
  error: PropTypes.bool,
  warning: PropTypes.bool,
  deleteMessage: PropTypes.func,
};

export default Toaster;
