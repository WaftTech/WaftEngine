import React from 'react';
import DEMO from 'constants/demoData';
import OutlinedButton from 'components/OutlinedButton';


function OutlinedButtons() {
  return (
    <div>
      <OutlinedButton className="btn-w-md"> Default </OutlinedButton><div className="divider" />
      <OutlinedButton color="primary" className="btn-w-md"> Primary </OutlinedButton><div className="divider" />
      <OutlinedButton color="secondary" className="btn-w-md"> Secondary </OutlinedButton><div className="divider" />
      <OutlinedButton disabled className="btn-w-md"> Disabled </OutlinedButton><div className="divider" />
      <OutlinedButton href={DEMO.link} className="btn-w-md"> Link </OutlinedButton><div className="divider" />
      <input
        accept="image/*"
        className="d-none"
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <OutlinedButton component="span" className="btn-w-md"> Upload </OutlinedButton>
      </label>
    </div>
  );
}

const Box = () => (
  <div className="box box-default mb-4">
    <div className="box-header">Outlined Buttons</div>
    <div className="box-body py-5 text-center">
      <OutlinedButtons />
    </div>
  </div>
)

export default Box;
