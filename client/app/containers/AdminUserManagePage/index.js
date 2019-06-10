/**
 *
 * AdminUserManagePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Edit from '@material-ui/icons/Edit';
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
export class AdminUserManagePage extends React.PureComponent {
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
    this.props.push('/admin/user-manage/add');
  };

  handleEdit = id => {
    this.props.push(`/admin/user-manage/edit/${id}`);
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
      ({ _id, email, name, roles, email_verified }) => [
        email,
        name,
        roles.map(each => each.role_title).join(', '),
        `${email_verified}`,
        <>
          <Tooltip id="tooltip-left" title="Edit User" placement="left">
            <IconButton className={classes.tableActionButton} onClick={() => this.handleEdit(_id)}>
              <CreateIcon />
            </IconButton>
          </Tooltip>
        </>,
      ],
    );
    return (
      <>
        <div className="flex justify-between mt-3 mb-3">
        <PageHeader>User Manage</PageHeader>
        <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={this.handleAdd}
          >
            <AddIcon />
          </Fab>
          </div>
        <PageContent>
          <Table
            tableHead={['Email', 'Name', 'Roles', 'Email verified', 'Action']}
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
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const styles = theme => ({
  fab: {
    width:'40px',
    height:'40px',
    marginTop:'auto',
    marginBottom:'auto',
  },
  tableActionButton:{
    padding:0,
    '&:hover':{
      background : 'transparent',
      color: '#404040',
    },
  },
});

const withStyle = withStyles(styles);

const withReducer = injectReducer({ key: 'adminUserManagePage', reducer });
const withSaga = injectSaga({ key: 'adminUserManagePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(AdminUserManagePage);
