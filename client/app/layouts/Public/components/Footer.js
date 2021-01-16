// import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import SubscriberPage from '../../../containers/SubscriberPage/Loadable';


class Footer extends React.Component {
  state = { email: '' };

  handleSave = e => {
    e.preventDefault();
    this.props.loadSubscribeRequest();
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { email } = this.state;

    return (
      <footer className="footer bg-gray-900">
        <div className="w-full bg-gray-900 border-b border-gray-800 p-2 text-center">
          <h1 className="text-gray-500 mt-4 mb-2 uppercase text-2xl">
            Get updates
          </h1>
          <p className="mb-5 text-gray-700">
            Never miss any updates from WaftEngine.
          </p>
          <SubscriberPage />
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap p-3">
            <div className="w-full lg:w-1/2 crorder my-auto">
              <p className="text-gray-700 m-0">
                Designed and built by the WaftTech Team
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {};

export default compose(withRouter)(Footer);
