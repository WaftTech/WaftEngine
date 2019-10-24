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
    <div style={{ backgroundColor: '#f2f2f2', flex: 1, height: '100%' }}>
      <div className="p-2 flex-1 my-1">
        <ol className="list-reset flex text-gray-700">
          <li>Root</li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <a
              className="text-blue-700 no-underline hover:underline"
              href="/admin/content-manage"
            >
              images
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <a
              className="text-blue-700 no-underline hover:underline"
              href="/admin/content-manage/add"
            >
              phone
            </a>
          </li>
        </ol>
      </div>
      <div style={{ display: 'flex' }} className="m-2">
        <Dropzone onDrop={file => addMediaRequest(file, 'media')}>
          {({ getRootProps, getInputProps }) => (
            <section
              style={{ width: '100%' }}
              className="text-black hover:text-primary text-center self-start py-6 px-4 border border-gray-500 rounded-lg border-dashed cursor-pointer"
            >
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Choose File</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
      <div className="flex flex-wrap justify-between px-4 overflow-hidden m-2">
        {files.map(each => (
          <div className="-ml-4 -mr-4 w-1/5 h-28 mb-4 p-1 text-center bg-gray-300">
            <img
              className="w-full h-24 object-contain"
              key={each._id}
              src={`${IMAGE_BASE}${each.path}`}
              alt={each.filename}
              onClick={() => onSelect(each)}
            />
            <div>{each.filename}</div>
          </div>
        ))}
      </div>
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
