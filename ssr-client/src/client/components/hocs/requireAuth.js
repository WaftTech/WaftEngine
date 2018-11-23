import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default ChildComponent => {
  const RequireAuth = () => {
    switch (this.props.auth) {
      case false:
        return <Redirect to="/" />;
      case null:
        return <div>Loading...</div>;
      default:
        return <ChildComponent {...this.props} />;
    }
  };

  function mapStateToProps({ auth }) {
    return { auth };
  }

  return connect(mapStateToProps)(RequireAuth);
};
