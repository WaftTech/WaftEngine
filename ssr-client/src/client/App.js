import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';

class App extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      routes: PropTypes.array,
    }).isRequired,
  };
  render() {
    const { route } = this.props;
    return (
      <div className="App">
        <Header />
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

export default {
  component: App,
};
