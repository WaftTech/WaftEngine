/**
 *
 * SearchResultsPage
 *
 */

import React from 'react';
import Link from 'react-router-dom/Link';
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
    // console.log('searching');
  };
  render() {
    const { searchResults } = this.props;
    const searchResultsObj = searchResults.toJS();
    return (
      <div className="container searchResult">
        <SearchComponent search={this.handleSearch} />

        <div className="searchResultContainer">
          <br />
          <br />
          <h2>{searchResultsObj.length} Results Found.</h2>
          <div className="row">
            {searchResultsObj.map(each => (
              <div className="col-xs-12 col-lg-4">
                <div className="card" key={each.original._id}>
                  <Link to={`/organization/${each.original.slug}`}>
                    <div dangerouslySetInnerHTML={{ __html: each.string }} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
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

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: 'searchResultsPage', reducer });
const withSaga = injectSaga({ key: 'searchResultsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchResultsPage);
