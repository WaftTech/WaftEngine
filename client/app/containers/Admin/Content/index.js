import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import { Helmet } from 'react-helmet';

import Table from 'components/Table';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import {
  makeSelectAll,
  makeSelectQuery,
  makeSelectLoading,
  makeSelectShowForm,
} from './selectors';

import { DATE_FORMAT } from '../../App/constants';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';
import Loading from '../../../components/Loading';
import { Link } from 'react-router-dom';
import AddEdit from './AddEditPage/Loadable.js';
import lid from '../../../assets/img/lid.svg';
import {
  FaRegQuestionCircle,
  FaPlus,
  FaSearch,
  FaPencilAlt,
} from 'react-icons/fa';

/* eslint-disable react/prefer-stateless-function */
export class ContentsListingPage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    loadAllRequest: PropTypes.func.isRequired,
    deleteOneRequest: PropTypes.func.isRequired,
    clearOne: PropTypes.func.isRequired,
    setQueryValue: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    classes: PropTypes.object,
    query: PropTypes.object.isRequired,
    all: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totalData: PropTypes.number.isRequired,
    }),
  };

  state = {
    open: false,
    deleteId: '',
    help: false,
    // showForm: false,
    // edit_id: '',
  };

  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
  }

  shouldComponentUpdate(props) {
    if (this.state.cleared) {
      this.setState({ cleared: false });
      props.loadAllRequest(props.query);
    }
    if (
      props.query.size != this.props.query.size ||
      props.query.page != this.props.query.page
    ) {
      props.loadAllRequest(props.query);
    }
    return true;
  }

  handlePagination = paging => {
    this.props.setQueryValue({ key: 'page', value: paging.page });
    this.props.setQueryValue({ key: 'size', value: paging.size });
  };

  handleAdd = () => {
    this.props.clearOne();
    this.props.push('/admin/section-content/add');
  };

  handleEdit = id => {
    this.props.push(`/admin/section-content/edit/${id}`);
    this.props.clearOne();

    // this.setState({ edit_id: id });
    // this.props.setShowForm(true);
  };

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({
      key: e.target.name,
      value: e.target.value,
    });
  };

  handleSearch = () => {
    this.props.loadAllRequest(this.props.query);
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

  toggleHelp = () => {
    this.setState({ help: !this.state.help });
  };

  render() {
    const { classes } = this.props;
    const {
      all: { data, page, size, totalData },
      query,
      loading,
      showForm,
    } = this.props;
    const tablePagination = { page, size, totaldata: totalData };
    const tableData = data.map(
      ({ name, key, is_active, publish_from, publish_to, _id }) => [
        name,
        key,
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
          <title>Section Content</title>
        </Helmet>
        {loading && loading === true ? <Loading /> : <></>}
        <div className="flex justify-between my-3">
          <PageHeader>Section Content </PageHeader>
          <div className="flex items-center">
            <span
              className="inline-block text-blue-500 hover:text-blue-600 h text-xl px-5 cursor-pointer"
              onClick={this.toggleHelp}
            >
              <FaRegQuestionCircle />

              {this.state.help && <span className="arrow_box" />}
            </span>
            <button
              className="bg-blue-500 border border-blue-600 px-3 py-2 leading-none inline-flex items-center cursor-pointer hover:bg-blue-600 transition-all duration-100 ease-in text-sm text-white rounded"
              onClick={this.handleAdd}
            >
              <FaPlus />
              <span className="pl-2">Add New</span>
            </button>
          </div>
        </div>

        {this.state.help && (
          <div
            className="rounded p-6 mb-6"
            style={{ backgroundColor: '#1E1E1E' }}
          >
            <pre className="block overflow-x-auto text-gray-200 font-bold">
              <span style={{ color: '#529BD8' }}>import</span> StaticContentDiv{' '}
              <span style={{ color: '#529BD8' }}>from</span>{' '}
              <span style={{ color: '#CE9076' }}>
                '../../components/StaticContentDiv';
              </span>
              <br />
              <br />
              &lt;
              <span style={{ color: '#529BD8' }}>StaticContentDiv</span>{' '}
              <span style={{ color: '#9ADCFF' }} />
              contentKey=
              <span style={{ color: '#CE9076' }}>"about"</span> /&gt;
            </pre>
          </div>
        )}

        <PageContent loading={loading}>
          <div className="flex">
            <div className="flex relative mr-4">
              <input
                type="text"
                name="find_name"
                id="contents-name"
                placeholder="Search by name"
                className="m-auto inputbox pr-6"
                value={query.find_name}
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

            <div className="waftformgroup relative flex">
              <input
                type="text"
                name="find_key"
                id="contents-key"
                placeholder="Search by key"
                className="m-auto inputbox pr-6"
                value={query.find_key}
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
          </div>

          <Table
            tableHead={['Name', 'Key', 'Is Active', 'Action']}
            tableData={tableData}
            pagination={tablePagination}
            handlePagination={this.handlePagination}
          />
        </PageContent>

        {/* {showForm && (
          <div
            className="absolute right-0 top-0 left-0 bottom-0 flex"
            style={{
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="w-1/3" onClick={this.handleCloseForm} />
            <div className="w-2/3 h-full overflow-auto pt-20">
              <AddEdit edit_id={this.state.edit_id} />
            </div>
          </div>
        )} */}

        {/*  */}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
  // showForm: makeSelectShowForm(),
});

const withConnect = connect(mapStateToProps, { ...mapDispatchToProps, push });

const withReducer = injectReducer({ key: 'contentsListingPage', reducer });
const withSaga = injectSaga({ key: 'contentsListingPage', saga });

export default compose(withReducer, withSaga, withConnect)(ContentsListingPage);
