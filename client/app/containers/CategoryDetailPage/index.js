/**
 *
 * CategoryDetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectCategoryDetailPage from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class CategoryDetailPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>CategoryDetailPage</title>
          <meta
            name="description"
            content="Description of CategoryDetailPage"
          />
        </Helmet>
      </div>
    );
  }
}

CategoryDetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  categorydetailpage: makeSelectCategoryDetailPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'categoryDetailPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(CategoryDetailPage);
