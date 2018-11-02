import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class CircularStatic extends React.Component {
  timer = null;

  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 10 });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CircularProgress className={classes.progress} variant="static" value={5} />
        <CircularProgress className={classes.progress} variant="static" value={25} />
        <CircularProgress className={classes.progress} variant="static" value={50} />
        <CircularProgress className={classes.progress} variant="static" value={75} />
        <CircularProgress className={classes.progress} variant="static" value={100} />
        <CircularProgress
          className={classes.progress}
          variant="static"
          value={this.state.completed}
        />
      </div>
    );
  }
}

CircularStatic.propTypes = {
  classes: PropTypes.object.isRequired,
};

const CircularStatic1 = withStyles(styles)(CircularStatic);

const Section = () => (
  <article className="article">
    <div className="article-title-v2">Circular Indeterminate <span className="triangle triangle-down"></span></div>
    <CircularStatic1 />
  </article>
)

export default Section;
