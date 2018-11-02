import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MaterialIcon from 'components/MaterialIcon';


function InputWithIcon(props) {

  return (
    <div>
      <FormControl className="m-2">
        <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <MaterialIcon icon="account_circle" className="font-24" />
            </InputAdornment>
          }
        />
      </FormControl>
      <TextField
        className="m-2"
        id="input-with-icon-textfield"
        label="TextField"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MaterialIcon icon="account_circle" className="font-24" />
            </InputAdornment>
          ),
        }}
      />
      <div className="m-2">
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <MaterialIcon icon="account_circle" className="font-24" />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="With a grid" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const Box = () => (
  <div className="box box-default">
    <div className="box-header">With Icons</div>
    <div className="box-body py-5">
      <InputWithIcon />
    </div>
  </div>
)

export default Box;
