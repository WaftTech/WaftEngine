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
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import Button from '../../components/CustomButtons/Button';
import Table from '../../components/Table/Table';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { loadAllRequest, loadCategoryRequest } from './actions';
import { makeSelectAll, makeSelectPage, makeSelectCategory } from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
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
export class BlogManagePage extends React.Component {
  state = { query: {}, sortToggle: 0 };
  componentDidMount() {
    this.props.loadAll({ query: {} });
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
    this.props.history.push('/wt/blog-manage/add');
  };
  handleEdit = _id => {
    this.props.history.push(`/wt/blog-manage/edit/${_id}`);
  };
  handleDelete = id => {
    // shoe modal && api call
    // this.props.history.push(`/wt/link-manage/edit/${id}`);
  };
  handleSearch = () => {
    this.props.loadAll(this.state.query);
    this.setState({ query: {} });
  };
  blogSort = title => {
    if (!!this.state.sortToggle) {
      this.setState({ sortToggle: 0 });
    } else if (!this.state.sortToggle) {
      this.setState({ sortToggle: 1 });
    }
    this.props.loadAll({
      sort: `${this.state.sortToggle}${title}`,
      // page: this.state.page,
      // rowsPerPage: this.state.rowsPerPage
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page: page + 1 }, () => {
      this.props.loadAll({
        page: this.state.page,
        rowsPerPage: this.state.rowsPerPage,
      });
    });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value }, () => {
      this.props.loadAll({
        // page: this.state.page,
        rowsPerPage: this.state.rowsPerPage,
      });
    });
  };

  render() {
    const { classes, allLinks, pageItem } = this.props;
    const allLinksObj = allLinks.toJS();
    const pageObj = pageItem.toJS();
    const { page = 1, size = 10, totaldata = 20 } = pageObj;
    const tableData = allLinksObj.map(
      ({ title, Category, published_on, added_at, is_published, is_active, _id, slug_url }) => [
        title,
        (Category && Category.title) || 'No',
        moment(published_on).format('MMM Do YY'),

        moment(added_at).format('MMM Do YY'),
        '' + is_published,
        '' + is_active,
        <React.Fragment>
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
              <Edit className={classes.tableActionButtonIcon + ' ' + classes.edit} />
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
              <Close className={classes.tableActionButtonIcon + ' ' + classes.close} />
            </IconButton>
          </Tooltip>
        </React.Fragment>,
      ],
    );
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Search and Filter</h4>
              <input
                name="title"
                value={this.state.query.title || ''}
                onChange={this.handleQueryChange}
                placeholder="Search By Blog Title"
              />
              <button onClick={this.handleSearch}>Search</button>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}> Blog Management</h4>
              <p className={classes.cardCategoryWhite}>Here are the lists of Blogs</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  <FormattedMessage {...messages.title}>
                    {txt => <span onClick={() => this.blogSort('title')}>{txt}</span>}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.category} />,
                  <FormattedMessage {...messages.publishedOn}>
                    {txt => <span onClick={() => this.blogSort('published_on')}>{txt}</span>}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.addedAt}>
                    {txt => <span onClick={() => this.blogSort('added_at')}>{txt}</span>}
                  </FormattedMessage>,
                  <FormattedMessage {...messages.isPublished} />,
                  <FormattedMessage {...messages.isActive} />,
                ]}
                tableData={tableData}
                page={page}
                size={size}
                totaldata={totaldata}
                handleChangePage={this.handleChangePage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
              <Button
                variant="fab"
                color="primary"
                aria-label="Add"
                className={classes.button}
                round={true}
                onClick={this.handleAdd}
              >
                <AddIcon />
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

BlogManagePage.propTypes = {
  loadAll: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  allLinks: makeSelectAll(),
  pageItem: makeSelectPage(),
  category: makeSelectCategory(),
});

const mapDispatchToProps = dispatch => ({
  loadAll: payload => dispatch(loadAllRequest(payload)),
  loadCategory: () => dispatch(loadCategoryRequest()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
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
