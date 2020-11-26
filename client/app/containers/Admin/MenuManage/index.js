/**
 *
 * MenuManage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import Table from 'components/Table';
import * as mapDispatchToProps from './actions';

import { DATE_FORMAT } from '../../App/constants';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import lid from '../../../assets/img/lid.svg';
import {
  FaRegQuestionCircle,
  FaPlus,
  FaSearch,
  FaPencilAlt,
} from 'react-icons/fa';
import { makeSelectAll, makeSelectLoading, makeSelectQuery } from './selectors';
import reducer from './reducer';
import saga from './saga';

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
  }, []);

  const handleAdd = () => {
    props.clearOne();
    props.push('/admin/menu-manage/add');
  };
  const handleEdit = id => {
    props.push(`/admin/menu-manage/edit/${id}`);
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
  };

  const handlePagination = paging => {
    props.loadAllRequest(paging);
  };

  const tablePagination = { page, size, totaldata };
  const tableData = data.map(
    ({ title, key: itemKey, order, is_active, _id }) => [
      title || '',
      itemKey || '',
      order || '',
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
            className="w-12 h-12 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative edit-icon"
            onClick={() => handleEdit(_id)}
          >
            <FaPencilAlt className="pencil" />
            <span className="bg-blue-500 dash" />
          </span>
          <span
            className="ml-4 w-12 h-12 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-red-100 rounded-full relative trash-icon"
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
          {/* <span
            className="inline-block text-blue-500 hover:text-blue-600 h text-xl px-5 cursor-pointer"
            onClick={this.toggleHelp}
          >
            <FaRegQuestionCircle />

            {this.state.help && <span className="arrow_box" />}
          </span> */}
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
            />
            <span
              className="inline-flex border-l absolute right-0 top-0 h-8 px-2 mt-1 items-center cursor-pointer hover:text-blue-600"
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
            />
            <span
              className="inline-flex border-l absolute right-0 top-0 h-8 px-2 mt-1 items-center cursor-pointer hover:text-blue-600"
              onClick={handleSearch}
            >
              <FaSearch />
            </span>
          </div>
        </div>

        <Table
          tableHead={['Title', 'Key', 'Order', 'Is Active', 'Action']}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={handlePagination}
        />
      </PageContent>
    </>
  );
};

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
  fab: {
    width: '40px',
    height: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  tableActionButton: {
    padding: 0,
    '&:hover': {
      background: 'transparent',
      color: '#404040',
    },
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

MenuManage.propTypes = {
  // defaultActionRequest: PropTypes.func.isRequired,
  // defaultData: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
});

const withStyle = withStyles(styles);

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(
  withConnect,
  memo,
  withStyle,
)(MenuManage);
