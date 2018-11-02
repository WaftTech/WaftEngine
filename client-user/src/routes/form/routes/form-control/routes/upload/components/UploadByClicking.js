import React from 'react';
import { Upload } from 'antd';
import Button from '@material-ui/core/Button';
import MaterialIcon from 'components/MaterialIcon';

const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  },
};

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Upload by clicking</div>
      <div className="box-body">
        <Upload {...props}>
          <Button variant="contained">
            <MaterialIcon icon="cloud_upload" className="font-24 mr-1" /> Click to Upload
          </Button>
        </Upload>
      </div>
    </div>
  )
}

export default Box;