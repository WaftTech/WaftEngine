import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Dropzone from 'react-dropzone';
import * as mapDispatchToProps from '../actions';
import { makeSelectAll } from '../selectors';
import { IMAGE_BASE } from '../../App/constants';

const FileList = ({
  addMediaRequest,
  all: { file, folders, self },
  CKEditorFuncNum,
  files,
  ...props
}) => {
  useEffect(() => {
    props.loadFilesRequest();
  }, []);

  const onSelect = image => {
    window.opener.CKEDITOR.tools.callFunction(
      CKEditorFuncNum,
      `${IMAGE_BASE}${image.path}`,
    );
    window.close();
  };

  const handleFolderLink = id => {
    props.loadFilesRequest(id);
  };

  return (
    <div style={{ backgroundColor: '#f2f2f2', flex: 1, height: '100%' }}>
      <div className="p-2 flex-1 my-1">
        <ol className="list-reset flex text-gray-700">
          {self.path &&
            self.path.map(each => (
              <div key={each._id} className="flex">
                <li>
                  <a
                    className="text-blue-700 no-underline hover:underline"
                    href="/admin/content-manage"
                  >
                    {each.name || 'Root'}
                  </a>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
              </div>
            ))}
          <li>
            <a
              className="text-blue-700 no-underline hover:underline"
              href="/admin/content-manage"
            >
              {self.name}
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
        {folders.data.map(each => (
          <div
            className="-ml-4 -mr-4 w-1/5 h-28 mb-4 p-1 text-center bg-gray-300"
            key={each._id}
            onClick={() => handleFolderLink(each._id)}
          >
            {each.name}
          </div>
        ))}
        {file.data.map(each => (
          <div
            key={each._id}
            className="-ml-4 -mr-4 w-1/5 h-28 mb-4 p-1 text-center bg-gray-300"
          >
            <img
              className="w-full h-24 object-contain"
              src={`${IMAGE_BASE}${each.path}`}
              alt={each.filename}
              onClick={() => onSelect(each)}
            />
            <div>{each.filename}</div>
          </div>
        ))}
        {folders.data.length < 1 && file.data.length < 1 && <div>No Items</div>}
      </div>
    </div>
  );
};

FileList.propTypes = {
  addMediaRequest: PropTypes.func.isRequired,
  all: PropTypes.object.isRequired,
  CKEditorFuncNum: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileList);
