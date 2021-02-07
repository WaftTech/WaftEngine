/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import Select from 'react-select';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// core components
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
  makeSelectSubModules,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import PathComponent from './components/Path';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import PageContent from '../../../../components/PageContent/PageContent';
import Loading from '../../../../components/Loading';
import { FaArrowLeft, FaExchangeAlt } from 'react-icons/fa';

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
    errors: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.clearErrors();
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
    this.props.loadSubModuleRequest();
  }

  handleChange = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  handleDropdownChange = name => event => {
    this.props.setOneValue({ key: name, value: event.value });
  };

  handleChecked = name => event => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.checked });
  };

  handleAddPath = event => {
    event.persist();
    this.props.setOneValue({
      key: 'path',
      value: [
        ...this.props.one.path,
        { access_type: '', admin_routes: [], server_routes: [] },
      ],
    });
  };

  handleRemovePath = pathIndex => event => {
    event.persist();
    this.props.setOneValue({
      key: 'path',
      value: [
        ...this.props.one.path.slice(0, pathIndex),
        ...this.props.one.path.slice(pathIndex + 1),
      ],
    });
  };

  handleAccessTypeChange = pathIndex => event => {
    event.persist();

    this.props.setAccessTypeChange({ pathIndex, data: event.target.value });
  };

  handleAdminRoutesChange = (pathIndex, index) => event => {
    event.persist();

    this.props.setAdminRoutes({ pathIndex, index, data: event.target.value });
  };

  handleRemoveAdminRoute = (pathIndex, index) => event => {
    event.persist();

    this.props.removeAdminRoutes({
      pathIndex,
      index,
      data: event.target.value,
    });
  };

  handleAddAdminRoute = pathIndex => event => {
    event.persist();

    this.props.addAdminRoutes({
      pathIndex,
      data: event.target.value,
    });
  };

  handleServerRoutesMethodChange = (pathIndex, index) => event => {
    event.persist();

    this.props.setServerRouteMethod({
      pathIndex,
      index,
      data: event.target.value,
    });
  };

  handleServerRoutesRouteChange = (pathIndex, index) => event => {
    event.persist();

    this.props.setServerRouteChange({
      pathIndex,
      index,
      data: event.target.value,
    });
  };

  handleChangeAccess = () => {
    this.props.clearOne();
    this.props.push(
      `/admin/module-manage/access/${this.props.match.params.id}`,
    );
  };

  handleAddServerRoute = index => event => {
    event.persist();

    this.props.addServerRoutes({
      index,
    });
  };

  handleRemoveServerRoute = (pathIndex, index) => event => {
    event.persist();

    this.props.removeServerRoutes({
      pathIndex,
      index,
      data: event.target.value,
    });
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  handleBack = () => {
    this.props.push('/admin/module-manage');
  };

  render() {
    const {
      classes,
      match: {
        params: { id },
      },
      one,
      loading,
      errors,
      sub_modules,
    } = this.props;

    let listSubModulesNormalized = {};
    const listSubModules = sub_modules.map(each => {
      const obj = {
        label: each.module_group,
        value: each._id,
      };
      listSubModulesNormalized = {
        ...listSubModulesNormalized,
        [each._id]: obj,
      };
      return obj;
    });

    return loading && loading == true ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Helmet>
          <title>{id ? 'Edit' : 'Add'} Module</title>
        </Helmet>
        <div className="flex justify-between my-3">
          <PageHeader>
            <span className="backbtn" onClick={this.handleBack}>
              <FaArrowLeft className="text-xl" />
            </span>
            {id ? `Edit for ${one.module_name}` : 'Add Module'}
          </PageHeader>

          <div className="flex items-center">
            <button
              className="bg-blue-500 border border-blue-600 px-3 py-2 leading-none inline-flex items-center cursor-pointer hover:bg-blue-600 transition-all duration-100 ease-in text-sm text-white rounded"
              onClick={this.handleChangeAccess}
            >
              <FaExchangeAlt />
              <span className="pl-2">Change Accesss</span>
            </button>
          </div>
        </div>
        <PageContent>
          <div className="w-full md:w-1/2 pb-2">
            <label className="label">Module Name</label>
            <input
              className="inputbox"
              id="module_name"
              type="text"
              value={one.module_name}
              onChange={this.handleChange('module_name')}
            />
            {errors.module_name && (
              <div className="error">{errors.module_name}</div>
            )}
          </div>

          <div className="w-full md:w-1/2 pb-2">
            <label className="label">Description</label>
            <textarea
              className="inputbox"
              id="description"
              type="text"
              value={one.description}
              onChange={this.handleChange('description')}
            />
            {errors.description && (
              <div className="error">{errors.description}</div>
            )}
          </div>

          <div className="w-full md:w-1/2 pb-2">
            <label className="label">Sub Module</label>
            <Select
              className="React_Select"
              id="category"
              placeholder="Choose"
              value={listSubModulesNormalized[one.module_group] || null}
              classNamePrefix="select"
              onChange={this.handleDropdownChange('module_group')}
              isSearchable
              options={listSubModules}
              styles={customStyles}
            />
          </div>

          {one.path.map((each, pathIndex) => (
            <PathComponent
              key={`${each._id}-${pathIndex}`}
              each={each}
              pathIndex={pathIndex}
              handleAccessTypeChange={this.handleAccessTypeChange}
              handleAdminRoutesChange={this.handleAdminRoutesChange}
              handleRemoveAdminRoute={this.handleRemoveAdminRoute}
              handleAddAdminRoute={this.handleAddAdminRoute}
              handleServerRoutesMethodChange={
                this.handleServerRoutesMethodChange
              }
              handleServerRoutesRouteChange={this.handleServerRoutesRouteChange}
              handleRemoveServerRoute={this.handleRemoveServerRoute}
              handleAddServerRoute={this.handleAddServerRoute}
              handleRemovePath={this.handleRemovePath}
            />
          ))}

          <div className="flex">
            <button
              className="block btn text-white bg-green-500 border border-green-600 hover:bg-green-600 mr-2"
              onClick={this.handleAddPath}
            >
              Add Access Type
            </button>

            <button
              className="block btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
              onClick={this.handleSave}
            >
              Save
            </button>
          </div>
        </PageContent>
      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({ key: 'adminModuleManage', reducer });
const withSaga = injectSaga({ key: 'adminModuleManage', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  sub_modules: makeSelectSubModules(),
});

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: '#fff',
    borderColor: '#e0e3e8',
    minHeight: '35px',
    height: '35px',
    width: '100%',
    boxShadow: state.isFocused ? null : null,
    marginRight: '8px',
  }),
  placeholder: state => ({
    color: '#000',
    fontSize: '15px',
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
};

export default compose(withReducer, withSaga, withConnect)(AddEdit);
