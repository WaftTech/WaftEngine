import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function LinearIndeterminate(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress />
      <br />
      <LinearProgress color="secondary" />
    </div>
  );
}

LinearIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

const LinearIndeterminate1 = withStyles(styles)(LinearIndeterminate);

const Section = () => (
  <article className="article">
    <div className="article-title-v2">Linear Indeterminate <span className="triangle triangle-down"></span></div>
    <LinearIndeterminate1 />
  </article>
)

export default Section;
