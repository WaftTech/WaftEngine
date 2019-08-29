import React from 'react';
import PropTypes, { number } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';

// @material
import {Link} from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectBlogDate, makeSelectDateLoading } from './selectors';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import Loading from '../../components/Loading';
import CategoryListing from '../../containers/CategoryListingPage/Loadable';
import { IMAGE_BASE } from '../App/constants';

/* eslint-disable react/prefer-stateless-function */
export class BlogDatePage extends React.Component {
  static propTypes = {
    blogDate: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.loadBlogDateRequest(this.props.match.params.date);
  }

  render() {
    const { blogDate, loading } = this.props;

    return loading ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Helmet>
          <title>Blog By Date</title>
        </Helmet>
        <div className="flex">
          <div className="w-3/4 container mx-auto my-10 px-5">
            <div className="flex flex-wrap w-full md:w-3/4 md:-mx-5">
              {blogDate &&
                blogDate.map(each => {
                  const {
                    image,
                    title,
                    slug_url,
                    description,
                    added_at,
                    category,
                    tags,
                  } = each;

                  return (
                    <div
                      className="blog_sec w-full md:w-1/2 md:px-5 mb-5"
                      key={slug_url}
                    >
                      <div className="w-full h-48 md:h-64 object-cover overflow-hidden">
                        <Link to={`/blog/${slug_url}`}>
                          <div className="img blog-img h-full">
                            <img
                              src={
                                image && `${IMAGE_BASE}${image && image.path}`
                              }
                              className="rounded"
                              alt={`${title}`}
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="">
                        <Link
                          className="text-black no-underline capitalize mb-2 bold block mt-4"
                          to={`/blog/${slug_url}`}
                        >
                          <h2>{title}</h2>
                        </Link>
                        <div className="text-grey-darker text-base no-underline">
                          <div className="mr-2">
                            <span className="text-grey-dark">Category: </span>
                            {category &&
                              category.length > 0 &&
                              category.map((each, index) => (
                                <Link
                                  key={index}
                                  className="text-black hover:text-waftprimary leading-normal text-base no-underline"
                                  to={`/blog-category/${each._id}`}
                                >
                                  {`${index === 0 ? '' : ', '}${each.title}`}
                                </Link>
                              ))}
                          </div>
                        </div>
                        <div className="border-t-1 flex flex-wrap font-bold">
                          <p className="text-grey-dark leading-normal text-base mr-2">
                            {moment(added_at).format('MMM Do YY')}
                          </p>
                          <Link
                            className="text-grey-darkleading-normal text-base no-underline"
                            to={`/blog/${slug_url}`}
                          >
                            <div> {tags.join(', ') || ''} </div>
                          </Link>{' '}
                        </div>

                        <Link
                          className="text-grey-darker text-base no-underline"
                          to={`/blog/${slug_url}`}
                        >
                          <div
                            className="leading-normal text-base text-left"
                            style={{ height: '95px', overflow: 'hidden' }}
                            dangerouslySetInnerHTML={{ __html: description }}
                          />
                        </Link>

                        <div className="flex justify-end readmore mt-2">
                          {' '}
                          <Link
                            className="no-underline hover:text-waftprimary"
                            to={`/blog/${slug_url}`}
                          >
                            Continue Reading <span className="rdanim">>>></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <ul className="w-1/4">
            <CategoryListing />
          </ul>
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
