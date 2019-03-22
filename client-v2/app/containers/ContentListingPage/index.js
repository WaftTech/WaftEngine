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

// core components
import Grid from '@material-ui/core/Grid';
import CustomInput from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
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

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
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
      <Grid container spacing={16}>
        <Grid xs={12} sm={12} md={12}>
          <Card>
            <CardContent>
              <Grid container>
                <Grid xs={12} sm={12} md={8}>
                  <CustomInput
                    name="find_name"
                    id="contents-name"
                    placeholder="search contents by name"
                    formControl={true}
                    fullWidth={true}
                    value={this.state.query.find_name}
                    onChange={this.handleQueryChange}
                  />
                </Grid>
                <Grid xs={12} sm={12} md={4}>
                  <Button variant="contained" color="primary" aria-label="Add" className={classes.button} onClick={this.handleSearch}>
                    Search
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary"
              title="Contents Listing"
              subheader="Here are the list of Contents"
            />
            <CardContent>

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
              >
                <AddIcon />
              </Fab>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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
