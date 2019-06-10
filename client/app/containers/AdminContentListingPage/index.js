import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import moment from 'moment';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import { Paper, InputBase, Divider, Grid } from '@material-ui/core';

// core components
import Table from 'components/Table';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectQuery } from './selectors';

import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
import shadows from '@material-ui/core/styles/shadows';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
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

  waftsrch:{
    padding:0,
    position:'absolute',
    borderLeft:'1px solid #d9e3e9',
    borderRadius:0,
      '&:hover':{
        background : 'transparent',
        color: '#404040',
      },
    },
});

/* eslint-disable react/prefer-stateless-function */
export class ContentsListingPage extends React.Component {
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

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };

  render() {
    const { classes } = this.props;
    const {
      all: { data, page, size, totaldata },
      query,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(({ name, key, is_active, added_at, _id }) => [
      name,
      key,
      `${is_active}`,
      moment(added_at).format('MMM Do YY'),
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
      </>,
    ]);
    return (
      <>
      <div className="flex justify-between mt-3 mb-3">
        <PageHeader>Content Manage</PageHeader>
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
        <PageContent>
              <div className="flex justify-end">
            <div className="waftformgroup flex relative mr-2">
                <input type="text"
                  name="find_name"
                  id="contents-name"
                  placeholder="Search Contents by name"
                  className="m-auto Waftinputbox"
                  value={query.find_name}
                  onChange={this.handleQueryChange}
                  style={{paddingRight:'50px'}}
                />
              <IconButton aria-label="Search" className={[classes.waftsrch, 'waftsrchstyle']} onClick={this.handleSearch}>
                  <SearchIcon />
                </IconButton>
                </div>
                 
            
         
                <div className="waftformgroup relative flex">
                <input type="text"
                  name="find_key"
                  id="contents-key"
                  placeholder="Search Contents  by key"
                  className="m-auto Waftinputbox pr-6"
                  value={query.find_key}
                  onChange={this.handleQueryChange}
                  style={{paddingRight:'50px'}}
                />
                <IconButton aria-label="Search" className={[classes.waftsrch, 'waftsrchstyle']} onClick={this.handleSearch}>
                  <SearchIcon />
                </IconButton>
             
              </div>
              </div>
            
         
        
          <Table
            tableHead={[
              'Name',
              'Key',
              // 'Pub From',
              // 'Pub To',
              'Is Active',
              'Added On',
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
