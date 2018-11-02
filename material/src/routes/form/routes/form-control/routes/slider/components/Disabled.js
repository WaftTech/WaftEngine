import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    width: 300,
  },
};

function DisabledSlider(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Slider value={0} disabled />
      <Slider value={50} disabled />
      <Slider value={100} disabled />
    </div>
  );
}

DisabledSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

const DisabledSlider1 = withStyles(styles)(DisabledSlider);


const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Disabled</div>
      <div className="box-body d-flex justify-content-center">
        <DisabledSlider1 />
      </div>
    </div>
  )
}

export default Box;