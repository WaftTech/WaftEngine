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
import Dialog from 'components/Dialog/index';
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
import lid from '../../../assets/img/lid.svg';

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
            <span
              className="w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative"
              onClick={() => this.handleShow(_id, error_stack)}
            >
             <FaRegEye className="text-base text-blue-500" />
            </span>
            <span
              className="ml-4 w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-red-100 rounded-full relative trash-icon"
              onClick={() => this.handleOpen(_id)}
            >
              <img className="trash-lid" src={lid} alt="trash-id" />
              <span className="w-3 h-3 rounded-b-sm bg-red-500 mt-1" />
            </span>
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

<Dialog
          open={this.state.show}
          className="w-5/6"
          onClose={this.handleClose}
          title={`Error Stack`}
          body={
            <p>{this.state.stack}</p>
          }
          actions={
            <button
              type="button"
              className="block btn margin-none text-white bg-red-500 border border-red-600 hover:bg-red-600"
              onClick={this.handleClose}
            >
              Close 
            </button>
          }/>
        {/* <Dialog open={this.state.show} maxWidth="md" onClose={this.handleClose}>
          <DialogTitle>Error Stack</DialogTitle>
          <DialogContent>
            <p>{this.state.stack}</p>
          </DialogContent>
        </Dialog> */}
        <Helmet>
          <title>Error Listing</title>
        </Helmet>
        <div className="flex justify-between my-3">
          {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>Error Manage</PageHeader>
          <button
            className="items-center flex btn bg-red-100 border border-red-200 text-red-500 hover:bg-red-500 hover:border-red-500 hover:text-white"
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

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Error);
