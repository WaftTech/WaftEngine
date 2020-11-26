/**
 *
 * EditorFileSelect
 *
 */

import React, { memo, useEffect, useState } from 'react';
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
import './style.css';

const key = 'editorFileSelect';

export const EditorFileSelect = ({
  loadFilesRequest,
  location: { search },
  selectFile,
  uploadMultiple,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const queryObj = qs.parse(search);

  useEffect(() => {
    loadFilesRequest(queryObj.path);
  }, [queryObj.path]);

  return (
    <FileList
      queryObj={queryObj}
      selectFile={selectFile}
      uploadMultiple={uploadMultiple}
    />
  );
};

EditorFileSelect.propTypes = {
  loadFilesRequest: PropTypes.func.isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  selectFile: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  uploadMultiple: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

EditorFileSelect.defaultProps = {
  selectFile: false,
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
