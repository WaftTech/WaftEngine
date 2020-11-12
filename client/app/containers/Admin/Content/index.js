import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import { Helmet } from 'react-helmet';

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
import { Link } from 'react-router-dom';

import { FaRegQuestionCircle, FaPlus } from 'react-icons/fa';
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

/* eslint-disable react/prefer-stateless-function */
export class ContentsListingPage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    loadAllRequest: PropTypes.func.isRequired,
    deleteOneRequest: PropTypes.func.isRequired,
    clearOne: PropTypes.func.isRequired,
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

  handleAdd = () => {
    this.props.clearOne();
    this.props.push('/admin/content-manage/add');
  };

  handleEdit = id => {
    this.props.push(`/admin/content-manage/edit/${id}`);
  };

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  handleSearch = () => {
    this.props.loadAllRequest(this.props.query);
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

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
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
      ({ name, key, is_active, publish_from, publish_to, _id }) => [
        name,
        key,
        <Link to={`/page/${key}`} target="_blank">
          {`/page/${key}`}
        </Link>,
        moment(publish_from).format(DATE_FORMAT),
        moment(publish_to).format(DATE_FORMAT),
        `${is_active}`,
        <>
          <div className="flex">
            <button
              aria-label="Edit"
              className=" px-1 text-center leading-none"
              onClick={() => this.handleEdit(_id)}
            >
              <i className="material-icons text-base text-blue-500 hover:text-blue-700">
                edit
              </i>
            </button>

            <button
              className="ml-2 px-1 text-center leading-none"
              onClick={() => this.handleOpen(_id)}
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
        <DeleteDialog
          open={this.state.open}
          doClose={this.handleClose}
          doDelete={() => this.handleDelete(this.state.deleteId)}
        />
        <Helmet>
          <title>HTML Content</title>
        </Helmet>
        <div className="flex justify-between mt-3 mb-3">
          {loading && loading === true ? <Loading /> : <></>}
          <PageHeader>Section Content</PageHeader>

          <div className="flex items-center">
            <span className="inline-block text-blue-500 hover:text-blue-600 h text-xl px-5">
              <FaRegQuestionCircle />
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

        <div className="bg-white border rounded p-6 mb-6">
          <p>
            Section content a piece of content which can be inserted inside a
            page single or multiple times.
          </p>
          <pre className="block overflow-x-auto mt-6 text-gray-600">
            <span className="font-bold">import</span> StaticContentDiv{' '}
            <span className="font-bold">from</span>{' '}
            <span className="text-indigo-700">
              '../../components/StaticContentDiv';
            </span>
            <br />
            ....
            <br />
            &lt;StaticContentDiv contentKey=
            <span className="text-indigo-700">"about"</span> /&gt;
          </pre>
        </div>

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
              />
              <IconButton
                aria-label="Search"
                className={`${classes.waftsrch} waftsrchstyle`}
                onClick={this.handleSearch}
              >
                <SearchIcon />
              </IconButton>
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
              />
              <IconButton
                aria-label="Search"
                className={`${classes.waftsrch} waftsrchstyle`}
                onClick={this.handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </div>
          </div>

          <Table
            tableHead={[
              'Name',
              'Key',
              'Link',
              'Pub From',
              'Pub To',
              'Is Active',
              'Action',
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

const withReducer = injectReducer({ key: 'contentsListingPage', reducer });
const withSaga = injectSaga({ key: 'contentsListingPage', saga });

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(ContentsListingPage);
