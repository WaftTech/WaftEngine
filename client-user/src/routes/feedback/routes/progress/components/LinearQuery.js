import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function LinearQuery(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress variant="query" />
      <br />
      <LinearProgress color="secondary" variant="query" />
    </div>
  );
}

LinearQuery.propTypes = {
  classes: PropTypes.object.isRequired,
};

const LinearQuery1 = withStyles(styles)(LinearQuery);

const Section = () => (
  <article className="article">
    <div className="article-title-v2">Linear Query <span className="triangle triangle-down"></span></div>
    <LinearQuery1 />
  </article>
)

export default Section;
