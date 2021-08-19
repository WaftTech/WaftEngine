/**
 *
 * Subscribe
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import { Helmet } from 'react-helmet';

import Table from 'components/Table/Table';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';

import { DATE_FORMAT } from '../../App/constants';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import { FaTrashAlt, FaRegEye, FaSearch } from 'react-icons/fa';
import lid from '../../../assets/img/lid.svg';

/* eslint-disable react/prefer-stateless-function */
export class Subscribe extends React.Component {
  static propTypes = {
    loadSubscriberRequest: PropTypes.func.isRequired,
    setQueryValue: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
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
    this.props.loadSubscriberRequest(this.props.query);
  }

  shouldComponentUpdate(props) {
    if (this.state.cleared) {
      this.setState({ cleared: false });
      props.loadSubscriberRequest(props.query);
    }
    if (
      props.query.size != this.props.query.size ||
      props.query.page != this.props.query.page
    ) {
      props.loadSubscriberRequest(props.query);
    }
    return true;
  }

  handlePagination = paging => {
    this.props.setQueryValue({ key: 'page', value: paging.page });
    this.props.setQueryValue({ key: 'size', value: paging.size });
  };

  handleView = id => {
    this.props.push(`/admin/subscribe-manage/view/${id}`);
  };

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({
      key: e.target.name,
      value: e.target.value,
    });
  };

  handleSearch = () => {
    this.props.loadSubscriberRequest(this.props.query);
    this.props.setQueryValue({ key: 'page', value: 1 });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
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
    const tableData = data.map(({ _id, email, is_subscribed, added_at }) => [
      email,
      `${is_subscribed}`,
      moment(added_at).format(DATE_FORMAT),

      <React.Fragment>
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
        </div>
      </React.Fragment>,
    ]);
    return (
      <>
        <DeleteDialog
          open={this.state.open}
          doClose={this.handleClose}
          doDelete={() => this.handleDelete(this.state.deleteId)}
        />
        <Helmet>
          <title>Subscriber List</title>
        </Helmet>
        <div className="flex justify-between my-3">
          {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>Subscribe Manage</PageHeader>
        </div>
        <PageContent loading={loading}>
          <div className="inline-flex relative mr-4 w-64 mt-4">
            <input
              type="text"
              name="find_email"
              id="email"
              placeholder="Search Subscriber"
              className="m-auto inputbox pr-6"
              value={query.find_email}
              onChange={this.handleQueryChange}
              onKeyDown={this.handleKeyPress}
            />
            <span
              className="inline-flex border-l absolute right-0 top-0 h-8 px-2 mt-1 items-center cursor-pointer text-blue-500"
              onClick={this.handleSearch}
            >
              <FaSearch />
            </span>
          </div>

          <Table
            tableHead={['Email', 'Is Subscribed', 'Added at', 'Actions']}
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

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });

const withReducer = injectReducer({ key: 'adminSubscribePage', reducer });
const withSaga = injectSaga({ key: 'adminSubscribePage', saga });

export default compose(withReducer, withSaga, withConnect)(Subscribe);
