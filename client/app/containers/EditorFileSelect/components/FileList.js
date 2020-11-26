import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import queryString from 'query-string';
import { createStructuredSelector } from 'reselect';
import Dropzone from 'react-dropzone';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import PageContent from '../../../components/PageContent/PageContent';
import { FaCheck } from 'react-icons/fa';

import * as mapDispatchToProps from '../actions';
import {
  makeSelectAll,
  makeSelectOne,
  makeSelectfolderAddRequest,
  makeSelectLoading,
  makeSelectfolderRenameRequest,
  makeSelectChosen,
  makeSelectChosenFiles,
  makeSelectChosenFolders,
  makeSelectFileRenameLoading,
  makeSelectRenameFile,
  makeSelectShowRename,
  makeSelectQuery,
} from '../selectors';
import { IMAGE_BASE } from '../../App/constants';
import BreadCrumb from '../../../components/Breadcrumb/Loadable';
import DeleteDialog from '../../../components/DeleteDialog';
import {
  FaPlusCircle,
  FaImages,
  FaImage,
  FaPenSquare,
  FaTrash,
  FaFolder,
  FaSearch,
} from 'react-icons/fa';

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
  addChosenFile,
  chosen,
  chosen_files,
  clearChosen,
  addChosenFolder,
  chosen_folders,
  deleteMultipleRequest,
  setRenameFileValue,
  setShowRename,
  rename_file,
  fileRenameLoading,
  showRename,
  renameFileRequest,
  setQueryValue,
  query,
  classes,
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
  const [selectedButton, setSelectedButton] = useState('');

  useEffect(() => {
    if (!folderAdded) {
      setOpen(false);
      clearValue();
    }
    clearChosen();
  }, [folderAdded]);

  useEffect(() => {
    if (!folderRename) {
      setShow(false);
    }
    clearChosen();
  }, [folderRename]);

  useEffect(() => {
    setSelectedButton('');
  }, [files]);

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

  const handleRenameFile = (id, name) => {
    setRenameFileValue({ key: '_id', value: id });
    setRenameFileValue({ key: 'renamed_name', value: name });
    setShowRename(true);
  };

  const closeFileRename = () => {
    setShowRename(false);
  };

  const handleRenameClose = () => {
    setShow(false);
  };

  const handleEdit = e => {
    setRename(e.target.value);
  };

  const handleEditFile = e => {
    setRenameFileValue({ key: 'renamed_name', value: e.target.value });
  };

  const handleSaveRename = () => {
    loadNewFolderRequest({ key: self._id, value: rename_id, name: rename });
  };

  const handleSaveFileRename = () => {
    renameFileRequest();
  };

  const handleEnter = e => {
    if (e.key === 'Enter') {
      loadNewFolderRequest({ key: self._id, value: rename_id, name: rename });
    }
  };

  const handleFileEnter = e => {
    if (e.key === 'Enter') {
      renameFileRequest();
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

  const handleQueryChange = name => event => {
    event.persist();
    const { value } = event.target;
    setQueryValue({ key: name, value });
  };

  const handleQueryEnter = event => {
    if (event.key === 'Enter') {
      loadFilesRequest(queryObj);
    }
  };

  const handleSearch = () => {
    loadFilesRequest(queryObj);
  };

  const handleSelectMultipleButton = () => {
    if (selectedButton === 'Multiple') {
      setfileCheckbox(!fileCheckbox);
    } else {
      setfileCheckbox(true);
    }
    setfolderCheckbox(false);
    setSelectedButton('Multiple');
    clearChosen();
  };

  const handleRenameButton = () => {
    if (selectedButton === 'Rename') {
      setfolderCheckbox(!folderCheckbox);
    } else {
      setfolderCheckbox(true);
    }
    setfileCheckbox(false);
    setSelectedButton('Rename');
    clearChosen();
  };

  const handleDeleteButton = () => {
    if (selectedButton === 'Delete') {
      setfileCheckbox(!fileCheckbox);
      setfolderCheckbox(!folderCheckbox);
    } else {
      setfileCheckbox(true);
      setfolderCheckbox(true);
    }

    setSelectedButton('Delete');
    clearChosen();
  };

  const onChooseFile = image => {
    addChosenFile(image);
  };

  const onChooseFolder = folder => {
    addChosenFolder(folder);
  };

  const handleUploadMultiple = () => {
    if (props.uploadMultiple) {
      props.uploadMultiple(chosen_files);
    } else {
      window.alert(
        'Define function for multiple upload where this component is called. Pass it as uploadMultiple in props',
      );
    }
  };

  const confirmDelete = () => {
    deleteMultipleRequest();
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
      <div className="flex items-center justify-between my-3">
        <div className="flex">
          <div className="flex relative">
            <input
              type="text"
              id="contents-name"
              placeholder="Search files by name"
              className="m-auto inputbox pr-6"
              value={query.search}
              onChange={handleQueryChange('search')}
              style={{ minWidth: '300px' }}
              onKeyPress={handleQueryEnter}
            />
            <span
              className="inline-flex border-l absolute right-0 top-0 h-8 px-2 mt-1 items-center cursor-pointer hover:text-blue-600"
              onClick={handleSearch}
            >
              <FaSearch />
            </span>
          </div>
        </div>

        <div className="flex items-center media_btn -mt-4">
          {selectedButton === 'Multiple' && chosen_files.length > 0 ? (
            <button
              onClick={handleUploadMultiple}
              className="blink items-center text-pink-500 flex btn bg-pink-100 border border-pink-200 hover:bg-pink-500 hover:text-white mr-2 hover:border-pink-500"
            >
              <FaImages className="text-base mr-2" />
              <span>Upload Multiple</span>
            </button>
          ) : (
            <button
              onClick={handleSelectMultipleButton}
              className="items-center text-pink-500 flex btn bg-pink-100 border border-pink-200 hover:bg-pink-500 hover:text-white mr-2 hover:border-pink-500"
            >
              <FaImages className="text-base mr-2" />
              <span>Select Multiple</span>
            </button>
          )}

          <Dropzone onDrop={file => handleFileUpload(file, self._id)}>
            {({ getRootProps, getInputProps }) => (
              <div
                className="items-center flex btn text-green-500 bg-green-100 border border-green-200 hover:bg-green-500 hover:border-green-500 mr-2 hover:text-white cursor-pointer"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <FaImage className="text-base mr-2" />
                <span>Choose File</span>
              </div>
            )}
          </Dropzone>
          <button
            onClick={handleAdd}
            className="items-center flex btn text-blue-500 bg-blue-100 border border-blue-200 hover:bg-blue-500 hover:border-blue-500 mr-2 hover:text-white"
          >
            <FaPlusCircle className="text-base mr-2" />
            <span>New Folder</span>
          </button>
          <button
            onClick={handleRenameButton}
            className="items-center flex text-orange-500 bg-orange-100 border border-orange-200 hover:border-orange-500 hover:bg-orange-500 btn mr-2 hover:text-white"
          >
            <FaPenSquare className="text-base mr-2" />
            <span>Rename</span>
          </button>
          {selectedButton === 'Delete' &&
          (chosen_files.length > 0 || chosen_folders.length > 0) ? (
            <button
              onClick={confirmDelete}
              className="blink items-center flex btn bg-red-100 border border-red-200 text-red-500 hover:bg-red-500 hover:border-red-500 hover:text-white"
            >
              <FaTrash className="text-base mr-2" />
              <span>Confirm Delete</span>
            </button>
          ) : (
            <button
              onClick={handleDeleteButton}
              className="items-center flex btn bg-red-100 border border-red-200 text-red-500 hover:bg-red-500 hover:border-red-500 hover:text-white"
            >
              <FaTrash className="text-base mr-2" />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>
      <div className="my-auto">
        <BreadCrumb
          linkcomponent={LinkComponent}
          routeList={routeList}
          onClick={onClick}
        />
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

      <Dialog
        open={showRename}
        onClose={closeFileRename}
        aria-labelledby="rename-file"
      >
        <DialogTitle>Rename File</DialogTitle>
        <DialogContent>
          <input
            autoFocus
            id="rename"
            type="text"
            className="inputbox"
            onChange={handleEditFile}
            value={rename_file.renamed_name}
            onKeyDown={handleFileEnter}
          />
        </DialogContent>
        <DialogActions>
          <button
            onClick={closeFileRename}
            color="bg-secondary px-4 py-2 text-sm rounded text-white flex items-center"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveFileRename}
            className="bg-primary px-4 py-2 text-sm rounded text-white flex items-center"
          >
            Save
          </button>
        </DialogActions>
      </Dialog>

      {/* end file rename */}
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
      <div className="flex flex-wrap bg-white mt-2 p-4">
        <p className="italic w-full block py-2">
          Note : Please Click the given button first for selecting{' '}
          <span className="font-bold">
            Multiple Images, Renaming folders and Deleting files
          </span>
          !!!
        </p>
        {folders.data.map(each => (
          <div
            className="mediaCont border rounded p-1 relative overflow-hidden mr-4 hover:border-primary"
            key={each._id}
            onMouseOver={() => handleMouseOver(each._id)}
            onMouseLeave={() => handleMouseOver('')}
          >
            <div className={`${folderCheckbox ? '' : 'mediaCheck'} absolute`}>
              {selectedButton === 'Rename' && (
                <button
                  className="hover:text-blue-500"
                  onClick={() => handleRename(each._id, each.name)}
                >
                  <Edit />
                </button>
              )}
              {selectedButton === 'Delete' && (
                <>
                  <div className="checkbox">
                    <input
                      id="secondary"
                      type="checkbox"
                      onClick={() => addChosenFolder(each)}
                    />
                    <label htmlFor="secondary">
                      <span className="box">
                        <FaCheck className="check-icon" />
                      </span>
                    </label>
                  </div>
                </>
              )}
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
                <FaFolder
                  className="text-yellow-500 self-center"
                  style={{ fontSize: '6rem' }}
                />
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
            {selectedButton === 'Rename' && (
              <button
                className="hover:text-blue-500"
                onClick={() => handleRenameFile(each._id, each.renamed_name)}
              >
                <Edit />
              </button>
            )}
            <div className={`${fileCheckbox ? '' : 'mediaCheck'} absolute`}>
              {selectedButton === 'Multiple' && (
                <div className="checkbox">
                  <input
                    id="multipleselect"
                    type="checkbox"
                    onClick={() => onChooseFile(each)}
                  />
                  <label htmlFor="multipleselect">
                    <span className="box">
                      <FaCheck className="check-icon" />
                    </span>
                  </label>
                </div>
              )}
              {selectedButton === 'Delete' && (
                <div className="checkbox">
                  <input
                    id="dltmultiple"
                    type="checkbox"
                    onClick={() => addChosenFile(each)}
                  />
                  <label htmlFor="dltmultiple">
                    <span className="box">
                      <FaCheck className="check-icon" />
                    </span>
                  </label>
                </div>
              )}
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
              <div className="truncate text-sm">{each.renamed_name}</div>
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
  chosen: makeSelectChosen(),
  chosen_files: makeSelectChosenFiles(),
  chosen_folders: makeSelectChosenFolders(),
  fileRenameLoading: makeSelectFileRenameLoading(),
  rename_file: makeSelectRenameFile(),
  showRename: makeSelectShowRename(),
  query: makeSelectQuery(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(withConnect)(FileList);
