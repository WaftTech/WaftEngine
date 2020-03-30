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
import Cancel from '@material-ui/icons/Delete';
import InputBase from '@material-ui/core/InputBase';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import WithStyles from '@material-ui/core/styles/withStyles';
import PageContent from '../../../components/PageContent/PageContent';
import Checkbox from '@material-ui/core/Checkbox';

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
import DeleteDialog from '../../../components/DeleteDialog';

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
  const [deleteId, setdeleteId] = useState('');
  const [deleteFile, setdeleteFile] = useState('');
  const [deleteOpen, setdeleteOpen] = useState(false);
  const [fileOpen, setfileOpen] = useState(false);

  const [folderCheckbox, setfolderCheckbox] = useState(false);
  const [fileCheckbox, setfileCheckbox] = useState(false);

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
    if (props.selectFile) {
      props.selectFile(image);
    } else {
      window.opener.CKEDITOR.tools.callFunction(
        queryObj.CKEditorFuncNum,
        `${IMAGE_BASE}${image.path}`,
      );
    }
    window.close();
  };

  const handleAdd = () => {
    setOpen(true);
  };

  const handleDelClose = () => {
    setdeleteOpen(false);
  };

  const handleFileClose = () => {
    setfileOpen(false);
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
    setdeleteId(id);
    setdeleteOpen(true);
  };

  const handleDeleteFile = id => {
    setdeleteFile(id);
    setfileOpen(true);
  };

  const handleFolderDel = () => {
    folderDeleteRequest(deleteId);
    setdeleteOpen(false);
  };

  const handleFileDel = () => {
    fileDeleteRequest(deleteFile);
    setfileOpen(false);
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

  const handleSelectMultipleButton = () => {
    setfileCheckbox(!fileCheckbox);
    setfolderCheckbox(false);
  };

  const handleRenameButton = () => {
    setfileCheckbox(false);
    setfolderCheckbox(!folderCheckbox);
  };

  return (
    <PageContent loading={loading}>
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
            disabled={folderAdded}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
      <div className="flex items-center justify-between mt-3 mb-3">
        <div className="my-auto">
          <BreadCrumb
            linkcomponent={LinkComponent}
            routeList={routeList}
            onClick={onClick}
          />
        </div>
        <div className="flex">
          <button
            onClick={handleSelectMultipleButton}
            className="items-center flex btn bg-pink-500 hover:bg-pink-400 mr-2"
          >
            <i className="material-icons text-base mr-2">filter</i>
            <span>Select Multiple</span>
          </button>
          <Dropzone onDrop={file => handleFileUpload(file, self._id)}>
            {({ getRootProps, getInputProps }) => (
              <section className="btn bg-info hover:bg-secondary mr-2 cursor-pointer">
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
            className="items-center flex btn bg-primary hover:bg-secondary mr-2"
          >
            <i className="material-icons text-base mr-2">add</i>
            <span>New Folder</span>
          </button>
          <button
            onClick={handleRenameButton}
            className="items-center flex bg-yellow-600 hover:bg-yellow-400 btn mr-2"
          >
            {' '}
            <i className="material-icons text-base mr-2">edit</i>
            <span>Rename</span>
          </button>
          <button className="items-center flex btn bg-red-600 hover:bg-red-500">
            <i className="material-icons text-base mr-2">delete</i>
            <span>Delete</span>
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
      <DeleteDialog
        open={deleteOpen}
        doClose={handleDelClose}
        doDelete={handleFolderDel}
      />
      <DeleteDialog
        open={fileOpen}
        doClose={handleFileClose}
        doDelete={handleFileDel}
      />
      <div className="flex flex-wrap bg-white mt-2 shadow p-4">
        {folders.data.map(each => (
          <div
            className="mediaCont border p-1 relative overflow-hidden mr-4 hover:border-primary"
            key={each._id}
            // className="w-56 h-30 mb-8 p-2"
            onMouseOver={() => handleMouseOver(each._id)}
            onMouseLeave={() => handleMouseOver('')}
          >
            {/* {over === each._id ? (
              <div className="w-full flex absolute justify-center">
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
            )} */}
            <div className={`${folderCheckbox ? '' : 'mediaCheck'} absolute`}>
              <Checkbox
                value="primary"
                color="primary"
                style={{ padding: 0 }}
                onClick={() => handleRename(each._id, each.name)}
              />
            </div>
            <div
              // data-tooltip={each.name}
              className={`${
                selected === each._id ? 'folder_media' : ''
              } flex flex-col w-32 h-32 text-center cursor-pointer overflow-hidden mt-8`}
              onClick={() => handleSingleClick(each._id)}
              onDoubleClick={() => handleFolderLink(each._id)}
              onKeyDown={() => handleFolderLink(each._id)}
              role="presentation"
            >
              <div className="flex h-24 justify-center">
                <i
                  className="material-icons text-yellow-500 self-center"
                  style={{ fontSize: '6rem' }}
                >
                  folder
                </i>
              </div>
              <div className="block text-sm truncate">{each.name}</div>
            </div>
          </div>
        ))}
        {files.data.map((each, index) => (
          <div
            className="mediaCont border p-1 relative overflow-hidden mr-4 hover:border-primary"
            key={each._id}
            onMouseOver={() => handleMouseOverFile(each._id)}
            onMouseLeave={() => handleMouseOverFile('')}
          >
            {/* {overFile === each._id ? (
              <div className="w-full flex justify-center absolute">
                <button
                  className="hover:text-primary"
                  onClick={() => handleDeleteFile(each._id)}
                >
                  <Cancel />
                </button>
              </div>
            ) : (
              ''
            )} */}
            <div className={`${fileCheckbox ? '' : 'mediaCheck'} absolute`}>
              <Checkbox
                value="primary"
                color="primary"
                style={{ padding: 0 }}
              />
            </div>
            <div
              // data-tooltip={each.filename}
              className={`${
                selected === each._id ? 'folder_media' : ''
              } flex flex-col w-32 h-32 text-center cursor-pointer overflow-hidden mt-8`}
            >
              <div className="flex h-24">
                <img
                  className="w-full h-24 object-contain"
                  src={`${IMAGE_BASE}${each.path}`}
                  alt={each.filename}
                  onClick={() => handleSingleClick(each._id)}
                  onDoubleClick={() => onSelect(each)}
                  onKeyDown={() => handleFolderLink(each._id)}
                  role="presentation"
                />
              </div>
              <div className="truncate text-sm">{each.filename}</div>
            </div>
          </div>
        ))}
        {folders.data.length < 1 && files.data.length < 1 && (
          <div className="text-center w-full text-sm h-64">
            This Folder is Empty
          </div>
        )}
      </div>
    </PageContent>
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
