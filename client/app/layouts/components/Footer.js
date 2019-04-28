import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'redux';

const styles = {};
class Footer extends React.Component {
  state = { email: '' };

  handleSave = e => {
    e.preventDefault();
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { email } = this.state;
    const { classes } = this.props;

    return (
      <footer>
        <p className={classes.poweredBy}>Powered By: Waft Technology</p>
      </footer>
    );
  }
}

Footer.propTypes = { classes: PropTypes.object.isRequired };
const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
)(Footer);
