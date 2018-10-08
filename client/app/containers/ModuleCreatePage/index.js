/**
 *
 * ModuleCreatePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectModuleCreatePage from './selectors';
import reducer from './reducer';
import saga from './saga';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  button: {
    margin: theme.spacing.unit,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class ModuleCreatePage extends React.Component {
  state = {
    json: '',
    info: '',
    name: 'Test Module',
    route: '',
    isShownInSidemenu: false,
  };
  handlePreview = () => {

  };
  handleSave = e => {
    e.preventDefault();
    console.log('submitting')
  };
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleCheckboxChange = e => this.setState({ [e.target.name]: e.target.checked });
  render() {
    const { json, info, name, route, isShownInSidemenu } = this.state;
    const { classes } = this.props;
    return (
      <form noValidate autoComplete="off" onSubmit={this.handleSave}>
        <Grid container spacing={24}>
          <Grid item xs={8}>
            <TextField
              id="module-json-input"
              label="JSON"
              name="json"
              multiline
              rows="8"
              className={classes.textField}
              value={json}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              id="module-info-input"
              label="Info"
              name="info"
              multiline
              rows="4"
              className={classes.textField}
              value={info}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="module-name-input"
              label="Module Name"
              name="name"
              className={classes.textField}
              value={name}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              id="module-route-input"
              label="Page Route"
              name="route"
              className={classes.textField}
              value={route}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="isShownInSidemenu"
                  checked={isShownInSidemenu}
                  onChange={this.handleCheckboxChange}
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                />
              }
              label="Is shown in Sidebar"
            />
            <br />
            <Button type="button" variant="contained" color="primary" className={classes.button}>
              Preview
            </Button>
            <Button type="submit" variant="contained" color="secondary" className={classes.button}>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

ModuleCreatePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  modulecreatepage: makeSelectModuleCreatePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'moduleCreatePage', reducer });
const withSaga = injectSaga({ key: 'moduleCreatePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(ModuleCreatePage);
