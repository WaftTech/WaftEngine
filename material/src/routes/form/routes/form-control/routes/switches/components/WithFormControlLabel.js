import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class SwitchLabels extends React.Component {
  state = {
    checkedA: true,
    checkedB: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedA}
              onChange={this.handleChange('checkedA')}
              value="checkedA"
            />
          }
          label="Secondary"
        />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedB}
              onChange={this.handleChange('checkedB')}
              value="checkedB"
              color="primary"
            />
          }
          label="Primary"
        />
        <FormControlLabel control={<Switch value="checkedC" />} label="Uncontrolled" />
        <FormControlLabel disabled control={<Switch value="checkedD" />} label="Disabled" />
        <FormControlLabel disabled control={<Switch checked value="checkedE" />} label="Disabled" />
      </FormGroup>
    );
  }
}

const Box = () => (
  <div className="box box-default">
    <div className="box-header">With FormControlLabel</div>
    <div className="box-body py-5">
      <SwitchLabels />
    </div>
  </div>
)

export default Box;
