/**
 *
 * ErrorBoundry
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { FaExclamationCircle, FaRegArrowAltCircleLeft, FaUndo } from 'react-icons/fa';

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
          <div className="h-screen w-screen bg-red-50 flex flex-col items-center justify-center py-10 pb-48">
            <div className="flex justify-center">
              <FaExclamationCircle className="text-6xl text-red-500" />
            </div>
            <div className="flex justify-center py-5">
              <h1 className="text-2xl">something went wrong.</h1>
            </div>
            <div className="flex justify-center">
              <button
                className="underline text-black hover:text-blue-600 cursor p-2 m-2"
                onClick={this.handleGoBack}
              >
                <FaRegArrowAltCircleLeft className="text-2xl" />
              </button>
              <button
                className="underline text-black hover:text-blue-600 cursor p-2 m-2"
                onClick={this.handleReload}
              >
                <FaUndo className="text-xl" />
              </button>
            </div>
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
