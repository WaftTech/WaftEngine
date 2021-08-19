/**
 *
 * MenuManage
 *
 */

// core components
import Table from 'components/Table';
import { push } from 'connected-react-router';
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaPencilAlt, FaPlus, FaSearch, FaBars } from 'react-icons/fa';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import lid from '../../../assets/img/lid.svg';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import PageContent from '../../../components/PageContent/PageContent';
import PageHeader from '../../../components/PageHeader/PageHeader';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectAll, makeSelectLoading, makeSelectQuery } from './selectors';

const key = 'menuManage';

export const MenuManage = props => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [open, setOpen] = useState(false);
  const [deletedId, setDeletedId] = useState('');

  const {
    all: { data, page, size, totaldata },
    query,
    loading,
    classes,
    loadAllRequest,
  } = props;

  useEffect(() => {
    loadAllRequest(query);
    props.setLoadChild(false);
    props.clearOne();
  }, [query]);

  const handleAdd = () => {
    props.clearOne();
    props.push('/admin/menu-manage/add');
  };
  const handleEdit = id => {
    props.push(`/admin/menu-manage/edit/${id}`);
  };

  const handleChildEdit = id => {
    props.push(`/admin/menu-manage/edit/${id}`);
    props.setLoadChild(true);
  };
  const handleView = slug_url => {
    props.push(`/blog/${slug_url}`);
  };
  const handleOpen = id => {
    setOpen(true);
    setDeletedId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = id => {
    props.deleteOneRequest(id);
    setOpen(false);
  };

  const handleQueryChange = e => {
    e.persist();
    props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  const handleSearch = () => {
    props.loadAllRequest(props.query);
    props.setQueryValue({ key: 'page', value: 1 });
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePagination = paging => {
    props.setQueryValue({ key: 'page', value: paging.page });
    props.setQueryValue({ key: 'size', value: paging.size });
  };

  const tablePagination = { page, size, totaldata };
  const tableData = data.map(
    ({ title, key: itemKey, order, is_active, _id }) => [
      title || '',
      itemKey || '',
      // order || '',
      <>
        {is_active ? (
          <span className="label-active">active</span>
        ) : (
          <span className="label-inactive">inactive</span>
        )}
      </>,
      <>
        <div className="flex">
          <span
            className="w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative edit-icon"
            onClick={() => handleEdit(_id)}
          >
            <FaPencilAlt className="pencil" />
            <span className="bg-blue-500 dash" />
          </span>

          <span
            onClick={() => handleChildEdit(_id)}
            className="w-8 h-8 inline-flex justify-center items-center ml-2 text-blue-500"
          >
            <FaBars />{' '}
          </span>
          <span
            className="ml-2 w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-red-100 rounded-full relative trash-icon"
            onClick={() => handleOpen(_id)}
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
      <div>
        <Helmet>
          <title>MenuManage</title>
          <meta name="description" content="Description of MenuManage" />
        </Helmet>
      </div>
      <DeleteDialog
        open={open}
        doClose={handleClose}
        doDelete={() => handleDelete(deletedId)}
      />
      <div className="flex justify-between my-3">
        {loading && loading === true ? <Loading /> : <></>}
        <PageHeader>Menu Manage</PageHeader>
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
              name="find_title"
              id="contents-name"
              placeholder="Search by title"
              className="m-auto inputbox pr-6"
              value={query.find_title}
              onChange={handleQueryChange}
              onKeyDown={handleKeyPress}
            />
            <span
              className="inline-flex border-l absolute right-0 top-0 h-8 px-2 mt-1 items-center cursor-pointer text-blue-500"
              onClick={handleSearch}
            >
              <FaSearch />
            </span>
          </div>

          <div className="waftformgroup relative flex">
            <input
              type="text"
              name="find_key"
              id="contents-key"
              placeholder="Search by key"
              className="m-auto inputbox pr-6"
              value={query.find_key}
              onChange={handleQueryChange}
              onKeyDown={handleKeyPress}
            />
            <span
              className="inline-flex border-l absolute right-0 top-0 h-8 px-2 mt-1 items-center cursor-pointer text-blue-500"
              onClick={handleSearch}
            >
              <FaSearch />
            </span>
          </div>
        </div>

        <Table
          tableHead={['Title', 'Key', 'Is Active', 'Action']}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
        />
      </PageContent>
    </>
  );
};

MenuManage.propTypes = {
  // defaultActionRequest: PropTypes.func.isRequired,
  // defaultData: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
});

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });
export default compose(withConnect, memo)(MenuManage);
