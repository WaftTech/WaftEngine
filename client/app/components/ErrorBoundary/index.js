/**
 *
 * ErrorBoundry
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import Logo from '../../assets/img/logo-icon.svg';

/* eslint-disable react/prefer-stateless-function */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: '' };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, error, info });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  handleGoBack = () => {
    window.history.back();
    setInterval(this.handleReload, 200);
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    const { hasError, error, info } = this.state;
    const { customErrorView } = this.props;
    if (hasError) {
      // if (customErrorView) return customErrorView(error, info);
      return (
        <>
          <div className="flex justify-center mt-24">
            <img src={Logo} className="w-48" />
          </div>
          <div className="flex justify-center">
            <h1>Something went wrong.</h1>
          </div>
          <div className="flex justify-center">
            <button
              className="underline text-secondary hover:cursor p-2 m-2"
              onClick={this.handleGoBack}
            >
              Go Back.
            </button>
            <button
              className="underline text-secondary hover:cursor p-2 m-2"
              onClick={this.handleReload}
            >
              Relaod.
            </button>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  customErrorView: PropTypes.func,
};

export default ErrorBoundary;
