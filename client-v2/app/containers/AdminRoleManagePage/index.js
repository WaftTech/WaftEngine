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
import { Fab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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
import { makeSelectAll } from './selectors';

import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';

/* eslint-disable react/prefer-stateless-function */
export class AdminRoleManage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loadAllRequest: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    clearOne: PropTypes.func.isRequired,
    all: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
  };

  componentDidMount() {
    this.props.loadAllRequest();
  }

  handleAdd = () => {
    this.props.clearOne();
    this.props.push('/admin/role-manage/add');
  };

  handleEdit = id => {
    this.props.push(`/admin/role-manage/edit/${id}`);
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };

  render() {
    const {
      classes,
      all: { data, page, size, totaldata },
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
        </>,
      ],
    );
    return (
      <>
        <PageHeader>Role Manage</PageHeader>
        <PageContent>
          <Paper className={classes.root}>
            <Table
              tableHead={['Title', 'Description', 'Is Active', 'Action']}
              tableData={tableData}
              pagination={tablePagination}
              handlePagination={this.handlePagination}
            />
          </Paper>
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={this.handleAdd}
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
