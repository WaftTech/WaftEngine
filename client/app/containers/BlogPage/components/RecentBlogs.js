import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectRecentBlogsIsLoading } from '../selectors';
import * as mapDispatchToProps from '../actions';

function RecentBlogs(props) {
  useEffect(() => {
    props.loadRecentBlogsRequest();
  }, []);
  if (props.loading) {
    return <div>Loading...</div>;
  }
  return <div />;
}

RecentBlogs.propTypes = {
  loadRecentBlogsRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectRecentBlogsIsLoading(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentBlogs);
