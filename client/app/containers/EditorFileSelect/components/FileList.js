import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import queryString from 'query-string';
import { createStructuredSelector } from 'reselect';
import Dropzone from 'react-dropzone';

// material
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Cancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import WithStyles from '@material-ui/core/styles/withStyles';
import InputBase from '@material-ui/core/InputBase';

import * as mapDispatchToProps from '../actions';
import {
  makeSelectAll,
  makeSelectOne,
  makeSelectfolderAddRequest,
  makeSelectLoading,
  makeSelectfolderRenameRequest,
} from '../selectors';
import { IMAGE_BASE } from '../../App/constants';
import BreadCrumb from '../../../components/Breadcrumb/Loadable';

const LinkComponent = ({ children, staticContext, ...props }) => (
  <div {...props}>{children}</div>
);
LinkComponent.propTypes = {
  children: PropTypes.node,
  staticContext: PropTypes.object,
};

const FileList = ({
  addMediaRequest,
  all: { files, folders, self },
  one,
  queryObj,
  loadFilesRequest,
  loadNewFolderRequest,
  renameFolderRequest,
  folderDeleteRequest,
  fileDeleteRequest,
  setFolderName,
  folderAdded,
  folderRename,
  clearValue,
  loading,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [over, setOver] = useState('');
  const [overFile, setOverFile] = useState('');
  const [show, setShow] = useState(false);
  const [rename_id, setRenameId] = useState('');
  const [rename, setRename] = useState('');
  useEffect(() => {
    if (!folderAdded) {
      setOpen(false);
      clearValue();
    }
  }, [folderAdded]);

  useEffect(() => {
    if (!folderRename) {
      setShow(false);
    }
  }, [folderRename]);

  const onSelect = image => {
    window.opener.CKEDITOR.tools.callFunction(
      queryObj.CKEditorFuncNum,
      `${IMAGE_BASE}${image.path}`,
    );
    window.close();
  };

  const handleAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // dsodsd
    loadNewFolderRequest({ key: self._id });
  };

  const handleInput = e => {
    setFolderName({ key: 'name', value: e.target.value });
  };

  const handleFileUpload = (files, id) => {
    addMediaRequest({ file: files, folder_id: id });
  };

  const handleFolderLink = id => {
    setSelected('');
    const searchq = queryString.stringify({ ...queryObj, path: id });
    props.push({
      search: searchq,
    });
  };

  const handleSingleClick = id => {
    if (selected === id) {
      setSelected('');
    } else {
      setSelected(id);
    }
  };

  const handleOutClick = () => {
    if (selected != '') {
      setSelected('');
    }
  };

  const handleMouseOver = id => {
    setOver(id);
  };

  const handleMouseOverFile = id => {
    setOverFile(id);
  };

  const handleRename = (id, name) => {
    setRenameId(id);
    setRename(name);
    setShow(true);
    renameFolderRequest();
  };

  const handleRenameClose = () => {
    setShow(false);
  };

  const handleEdit = e => {
    setRename(e.target.value);
  };

  const handleSaveRename = () => {
    loadNewFolderRequest({ key: self._id, value: rename_id, name: rename });
  };

  const handleEnter = e => {
    if (e.key === 'Enter') {
      loadNewFolderRequest({ key: self._id, value: rename_id, name: rename });
    }
  };

  const handleDeleteFolder = id => {
    folderDeleteRequest(id);
  };

  const handleDeleteFile = id => {
    fileDeleteRequest(id);
  };

  let routeList = [];
  self.path.map(each => {
    routeList = [
      ...routeList,
      {
        path:
          '/editor-file-select?CKEditor=editor1&CKEditorFuncNum=1&langCode=en',
        label: each.name,
        id: each._id,
      },
    ];
    return null;
  });
  routeList = [
    ...routeList,
    {
      path:
        '/editor-file-select?CKEditor=editor1&CKEditorFuncNum=1&langCode=en',
      label: self.name,
      id: self._id,
    },
  ];

  const onClick = linkObj => {
    handleFolderLink(linkObj.id);
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="new-folder">
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <input
            autoFocus
            id="name"
            type="text"
            className="inputbox"
            onChange={handleInput}
            value={one.name}
          />
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            color="bg-secondary px-4 py-2 text-sm rounded text-white flex items-center"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-primary px-4 py-2 text-sm rounded text-white flex items-center"
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
      <div className="m-2 flex items-center justify-between">
        <BreadCrumb
          linkcomponent={LinkComponent}
          routeList={routeList}
          onClick={onClick}
        />
        <div className="flex-1 flex justify-end">
          <Dropzone onDrop={file => handleFileUpload(file, self._id)}>
            {({ getRootProps, getInputProps }) => (
              <section className="text-black hover:text-primary hover:border-primary text-center self-start py-2 px-4 border border-gray-500 rounded  cursor-pointer mr-2 =">
                <div className="flex items-center " {...getRootProps()}>
                  <input {...getInputProps()} />
                  <i className="material-icons text-base mr-2">add_to_photos</i>
                  <span>Choose File</span>
                </div>
              </section>
            )}
          </Dropzone>
          <button
            onClick={handleAdd}
            className="bg-primary px-4 py-2 text-sm rounded text-white flex items-center"
          >
            <i className="material-icons text-base mr-2">add</i>
            New Folder
          </button>
        </div>
      </div>
      <Dialog
        open={show}
        onClose={handleRenameClose}
        aria-labelledby="rename-folder"
      >
        <DialogTitle>Rename Folder</DialogTitle>
        <DialogContent>
          <input
            autoFocus
            id="rename"
            type="text"
            className="inputbox"
            onChange={handleEdit}
            value={rename}
            onKeyDown={handleEnter}
          />
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleRenameClose}
            color="bg-secondary px-4 py-2 text-sm rounded text-white flex items-center"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveRename}
            className="bg-primary px-4 py-2 text-sm rounded text-white flex items-center"
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
      <div className="flex flex-wrap p-4 overflow-hidden m-2 border rounded">
        {folders.data.map(each => (
          <div
            key={each._id}
            // className="w-56 h-30 mb-8 p-2"
            onMouseOver={() => handleMouseOver(each._id)}
            onMouseLeave={() => handleMouseOver('')}
          >
            {over === each._id ? (
              <div className="flex justify-between">
                <button
                  className="hover:text-blue-500"
                  onClick={() => handleRename(each._id, each.name)}
                >
                  <Edit />
                </button>
                <button
                  className="hover:text-primary"
                  onClick={() => handleDeleteFolder(each._id)}
                >
                  <Cancel />
                </button>
              </div>
            ) : (
              ''
            )}
            <div
              data-tooltip={each.name}
              className={`${
                selected === each._id ? 'folder_media' : ''
              } flex flex-col justify-between w-48 h-28 mb-4 p-1 text-center mr-4 border border-transparent hover:border-yellow-300 cursor-pointer rounded`}
              onClick={() => handleSingleClick(each._id)}
              onDoubleClick={() => handleFolderLink(each._id)}
              onKeyDown={() => handleFolderLink(each._id)}
              role="presentation"
            >
              <i
                className="material-icons text-yellow-500 self-center"
                style={{ fontSize: '7rem' }}
              >
                folder
              </i>
              <span className="block text-sm truncate">{each.name}</span>
            </div>
          </div>
        ))}
        {files.data.map((each, index) => (
          <div
            key={each._id}
            onMouseOver={() => handleMouseOverFile(each._id)}
            onMouseLeave={() => handleMouseOverFile('')}
          >
            {overFile === each._id ? (
              <div className="flex justify-end">
                <button
                  className="hover:text-primary"
                  onClick={() => handleDeleteFile(each._id)}
                >
                  <Cancel />
                </button>
              </div>
            ) : (
              ''
            )}
            <div
              data-tooltip={each.filename}
              className={`${
                selected === each._id ? 'folder_media' : ''
              } flex flex-col justify-between w-48 h-28 mb-4 p-1 text-center mr-4 border border-transparent hover:border-yellow-300 cursor-pointer rounded`}
            >
              <img
                className="w-full h-24 object-contain"
                src={`${IMAGE_BASE}${each.path}`}
                alt={each.filename}
                onClick={() => handleSingleClick(each._id)}
                onDoubleClick={() => onSelect(each)}
                onKeyDown={() => handleFolderLink(each._id)}
                role="presentation"
              />
              <div className="truncate text-sm pt-2">{each.filename}</div>
            </div>
          </div>
        ))}
        {folders.data.length < 1 && files.data.length < 1 && (
          <div className="text-center w-full text-sm h-64">
            This Folder is Empty
          </div>
        )}
      </div>
    </div>
  );
};

FileList.propTypes = {
  addMediaRequest: PropTypes.func.isRequired,
  all: PropTypes.object.isRequired,
  one: PropTypes.object.isRequired,
  loadFilesRequest: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  queryObj: PropTypes.object,
  loadNewFolderRequest: PropTypes.func.isRequired,
  folderRename: PropTypes.bool.isRequired,
  setFolderName: PropTypes.func.isRequired,
  folderAdded: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  one: makeSelectOne(),
  folderAdded: makeSelectfolderAddRequest(),
  folderRename: makeSelectfolderRenameRequest(),
  loading: makeSelectLoading(),
});

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    width: '40px',
    height: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

const withStyle = WithStyles(styles);

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(
  withConnect,
  withStyle,
)(FileList);
