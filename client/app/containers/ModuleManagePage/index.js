import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import VpnKey from '@material-ui/icons/VpnKey';
import Close from '@material-ui/icons/Close';

// core components
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import Button from '../../components/CustomButtons/Button';
import Table from '../../components/Table/Table';
import Card from '../../components/Card/Card';
// import CardHeader from "../../components/Card/CardHeader";
// import CardBody from "../../components/Card/CardBody";

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
export class ModuleManagePage extends React.Component {
  componentDidMount() {
    this.props.loadAll();
  }
  handleAdd = () => {
    this.props.history.push('/wt/module-manage/add');
  };
  handleEdit = id => {
    this.props.history.push(`/wt/module-manage/edit/${id}`);
  };
  handleAccessEdit = id => {
    this.props.history.push(`/wt/module-manage/access/${id}`);
  };
  handleDelete = id => {
    // shoe modal && api call
    // this.props.history.push(`/wt/link-manage/edit/${id}`);
  };
  handleChangePage = (event, page) => {
    this.setState({ page: page + 1 }, () => {
      this.props.loadAll({
        page: this.state.page,
        rowsPerPage: this.state.rowsPerPage
      });
    });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value }, () => {
      this.props.loadAll({
        // page: this.state.page,
        rowsPerPage: this.state.rowsPerPage
      });
    });
  };

  render() {
    const { classes, all, pageItem } = this.props;
    const allObj = all.toJS();
    const pageObj = pageItem.toJS();
    const { page = 1, size = 10, totaldata = 20 } = pageObj;
    const tableData = allObj.map(({ _id, ModuleName, Path }) => [
      ModuleName,
      <React.Fragment>
        <Tooltip
          id="tooltip-top"
          title="Edit"
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
          id="tooltip-top-1"
          title="Access Manage"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            aria-label="Edit"
            className={classes.tableActionButton}
            onClick={() => this.handleAccessEdit(_id)}
          >
            <VpnKey className={classes.tableActionButtonIcon + ' ' + classes.edit} />
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
    ]);
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="pb-5 mb-5">
            <Card>
              {/* <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Module Management</h4>
              <p className={classes.cardCategoryWhite}>Here are the list of modules</p>
            </CardHeader> */}
              <Table
                tableHeaderColor="primary"
                tableHead={[<FormattedMessage {...messages.moduleManage} />, <FormattedMessage {...messages.moduleAction} />]}
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
                className="customFabButton"
                round={true}
                onClick={this.handleAdd}
              >
                <AddIcon />
              </Button>
            </Card>
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}

ModuleManagePage.propTypes = {
  loadAll: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  pageItem: makeSelectPage()
});

const mapDispatchToProps = dispatch => ({
  loadAll: (payload) => dispatch(loadAllRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'moduleManagePage', reducer });
const withSaga = injectSaga({ key: 'moduleManagePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(ModuleManagePage);
