/**
 *
 * SearchResultsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

import SearchComponent from '../HomePage/SearchComponent';
import { makeSelectSearchResults } from '../HomePage/SearchComponent/selectors';

/* eslint-disable react/prefer-stateless-function */
export class SearchResultsPage extends React.Component {
  componentDidMount() {
    this.handleSearch();
  }
  handleSearch = () => {
    console.log('searching');
  };
  render() {
    const { searchResults } = this.props;
    const searchResultsObj = searchResults.toJS();
    console.log(searchResultsObj);
    return (
      <div>
        <SearchComponent search={this.handleSearch} />
      </div>
    );
  }
}

SearchResultsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  searchResults: makeSelectSearchResults(),
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

const withReducer = injectReducer({ key: 'searchResultsPage', reducer });
const withSaga = injectSaga({ key: 'searchResultsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchResultsPage);
