import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';

// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import BackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import Loading from '../../../../components/Loading';
import Input from '../../../../components/customComponents/Input';
import '../../../../components/Table/table.css';

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
    this.props.clearErrors();
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
    const { classes, one, match, loading, errors } = this.props;
    return loading && loading == true ? (
      <Loading />
    ) : (
        <React.Fragment>
          <Helmet>
            <title>
              {match && match.params && match.params.id
                ? 'Edit Role'
                : 'Add Role'}
            </title>
          </Helmet>
          <div className="flex justify-between mt-3 mb-3">
            <PageHeader>
              <IconButton
                className={`${classes.backbtn} cursor-pointer`}
                onClick={this.handleBack}
                aria-label="Back"
              >
                <BackIcon />
              </IconButton>
              {match && match.params && match.params.id
                ? 'Edit Role'
                : 'Add Role'}
            </PageHeader>
          </div>
          <PageContent>
            <div className="w-full md:w-1/2 pb-4">
              <Input
                label="Role Title"
                inputclassName="inputbox"
                inputid="role_title"
                inputType="text"
                value={one.role_title}
                onChange={this.handleChange('role_title')}
                error={errors.role_title}
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className="font-bold text-gray-700">Description</label>
              <textarea
                className="inputbox"
                id="description"
                type="text"
                value={one.description}
                onChange={this.handleChange('description')}
                required
              />
              <div id="component-error-text">{errors.description}</div>
            </div>

            {/* <button type="button" className="block btn bg-info hover:bg-secondary"  onClick={this.handleAddSlide}>Manage Modules</button>
            <div className="bg-white mt-2 shadow">
              <div className="p-2 border-b">
                <div className="flex relative justify-end">
                  <input
                    type="text"
                    name="module_name"
                    id="module_name"
                    placeholder="Search By Module Name"
                    className="inputbox"
                    style={{ width: '250px', paddingRight: '50px' }}
                  />
                  <IconButton
                    aria-label="Search"
                    className={`${classes.waftsrch} waftsrchstyle`}
                  >
                    <SearchIcon />
                  </IconButton>
                </div>
              </div>
              <table className="w-full text-left table table-auto">
                <thead>
                  <tr>
                    <th className="py-2 px-2 font-bold text-sm text-gray-800 border-b border-gray-300">Module Name</th>
                    <th className="py-2 px-2 font-bold text-sm text-gray-800 border-b border-gray-300">View</th>
                    <th className="py-2 px-2 font-bold text-sm text-gray-800 border-b border-gray-300">Add</th>
                    <th className="py-2 px-2 font-bold text-sm text-gray-800 border-b border-gray-300">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-1 text-sm border-gray-300 text-gray-800">Page Management</td>
                    <td className="px-2 py-1 text-sm border-gray-300 text-gray-800">
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            name="is_active"
                            style={{ paddingTop: '0', paddingBottom: '0' }}
                          />
                        }
                      /></td>
                    <td className="px-2 py-1 text-sm border-gray-300 text-gray-800">
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            name="is_active"
                            style={{ paddingTop: '0', paddingBottom: '0' }}
                          />
                        }
                      /></td>
                    <td className="px-2 py-1 text-sm border-gray-300 text-gray-800">
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            name="is_active"
                            style={{ paddingTop: '0', paddingBottom: '0' }}
                          />
                        }
                      /></td>
                  </tr>

                  <tr>
                    <td className="px-2 py-1 text-sm border-gray-300 text-gray-800">Menu Management</td>
                    <td className="px-2 py-1 text-sm border-gray-300 text-gray-800">
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            name="is_active"
                            style={{ paddingTop: '0', paddingBottom: '0' }}
                          />
                        }
                      /></td>
                    <td className="px-2 py-1 text-sm border-gray-300 text-gray-800">
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            name="is_active"
                            style={{ paddingTop: '0', paddingBottom: '0' }}
                          />
                        }
                      /></td>
                    <td className="px-2 py-1 text-sm border-gray-300 text-gray-800">
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            name="is_active"
                            style={{ paddingTop: '0', paddingBottom: '0' }}
                          />
                        }
                      /></td>
                  </tr>

                  <tr>
                    <td className="px-2 py-1 text-sm border-gray-300 text-gray-800">Dashboard</td>
                    <td className="px-2 py-1 text-sm border-gray-300 text-gray-800">
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            name="is_active"
                            style={{ paddingTop: '0', paddingBottom: '0' }}
                          />
                        }
                      /></td>
                    <td className="px-2 py-1 text-sm border-gray-300 text-gray-800">
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            name="is_active"
                            style={{ paddingTop: '0', paddingBottom: '0' }}
                          />
                        }
                      /></td>
                    <td className="px-2 py-1 text-sm border-gray-300 text-gray-800">
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            name="is_active"
                            style={{ paddingTop: '0', paddingBottom: '0' }}
                          />
                        }
                      /></td>
                  </tr>
                </tbody>
              </table>
            </div> */}

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



            <button
              className="block btn bg-primary hover:bg-secondary"
              onClick={this.handleSave}
            >
              Save
          </button>
          </PageContent>
        </React.Fragment>
      );
  }
}

const withReducer = injectReducer({ key: 'adminRole', reducer });
const withSaga = injectSaga({ key: 'adminRole', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const styles = theme => ({
  backbtn: {
    padding: 0,
    height: '40px',
    width: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: '50%',
    marginRight: '5px',
  },

  waftsrch: {
    padding: 0,
    position: 'absolute',
    borderLeft: '1px solid #d9e3e9',
    borderRadius: 0,
    '&:hover': {
      background: 'transparent',
      color: '#404040',
    },
  },
});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(AddEdit);
