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
import Helmet from 'react-helmet';

import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import CustomInput from '@material-ui/core/Input';
import Table from 'components/Table';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import Loading from '../../../components/loading';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import DeleteDialog from '../../../components/DeleteDialog';

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
      ({ title, is_active, added_at, updated_at, _id }) => [
        title,
        '' + is_active,
        moment(added_at).format('MMM Do YY'),
        moment(updated_at).format('MMM Do YY'),
        <>
          <Tooltip
            id="tooltip-top"
            title="Edit Task"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Edit"
              className={classes.tableActionButton}
              onClick={() => this.handleEdit(_id)}
            >
              <Edit
                className={`${classes.tableActionButtonIcon} ${classes.edit}`}
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            id="tooltip-top-start"
            title="Remove"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Close"
              className={classes.tableActionButton}
              onClick={() => this.handleOpen(_id)}
            >
              <Close
                className={`${classes.tableActionButtonIcon} ${classes.close}`}
              />
            </IconButton>
          </Tooltip>
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
        <div className="flex justify-between mt-3 mb-3">
          {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>Blog Category Manage</PageHeader>
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            round="true"
            onClick={this.handleAdd}
            elevation={0}
          >
            <AddIcon />
          </Fab>
        </div>
        <PageContent loading={loading}>
          <div className="flex justify-end">
            <div className="waftformgroup flex relative mr-2">
              <input
                type="text"
                name="find_title"
                id="doc-title"
                placeholder="Search Blog Category"
                className="m-auto Waftinputbox"
                value={query.find_title}
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
              'Title',
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

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(BlogCategory);
