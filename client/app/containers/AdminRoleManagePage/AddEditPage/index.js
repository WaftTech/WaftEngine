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
import BackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';

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
        {/* <PageHeader> {id ? 'Edit' : 'Add'} Role</PageHeader> */}
        <div class="flex justify-between mt-1 mb-1">
        <PageHeader>
        <IconButton className="cursor-pointer"	 onClick={this.handleBack} aria-label="Back">
          <BackIcon />
        </IconButton></PageHeader>
        </div>
        <PageContent>
            <div class="w-full md:w-1/2 pb-4">
            <label class="block uppercase tracking-wide text-grey-darker text-xs mb-2">
            Role Title
            </label>
            <input class="Waftinputbox" id="role_title" type="text"  value={one.role_title}
                       onChange={this.handleChange('role_title')} required/>
          </div>

          <div class="w-full md:w-1/2 pb-4">
            <label class="block uppercase tracking-wide text-grey-darker text-xs mb-2">
            Description
            </label>
            <textarea class="Waftinputbox" id="description" type="text"   value={one.description}
                       onChange={this.handleChange('description')} required/>
          </div>
             
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
      <br/>
          
              <button class="text-white py-2 px-4 rounded mt-4 btn-waft" onClick={this.handleSave}>
              Save
              </button>
        
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
