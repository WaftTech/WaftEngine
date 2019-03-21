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
import GridItem from '@material-ui/core/Grid';
import CustomInput from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { loadAllRequest } from './actions';
import { makeSelectAll, makeSelectPage } from './selectors';
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
export class ContentsListingPage extends React.Component {
  state = {
    page: 1,
    rowsPerPage: 10,
  };
  componentDidMount() {
    this.props.loadAll();
  };
  handleAdd = () => {
    this.props.history.push('/admin/content-manage/add');
  };
  handleEdit = id => {
    this.props.history.push(`/admin/content-manage/edit/${id}`);
  };
  handleDelete = id => {
    // shoe modal && api call
    // this.props.history.push(`/wt/contents-manage/edit/${id}`);
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
    const allLinksObj = allLinks;
    console.log(allLinksObj);
    const pageObj = pageItem;
    const { page = 1, size = 10, totaldata = 20 } = pageObj;

    const tableData = allLinksObj.data.map(({ name, key, publish_from, publish_to, is_active, is_feature, added_at, _id }) => [
      // Description,
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
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardContent>
              <Grid container>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    id="contents-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
                    Search
                  </Button>
                </GridItem>
              </Grid>
            </CardContent>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Contents Listing</h4>
              <p className={classes.cardCategoryWhite}>Here are the list of Contents</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell><FormattedMessage {...messages.contentName} /></TableCell>
                  <TableCell><FormattedMessage {...messages.key} /></TableCell>
                  <TableCell><FormattedMessage {...messages.publishedFrom} />,</TableCell>
                  <TableCell><FormattedMessage {...messages.publishedTo} /></TableCell>
                  <TableCell><FormattedMessage {...messages.isActive} /></TableCell>
                  <TableCell><FormattedMessage {...messages.isFeatured} /></TableCell>
                  <TableCell><FormattedMessage {...messages.addedAt} /></TableCell>
                  <TableCell><FormattedMessage {...messages.operations} /></TableCell>
                  </TableRow>
                  </TableHead>
                <TableBody><TableRow><TableCell>{tableData}</TableCell></TableRow></TableBody>
                {/* <TableFooter>
                  <TableRow>
                    <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={totaldata}
                    rowsPerPage={size}
                    page={page}
                    SelectProps={{
                      native: true,
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage} />
                  </TableRow>
                </TableFooter> */}
              </Table>
              <Button variant="fab" color="primary" aria-label="Add" className={classes.button} round={true} onClick={this.handleAdd}>
                <AddIcon />
              </Button>
            </CardContent>
          </Card>
        </GridItem>
      </Grid>
    );
  }
}

ContentsListingPage.propTypes = {
  loadAll: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  allLinks: makeSelectAll(),
  pageItem: makeSelectPage(),
});

const mapDispatchToProps = dispatch => ({
  loadAll: payload => dispatch(loadAllRequest(payload)),
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
