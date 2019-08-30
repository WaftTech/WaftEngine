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
    <div className="pt-10">
      <h3 className="uppercase">Archives</h3>
      {props.archives.map(each =>
        each != null ? (
          <div
            key={`recents-${each}`}
            className="border-b border-dotted border-grey"
          >
            <Link className="block py-3 no-underline text-grey-dark hover:text-black" to={`/blog/date/${moment(each).format('YYYY-MM')}`}>
              <time>
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
