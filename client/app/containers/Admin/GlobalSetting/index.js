/**
 *
 * GlobalSetting
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import {
  makeSelectLoading,
  makeSelectQuery,
  makeSelectWithdraw,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import Loading from '../../../components/Loading';
import Table from '../../../components/Table';
import { FaPencilAlt, FaPlus, FaTrashAlt, FaSearch } from 'react-icons/fa';

const key = 'globalSetting';

export const GlobalSetting = props => {
  const {
    loading,
    withdraw: { data, size, page, totaldata },
    loadWithdrawRequest,
    push,
    setQueryValue,
    clearOne,
    query,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadWithdrawRequest(query);
  }, [query]);

  const handleChange = name => event => {
    event.persist();
    setOneValue({ key: name, value: event.target.value });
  };

  const handleAdd = () => {
    clearOne();
    push('/admin/global-setting/add');
  };

  const handleEdit = id => {
    clearOne();
    push(`/admin/global-setting/edit/${id}`);
  };

  const handlePagination = ({ page, size }) => {
    setQueryValue({ key: 'page', value: page });
    setQueryValue({ key: 'size', value: size });
  };

  const handleQueryChange = e => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleSearch = () => {
    loadWithdrawRequest(query);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const tablePagination = { page, size, totaldata };

  const tableData = data.map(({ key, sub_type, value, type, is_active, _id }) => [
    type,
    sub_type,
    key,

    `${value}`,
    `${is_active}`,

    <>
      <div className="flex">
        <span
          className="w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative edit-icon"
          onClick={() => handleEdit(_id)}
        >
          <FaPencilAlt className="pencil" />
          <span className="bg-blue-500 dash" />
        </span>
        {/* <span
              className="w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative edit-icon"
              onClick={() => handleOpen(_id)}
            >
              <FaTrashAlt className="text-red-400 text-lg" />
            </span> */}
      </div>
    </>,
  ]);

  return (
    <>
      <Helmet>
        <title>Global Settings </title>
      </Helmet>
      <div className="flex justify-between my-3">
        {loading && loading == true ? <Loading /> : <></>}
        <PageHeader>Global Settings </PageHeader>
        <div className="flex items-center">
          <button
            className="bg-blue-500 border border-blue-600 px-3 py-2 leading-none inline-flex items-center cursor-pointer hover:bg-blue-600 transition-all duration-100 ease-in text-sm text-white rounded"
            onClick={handleAdd}
          >
            <FaPlus />
            <span className="pl-2">Add New</span>
          </button>
        </div>
      </div>
      <PageContent loading={loading}>
        <div className="flex">
          <div className="flex relative mr-2">
            <input
              type="text"
              name="find_type"
              id="module-name"
              placeholder="Search by type"
              className="m-auto inputbox pr-6"
              value={query.find_type}
              onChange={handleQueryChange}
              onKeyDown={handleKeyPress}
            />
            <span
              className=" inline-flex border-l absolute right-0 top-0 h-8 px-2 mt-1 items-center cursor-pointer text-blue-500"
              onClick={handleSearch}
            >
              <FaSearch />
            </span>
          </div>
          <div className="flex relative">
            <input
              type="text"
              name="find_key"
              id="module-name"
              placeholder="Search by key"
              className="m-auto inputbox pr-6"
              value={query.find_key}
              onChange={handleQueryChange}
              onKeyDown={handleKeyPress}
            />
            <span
              className=" inline-flex border-l absolute right-0 top-0 h-8 px-2 mt-1 items-center cursor-pointer text-blue-500"
              onClick={handleSearch}
            >
              <FaSearch />
            </span>
          </div>

        </div>
        <Table
          tableData={tableData}
          tableHead={['Type', 'Sub Type', 'Key', 'Value', 'Is active', 'Actions']}
          pagination={tablePagination}
          handlePagination={handlePagination}
        />
      </PageContent>
    </>
  );
};

GlobalSetting.propTypes = {
  loadWithdrawRequest: PropTypes.func.isRequired,
  withdraw: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  withdraw: makeSelectWithdraw(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
});

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });
export default compose(withConnect, memo)(GlobalSetting);
