/**
 *
 * SubModules
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectLoading, makeSelectQuery } from './selectors';
import reducer from './reducer';
import saga from './saga';

import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import Table from '../../../components/Table';
import lid from '../../../assets/img/lid.svg';
import { FaPencilAlt, FaPlus, FaSearch } from 'react-icons/fa';
const key = 'subModules';

export const SubModules = props => {
  const {
    all: { data, page, size, totaldata },
    query,
    loading,
    classes,
    loadAllRequest,
    clearOne,
    setQueryValue,
    deleteOneRequest,
    push,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [open, setOpen] = useState(false);
  const [deletedId, setDeletedID] = useState('');

  useEffect(() => {
    loadAllRequest(query);
  }, []);

  const handleAdd = () => {
    clearOne();
    push('/admin/sub-modules/add');
  };

  const handleEdit = id => {
    push(`/admin/sub-modules/edit/${id}`);
  };

  const handleQueryChange = e => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleOpen = id => {
    setOpen(true);
    setDeletedID(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePagination = ({ page, size }) => {
    loadAllRequest({ page, size });
  };

  const handleSearch = () => {
    loadAllRequest(query);
  };

  const handleDelete = id => {
    deleteOneRequest(id);
    setOpen(false);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const tablePagination = { page, size, totaldata };

  const tableData = data.map(
    ({ module_group, order, description, _id, module_group_main }) => [
      module_group,
      order,
      description,
      module_group_main,
      <>
        <div className="flex">
          <span
            className="w-12 h-12 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative edit-icon"
            onClick={() => this.handleEdit(_id)}
          >
            <FaPencilAlt className="pencil" />
            <span className="bg-blue-500 dash" />
          </span>
          <span
            className="ml-4 w-12 h-12 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-red-100 rounded-full relative trash-icon"
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
    <>
      <Helmet>
        <title>Sub Modules Manage</title>
      </Helmet>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deletedId)}
      />
      <div className="flex justify-between my-3">
        {loading && loading == true ? <Loading /> : <></>}
        <PageHeader>Sub Modules Manage</PageHeader>
        <div className="flex items-center">
          <button
            className="bg-blue-500 border border-blue-600 px-3 py-2 leading-none inline-flex items-center cursor-pointer hover:bg-blue-600 transition-all duration-100 ease-in text-sm text-white rounded"
            onClick={handleAdd}
          >
            <FaPlus />
            <span className="pl-2">Add Sub-Module</span>
          </button>
        </div>
      </div>
      <PageContent loading={loading}>
        <div className="inline-flex relative mr-4 w-64 mt-4">
          <input
            type="text"
            name="find_title"
            id="contents-title"
            placeholder="Search by title"
            className="m-auto inputbox pr-6"
            value={query.find_title}
            // value="test"
            onChange={handleQueryChange}
            onKeyPress={handleKeyPress}
          />
          <span
            className="inline-flex border-l absolute right-0 top-0 h-8 px-2 mt-1 items-center cursor-pointer hover:text-blue-600"
            onClick={handleSearch}
          >
            <FaSearch />
          </span>
        </div>

        <Table
          tableHead={[
            'Module Group',
            'Order',
            'Description',
            'Module Group Main',
            'Action',
          ]}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
        />
      </PageContent>
    </>
  );
};

SubModules.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
  all: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    totaldata: PropTypes.number.isRequired,
  }),
  push: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

export default compose(
  withConnect,
  memo,
)(SubModules);
