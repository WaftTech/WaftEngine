import React from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import { makeSelectCategory } from './selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import { loadCategoryRequest } from './actions';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class CategoryListingPage extends React.Component {
  state = {
    value: 0,
  };

  componentDidMount() {
    this.props.loadCategory();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { category } = this.props;
    const categoryObj = category.toJS();

    return (
      <div>
        <React.Fragment>
          <div className="container">
            <Grid container spacing={24}>
              {categoryObj.map(each => {
                const { title } = each;
                return (
                  <Grid item xs={12} lg={2}>
                    <Link to={`/blog-category/${each.slug_url}`}>
                      <div>
                        <div className="info">
                          <h1>{title}</h1>
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

const mapDispatchToProps = dispatch => ({
  loadCategory: payload => dispatch(loadCategoryRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(CategoryListingPage);
