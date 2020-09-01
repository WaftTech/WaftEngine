/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { IMAGE_BASE } from 'containers/App/constants';
import { createStructuredSelector } from 'reselect';
import * as mapDispatchToProps from '../actions';
import moment from 'moment';

const HighLightList = props => {
  const { currentBlogs, loading } = props;
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 mt-20">
        <div className="skeleton h-10 mt-5" />
        <div className="skeleton h-10 mt-5  w-1/2 mx-auto" />
        <div className="skeleton h-64 mt-10" />
        <div className="skeleton h-64" />
      </div>
    );
  }
  return currentBlogs.length > 0 ? (
    <>
      {currentBlogs.map(each => {
        const { image, title, slug_url, _id, added_at } = each;

        return (
          <div className="md:mb-6" key={`blog-${_id}`}>
            <div className="container mx-auto">
              <Link
                className="block"
                to={`/news/${moment(added_at).format('YYYY/MM/DD')}/${_id}`}
                key={slug_url}
              >
                <div key={_id} className="">
                  <h1 className="max-w-6xl mx-auto text-center text-4xl md:text-6xl px-5 md:px-10 pt-10 md:pt-20 hover:text-secondary leading-tighter font-bold md:font-normal">
                    {title}
                  </h1>
                  <div className="py-6 md:py-10">
                    <img
                      className="w-full"
                      src={image && `${IMAGE_BASE}${image.path}`}
                      alt={`${title}`}
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  ) : (
      <p />
    );
};

HighLightList.propTypes = {
  currentBlogs: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(HighLightList);
