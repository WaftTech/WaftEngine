/* eslint-disable no-nested-ternary */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { IMAGE_BASE } from 'containers/App/constants';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import * as mapDispatchToProps from '../actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import clock from '../../../assets/img/clock.svg';

const RenderBlogs = props => {
  const {
    currentBlogs,
    loading,
    pagination,
    handlePagination,
    handleLoadMore,
    loading_more,
  } = props;
  const maxPage = Math.ceil(pagination.totaldata / pagination.size);
  const pagenumber = [];
  for (let i = 1; i <= Math.ceil(pagination.totaldata / pagination.size); i++) {
    pagenumber.push(i);
  }
  const [lastTop, setLastTop] = useState(0);

  useEffect(() => {
    window.scrollTo(0, lastTop - 140);
  }, [loading_more]);
  const lastDiv = useRef(null);

  const handleLoadMoreContent = () => {
    handleLoadMore({ ...pagination, page: pagination.page + 1 });
    const top = lastDiv.current.offsetTop;
    setLastTop(top);
  };

  return loading ? (
    <>
      <div />
    </>
  ) : currentBlogs.length > 0 ? (
    <>
      {currentBlogs.map((each, index) => {
        const {
          image,
          title,
          author,
          slug_url,
          short_description,
          added_at,
          tags,
          _id,
        } = each;

        return (
          <Link
            className="block pb-6 mb-6 border-b border-gray-300"
            to={`/blog/${moment(added_at).format('YYYY/MM/DD')}/${_id}`}
            key={`${slug_url}-${_id}`}
          >
            <div
              key={_id}
              className="flex article-container"
              ref={index === currentBlogs.length - 1 ? lastDiv : null}
            >
              <div className="overflow-hidden h-20 md:h-48 w-24 md:w-64 article-image">
                <img
                  className="object-cover"
                  src={image && `${IMAGE_BASE}${image.path}`}
                  alt={`${title}`}
                />
              </div>

              <div className="flex-1 px-4 md:px-10">
                <h2 className="text-xl md:text-3xl hover:text-blue-500 font-normal">
                  {title}
                </h2>

                <div className="inline-flex items-center text-gray-600 md:text-gray-800 text-sm sans-serif mt-3 article-date">
                  <img className="mr-2 clock" src={clock} />
                  {moment(each.added_at).fromNow()}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
      <div className="flex flow-root w-full pagination ">
        {loading_more && '....'}
        {currentBlogs.length < pagination.totaldata && (
          <button
            type="button"
            className="btn w-full border border-secondary bg-blue-100 mb-8 text-blue-500 mt-4"
            onClick={handleLoadMoreContent}
          >
            Load More
          </button>
        )}
      </div>
    </>
  ) : (
        <div>No News Found</div>
      );
};

const withSaga = injectSaga({ key: 'blogPage', saga });
const withReducer = injectReducer({ key: 'blogPage', reducer });

RenderBlogs.propTypes = {
  currentBlogs: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  handlePagination: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RenderBlogs);
