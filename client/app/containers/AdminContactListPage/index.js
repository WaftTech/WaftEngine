/**
 *
 * AdminContactListPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import moment from 'moment';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import View from '@material-ui/icons/RemoveRedEyeOutlined';

// core components
import CustomInput from '@material-ui/core/Input';
import { Paper, Divider } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Table from 'components/Table/Table';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectQuery } from './selectors';

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
export class AdminContactListPage extends React.Component {
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

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };

  handleView = id => {
    this.props.push(`/admin/contact-manage/view/${id}`);
  };

  render() {
    const { classes } = this.props;
    const {
      all: { data, page, size, totaldata },
      query,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(({ name, email, subject, added_at, _id }) => [
      name,
      email,
      subject,
      moment(added_at).format('MMM Do YY'),

      <React.Fragment>
        <Tooltip
          id="tooltip-top"
          title="View Contacts"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            aria-label="View"
            className={classes.tableActionButton}
            onClick={() => this.handleView(_id)}
          >
            <View
              className={`${classes.tableActionButtonIcon} ${classes.edit}`}
            />
          </IconButton>
        </Tooltip>
      </React.Fragment>,
    ]);
    return (
      <>
        <PageHeader>Contact List</PageHeader>
        <PageContent>
          <Paper style={{ padding: 20, overflow: 'auto', display: 'flex' }}>
            <CustomInput
              name="find_name"
              id="contact-name"
              placeholder="Search Contacts"
              fullWidth
              value={query.find_name}
              onChange={this.handleQueryChange}
            />
            <Divider style={{ width: 1, height: 40, margin: 4 }} />
            <IconButton aria-label="Search" onClick={this.handleSearch}>
              <SearchIcon />
            </IconButton>
          </Paper>
          <br />

          <Table
            tableHead={['Name', 'Email', 'Subject', 'Added at', 'Actions']}
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
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'adminContactListPage', reducer });
const withSaga = injectSaga({ key: 'adminContactListPage', saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(AdminContactListPage);
