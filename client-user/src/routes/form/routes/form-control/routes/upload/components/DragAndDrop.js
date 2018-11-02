import React from 'react';
import { Upload } from 'antd';
import MaterialIcon from 'components/MaterialIcon';

const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      console.log(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  },
};

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Drag and Drop</div>
      <div className="box-body">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <MaterialIcon icon="inbox" style={{fontSize: '50px'}} />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
        </Dragger>
      </div>
    </div>
  )
}

export default Box;