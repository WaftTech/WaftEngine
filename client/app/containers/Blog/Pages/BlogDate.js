import React from 'react';
import PropTypes, { number } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

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
            Blogs By Archives
          </h1>
        </div>
        <div className="container mx-auto flex">
          {/* <div className="w-full md:w-3/4">
            {data &&
              data.map(each => {
                const {
                  image,
                  title,
                  author,
                  slug_url,
                  description,
                  added_at,
                  category,
                  tags,
                } = each;

                return (
                  <div
                    className="border-b border-dotted py-5 flex"
                    key={slug_url}
                  >
                    <div className="w-1/4">
                      <Link
                        className="text-black no-underline capitalize mb-2 bold block mt-4"
                        to={`/blog/${slug_url}`}
                      >
                        <h2 className="text-2xl font-medium leading-tight">
                          {title}
                        </h2>
                      </Link>
                      <span className="mt-2">
                        by{' '}
                        <Link
                          to={`/blog/author/${author._id}`}
                          className="text-red-600 font-bold no-underline hover:underline"
                        >
                          {author.name}
                        </Link>
                      </span>
                    </div>

                    <div className="w-1/2 p-4">
                      <span className="text-gray-700 mr-2">
                        {moment(added_at).format('MMM Do YY')}
                      </span>
                      <Link
                        className="text-indigo-600 no-underline"
                        to={`/blog/${each.slug_url}`}
                      >
                        <span> {tags.join(', ') || ''} </span>
                      </Link>{' '}
                      <Link
                        className="text-grey-darker text-base no-underline"
                        to={`/blog/${slug_url}`}
                      >
                        <div
                          className="leading-normal text-sm text-gray-600 font-light overflow-hidden"
                          style={{ height: '130px' }}
                          dangerouslySetInnerHTML={{ __html: description }}
                        />
                      </Link>
                    </div>

                    <div className="w-1/4 h-48 object-cover overflow-hidden p-8">
                      <Link to={`/blog/${slug_url}`}>
                        <img
                          src={image && `${IMAGE_BASE}${image.path}`}
                          className="rounded "
                          alt={`${title}`}
                        />
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="w-full md:w-1/4 pt-10 pl-10">
            <CategoryList />
            <Archives />
          </div> */}
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
