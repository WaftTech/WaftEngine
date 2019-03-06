import React from 'react';

const ModuleName = props => {
  return (
    <CustomInput
      labelText="Module Name"
      id="module-name"
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        value: ModuleName,
        onChange: this.handleChange('ModuleName'),
      }}
    />
  );
};
export default ModuleName;
