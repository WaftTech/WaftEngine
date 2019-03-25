import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

// core components
import Grid from '@material-ui/core/Grid';
import CustomInput from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Table from 'components/Table';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import { makeSelectAll } from './selectors';

import Fab from '@material-ui/core/Fab';
import Button from '../../components/CustomButtons/Button';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
import { Paper, Divider } from '@material-ui/core';

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
export class ContentsListingPage extends React.Component {
  state = {
    all: {
      data: [],
      page: 1,
      size: 10,
      totaldata: 0,
    },
    query: { find_name: '' }
  };

  static getDerivedStateFromProps(nextProps) {
    return { all: nextProps.all };
  }

  componentDidMount() {
    this.props.loadAllRequest();
  };

  handleAdd = () => {
    this.props.history.push('/admin/content-manage/add');
  };

  handleEdit = id => {
    this.props.history.push(`/admin/content-manage/edit/${id}`);
  };
  handleQueryChange = e => {
    e.persist();
    this.setState( state=> ({
      query: {
        ...state.query,
        [e.target.name]: e.target.value,
      },
    }));
  };

  handleSearch = () => {
    this.props.loadAllRequest(this.state.query);
    this.setState({ query: {} });
  };

  handleDelete = id => {
    // shoe modal && api call
    // this.props.history.push(`/wt/contents-manage/edit/${id}`);
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };

  render() {
    const { classes } = this.props;
    const {
      all: { data, page, size, totaldata },
    } = this.state;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(({ name, key, publish_from, publish_to, is_active, is_feature, added_at, _id }) => [
      name,
      key,
      moment(publish_from).format('MMM Do YY'),
      moment(publish_to).format('MMM Do YY'),
      '' + is_active,
      '' + is_feature,
      moment(added_at).format('MMM Do YY'),
      ,
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
      <React.Fragment>
        <PageHeader>
        Content Manage
        </PageHeader>
        <PageContent>
        <Paper style={{padding:20, overflow:'auto', display:'flex'}}>
      <CustomInput name="find_name"
                    id="contents-name"
                    fullWidth={true}
                    placeholder="Search Contents"
                    value={this.state.query.find_name}
                    onChange={this.handleQueryChange} />
      <Divider style={{ width: 1,
    height: 40,
    margin: 4,}} />
      <IconButton aria-label="Search" onClick={this.handleSearch} >
        <SearchIcon />
      </IconButton>
    </Paper>

            <br/>
            <Paper style={{padding:0, overflow:'auto', borderRadius:4, boxShadow:'0 0 0 1px rgba(0,0,0,.2)', display:'flex'}} elevation={0}>
            <Table
          tableHead={['Name', 'Key', 'Pub From', 'Pub To', 'is Active', 'is feature', 'Added at']}
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
              </Paper>
          </PageContent>
            </React.Fragment>
          
    );
  }
}

ContentsListingPage.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'contentsListingPage', reducer });
const withSaga = injectSaga({ key: 'contentsListingPage', saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(ContentsListingPage);
