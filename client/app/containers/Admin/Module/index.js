/**
 *
 * AdminModuleManage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import Select from '../../../components/Select';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Table from 'components/Table';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';

import {
  makeSelectAll,
  makeSelectLoading,
  makeSelectQuery,
  makeSelectSubModules,
} from './selectors';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Loading from '../../../components/Loading';
import lid from '../../../assets/img/lid.svg';
import { FaPlus, FaSearch, FaPencilAlt, FaKey } from 'react-icons/fa';

/* eslint-disable react/prefer-stateless-function */
export class AdminModuleManage extends React.Component {
  static propTypes = {
    loadAllRequest: PropTypes.func.isRequired,
    setQueryValue: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    clearOne: PropTypes.func.isRequired,
    all: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
  };

  state = { tempGroup: null };

  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
    this.props.loadSubModuleRequest();
  }

  shouldComponentUpdate(props) {
    if (this.state.cleared) {
      this.setState({ cleared: false });
      props.loadAllRequest(props.query);
    }
    if (
      props.query.size != this.props.query.size ||
      props.query.page != this.props.query.page
    ) {
      props.loadAllRequest(props.query);
    }
    return true;
  }

  handleAdd = () => {
    this.props.clearOne();
    this.props.push('/admin/module-manage/add');
  };

  handleEdit = id => {
    this.props.push(`/admin/module-manage/edit/${id}`);
  };

  handleAccessEdit = id => {
    this.props.push(`/admin/module-manage/access/${id}`);
  };

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  handleKeyPress = e => {
    console.log('keydown');
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleSearch = () => {
    this.props.loadAllRequest(this.props.query);
    this.props.setQueryValue({ key: 'page', value: 1 });
  };

  handlePagination = paging => {
    this.props.setQueryValue({ key: 'page', value: paging.page });
    this.props.setQueryValue({ key: 'size', value: paging.size });
  };

  handleDropdown = event => {
    this.setState({ tempGroup: event });
    this.props.setQueryValue({ key: 'find_module_group', value: event.label });
  };

  render() {
    const {
      classes,
      all: { data, page, size, totaldata },
      query,
      loading,
      groups,
    } = this.props;

    const tablePagination = { page, size, totaldata };
    const tableData = data.map(
      ({ _id, module_name, description, module_group }) => [
        (module_group && module_group.module_group) || '-',
        module_name,
        description,
        <>
          <div className="flex">
            <span
              className="w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-green-100 rounded-full relative"
              onClick={() => this.handleAccessEdit(_id)}
            >
              <FaKey className="text-base text-green-500 hover:text-green-600" />
            </span>
            <span
              className="ml-4 w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative edit-icon"
              onClick={() => this.handleEdit(_id)}
            >
              <FaPencilAlt className="pencil" />

              {/* <img className="pencil" src={pencil} alt="" /> */}
              <span className="bg-blue-500 dash" />
            </span>
          </div>
        </>,
      ],
    );

    const groupOptions =
      groups && groups.length > 0
        ? groups.map(each => {
          const obj = { label: each.module_group, value: each._id };
          return obj;
        })
        : [];

    return (
      <>
        <Helmet>
          <title>Module Manage</title>
        </Helmet>
        <div className="flex justify-between my-3">
          {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>Module Manage</PageHeader>
          <div className="flex items-center">
            <button
              className="bg-blue-500 border border-blue-600 px-3 py-2 leading-none inline-flex items-center cursor-pointer hover:bg-blue-600 transition-all duration-100 ease-in text-sm text-white rounded"
              onClick={this.handleAdd}
            >
              <FaPlus />
              <span className="pl-2">Add New</span>
            </button>
          </div>
        </div>

        <PageContent loading={loading}>
          <div className="flex">
            <div className="w-64">
              <Select
                name="find_module_group"
                id="module-group"
                placeholder="Search by Group"
                value={this.state.tempGroup}
                onChange={this.handleDropdown}
                options={groupOptions}
                onKeyDown={this.handleKeyPress}
              />
            </div>
            <div className="w-64 ml-3">
              <input
                type="text"
                name="find_module_name"
                id="module-name"
                placeholder="Search by Name"
                className="m-auto inputbox"
                value={query.find_module_name}
                onChange={this.handleQueryChange}
                onKeyDown={this.handleKeyPress}
              />
            </div>
            <span
              className="ml-3 inline-flex h-8 px-2 items-center cursor-pointer text-blue-500 text-sm"
              onClick={this.handleSearch}
            >
              <FaSearch className="mr-1" /> Search
            </span>
          </div>
          <Table
            tableHead={['Module Group', 'Module Name', 'Description', 'Action']}
            tableData={tableData}
            pagination={tablePagination}
            handlePagination={this.handlePagination}
          />
        </PageContent>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
  groups: makeSelectSubModules(),
});

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });

const withReducer = injectReducer({ key: 'adminModuleManage', reducer });
const withSaga = injectSaga({ key: 'adminModuleManage', saga });

export default compose(withReducer, withSaga, withConnect)(AdminModuleManage);
