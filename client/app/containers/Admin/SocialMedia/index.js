/**
 *
 * Social Media
 *
 */

import { push } from 'connected-react-router';
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Table from '../../../components/Table';
import { makeSelectAccess } from '../../App/selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectAll, makeSelectLoading, makeSelectQuery } from './selectors';

export const SocialMedia = props => {
  const {
    all: { data, page, size, totalData, sort },
    loadAllRequest,
    clearOne,
    clearQuery,
    setQueryValue,
    query,
    loading,
    classes,
    push,
    access,
    deleteOneRequest,
  } = props;

  useEffect(() => {
    clearQuery();
  }, []);
  //   console.log(query);
  useEffect(() => {
    loadAllRequest(query);
  }, [query && query.size, query && query.page]);

  const [open, setOpen] = useState(false);
  const [deletedId, setDeletedID] = useState(false);
  const [accessList, setAccessList] = useState([]);

  useEffect(() => {
    setAccessList(access[window.location.pathname]);
  }, [access]);

  //   console.log(accessList, 'accesslist');
  //   console.log('data', data);

  const handleEdit = id => {
    push(`/admin/social-media/edit/${id}`);
  };

  const handleOpen = id => {
    setOpen(true);
    setDeletedID(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = id => {
    deleteOneRequest(id);
    setOpen(false);
  };

  const handleAdd = () => {
    clearOne();
    push('/admin/social-media/add');
  };

  const handleQueryChange = e => {
    e.persist();
    setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleSearch = () => {
    loadAllRequest(query);
  };

  const handlePagination = ({ page, size }) => {
    setQueryValue({ key: 'page', value: page });
    setQueryValue({ key: 'size', value: size });
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSortChange = name => {
    let value = 'desc';
    console.log(sort[name]);
    if (sort[name] === -1) {
      value = 'asc';
    }
    setQueryValue({ key: 'sort', value: `${name}:${value}` });
  };

  const tablePagination = { page, size, totaldata: totalData };
  const tableData = data.map(({ _id, title, url, order, is_active }) => [
    title,
    url,
    order,
    is_active ? 'true' : 'false',
    //   moment(date).format('ll'),
    <>
      <div className="flex justify-center">
        {accessList.includes('edit') && (
          <button
            type="button"
            aria-label="Edit"
            className="btn inline-flex items-center justify-center text-green-500 bg-green-100 border border-green-200 hover:bg-green-500 hover:border-green-500 mr-2 hover:text-white cursor-pointer"

            onClick={() => handleEdit(_id)}
          >
            <FaPencilAlt className="tblpencil text-xs text-blue-400 hover:text-blue-500" />
          </button>
        )}

        {accessList.includes('delete') && (
          <button
            type="button"
            className="btn inline-flex items-center justify-center text-green-500 bg-green-100 border border-green-200 hover:bg-green-500 hover:border-green-500 mr-2 hover:text-white cursor-pointer"

            onClick={() => handleOpen(_id)}
          >
            <FaTrash className="tbltrash text-xs text-red-400 hover:text-red-500" />
          </button>
        )}
      </div>
    </>,
  ]);

  return (
    <>
      <div>
        <Helmet>
          <title>Social Media Manage</title>
        </Helmet>
      </div>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deletedId)}
      />
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading == true ? <Loading /> : <></>}
        <PageHeader>Social Media Manage</PageHeader>
        {accessList.includes('add') && (
          <div className="flex items-center">
            <button className="btn inline-flex items-center justify-center text-green-500 bg-green-100 border border-green-200 hover:bg-green-500 hover:border-green-500 mr-2 hover:text-white cursor-pointer"
              onClick={handleAdd}>
              <div className="flex items-center">
                <FaPlus />
                <span className="pl-2"> Add New</span>
              </div>
            </button>
          </div>
        )}
      </div>
      <PageContent loading={loading}>
        <div className="bg-white p-2 border border-b-0">
          <div className="flex justify-end">
            <div className="waftformgroup flex relative">
              <input
                type="text"
                name="find_social"
                id="contents-title"
                placeholder="Search Social Media by title"
                className="m-auto inputbox"
                //   value={query.find_social}
                onChange={handleQueryChange}
                style={{ minWidth: '300px', paddingRight: '50px' }}
                onKeyPress={handleKeyPress}
              />
              <span
                className="bg-primary inline-flex absolute right-0 top-0 h-full px-2 items-center cursor-pointer text-white hover:bg-secondary"
                onClick={handleSearch}
              >
                <FaSearch />
              </span>
            </div>
          </div>
        </div>
        {/* {accessList.includes('list') && ( */}
        <Table
          tableHead={['Title', 'Url', 'Order', 'Is Active', 'Action']}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
          emptyDataMsg="No Social Media Found"
          loading={loading}
          isSN
          ispublic
        />
        {/* )} */}
      </PageContent>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
  access: makeSelectAccess(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'socialMedia', reducer });
const withSaga = injectSaga({ key: 'socialMedia', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(SocialMedia);

// import React from 'react';

// function SocialMedia() {
//   return <div>social media page</div>;
// }

// export default SocialMedia;
