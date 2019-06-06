/**
 *
 * AdminRoleManage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Close from '@material-ui/icons/Close';
import { Fab, IconButton, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Table from 'components/Table';
import CreateIcon from '@material-ui/icons/Create';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectQuery } from './selectors';

import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';

/* eslint-disable react/prefer-stateless-function */
export class AdminRoleManage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loadAllRequest: PropTypes.func.isRequired,
    setQueryValue: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    clearOne: PropTypes.func.isRequired,
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
    this.props.push('/admin/role-manage/add');
  };

  handleEdit = id => {
    this.props.push(`/admin/role-manage/edit/${id}`);
  };

  handleQueryChange = event => {
    event.persist();
    this.props.setQueryValue({
      key: event.target.name,
      value: event.target.value,
    });
  };

  handleSearch = () => {
    this.props.loadAllRequest(this.props.query);
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };

  handleDelete = id => {
    this.props.deleteOneRequest(id);
  };

  render() {
    const {
      classes,
      all: { data, page, size, totaldata },
      query,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(
      ({ _id, role_title, description, is_active }) => [
        role_title,
        description,
        `${is_active}`,
        <>
          <Tooltip id="tooltip-top" title="Edit Role" placement="top">
            <IconButton
              className={classes.TableButton}
              color="primary"
              onClick={() => this.handleEdit(_id)}
            >
              <CreateIcon />
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
              onClick={() => this.handleDelete(_id)}
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
      <React.Fragment>
        <PageHeader>Role Manage</PageHeader>
        <PageContent>
          <Paper style={{ padding: 20, overflow: 'auto', display: 'flex' }}>
            <InputBase
              name="find_role_title"
              id="role-title"
              placeholder="Search roles by title"
              fullWidth
              value={query.find_role_title}
              onChange={this.handleQueryChange}
            />
            <Divider style={{ width: 1, height: 40, margin: 4 }} />
            <IconButton aria-label="Search" onClick={this.handleSearch}>
              <SearchIcon />
            </IconButton>
          </Paper>
          <br />
          <Table
            tableHead={['Title', 'Description', 'Is Active', 'Action']}
            tableData={tableData}
            pagination={tablePagination}
            handlePagination={this.handlePagination}
          />
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={this.handleAdd}
          >
            <AddIcon />
          </Fab>
        </PageContent>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'adminRoleManage', reducer });
const withSaga = injectSaga({ key: 'adminRoleManage', saga });

const styles = theme => ({
  TableButton: { padding: 8 },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 4,
  },
});

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(AdminRoleManage);
