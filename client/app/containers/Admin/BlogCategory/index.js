/**
 *
 * BlogCategory
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
import { Link } from 'react-router-dom';

import Table from 'components/Table';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';
import * as mapDispatchToProps from './actions';
import { DATE_FORMAT } from '../../App/constants';
import reducer from './reducer';
import saga from './saga';
import Loading from '../../../components/Loading';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import lid from '../../../assets/img/lid.svg';
import { FaPencilAlt, FaPlus, FaSearch } from 'react-icons/fa';

/* eslint-disable react/prefer-stateless-function */
export class BlogCategory extends React.PureComponent {
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

  handleEdit = id => {
    this.props.push(`/admin/blog-cat-manage/edit/${id}`);
  };

  handleOpen = id => {
    this.setState({ open: true, deleteId: id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = id => {
    this.props.deleteCatRequest(id);
    this.setState({ open: false });
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };

  handleAdd = () => {
    this.props.clearOne();
    this.props.push('/admin/blog-cat-manage/add');
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
      ({ title, image, slug_url, is_active, added_at, updated_at, _id }) => [
        <Link className="text-blue-500" target="_blank" to={`/blog/category/${_id}`}>{title}</Link>,
        (image && image.fieldname) || '',
        '' + is_active,
        moment(added_at).format(DATE_FORMAT),
        moment(updated_at ? updated_at : added_at).format(DATE_FORMAT),
        <>
          <div className="flex">
            <span
              className="w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative edit-icon"
              onClick={() => this.handleEdit(_id)}
            >
              <FaPencilAlt className="pencil" />

              {/* <img className="pencil" src={pencil} alt="" /> */}
              <span className="bg-blue-500 dash" />
            </span>

            <span
              className="ml-4 w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-red-100 rounded-full relative trash-icon"
              onClick={() => this.handleOpen(_id)}
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
        <DeleteDialog
          open={this.state.open}
          doClose={this.handleClose}
          doDelete={() => this.handleDelete(this.state.deleteId)}
        />
        <Helmet>
          <title>Blog Category Listing</title>
        </Helmet>
        <div className="flex justify-between my-3">
          {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>Blog Category Manage</PageHeader>
          <div className="flex items-center">
            <button
              className="bg-blue-500 border border-blue-600 px-3 py-2 leading-none inline-flex items-center cursor-pointer hover:bg-blue-600 transition-all duration-100 ease-in text-sm text-white rounded"
              onClick={this.handleAdd}
            >
              <FaPlus />
              <span className="pl-2">Add New</span>
            </button>
          </div>
        </div>
        <PageContent loading={loading}>
          <div className="flex relative mr-4 max-w-sm">
            <input
              type="text"
              name="find_title"
              id="doc-title"
              placeholder="Search Blog Category"
              className="m-auto inputbox pr-6"
              value={query.find_title}
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

          <Table
            tableHead={[
              'Title',
              'Image',
              'Is Active',
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
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({
  key: 'BlogCategory',
  reducer,
});
const withSaga = injectSaga({ key: 'BlogCategory', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BlogCategory);
