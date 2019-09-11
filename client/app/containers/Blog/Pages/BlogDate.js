import React from 'react';
import PropTypes, { number } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';

// @material
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectBlogDate, makeSelectDateLoading } from '../selectors';
import saga from '../saga';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import CategoryList from '../components/CategoryList';
import Archives from '../components/Archives';
import RenderBlogs from '../components/BlogList';

/* eslint-disable react/prefer-stateless-function */
export class BlogDatePage extends React.Component {
  static propTypes = {
    blogDate: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.loadBlogDateRequest({
      key: this.props.match.params.date,
      value: '',
    });
  }

  componentWillReceiveProps(nextProps) {
    window.scrollTo(0, 0)
    if (nextProps.match.params.date !== this.props.match.params.date) {
      this.props.loadBlogDateRequest({
        key: nextProps.match.params.date,
        value: '',
      });
    }
  }

  handlePagination = paging => {
    this.props.loadBlogDateRequest({
      key: this.props.match.params.date,
      value: paging,
    });
  };

  render() {
    const {
      blogDate: { data, page, size, totaldata },
      loading,
    } = this.props;
    console.log(data);
    const pagination = { page, size, totaldata };

    return loading ? (
      <div>Blog by date loading</div>
    ) : (
        <React.Fragment>
          <Helmet>
            <title>Blog By Date</title>
          </Helmet>
          <div className="bg-star h-48 relative text-center py-12">
            <h1 className="mb-4 text-gray-700 text-4xl font-bold">
              {data && data.length > 0 && moment(data[0].added_at).format('MMMM YYYY')}
            </h1>
          </div>
          <div className="container mx-auto flex">
            <div className="w-3/4">
              {data && data.length > 0 && (
                <RenderBlogs
                  loading={loading}
                  currentBlogs={data}
                  pagination={pagination}
                  handlePagination={this.handlePagination}
                />
              )}
            </div>
            <div className="w-1/4 pt-10">
              <CategoryList />
              <Archives />
            </div>
          </div>
        </React.Fragment>
      );
  }
}

const withReducer = injectReducer({ key: 'blogList', reducer });
const withSaga = injectSaga({ key: 'blogList', saga });

const mapStateToProps = createStructuredSelector({
  blogDate: makeSelectBlogDate(),
  loading: makeSelectDateLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BlogDatePage);
