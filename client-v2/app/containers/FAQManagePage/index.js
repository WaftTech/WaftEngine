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
import Fab from '@material-ui/core/Fab';
import CustomInput from '@material-ui/core/Input';
import Table from 'components/Table';
import { Paper, Divider } from '@material-ui/core';


import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
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
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 4,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class FAQManagePage extends React.Component {
  state = {
    all: {
      data: [],
      page: 1,
      size: 10,
      totaldata: 0,
    },
    query: { find_question: '' }
  }

  static getDerivedStateFromProps(nextProps) {
    return { all: nextProps.all };
  }

  componentDidMount() {
    this.props.loadAllRequest({ query: {} });
  }
  handleQueryChange = e => {
    e.persist();
    this.setState(state => ({
      query: {
        ...state.query,
        [e.target.name]: e.target.value,
      },
    }));
  };
  handleAdd = () => {
    this.props.history.push('/admin/faq-manage/add');
  };
  handleEdit = _id => {
    this.props.history.push(`/admin/faq-manage/edit/${_id}`);
  };
  handleDelete = id => {
    // shoe modal && api call
    // this.props.history.push(`/admin/faq-manage/delete/${id}`);
  };
  handleSearch = () => {
    this.props.loadAllRequest(this.state.query);
    this.setState({ query: {} });
  };
  // faqSort = title => {
  //   if (!!this.state.sortToggle) {
  //     this.setState({ sortToggle: 0 });
  //   } else if (!this.state.sortToggle) {
  //     this.setState({ sortToggle: 1 });
  //   }
  //   this.props.loadAllRequest({
  //     sort: `${this.state.sortToggle}${title}`,
      // page: this.state.page,
      // rowsPerPage: this.state.rowsPerPage
  //   });
  // };

  handleChangePage = (event, page) => {
    this.setState({ page: page + 1 }, () => {
      this.props.loadAllRequest({
        page: this.state.all.page,
        // rowsPerPage: this.state.rowsPerPage,
      });
    });
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };
  // handleChangeRowsPerPage = event => {
  //   this.setState({ rowsPerPage: event.target.value }, () => {
  //     this.props.loadAllRequest({
  //       // page: this.state.page,
  //       rowsPerPage: this.state.rowsPerPage,
  //     });
  //   });
  // };

  render() {
    const { classes } = this.props;
    const {
      all: { data, page, size, totaldata}
    } = this.state;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(({ question, title, category, added_at, updated_at, _id }) => [
      question,
      title,
      (category && category.title) || 'No',
      moment(added_at).format('MMM Do YY'),

      moment(updated_at).format('MMM Do YY'),
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
      <>
      <PageHeader>
        FAQ Manage
      </PageHeader>
      <PageContent>
        <Paper style={{padding:20, overflow:'auto', display:'flex'}}>
          <CustomInput name="find_question"
                    id="question-name"
                    fullWidth={true}
                    placeholder="Search FAQs"
                    value={this.state.query.find_question}
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
            tableHead={['Question', 'Answer', 'Category', 'Added At', 'Updated At']}
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
      </>
    );
  }
}

FAQManagePage.propTypes = {
  loadAllRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  // category: makeSelectCategory(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
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
