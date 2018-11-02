import React from 'react';
import Button from '@material-ui/core/Button';
import DEMO from 'constants/demoData';


function ContainedButtons() {
  return (
    <div>
      <Button variant="contained" className="btn-w-md"> Default </Button><div className="divider" />
      <Button variant="contained" color="primary" className="btn-w-md"> Primary </Button><div className="divider" />
      <Button variant="contained" color="secondary" className="btn-w-md"> Secondary </Button><div className="divider" />
      <Button variant="contained" color="secondary" disabled className="btn-w-md"> Disabled </Button><div className="divider" />
      <Button variant="contained" href={DEMO.link} className="btn-w-md"> Link </Button><div className="divider" />
      <input
        accept="image/*"
        className="d-none"
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className="btn-w-md"> Upload </Button>
      </label>
    </div>
  );
}

const Box = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Contained Buttons</div>
    <div className="box-body py-5 text-center">
      <ContainedButtons />
    </div>
  </div>
)

export default Box;
