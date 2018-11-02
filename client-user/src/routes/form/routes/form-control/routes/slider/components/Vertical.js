import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    display: 'flex',
    height: 300,
    width: '60px'
  },
};

class VerticalSlider extends React.Component {
  state = {
    value: 50,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Slider value={value} onChange={this.handleChange} vertical />
        <Slider value={value} onChange={this.handleChange} vertical reverse />
      </div>
    );
  }
}

VerticalSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

const VerticalSlider1 = withStyles(styles)(VerticalSlider);

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Vertical</div>
      <div className="box-body d-flex justify-content-center">
        <VerticalSlider1 />
      </div>
    </div>
  )
}

export default Box;