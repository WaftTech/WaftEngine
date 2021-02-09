/**
 *
 * Contact
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import moment from 'moment';
import { Helmet } from 'react-helmet';

// core components
import Table from 'components/Table/Table';

import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';
import { DATE_FORMAT } from '../../App/constants';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import lid from '../../../assets/img/lid.svg';
import { FaRegEye, FaTrashAlt, FaSearch } from 'react-icons/fa';

/* eslint-disable react/prefer-stateless-function */
export class Contact extends React.Component {
  static propTypes = {
    loadAllRequest: PropTypes.func.isRequired,
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
  };

  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
  }

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  handleSearch = () => {
    this.props.loadAllRequest(this.props.query);
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };

  handleView = id => {
    this.props.push(`/admin/contact-manage/view/${id}`);
  };

  handleAdd = () => {
    this.props.clearOne();
    this.props.push('/admin/contact-manage/add');
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
    const { classes } = this.props;
    const {
      all: { data, page, size, totaldata },
      query,
      loading,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(({ name, email, subject, added_at, _id }) => [
      name,
      email,
      subject,
      moment(added_at).format(DATE_FORMAT),

      <div className="flex">
        <span
          className="w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative"
          onClick={() => this.handleView(_id)}
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
      </div>,
    ]);

    return (
      <>
        <DeleteDialog
          open={this.state.open}
          doClose={this.handleClose}
          doDelete={() => this.handleDelete(this.state.deleteId)}
        />
        <Helmet>
          <title>Contact List</title>
        </Helmet>
        <div className="flex justify-between my-3">
          {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>Contact List</PageHeader>
        </div>
        <PageContent loading={loading}>
          <div className="flex">
            <div className="flex relative mr-2">
              <input
                type="text"
                name="find_name"
                id="contact-name"
                placeholder="Search Contacts"
                className="m-auto inputbox pr-6"
                value={query.find_name}
                onChange={this.handleQueryChange}
                onKeyDown={this.handleKeyPress}
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
            tableHead={['Name', 'Email', 'Subject', 'Added at', 'Actions']}
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

const withReducer = injectReducer({ key: 'adminContactListPage', reducer });
const withSaga = injectSaga({ key: 'adminContactListPage', saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(Contact);
