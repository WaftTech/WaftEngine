import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectOne } from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';

class AddEdit extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    classes: PropTypes.object.isRequired,
    one: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
  }

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  handleChecked = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.checked });
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  handleBack = () => {
    this.props.push('/admin/role-manage');
  };

  render() {
    const {
      classes,
      match: {
        params: { id },
      },
      one,
    } = this.props;
    return (
      <React.Fragment>
        <PageHeader> {id ? 'Edit' : 'Add'} Role</PageHeader>
        <PageContent>
          <Grid container spacing={24}>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                required
                id="role_title"
                label="Role Title"
                value={one.role_title}
                onChange={this.handleChange('role_title')}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: 'true',
                }}
              />
              <TextField
                variant="outlined"
                required
                id="description"
                label="Descrition"
                value={one.description}
                onChange={this.handleChange('description')}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: 'true',
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    name="is_active"
                    checked={one.is_active}
                    onChange={this.handleChecked('is_active')}
                  />
                }
                label="Is Active"
              />
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            {/* <Button onClick={this.handleBack} className={classes.button}>
                Back
              </Button> */}
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSave}
              className={classes.button}
            >
              Save
            </Button>
          </div>
        </PageContent>
      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({ key: 'adminRoleManage', reducer });
const withSaga = injectSaga({ key: 'adminRoleManage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const styles = theme => ({});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(AddEdit);
