/**
 *
 * Breadcrumb
 *
 */

import React from 'react';
import CKEditor from 'react-ckeditor-component';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const CkEditor = props => {
  const { description, setOneValue } = props;
  const handleEditorChange = (e, name) => {
    const newContent = e.editor.getData();
    setOneValue({ key: name, value: newContent });
  };
  return (
    <div className="flex-1">
      <CKEditor
        name="description"
        content={description}
        // scriptUrl="https://cdn.ckeditor.com/4.6.2/full/ckeditor.js"
        config={{
          allowedContent: true,
          image_previewText: ' ',
          filebrowserBrowseUrl: '/editor-file-select',
          filebrowserUploadUrl: '/api/media/multiple',
        }}
        events={{
          change: e => handleEditorChange(e, 'description'),
          value: description,
        }}
      />
    </div>
  );
};

CkEditor.propTypes = {
  description: PropTypes.string,
  setOneValue: PropTypes.func,
};

CkEditor.defaultProps = { description: 'description' };

export default withRouter(CkEditor);
