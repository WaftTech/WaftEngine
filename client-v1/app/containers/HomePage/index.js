import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */

class HomePage extends Component {
  state = {};

  componentDidMount() {}

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const showModal = !!this.props.match.params.slug;

    return (
      <div>
        <React.Fragment>
          <div className="container">
            <h3>This is HomePage</h3>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
