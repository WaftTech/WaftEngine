import React from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectCategory } from './selectors';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
class CategoryListingPage extends React.Component {
  componentDidMount() {
    this.props.loadCategoryRequest();
  }

  render() {
    const { category } = this.props;
    return (
      <div>
        <React.Fragment>
          <div className="container">
            <Grid container spacing={24}>
              {category.map(each => {
                const { title } = each;
                return (
                  <Grid key={each._id} item xs={12} lg={2}>
                    <Link to={`/blog-category/${each._id}`}>
                      <div>
                        <div className="info">
                          <h1> {`${title}`}</h1>
                        </div>
                      </div>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'categoryListingPage', reducer });
const withSaga = injectSaga({ key: 'categoryListingPage', saga });

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CategoryListingPage);
