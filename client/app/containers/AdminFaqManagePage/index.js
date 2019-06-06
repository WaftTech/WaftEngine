import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import Helmet from 'react-helmet';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import CustomInput from '@material-ui/core/Input';
import Table from 'components/Table';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 4,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class FAQManagePage extends React.PureComponent {
  static propTypes = {
    loadAllRequest: PropTypes.func.isRequired,
    setQueryValue: PropTypes.func.isRequired,
    clearOne: PropTypes.func.isRequired,
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
    this.props.push('/admin/faq-manage/add');
  };

  handleEdit = id => {
    this.props.push(`/admin/faq-manage/edit/${id}`);
  };

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  handleSearch = () => {
    this.props.loadAllRequest(this.props.query);
  };

  handleDelete = id => {
    this.props.deleteOneRequest(id);
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
      match,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(
      ({ question, category, added_at, updated_at, _id }) => [
        question,
        (category && category.title) || 'No',
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
    return loading && loading == true ? (
      <div>loading</div>
    ) : (
      <>
        <Helmet>
          <title>
            FAQ Listing
          </title>
        </Helmet>
        <PageHeader>FAQ Manage</PageHeader>
        <PageContent>
          <Paper style={{ padding: 20, overflow: 'auto', display: 'none' }}>
            <CustomInput
              name="find_question"
              id="question-name"
              fullWidth
              placeholder="Search FAQs"
              value={query.find_question}
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
          <Table
            tableHead={[
              'Question',
              'Category',
              'Added At',
              'Updated At',
              'Actions',
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

FAQManagePage.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({ key: 'faqManagePage', reducer });
const withSaga = injectSaga({ key: 'faqManagePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(FAQManagePage);
