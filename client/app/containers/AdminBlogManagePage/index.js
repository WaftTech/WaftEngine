import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import { push } from 'connected-react-router';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import { Paper, Divider } from '@material-ui/core';
import CustomInput from '@material-ui/core/Input';

// core components
import Table from 'components/Table';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';

import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 4,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class BlogManagePage extends React.Component {
  static propTypes = {
    loadAllRequest: PropTypes.func.isRequired,
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
  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
  }
  handleAdd = () => {
    this.props.clearOne();
    this.props.push('/admin/blog-manage/add');
  };
  handleEdit = _id => {
    this.props.push(`/admin/blog-manage/edit/${_id}`);
  };
  handleDelete = id => {
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

  render() {
    const { classes} = this.props;
    const {
      all: { data, page, size, totaldata },
      query,
      loading,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(({ title, category, image, published_on, added_at, is_published, is_active, tags, author, _id }) => [
      title,
      (category && category.title) || 'No',
      (image && image.fieldname) || null,
      moment(published_on).format('MMM Do YY'),
      moment(added_at).format('MMM Do YY'),
      '' + is_published,
      '' + is_active,
      tags.join(','),
      author || '',
      <React.Fragment>
        <Tooltip id="tooltip-top" title="Edit Task" placement="top" classes={{ tooltip: classes.tooltip }}>
          <IconButton aria-label="Edit" className={classes.tableActionButton} onClick={() => this.handleEdit(_id)}>
            <Edit className={classes.tableActionButtonIcon + ' ' + classes.edit} />
          </IconButton>
        </Tooltip>
        <Tooltip id="tooltip-top-start" title="Remove" placement="top" classes={{ tooltip: classes.tooltip }}>
          <IconButton aria-label="Close" className={classes.tableActionButton} onClick={() => this.handleDelete(_id)}>
            <Close className={classes.tableActionButtonIcon + ' ' + classes.close} />
          </IconButton>
        </Tooltip>
      </React.Fragment>,
    ]);
    return (
      loading && loading == true ? <div>loading</div> : 
      <>
        <PageHeader>Blog Manage</PageHeader>
        <PageContent>
        <Paper style={{ padding: 20, overflow: 'auto', display: 'flex' }}>
            <CustomInput
              name="find_title"
              id="blog-title"
              fullWidth
              placeholder="Search Blogs"
              value={query.find_title}
              onChange={this.handleQueryChange}
            />
            <Divider
              style={{
                width: 1,
                height: 40,
                margin: 4,
              }}
            />
            <IconButton aria-label="Search" onClick={this.handleSearch}>
              <SearchIcon />
            </IconButton>
          </Paper>
          <br />
          <Paper
            style={{
              padding: 0,
              overflow: 'auto',
              borderRadius: 4,
              boxShadow: '0 0 0 1px rgba(0,0,0,.2)',
              display: 'flex',
            }}
            elevation={0}
          />
            <Table
              tableHead={[
                'Title',
                'Category',
                'Image',
                'Published On',
                'Added At',
                'Is Published',
                'Is Active',
                'Tags',
                'Author',
                'Actions',
                ''
              ]}
              tableData={tableData}
              pagination={tablePagination}
              handlePagination={this.handlePagination}
            />
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

const withReducer = injectReducer({ key: 'blogManagePage', reducer });
const withSaga = injectSaga({ key: 'blogManagePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(BlogManagePage);
