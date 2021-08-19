/**
 *
 * AdminRole
 *
 */

import Table from 'components/Table';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  FaKey,
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaTrashAlt,
} from 'react-icons/fa';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectAll, makeSelectLoading, makeSelectQuery } from './selectors';
import lid from '../../../assets/img/lid.svg';

/* eslint-disable react/prefer-stateless-function */
export class AdminRole extends React.Component {
  static propTypes = {
    loadAllRequest: PropTypes.func.isRequired,
    setQueryValue: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    clearOne: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
    all: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
  };

  state = {
    open: false,
    deleteId: '',
  };

  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
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

  handlePagination = paging => {
    this.props.setQueryValue({ key: 'page', value: paging.page });
    this.props.setQueryValue({ key: 'size', value: paging.size });
  };

  handleAdd = () => {
    this.props.clearOne();
    this.props.push('/admin/role-manage/add');
  };

  handleAccess = id => {
    this.props.push(`/admin/role-manage/access/${id}`);
  };

  handleEdit = id => {
    this.props.push(`/admin/role-manage/edit/${id}`);
  };

  handleQueryChange = event => {
    event.persist();
    this.props.setQueryValue({
      key: event.target.name,
      value: event.target.value,
    });
  };

  handleSearch = () => {
    this.props.loadAllRequest(this.props.query);
    this.props.setQueryValue({ key: 'page', value: 1 });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleOpen = id => {
    this.setState({ open: true, deleteId: id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = id => {
    this.props.deleteOneRequest(id);
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      all: { data, page, size, totaldata },
      query,
      loading,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(
      ({ _id, role_title, description, is_active }) => [
        role_title,
        description,
        `${is_active}`,
        <>
          <div className="flex">
            <span
              className="w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-green-100 rounded-full relative"
              onClick={() => this.handleAccess(_id)}
            >
              <FaKey className="text-base text-green-500 hover:text-green-600" />
            </span>
            <span
              className="ml-4 w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative edit-icon"
              onClick={() => this.handleEdit(_id)}
            >
              <FaPencilAlt className="pencil" />
              <span className="bg-blue-500 dash" />
            </span>

            <span
              className="ml-4 w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-red-100 rounded-full relative trash-icon"
              onClick={() => this.handleOpen(_id)}
            >
              <img className="trash-lid" src={lid} alt="trash-id" />
              <span className="w-3 h-3 rounded-b-sm bg-red-500 mt-1" />
            </span>
          </div>
        </>,
      ],
    );

    return (
      <React.Fragment>
        <DeleteDialog
          open={this.state.open}
          doClose={this.handleClose}
          doDelete={() => this.handleDelete(this.state.deleteId)}
        />
        <Helmet>
          <title>Role Manage</title>
        </Helmet>
        <div className="flex justify-between my-3">
          {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>Role Manage</PageHeader>

          <div className="flex items-center">
            <button
              className="bg-blue-500 border border-blue-600 px-3 py-2 leading-none inline-flex items-center cursor-pointer hover:bg-blue-600 transition-all duration-100 ease-in text-sm text-white rounded"
              onClick={this.handleAdd}
            >
              <FaPlus />
              <span className="pl-2">Add Role</span>
            </button>
          </div>
        </div>
        <PageContent loading={loading}>
          <div className="inline-flex relative mr-4 w-64 mt-4">
            <input
              type="text"
              name="find_role_title"
              id="role-title"
              placeholder="Search roles by title"
              className="m-auto inputbox pr-6"
              value={query.find_role_title}
              onChange={this.handleQueryChange}
              onKeyDown={this.handleKeyPress}
            />
            <span
              className="inline-flex border-l absolute right-0 top-0 h-8 px-2 mt-1 items-center cursor-pointer text-blue-500"
              onClick={this.handleSearch}
            >
              <FaSearch />
            </span>
          </div>

          <Table
            tableHead={['Title', 'Description', 'Is Active', 'Action']}
            tableData={tableData}
            pagination={tablePagination}
            handlePagination={this.handlePagination}
            loading={loading}
          />
        </PageContent>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
});

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });

const withReducer = injectReducer({ key: 'adminRole', reducer });
const withSaga = injectSaga({ key: 'adminRole', saga });

export default compose(withReducer, withSaga, withConnect)(AdminRole);
