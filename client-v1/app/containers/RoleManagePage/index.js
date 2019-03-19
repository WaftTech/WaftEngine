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
import Close from '@material-ui/icons/Close';

// core components
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import Button from '../../components/CustomButtons/Button';
import Table from '../../components/Table/Table';
import Card from '../../components/Card/Card';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { loadAllRequest } from './actions';
import { makeSelectAll } from './selectors';

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
export class RoleManagePage extends React.Component {
  componentDidMount() {
    this.props.loadAll();
  }

  handleAdd = () => {
    this.props.history.push('/admin/role-manage/add');
  };

  handleEdit = id => {
    this.props.history.push(`/admin/role-manage/edit/${id}`);
  };

  handleDelete = id => {
    // shoe modal && api call
    // this.props.history.push(`/wt/link-manage/edit/${id}`);
  };

  handlePagination = paging => {
    this.props.loadAll(paging);
  };

  render() {
    const { classes, all } = this.props;
    const allObj = all.toJS();
    const { data, page, size, totaldata } = allObj;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(({ _id, RolesTitle, Description, IsActive }) => [
      RolesTitle,
      Description,
      `${IsActive}`,
      <React.Fragment>
        <Tooltip id="tooltip-top" title="Edit Role" placement="top" classes={{ tooltip: classes.tooltip }}>
          <IconButton aria-label="Edit" className={classes.tableActionButton} onClick={() => this.handleEdit(_id)}>
            <Edit className={`${classes.tableActionButtonIcon} ${classes.edit}`} />
          </IconButton>
        </Tooltip>
        <Tooltip id="tooltip-top-start" title="Remove Role" placement="top" classes={{ tooltip: classes.tooltip }}>
          <IconButton aria-label="Close" className={classes.tableActionButton} onClick={() => this.handleDelete(_id)}>
            <Close className={`${classes.tableActionButtonIcon} ${classes.close}`} />
          </IconButton>
        </Tooltip>
      </React.Fragment>,
    ]);
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="pb-5 mb-5">
            <Card>
              <Table tableHeaderColor="primary" tableHead={['Title', 'Description', 'Is Active', 'Action']} tableData={tableData} pagination={tablePagination} handlePagination={this.handlePagination} />
            </Card>
            <Button variant="fab" color="primary" className="customFabButton" onClick={this.handleAdd}>
              <AddIcon />
            </Button>
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}

RoleManagePage.propTypes = {
  loadAll: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
});

const mapDispatchToProps = dispatch => ({
  loadAll: payload => dispatch(loadAllRequest(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'roleManagePage', reducer });
const withSaga = injectSaga({ key: 'roleManagePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withRouter,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(RoleManagePage);
