/**
 *
 * CommentManagePage
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

import Dialog from '../../../components/Dialog/index';

import Table from 'components/Table';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectAll,
  makeSelectQuery,
  makeSelectLoading,
  makeSelectRequesting,
} from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { DATE_FORMAT } from '../../App/constants';
import Loading from '../../../components/Loading';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';

import { FaRegEye, FaCheck, FaSearch } from 'react-icons/fa';

/* eslint-disable react/prefer-stateless-function */
export class BlogCommentManagePage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loadAllRequest: PropTypes.func.isRequired,
    all: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
  };

  state = {
    selected: [],
    selectAll: false,
    selectApproved: false,
    selectDisapproved: false,
    open: false,
    status: '',
  };

  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.requesting != this.props.requesting) {
      if (!nextProps.requesting) {
        this.setState({ open: false });
      }
    }
  }

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  handleCheckedQueryChange = name => e => {
    e.persist();
    this.props.setQueryValue({ key: name, value: e.target.checked });
    if (name === 'find_is_approved' && this.props.query.find_is_disapproved) {
      this.props.setQueryValue({ key: 'find_is_disapproved', value: false });
    }
    if (name === 'find_is_disapproved' && this.props.query.find_is_approved) {
      this.props.setQueryValue({ key: 'find_is_approved', value: false });
    }
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

  handleEnter = e => {
    if (e.key === 'Enter') {
      this.props.loadAllRequest(this.props.query);
    }
  };

  handleView = id => {
    this.props.push(`/admin/comment/view/${id}`);
  };

  handleSelectApproved = () => {
    if (this.state.selectApproved === false) {
      this.props.getApprovedRequest(this.props.query);
    } else {
      this.props.loadAllRequest(this.props.query);
    }
    this.setState({ selectApproved: !this.state.selectApproved });
  };

  handleSelectDisapproved = () => {
    if (this.state.selectDisapproved === false) {
      this.props.getDisapprovedRequest(this.props.query);
    } else {
      this.props.loadAllRequest(this.props.query);
    }
    this.setState({ selectDisapproved: !this.state.selectDisapproved });
  };

  handleSelectAll = all_ids => {
    if (this.state.selectAll === true) {
      this.setState(state => ({
        selectAll: !state.selectAll,
        selected: [],
      }));
    } else {
      this.setState(state => ({
        selectAll: !state.selectAll,
        selected: all_ids,
      }));
    }
  };

  handleOpen = status => {
    this.setState({ open: true, status });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    if (this.state.status === 'Approve') {
      this.props.approveRequest(this.state.selected);
    } else {
      this.props.disapproveRequest(this.state.selected);
    }
  };

  handleCheckedChange = id => {
    const index = this.state.selected.indexOf(id);
    if (index > -1) {
      let removed = [
        ...this.state.selected.slice(0, index),
        ...this.state.selected.slice(index + 1),
      ];
      this.setState({ selected: removed });
    } else {
      let added = [...this.state.selected, id];
      this.setState({ selected: added });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      all: { data, page, size, totaldata },
      query,
      loading,
      requesting,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const selectAll = data.map(e => e._id);
    const tableData = data.map(
      ({ title, blog_id, status, added_at, added_by, updated_at, _id }) => [
        <div className="checkbox">
          <input
            checked={this.state.selected.includes(_id) ? true : false}
            onChange={() => this.handleCheckedChange(_id)}
            type="checkbox"
            id={_id}
          />
          <label htmlFor={_id}>
            <span className="box">
              <FaCheck className="check-icon" />
            </span>
          </label>
        </div>,
        title,
        blog_id && blog_id.title,
        status || 'onhold',
        added_by && added_by.name,
        moment(added_at).format(DATE_FORMAT),
        moment(updated_at ? updated_at : added_at).format(DATE_FORMAT),
        <>
          <div className="flex">
            <span
              className="w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative"
              onClick={() => this.handleView(_id)}
            >
              <FaRegEye className="text-base text-blue-500" />
            </span>
          </div>
        </>,
      ],
    );
    return (
      <>
        <Helmet>
          <title>Blog Comments</title>
        </Helmet>
        <div className="flex justify-between my-3">
          {loading && loading === true ? <Loading /> : <></>}
          <PageHeader>Blog Comment Listing</PageHeader>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          title={`Blog Comment`}
          className="w-5/6 sm:w-80"
          body={
            <p className="p-2">
              Are you sure you want to {this.state.status} ?</p>
          }
          actions={
            <>
              <button
                onClick={this.handleClose}
                className="block btn margin-none text-white bg-red-500 border border-red-600 hover:bg-red-600 mr-1"
              >
                No
            </button>
              <button
                onClick={this.handleSave}
                className="block btn margin-none text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
              >
                Yes
            </button>
            </>
          }

        />
        <PageContent loading={loading}>
          <div className="flex items-center">
            <div className="inline-flex relative mr-4 w-64 mt-4">
              <input
                type="text"
                name="find_title"
                id="comment-title"
                placeholder="Search Blog Comment"
                className="m-auto inputbox pr-6"
                value={query.find_title}
                onChange={this.handleQueryChange}
                onKeyDown={this.handleEnter}
              />
              <span
                className="inline-flex border-l absolute right-0 top-0 h-8 px-2 mt-1 items-center cursor-pointer hover:text-blue-600"
                onClick={this.handleSearch}
                onKeyDown={this.handleKeyPress}
              >
                <FaSearch />
              </span>
            </div>

            <div className="inline-flex relative mr-4 w-64 mt-4">
              <input
                type="text"
                name="find_blog_id"
                id="blog-of-comment"
                placeholder="Search Blogs"
                className="m-auto inputbox pr-6"
                value={query.find_blog_id}
                onChange={this.handleQueryChange}
                onKeyDown={this.handleEnter}
              />
              <span
                className="inline-flex border-l absolute right-0 top-0 h-8 px-2 mt-1 items-center cursor-pointer hover:text-blue-600"
                onClick={this.handleSearch}
                onKeyDown={this.handleKeyPress}
              >
                <FaSearch />
              </span>
            </div>

            <div className="checkbox">
              <input
                checked={query.find_is_approved}
                onChange={this.handleCheckedQueryChange('find_is_approved')}
                id="is_approved"
                type="checkbox"
              />
              <label htmlFor="is_approved">
                <span className="box">
                  <FaCheck className="check-icon" />
                </span>
                Is Approved
              </label>
            </div>

            <div className="checkbox">
              <input
                checked={query.find_is_disapproved}
                onChange={this.handleCheckedQueryChange('find_is_disapproved')}
                id="is_disapprove"
                type="checkbox"
              />
              <label htmlFor="is_disapprove">
                <span className="box">
                  <FaCheck className="check-icon" />
                </span>
                Disapproved
              </label>
            </div>

            <div className="flex-1 text-right">
              <button
                className="btn text-green-500 bg-green-100 border border-green-200 mr-2"
                onClick={() => this.handleOpen('Approve')}
              >
                Approve
              </button>
              <button
                className="btn text-red-500 bg-red-100 border border-red-200"
                onClick={() => this.handleOpen('Disapprove')}
              >
                Disapprove
              </button>
            </div>
          </div>

          <Table
            tableHead={[
              <div className="checkbox">
                <input
                  id="select-all"
                  checked={this.state.selectAll}
                  onChange={() => this.handleSelectAll(selectAll)}
                  type="checkbox"
                />
                <label htmlFor="select-all">
                  <span className="box">
                    <FaCheck className="check-icon" />
                  </span>
                </label>
              </div>,
              'Comment Title',
              'Blog',
              'Status',
              'Added By',
              'Added At',
              'Updated At',
              'Actions',
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
  requesting: makeSelectRequesting(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({
  key: 'blogCommentManagePage',
  reducer,
});
const withSaga = injectSaga({ key: 'blogCommentManagePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BlogCommentManagePage);
