import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { makeSelectArchivesIsLoading, makeSelectArchives } from '../selectors';
import { IMAGE_BASE } from '../../App/constants';

function Archives(props) {
  if (props.loading) {
    return <div>Loading...</div>;
  }
  console.log(props.archives, 'archives');
  return (
    <div className="mb-4">
      <h2 className="text-center pb-3 border-b">Archives</h2>
      {props.archives.map(each =>
        each != null ? (
          <div
            key={`recents-${each}`}
            className="flex py-3 border-b border-dashed"
          >
            <Link to={`/blog/date/${moment(each).format('YYYY-MM')}`}>
              <time className="text-sm">
                {moment(each).format('MMMM YYYY')}
              </time>
            </Link>
          </div>
        ) : (
          ''
        ),
      )}
    </div>
  );
}

Archives.propTypes = {
  loading: PropTypes.bool.isRequired,
  archives: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectArchivesIsLoading(),
  archives: makeSelectArchives(),
});

export default connect(mapStateToProps)(Archives);
