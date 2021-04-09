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
      <footer className="bg-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-wrap p-3">
            <div className="w-full lg:w-1/2 my-auto">
              <p className="text-gray-500 text-sm">
                Copyright © Waft Technology, 2021. MIT Licensed.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {};

export default compose(withRouter)(Footer);
