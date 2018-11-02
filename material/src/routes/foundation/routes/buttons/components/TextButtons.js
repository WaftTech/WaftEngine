import React from 'react';
import Button from '@material-ui/core/Button';
import DEMO from 'constants/demoData';

function TextButtons() {
  return (
    <div>
      <Button className="btn-w-md">Default</Button><div className="divider" />
      <Button color="primary" className="btn-w-md"> Primary </Button><div className="divider" />
      <Button color="secondary" className="btn-w-md"> Secondary </Button><div className="divider" />
      <Button disabled className="btn-w-md"> Disabled </Button><div className="divider" />
      <Button href={DEMO.link} className="btn-w-md"> Link </Button><div className="divider" />
      <input
        accept="image/*"
        className="d-none"
        id="flat-button-file"
        multiple
        type="file"
      />
      <label htmlFor="flat-button-file">
        <Button component="span" className="btn-w-md"> Upload </Button>
      </label>
    </div>
  );
}


const Box = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Text Buttons</div>
    <div className="box-body py-5 text-center">
      <TextButtons />
    </div>
  </div>
)

export default Box;