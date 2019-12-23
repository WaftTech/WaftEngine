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
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';

// core components
import Table from 'components/Table';
import * as mapDispatchToProps from './actions';

import { DATE_FORMAT } from '../../App/constants';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
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
      is_active ? 'Active' : 'In active',
      <>
       <div className="flex">
            <button
              aria-label="Edit"
              className=" px-1 text-center leading-none"
              onClick={() => handleEdit(_id)}
            >
              <i className="material-icons text-base text-indigo-500 hover:text-indigo-700">
                edit
              </i>
            </button>

            <button
              className="ml-2 px-1 text-center leading-none"
              onClick={() => handleOpen(_id)}
            >
              <i className="material-icons text-base text-red-400 hover:text-red-600">
                delete
              </i>
            </button>
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
      <div className="flex justify-between mt-3 mb-3">
        {loading && loading === true ? <Loading /> : <></>}
        <PageHeader>Menu Manage</PageHeader>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          round="true"
          onClick={handleAdd}
          elevation={0}
        >
          <AddIcon />
        </Fab>
      </div>
      <PageContent loading={loading}>
        <div className="flex">
          <div className="flex relative mr-2">
            <input
              type="text"
              name="find_title"
              id="contents-name"
              placeholder="Search Menu by title"
              className="m-auto inputbox"
              value={query.find_title}
              onChange={handleQueryChange}
              style={{ paddingRight: '50px' }}
            />
            <IconButton
              aria-label="Search"
              className={`${classes.waftsrch} waftsrchstyle`}
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </div>

          <div className="waftformgroup relative flex">
            <input
              type="text"
              name="find_key"
              id="contents-key"
              placeholder="Search Menu  by key"
              className="m-auto inputbox pr-6"
              value={query.find_key}
              onChange={handleQueryChange}
              style={{ paddingRight: '50px' }}
            />
            <IconButton
              aria-label="Search"
              className={`${classes.waftsrch} waftsrchstyle`}
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
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
    margin: theme.spacing.unit,
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
