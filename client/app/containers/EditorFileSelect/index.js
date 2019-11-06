/**
 *
 * EditorFileSelect
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import qs from 'query-string';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { makeSelectAll } from './selectors';
import reducer from './reducer';
import saga from './saga';
import FileList from './components/FileList';

const key = 'editorFileSelect';

export const EditorFileSelect = ({
  loadFilesRequest,
  location: { search },
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const queryObj = qs.parse(search);

  useEffect(() => {
    loadFilesRequest(queryObj.path);
  }, [queryObj.path]);
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <FileList queryObj={queryObj} />
    </div>
  );
};

EditorFileSelect.propTypes = {
  loadFilesRequest: PropTypes.func.isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EditorFileSelect);
