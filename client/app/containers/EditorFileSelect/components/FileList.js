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
  setFolderName,
  folderAdded,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!folderAdded) {
      setOpen(false);
    }
  }, [folderAdded]);

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
    loadNewFolderRequest(self._id);
  };

  const handleInput = e => {
    setFolderName({ key: 'name', value: e.target.value });
  };

  const handleFileUpload = (files, id) => {
    addMediaRequest({ file: files, folder_id: id });
  };

  const handleFolderLink = id => {
    const searchq = queryString.stringify({ ...queryObj, path: id });
    props.push({
      search: searchq,
    });
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

  return (
    <div style={{ backgroundColor: '#f2f2f2', flex: 1, height: '100%' }}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="new-folder">
        <DialogTitle>Folder name</DialogTitle>
        <DialogContent>
          <InputBase
            autoFocus
            margin="dense"
            id="name"
            label="New Folder"
            type="text"
            onChange={handleInput}
            value={one.name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <BreadCrumb
        linkcomponent={LinkComponent}
        routeList={routeList}
        onClick={onClick}
      />
      <div style={{ display: 'flex' }} className="m-2">
        <div className="w-1/2">
          <Dropzone onDrop={file => handleFileUpload(file, self._id)}>
            {({ getRootProps, getInputProps }) => (
              <section
                style={{ width: '100%' }}
                className="text-black hover:text-primary text-center self-start py-6 px-4 border border-gray-500 rounded-lg border-dashed cursor-pointer"
              >
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <span>Choose File</span>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <Button color="primary" onClick={handleAdd} elevation={0}>
          <AddIcon />
          New Folder
        </Button>
      </div>
      <div className="flex flex-wrap px-4 overflow-hidden m-2">
        {folders.data.map(each => (
          <div
            className="w-1/5 h-28 mb-4 p-1 text-center mr-4 bg-gray-300"
            key={each._id}
            onClick={() => handleFolderLink(each._id)}
            onKeyDown={() => handleFolderLink(each._id)}
            role="presentation"
          >
            {each.name}
          </div>
        ))}
        {files.data.map((each, index) => (
          <div
            key={each._id}
            className="w-1/5 h-28 mb-4 p-1 text-center mr-4 bg-gray-300"
          >
            <img
              className="w-full h-24 object-contain"
              src={`${IMAGE_BASE}${each.path}`}
              alt={each.filename}
              onClick={() => onSelect(each)}
              onKeyDown={() => handleFolderLink(each._id)}
              role="presentation"
            />
            <div className="overflow-hidden">{each.filename}</div>
          </div>
        ))}
        {folders.data.length < 1 && files.data.length < 1 && (
          <div>No Items</div>
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
  setFolderName: PropTypes.func.isRequired,
  folderAdded: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  one: makeSelectOne(),
  folderAdded: makeSelectfolderAddRequest(),
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
