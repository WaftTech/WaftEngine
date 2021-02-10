import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import qs from 'query-string';
import Table from 'components/Table/Table';

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
import lid from '../../../assets/img/lid.svg';
import {
  FaPencilAlt,
  FaPlus,
  FaRegQuestionCircle,
  FaSearch,
} from 'react-icons/fa';

/* eslint-disable react/prefer-stateless-function */
export class SliderPage extends React.Component {
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
    display: false,
    open: false,
    deleteId: '',
    help: false,
  };

  componentDidMount() {
    const {
      loadAllRequest,
      query,
      location: { search },
      setQueryObj,
    } = this.props;
    let queryObj = { ...query };
    if (search) {
      queryObj = qs.parse(search);
      setQueryObj(queryObj);
    }

    this.props.loadAllRequest(this.props.query);
  }

  handleAdd = () => {
    this.props.clearOne();
    this.props.push('/admin/slider-manage/add');
  };

  handleEdit = id => {
    this.props.clearOne();
    this.props.push(`/admin/slider-manage/edit/${id}`);
  };

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
    const queryString = qs.stringify({
      ...this.props.query,
      [e.target.name]: e.target.value,
    });
    this.props.push({
      search: queryString,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.loadAllRequest(this.props.query);
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
    const queryString = qs.stringify(paging);
    this.props.push({
      search: queryString,
    });
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

  handleToggle = () => {
    this.setState(state => ({ display: !state.display }));
  };

  toggleHelp = () => {
    this.setState({ help: !this.state.help });
  };

  render() {
    const { display } = this.state;

    const {
      classes,
      all: { data, page, size, totalData },
      query,
      loading,
    } = this.props;
    const tablePagination = { page, size, totaldata: totalData };
    const tableData = data.map(
      ({ slider_name, slider_key, images, added_at, _id }) => [
        slider_name,
        slider_key,
        images.length,
        moment(added_at).format(DATE_FORMAT),

        <React.Fragment>
          <div className="flex">
            <span
              className="w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative edit-icon"
              onClick={() => this.handleEdit(_id)}
            >
              <FaPencilAlt className="pencil" />
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
        </React.Fragment>,
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
          <title>Slider Listing</title>
        </Helmet>
        {loading && loading == true ? <Loading /> : <></>}
        <div className="flex justify-between my-3">
          <PageHeader>Slider Manage </PageHeader>
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
              <span style={{ color: '#529BD8' }}>import</span> SlickSlider{' '}
              <span style={{ color: '#529BD8' }}>from</span>{' '}
              <span style={{ color: '#CE9076' }}>
                '../../components/SlickSlider';
              </span>
              <br />
              <br />
              &lt;<span style={{ color: '#529BD8' }}>SlickSlider</span>{' '}
              <span style={{ color: '#9ADCFF' }} />
              slideKey=
              <span style={{ color: '#CE9076' }}>"homebanner"</span> /&gt;
            </pre>
          </div>
        )}

        <PageContent loading={loading}>
          <div className="flex relative mr-4 max-w-sm">
            <input
              type="text"
              name="find_slider_name"
              id="slider-name"
              placeholder="Search Slider"
              className="m-auto inputbox pr-6"
              value={query.find_slider_name}
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
            tableHead={[
              'Slider Name',
              'Slider Key',
              'Images',
              'Added at',
              'Actions',
            ]}
            tableData={tableData}
            pagination={tablePagination}
            handlePagination={this.handlePagination}
            emptyDataMsg="No Slider Found"
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

const withReducer = injectReducer({ key: 'sliderManagePage', reducer });
const withSaga = injectSaga({ key: 'sliderManagePage', saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(SliderPage);
