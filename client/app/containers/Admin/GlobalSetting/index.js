/**
 *
 * GlobalSetting
 *
 */

import React, { memo, useEffect, useState } from 'react';
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
  makeSelectSubTypes,
  makeSelectWithdraw,
  makeSelectTypes,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import Loading from '../../../components/Loading';
import Table from '../../../components/Table';
import { FaPencilAlt, FaPlus, FaTrashAlt, FaSearch } from 'react-icons/fa';
import DeleteDialog from '../../../components/DeleteDialog';

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
    loadTypeRequest,
    loadSubTypeRequest,
    types,
    sub_types,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  useEffect(() => {
    loadWithdrawRequest(query);
    loadTypeRequest();
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
    if (e.target.name === 'find_type') {
      loadSubTypeRequest(e.target.value);
      setQueryValue({ key: 'find_sub_type', value: '' });
    }
  };

  const handleSearch = () => {
    loadWithdrawRequest(query);
    setQueryValue({ key: 'page', value: 1 });
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleOpen = id => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = id => {
    props.deleteOneRequest(id);
    setOpen(false);
  };

  const tablePagination = { page, size, totaldata };

  const tableData = data.map(
    ({ key, sub_type, value, type, is_active, is_removable, _id }) => [
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
          {is_removable && is_removable === true && (
            <span
              className="w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative edit-icon"
              onClick={() => handleOpen(_id)}
            >
              <FaTrashAlt className="text-red-400 text-lg" />
            </span>
          )}
        </div>
      </>,
    ],
  );

  return (
    <>
      <Helmet>
        <title>Global Settings </title>
      </Helmet>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deleteId)}
      />
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
        <div className="flex items-center">
          <div className="flex-1 px-2">
            <select
              type="text"
              name="find_type"
              id="module-name"
              placeholder="Search by type"
              className="inputbox"
              value={query.find_type}
              onChange={handleQueryChange}
            >
              <option value="">Choose type</option>
              {types &&
                types.length > 0 &&
                types.map((each, index) => (
                  <option value={each} key={`ty-${index}`}>
                    {each}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex-1 px-2">
            <select
              type="text"
              name="find_sub_type"
              placeholder="Search by SubType"
              className="inputbox"
              value={query.find_sub_type || ''}
              onChange={handleQueryChange}
            >
              {query.find_type && query.find_type !== '' ? (
                <>
                  <option value="">Choose sub type</option>

                  {sub_types &&
                    sub_types.length > 0 &&
                    sub_types.map((each, index) => (
                      <option value={each} key={index}>
                        {each}
                      </option>
                    ))}
                </>
              ) : (
                  <option value="">Choose type first</option>
                )}
            </select>
          </div>

          <div className="flex-1 px-2">
            <input
              type="text"
              name="find_key"
              id="module-name"
              placeholder="Search by key"
              className="inputbox"
              value={query.find_key}
              onChange={handleQueryChange}
              onKeyDown={handleKeyPress}
            />

          </div>

          <div className="flex-1 px-2">
            <select
              name="find_removable"
              className="inputbox"
              value={query.find_removable || ''}
              onChange={handleQueryChange}
            >
              <option value="">Select Both</option>
              <option value="true">Removable</option>
              <option value="false">Not Removable</option>
            </select>
          </div>

          <div className="inline-flex-1 px-2">
            <span
              className=" inline-flex px-2 items-center cursor-pointer text-blue-500"
              onClick={handleSearch}
            >
              <FaSearch /> <span className="text-sm px-2">Search</span>
            </span>
          </div>
        </div>
        <Table
          tableData={tableData}
          tableHead={[
            'Type',
            'Sub Type',
            'Key',
            'Value',
            'Is active',
            'Actions',
          ]}
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
  types: makeSelectTypes(),
  sub_types: makeSelectSubTypes(),
});

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });
export default compose(withConnect, memo)(GlobalSetting);
