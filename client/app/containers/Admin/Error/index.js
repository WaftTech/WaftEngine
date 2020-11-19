/**
 *
 * Error
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import View from '@material-ui/icons/RemoveRedEyeOutlined';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

// core components
import Table from 'components/Table';

import { DATE_FORMAT } from '../../App/constants';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import { FaRegEye, FaTrashAlt, FaSearch } from 'react-icons/fa';

const styles = theme => ({
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

/* eslint-disable react/prefer-stateless-function */
export class Error extends React.Component {
  static propTypes = {
    loadAllRequest: PropTypes.func.isRequired,
    errorDeleteRequest: PropTypes.func.isRequired,
    deleteAllRequest: PropTypes.func.isRequired,
    setQueryValue: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
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
    show: false,
    showId: '',
    stack: '',
  };

  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
  }

  handleOpen = id => {
    this.setState({ open: true, deleteId: id });
  };

  handleOpenAll = id => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, show: false });
  };

  handleCloseAll = () => {
    this.setState({ open: false });
  };

  handleDelete = id => {
    this.props.errorDeleteRequest(id);
    this.setState({ open: false, deleteId: '' });
  };

  handleDeleteAll = () => {
    this.props.deleteAllRequest();
    this.setState({ open: false });
  };

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  handleSearch = () => {
    this.props.loadAllRequest(this.props.query);
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };

  handleShow = (id, stack) => {
    this.setState({ showId: id, show: true, stack });
  };

  render() {
    const { classes } = this.props;
    const {
      all: { data, page, size, totaldata },
      query,
      loading,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(
      ({
        error_message,
        error_stack,
        error_type,
        added_at,
        count,
        last_added_at,
        _id,
      }) => [
        error_message,
        error_type,
        count,
        moment(added_at).format(DATE_FORMAT),
        last_added_at != null
          ? moment(last_added_at).format(DATE_FORMAT)
          : moment(added_at).format(DATE_FORMAT),
        <React.Fragment>
          <div className="flex">
            <button
              aria-label="Edit"
              className=" px-1 text-center leading-none"
              onClick={() => this.handleShow(_id, error_stack)}
            >
              <FaRegEye className="text-base text-blue-500 hover:text-blue-600" />
            </button>

            <button
              className="ml-2 px-1 text-center leading-none"
              onClick={() => this.handleOpen(_id)}
            >
              <FaTrashAlt className="text-base text-red-500 hover:text-red-600" />
            </button>
          </div>
        </React.Fragment>,
      ],
    );
    return (
      <>
        <DeleteDialog
          open={this.state.open}
          doClose={this.handleClose}
          doDelete={() =>
            this.state.deleteId && this.state.deleteId != ''
              ? this.handleDelete(this.state.deleteId)
              : this.handleDeleteAll()
          }
        />
        <Dialog open={this.state.show} maxWidth="md" onClose={this.handleClose}>
          <DialogTitle>Error Stack</DialogTitle>
          <DialogContent>
            <p>{this.state.stack}</p>
          </DialogContent>
        </Dialog>
        <Helmet>
          <title>Error Listing</title>
        </Helmet>
        <div className="flex justify-between mt-3 mb-3">
          {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>Error Manage</PageHeader>
          <button
            className="btn bg-danger hover:bg-secondary"
            onClick={this.handleOpenAll}
          >
            Delete All
          </button>
        </div>
        <PageContent loading={loading}>
          <div className="flex">
            <div className="flex relative">
              <input
                type="text"
                name="find_errors"
                id="error-message"
                placeholder="Search Errors"
                className="m-auto inputbox pr-6"
                value={query.find_errors}
                onChange={this.handleQueryChange}
              />

              <span
                className="inline-flex border-l absolute right-0 top-0 h-8 px-2 mt-1 items-center cursor-pointer hover:text-blue-600"
                onClick={this.handleSearch}
              >
                <FaSearch />
              </span>
            </div>
          </div>
          <Table
            tableHead={[
              'Error Message',
              'Error Type',
              'Count',
              'First Encountered At',
              'Last Encountered At',
              'Actions',
              '',
            ]}
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
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'adminErrorManagePage', reducer });
const withSaga = injectSaga({ key: 'adminErrorManagePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(Error);
