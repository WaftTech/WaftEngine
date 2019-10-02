import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AddIcon from '@material-ui/icons/Add';
import Dropzone from 'react-dropzone';
import * as mapDispatchToProps from '../actions';
import { selectFiles } from '../selectors';
import { IMAGE_BASE } from '../../App/constants';

const FileList = ({ addMediaRequest, files, CKEditorFuncNum, ...props }) => {
  const onSelect = image => {
    window.opener.CKEDITOR.tools.callFunction(
      CKEditorFuncNum,
      `${IMAGE_BASE}${image.path}`,
    );
    window.close();
  };

  return (
    <div style={{ backgroundColor: 'green', flex: 1, height: '100%' }}>
      <Dropzone onDrop={file => addMediaRequest(file, 'media')}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <button type="button">
              <AddIcon />
            </button>
          </div>
        )}
      </Dropzone>
      File list
      {/* {JSON.stringify(files)} */}
      {files.map(each => (
        <img
          key={each._id}
          src={`${IMAGE_BASE}${each.path}`}
          alt={each.filename}
          onClick={() => onSelect(each)}
        />
      ))}
    </div>
  );
};

FileList.propTypes = {
  addMediaRequest: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  CKEditorFuncNum: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  files: selectFiles,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileList);
